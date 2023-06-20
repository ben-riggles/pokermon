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
        print(data)
        ordered_data = sorted(data, key=lambda x: x.tournament_placement)
        if not data:
            return object()
        
        return TournamentView(
            session_id = session.id,
            date = session.date,
            buy_in = 10,
            num_players = len(data),
            placements = [x.player_id for x in ordered_data],
            num_paid = 3,
            prizes = [ordered_data[i].tournament_net + 10 for i in range(3)],
        )

    @classmethod
    def query(cls, _query: TournamentQuery, as_view: ViewModel = None) -> list[ViewModel]:
        q = Session.query

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
            return [cls.__convert_view(x, as_view, _query) for x in sessions]
        return sessions
