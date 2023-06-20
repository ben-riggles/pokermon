from app.managers import Manager, DBModelManager
from app.models.db import Session, SessionData
from app.models.query import SessionQuery, SessionDataQuery
from app.models.view import ViewModel, SessionView, SessionDetailView


def convert_session_view(session: Session, _) -> SessionView:
    return SessionView(session)

def convert_session_detail_view(session: Session, query: SessionQuery = None) -> SessionDetailView:
    view = SessionDetailView(session)

    q = SessionDataQuery(session_id = session.id)
    if query is not None:
        q.start_date = query.start_date
        q.end_date = query.end_date
    data: list[SessionData] = Manager.get(SessionData).query(q)

    view.num_players = len(data)
    view.num_tournament_players = len([x for x in data if x.tournament_placement is not None])
    return view


class SessionManager(DBModelManager):
    model = Session
    view_dict = {
        SessionView: convert_session_view,
        SessionDetailView: convert_session_detail_view
    }

    @classmethod
    def query(cls, query: SessionQuery = None, as_view: ViewModel = None) -> list[Session]:
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
        if query.tournament is not None:
            q = q.filter_by(tournament = query.tournament)
        sessions = q.all()

        if as_view is not None:
            return [cls._convert_view(x, as_view, query) for x in sessions]
        return sessions
