from dataclasses import dataclass
from datetime import datetime

from app.models.query import QueryModel


@dataclass(kw_only=True)
class SessionDataQuery(QueryModel):
    id: int = None
    player_id: int = None
    session_id: int = None
    start_date: datetime = None
    end_date: datetime = None
