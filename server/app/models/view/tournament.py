from dataclasses import dataclass
from datetime import datetime

import app.models as models


@dataclass
class TournamentView(models.ViewModel):
    session_id: int
    date: datetime
    buy_in: int

    num_players: int
    placements: list[int]

    num_paid: int
    prizes: list[int]
