from dataclasses import dataclass
from datetime import datetime

import app.models as models


@dataclass(kw_only=True)
class TournamentQuery(models.QueryModel):
    id: int = None
    player_id: int = None
    session_id: int = None
    start_date: datetime = None
    end_date: datetime = None
