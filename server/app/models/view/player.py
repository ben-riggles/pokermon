from dataclasses import dataclass, field
from decimal import Decimal

from app.managers import SessionDataManager
from app.models.db import Player
from app.models.query import PlayerQuery, SessionDataQuery
from app.models.view import ViewModel


@dataclass
class PlayerView(ViewModel):
    id: int
    first_name: str
    last_name: str
    sprite: str

    def __init__(self, player: Player):
        self.id = player.id
        self.first_name = player.first_name
        self.last_name = player.last_name
        self.sprite = player.sprite


@dataclass
class PlayerDetailView(PlayerView):
    full_name: str
    total_net: Decimal
    cash_net: Decimal
    tournament_net: Decimal
    other_net: Decimal
    six_nine: int
    quads: int
    straight_flush: int

    def __init__(self, player: Player, query: PlayerQuery = None):
        super().__init__(player)
        self.full_name = f'{player.first_name} {player.last_name}'

        q = SessionDataQuery(player_id = player.id)
        if query is not None:
            q.start_date = query.start_date
            q.end_date = query.end_date
        data = SessionDataManager.query(q)
        
        self.cash_net = sum(x.cash_net for x in data if x.cash_net is not None)
        self.tournament_net = sum(x.tournament_net for x in data if x.tournament_net is not None)
        self.other_net = sum(x.other_net for x in data if x.other_net is not None)
        self.six_nine = sum(x.six_nine for x in data)
        self.quads = sum(x.quads for x in data)
        self.straight_flush = sum(x.straight_flush for x in data)
        self.total_net = sum([self.cash_net, self.tournament_net, self.other_net])
