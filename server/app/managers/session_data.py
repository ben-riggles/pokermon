from app.managers import Manager, DBModelManager
import app.models as models


def convert_session_data_view(SessionData: models.SessionData, _) -> models.SessionData.View:
    return models.SessionData.View(SessionData)


class SessionDataManager(DBModelManager):
    model = models.SessionData
    view_dict = {
        models.SessionData.View: convert_session_data_view
    }
    
    @classmethod
    def query(cls, query: models.SessionData.Query = None, as_view: models.ViewModel = None) -> list[models.SessionData]:
        q = models.SessionData.query

        if query.player_id:
            q = q.filter_by(player_id = query.player_id)
        if query.session_id:
            q = q.filter_by(session_id = query.session_id)
        if query.start_date:
            sessions = Manager.get(models.Session).query(models.Session.Query(start_date = query.start_date))
            q = q.filter(models.SessionData.session_id.in_([x.id for x in sessions]))
        if query.end_date:
            sessions = Manager.get(models.Session).query(models.Session.Query(end_date = query.end_date))
            q = q.filter(models.SessionData.session_id.in_([x.id for x in sessions]))
        data = q.all()

        if as_view is not None:
            return [cls._convert_view(x, as_view, query) for x in data]
        return data
