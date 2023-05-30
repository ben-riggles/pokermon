from dataclasses import dataclass
from datetime import datetime
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

@dataclass
class SessionDataPlayerSummary(ViewModel):
    session_id: int
    date: datetime
    other_game: str

    cash_net: Decimal
    tournament_net: Decimal
    tournament_placement: int
    other_net: Decimal
    six_nine: int
    quads: int

    def __init__(self, session_data: SessionData):
        self.session_id = session_data.session_id
        self.date = session_data.session.date
        self.other_game = session_data.session.other_game

        self.cash_net = session_data.cash_net
        self.tournament_net = session_data.tournament_net
        self.tournament_placement = session_data.tournament_placement
        self.other_net = session_data.other_net
        self.six_nine = session_data.six_nine
        self.quads = session_data.quads

@dataclass
class SessionDataSessionSummary(ViewModel):
    player_id: int
    first_name: str
    last_name: str
    full_name: str

    cash_net: Decimal
    tournament_net: Decimal
    tournament_placement: int
    other_net: Decimal
    six_nine: int
    quads: int

    def __init__(self, session_data: SessionData):
        self.player_id = session_data.player_id
        self.first_name = session_data.player.first_name
        self.last_name = session_data.player.last_name
        self.full_name = f'{self.first_name} {self.last_name}'

        self.cash_net = session_data.cash_net
        self.tournament_net = session_data.tournament_net
        self.tournament_placement = session_data.tournament_placement
        self.other_net = session_data.other_net
        self.six_nine = session_data.six_nine
        self.quads = session_data.quads
