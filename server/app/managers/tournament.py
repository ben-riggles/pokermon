from app.managers import Manager
import app.models as models


def gather_tournament_data(session_data: models.SessionData) -> models.TournamentView:
    pass


class TournamentManager(Manager):
    model = models.TournamentView
    view_dict = {
        models.TournamentView: gather_tournament_data
    }

    @staticmethod
    def gather_tournament_data(session: models.Session) -> models.TournamentView:
        data = session.session_data.filter(models.SessionData.tournament_placement != None).all()
        if not data:
            return object()
        
        ordered_data = sorted(data, key=lambda x: x.tournament_placement)
        buy_in = abs(min(x.tournament_net for x in ordered_data))
        prizes = [x.tournament_net + buy_in for x in ordered_data]
        prizes = [x for x in prizes if x != 0]
        
        return models.TournamentView(
            session_id = session.id,
            date = session.date,
            buy_in = buy_in,
            num_players = len(data),
            placements = [x.player_id for x in ordered_data],
            num_paid = len(prizes),
            prizes = prizes,
        )

    @classmethod
    def query(cls, _query: models.TournamentQuery, as_view: models.ViewModel = None) -> list[models.ViewModel]:
        q = models.Session.query.filter_by(tournament = True)

        if _query.session_id:
            q = q.filter_by(id = _query.session_id)
        if _query.player_id:
            session_data = Manager.get(models.SessionData).query(models.SessionDataQuery(player_id=_query.player_id))
            q = q.filter(models.Session.id.in_([x.session_id for x in session_data]))
        if _query.start_date:
            q = q.filter(models.Session.date >= _query.start_date)
        if _query.end_date:
            q = q.filter(models.Session.date <= _query.end_date)
        sessions = q.all()

        return [cls.gather_tournament_data(x) for x in sessions]

        if as_view is not None:
            return [cls._convert_view(x, as_view, _query) for x in sessions]
        return sessions
