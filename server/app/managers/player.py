from app.managers import Manager
from app.models.db import Player, SessionData
from app.models.query import PlayerQuery, SessionDataQuery


class PlayerManager(Manager):
    model = Player

    @staticmethod
    def query(query: PlayerQuery = None) -> list[Player]:
        q = Player.query

        if query.id:
            q = q.filter_by(id = query.id)
        if query.first_name:
            q = q.filter_by(first_name = query.first_name)
        if query.last_name:
            q = q.filter_by(last_name = query.last_name)
        if query.session_id:
            session_data = Manager.get(SessionData).query(SessionDataQuery(session_id=query.session_id))
            q = q.filter(Player.id.in_([x.player_id for x in session_data]))
        if query.start_date:
            session_data = Manager.get(SessionData).query(SessionDataQuery(start_date = query.start_date))
            q = q.filter(Player.id.in_({x.player_id for x in session_data}))
        if query.end_date:
            session_data = Manager.get(SessionData).query(SessionDataQuery(end_date = query.end_date))
            q = q.filter(Player.id.in_({x.player_id for x in session_data}))
        return q.all()
