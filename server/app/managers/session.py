from app.managers import Manager, DBModelManager
import app.models as models


def convert_session_view(session: models.Session, _) -> models.Session.View:
    return models.Session.View(session)

def convert_session_detail_view(session: models.Session, query: models.Session.Query = None) -> models.Session.DetailView:
    view = models.Session.DetailView(session)

    q = models.SessionData.Query(session_id = session.id)
    if query is not None:
        q.start_date = query.start_date
        q.end_date = query.end_date
    data: list[models.SessionData] = Manager.get(models.SessionData).query(q)

    view.num_players = len(data)
    view.num_tournament_players = len([x for x in data if x.tournament_placement is not None])
    return view


class SessionManager(DBModelManager):
    model = models.Session
    view_dict = {
        models.Session.View: convert_session_view,
        models.Session.DetailView: convert_session_detail_view
    }

    @classmethod
    def query(cls, query: models.Session.Query = None, as_view: models.ViewModel = None) -> list[models.Session]:
        q = models.Session.query

        if query.date:
            q = q.filter_by(date = query.date)
        if query.player_id:
            session_data = Manager.get(models.SessionData).query(models.SessionData.Query(player_id=query.player_id))
            q = q.filter(models.Session.id.in_([x.session_id for x in session_data]))
        if query.start_date:
            q = q.filter(models.Session.date >= query.start_date)
        if query.end_date:
            q = q.filter(models.Session.date <= query.end_date)
        if query.tournament is not None:
            q = q.filter_by(tournament = query.tournament)
        sessions = q.all()

        if as_view is not None:
            return [cls._convert_view(x, as_view, query) for x in sessions]
        return sessions
