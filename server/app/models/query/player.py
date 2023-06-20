from dataclasses import dataclass
from datetime import datetime

import app.models as models


@dataclass(kw_only=True)
class PlayerQuery(models.QueryModel):
    id: int = None
    first_name: str = None
    last_name: str = None
    session_id: int = None
    start_date: datetime = None
    end_date: datetime = None
