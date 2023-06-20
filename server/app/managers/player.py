from app.managers import Manager, DBModelManager
import app.models as models


def convert_player_view(player: models.Player, _) -> models.PlayerView:
    return models.PlayerView(player)

def convert_player_detail_view(player: models.Player, query: models.PlayerQuery = None) -> models.PlayerDetailView:
    view = models.PlayerDetailView(player)
    view.full_name = f'{player.first_name} {player.last_name}'

    data_query = models.SessionDataQuery(player_id = player.id)
    if query is not None:
        data_query.start_date = query.start_date
        data_query.end_date = query.end_date
    data: list[models.SessionData] = Manager.get(models.SessionData).query(data_query)
    
    view.cash_net = sum(x.cash_net for x in data if x.cash_net is not None)
    view.tournament_net = sum(x.tournament_net for x in data if x.tournament_net is not None)
    view.other_net = sum(x.other_net for x in data if x.other_net is not None)
    view.six_nine = sum(x.six_nine for x in data)
    view.quads = sum(x.quads for x in data)
    view.straight_flush = sum(x.straight_flush for x in data)
    view.total_net = sum([view.cash_net, view.tournament_net, view.other_net])
    return view


class PlayerManager(DBModelManager):
    model = models.Player
    view_dict = {
        models.PlayerView: convert_player_view,
        models.PlayerDetailView: convert_player_detail_view,
    }

    @classmethod
    def query(cls, query: models.PlayerQuery = None, as_view: models.ViewModel = None) -> list[models.Player | models.ViewModel]:
        q = models.Player.query

        if query.id:
            q = q.filter_by(id = query.id)
        if query.first_name:
            q = q.filter_by(first_name = query.first_name)
        if query.last_name:
            q = q.filter_by(last_name = query.last_name)
        if query.session_id:
            session_data = Manager.get(models.SessionData).query(models.SessionDataQuery(session_id=query.session_id))
            q = q.filter(models.Player.id.in_([x.player_id for x in session_data]))
        if query.start_date:
            session_data = Manager.get(models.SessionData).query(models.SessionDataQuery(start_date = query.start_date))
            q = q.filter(models.Player.id.in_({x.player_id for x in session_data}))
        if query.end_date:
            session_data = Manager.get(models.SessionData).query(models.SessionDataQuery(end_date = query.end_date))
            q = q.filter(models.Player.id.in_({x.player_id for x in session_data}))
        players = q.all()

        if as_view is not None:
            return [cls._convert_view(x, as_view, query) for x in players]
        return players
