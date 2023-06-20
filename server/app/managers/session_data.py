from app.managers import Manager, DBModelManager
import app.models as models


@classmethod
def convert_session_data_view(SessionData: models.SessionData) -> models.SessionDataView:
    return models.SessionDataView(SessionData)


class SessionDataManager(DBModelManager):
    model = models.SessionData
    view_dict = {
        models.SessionDataView: convert_session_data_view
    }
    
    @classmethod
    def query(cls, query: models.SessionDataQuery = None, as_view: models.ViewModel = None) -> list[models.SessionData]:
        q = models.SessionData.query

        if query.player_id:
            q = q.filter_by(SessionData_id = query.player_id)
        if query.session_id:
            q = q.filter_by(session_id = query.session_id)
        if query.start_date:
            sessions = Manager.get(models.Session).query(models.SessionQuery(start_date = query.start_date))
            q = q.filter(models.SessionData.session_id.in_([x.id for x in sessions]))
        if query.end_date:
            sessions = Manager.get(models.Session).query(models.SessionQuery(end_date = query.end_date))
            q = q.filter(models.SessionData.session_id.in_([x.id for x in sessions]))
        data = q.all()

        if as_view is not None:
            return [cls._convert_view(x, as_view, query) for x in data]
        return data
