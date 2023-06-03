from dataclasses import dataclass, field
from datetime import datetime

from app.managers import SessionDataManager
from app.models.db import Session
from app.models.query import SessionQuery, SessionDataQuery
from app.models.view import ViewModel


@dataclass
class SessionView(ViewModel):
    id: int
    date: datetime
    other_game: str

    def __init__(self, session: Session):
        self.id = session.id
        self.date = session.date
        self.other_game = session.other_game

@dataclass
class SessionDetailView(ViewModel):
    id: int
    date: datetime
    other_game: str

    def __init__(self, session: Session, query: SessionQuery = None):
        self.id = session.id
        self.date = session.date
        self.other_game = session.other_game

        q = SessionDataQuery(session_id = session.id)
        if query is not None:
            q.start_date = query.start_date
            q.end_date = query.end_date
        data = SessionDataManager.query(q)

        self.num_players = len(data)
        self.num_tournament_players = len([x for x in data if x.tournament_placement is not None])
