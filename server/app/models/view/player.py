from dataclasses import dataclass
from decimal import Decimal

import app.models as models


@dataclass
class PlayerView(models.ViewModel):
    id: int
    first_name: str
    last_name: str
    sprite: str

    def __init__(self, player: models.Player):
        self.id = player.id
        self.first_name = player.first_name
        self.last_name = player.last_name
        self.sprite = player.sprite


@dataclass(init=False)
class PlayerDetailView(PlayerView):
    full_name: str
    total_net: Decimal
    cash_net: Decimal
    tournament_net: Decimal
    other_net: Decimal
    six_nine: int
    quads: int
    straight_flush: int
