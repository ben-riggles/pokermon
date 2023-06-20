from dataclasses import dataclass
from datetime import datetime

from app.models.query import QueryModel


@dataclass(kw_only=True)
class SessionQuery(QueryModel):
    id: int = None
    date: datetime = None
    player_id: int = None
    start_date: datetime = None
    end_date: datetime = None
    tournament: bool = None
