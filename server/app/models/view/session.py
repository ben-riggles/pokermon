from dataclasses import dataclass
from datetime import datetime

from app.models.db import Session
from app.models.view import ViewModel


@dataclass
class SessionView(ViewModel):
    id: int
    date: datetime
    other_game: str

    def __init__(self, session: Session):
        self.id = session.id
        self.date = session.date
        self.other_game = session.other_game
