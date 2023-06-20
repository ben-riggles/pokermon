from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime

from app.extensions import db
from app.models import DBModel, QueryModel, ViewModel


class Session(DBModel):
    date = db.Column(db.Date)
    other_game = db.Column(db.String(100))
    tournament = db.Column(db.Boolean, nullable=False, default=True)

    def __repr__(self):
        return f'Session ({self.date})'
    
    def serialize(self) -> str:
        return f'{{id: {self.id}, date: {self.date}}}'
    

    @dataclass(kw_only=True)
    class Query(QueryModel):
        id: int = None
        date: datetime = None
        player_id: int = None
        start_date: datetime = None
        end_date: datetime = None
        tournament: bool = None

    @dataclass
    class View(ViewModel):
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
    class DetailView(View):
        num_players: int
        num_tournament_players: int
