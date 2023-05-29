from app.managers import Manager
from app.models.db import Session, SessionData
from app.models.query import SessionQuery, SessionDataQuery


class SessionManager(Manager):
    model = Session

    @staticmethod
    def query(query: SessionQuery = None) -> list[Session]:
        q = Session.query

        if query.date:
            q = q.filter_by(date = query.date)
        if query.player_id:
            session_data = Manager.get(SessionData).query(SessionDataQuery(player_id=query.player_id))
            q = q.filter(Session.id.in_([x.session_id for x in session_data]))
        if query.start_date:
            q = q.filter(Session.date >= query.start_date)
        if query.end_date:
            q = q.filter(Session.date <= query.end_date)
        return q.all()
