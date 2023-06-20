from dataclasses import dataclass
from datetime import datetime

from app.models.query import TournamentQuery
from app.models.view import ViewModel


@dataclass
class TournamentView(ViewModel):
    session_id: int
    date: datetime
    buy_in: int

    num_players: int
    placements: list[int]

    num_paid: int
    prizes: list[int]
