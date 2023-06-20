from dataclasses import dataclass
from datetime import datetime

from app.models.db import Session
from app.models.view import ViewModel


@dataclass
class SessionView(ViewModel):
    id: int
    date: datetime
    other_game: str
    tournament: bool

    def __init__(self, session: Session):
        self.id = session.id
        self.date = session.date
        self.other_game = session.other_game
        self.tournament = session.tournament


@dataclass(init=False)
class SessionDetailView(SessionView):
    num_players: int
    num_tournament_players: int
