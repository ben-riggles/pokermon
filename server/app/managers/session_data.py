from app.managers import Manager, DBModelManager
from app.models.db import SessionData, Session
from app.models.query import SessionDataQuery, SessionQuery
from app.models.view import ViewModel, SessionDataView


@classmethod
def convert_session_data_view(SessionData: SessionData) -> SessionDataView:
    return SessionDataView(SessionData)


class SessionDataManager(DBModelManager):
    model = SessionData
    view_dict = {
        SessionDataView: convert_session_data_view
    }
    
    @classmethod
    def query(cls, query: SessionDataQuery = None, as_view: ViewModel = None) -> list[SessionData]:
        q = SessionData.query

        if query.player_id:
            q = q.filter_by(SessionData_id = query.player_id)
        if query.session_id:
            q = q.filter_by(session_id = query.session_id)
        if query.start_date:
            sessions = Manager.get(Session).query(SessionQuery(start_date = query.start_date))
            q = q.filter(SessionData.session_id.in_([x.id for x in sessions]))
        if query.end_date:
            sessions = Manager.get(Session).query(SessionQuery(end_date = query.end_date))
            q = q.filter(SessionData.session_id.in_([x.id for x in sessions]))
        data = q.all()

        if as_view is not None:
            return [cls._convert_view(x, as_view, query) for x in data]
        return data
