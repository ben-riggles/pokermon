from app.managers import Manager
import app.models as models


def convert_tournament_view(tournament: models.Tournament, **kwargs) -> models.Tournament.View:
    return models.Tournament.View(tournament)


class TournamentManager(Manager):
    model = models.Tournament
    view_dict = {
        models.Tournament.View: convert_tournament_view
    }

    @classmethod
    def read(cls, session_id: int, view: models.ViewModel = None) -> models.Tournament | models.ViewModel:
        session = Manager.get(models.Session).read(session_id)
        tournament = models.Tournament(session)

        if view is not None:
            return cls._convert_view(tournament, view)
        return tournament

    @classmethod
    def query(cls, _query: models.Tournament.Query, view: models.ViewModel = None) -> list[models.ViewModel]:
        q = models.Session.query.filter_by(tournament = True)

        if _query.session_id:
            q = q.filter_by(id = _query.session_id)
        if _query.player_id:
            session_data = Manager.get(models.SessionData).query(models.SessionData.Query(player_id=_query.player_id))
            q = q.filter(models.Session.id.in_([x.session_id for x in session_data]))
        if _query.start_date:
            q = q.filter(models.Session.date >= _query.start_date)
        if _query.end_date:
            q = q.filter(models.Session.date <= _query.end_date)
        tournaments = [models.Tournament(x) for x in q.all()]

        if view is not None:
            return [cls._convert_view(x, view, query=_query) for x in tournaments]
        return tournaments
