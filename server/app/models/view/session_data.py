from dataclasses import dataclass
from decimal import Decimal

from app.models.db import SessionData
from app.models.view import ViewModel


@dataclass
class SessionDataView(ViewModel):
    id: int
    player_id: int
    session_id: int
    cash_net: Decimal
    tournament_net: Decimal
    tournament_placement: int
    other_net: Decimal
    six_nine: int
    quads: int
    straight_flush: int

    def __init__(self, session_data: SessionData):
        self.id = session_data.id
        self.player_id = session_data.player_id
        self.session_id = session_data.session_id
        self.cash_net = session_data.cash_net
        self.tournament_net = session_data.tournament_net
        self.tournament_placement = session_data.tournament_placement
        self.other_net = session_data.other_net
        self.six_nine = session_data.six_nine
        self.quads = session_data.quads
        self.straight_flush = session_data.straight_flush
