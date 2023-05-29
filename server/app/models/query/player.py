from dataclasses import dataclass
from datetime import datetime

from app.models.query import QueryModel


@dataclass(kw_only=True)
class PlayerQuery(QueryModel):
    id: int = None
    first_name: str = None
    last_name: str = None
    session_id: int = None
    start_date: datetime = None
    end_date: datetime = None
