from datetime import datetime
import math
import pandas as pd

from app.extensions import db
import app.models.db as models


def cash_to_float(val: str) -> float | None:
    try:
        return val.replace('$', '')
    except AttributeError:
        return None

def import_data(csv: str):
    PLAYER_MAP = {
        'Riggs': ('Ben', 'Riggs'),
        'Dave': ('Dave', 'Dickens'),
        'Greg': ('Greg', 'Smith'),
        'Ryan T': ('Ryan', 'Timura'),
        'Brian': ('Brian', 'Long'),
        'Brandon': ('Brandon', 'King'),
        'Andrew': ('Andrew', 'Killmeyer'),
        'Jack': ('Jack', 'Trusler'),
        'Adam K': ('Adam', 'Killmeyer'),
        'Ethan': ('Ethan', 'Smith'),
        'Kyle': ('Kyle', 'Trusler'),
        'Troy': ('Troy', 'Bowers'),
        'Kitson': ('Ben', 'Kitson'),
        'Rob': ('Rob', 'Greene'),
        'Michael': ('Michael', 'Kilcorse'),
        'Ryan S': ('Ryan', 'Smith'),
        'Eric': ('Eric', 'Olsen'),
        'Sean': ('Sean', 'Caruso'),
        'Zack': ('Zack', 'Riggs'),
        'Pearl': ('Pearl', 'Gemegah'),
    }

    df = pd.read_csv(csv)
    df.columns = map(lambda x: x.replace(' ', '_').lower(), df.columns)

    for player_key in pd.unique(df['player']):
        player = PLAYER_MAP[player_key]
        player = models.Player(
            first_name=player[0],
            last_name=player[1]
        )
        PLAYER_MAP[player_key] = player

    sessions, data = [], []
    for session_date, session_df in df.groupby('date', sort=False):
        try:
            other = session_df['other_game'].loc[session_df['other_game'].first_valid_index()]
        except KeyError:
            other = None

        session = models.Session(
            date=datetime.strptime(session_date, '%m/%d/%Y').date(),
            other_game=other
        )
        sessions.append(session)

        for _, row in session_df.iterrows():
            data.append(models.SessionData(
                player = PLAYER_MAP[row['player']],
                session = session,
                cash_net = cash_to_float(row['cash_net']),
                tournament_net = cash_to_float(row['tournament_net']),
                tournament_placement = row['tournament_place'],
                other_net = cash_to_float(row['other_net']),
                six_nine=row['69_wins'] if not math.isnan(row['69_wins']) else 0,
                quads = row['quads'] if not math.isnan(row['quads']) else 0,
            ))

    db.session.add_all(PLAYER_MAP.values())
    db.session.add_all(sessions)
    db.session.add_all(data)
    db.session.commit()

    for session in db.session.query(models.Session):
        data = session.session_data.filter(models.SessionData.tournament_placement != None).all()
        session.tournament = bool(data)
    db.session.commit()
