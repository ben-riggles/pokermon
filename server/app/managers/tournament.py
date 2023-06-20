from app.managers import Manager
from app.models.db import Session, SessionData
from app.models.query import TournamentQuery, SessionDataQuery
from app.models.view import ViewModel, TournamentView


def gather_tournament_data(session_data: SessionData) -> TournamentView:
    pass


class TournamentManager(Manager):
    model = TournamentView
    view_dict = {
        TournamentView: gather_tournament_data
    }

    @staticmethod
    def gather_tournament_data(session: Session) -> TournamentView:
        data = session.session_data.filter(SessionData.tournament_placement != None).all()
        if not data:
            return object()
        
        ordered_data = sorted(data, key=lambda x: x.tournament_placement)
        buy_in = abs(min(x.tournament_net for x in ordered_data))
        prizes = [x.tournament_net + buy_in for x in ordered_data]
        prizes = [x for x in prizes if x != 0]
        
        return TournamentView(
            session_id = session.id,
            date = session.date,
            buy_in = buy_in,
            num_players = len(data),
            placements = [x.player_id for x in ordered_data],
            num_paid = len(prizes),
            prizes = prizes,
        )

    @classmethod
    def query(cls, _query: TournamentQuery, as_view: ViewModel = None) -> list[ViewModel]:
        q = Session.query.filter_by(tournament = True)

        if _query.session_id:
            q = q.filter_by(id = _query.session_id)
        if _query.player_id:
            session_data = Manager.get(SessionData).query(SessionDataQuery(player_id=_query.player_id))
            q = q.filter(Session.id.in_([x.session_id for x in session_data]))
        if _query.start_date:
            q = q.filter(Session.date >= _query.start_date)
        if _query.end_date:
            q = q.filter(Session.date <= _query.end_date)
        sessions = q.all()

        return [cls.gather_tournament_data(x) for x in sessions]

        if as_view is not None:
            return [cls._convert_view(x, as_view, _query) for x in sessions]
        return sessions
