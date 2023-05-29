from app.managers import Manager
from app.models.db import SessionData, Session
from app.models.query import SessionDataQuery, SessionQuery


class SessionDataManager(Manager):
    model = SessionData

    @staticmethod
    def query(query: SessionDataQuery = None) -> list[SessionData]:
        q = SessionData.query

        if query.player_id:
            q = q.filter_by(player_id = query.player_id)
        if query.session_id:
            q = q.filter_by(session_id = query.session_id)
        if query.start_date:
            sessions = Manager.get(Session).query(SessionQuery(start_date = query.start_date))
            q = q.filter(SessionData.session_id.in_([x.id for x in sessions]))
        if query.end_date:
            sessions = Manager.get(Session).query(SessionQuery(end_date = query.end_date))
            q = q.filter(SessionData.session_id.in_([x.id for x in sessions]))
        return q.all()
