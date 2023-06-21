from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

from sqlalchemy.orm import validates

from app.common.pokemon import random_pokemon, validate_pokemon
from app.extensions import db
from app.models import DBModel, QueryModel, ViewModel, DirectView


class Player(DBModel):
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    sprite = db.Column(db.String(20), default=lambda: random_pokemon(), nullable=False)

    def __repr__(self):
        return f'Player ({self.first_name} {self.last_name})'
    
    @validates('sprite')
    def validate_sprite(self, _, sprite):
        if not validate_pokemon(sprite):
            raise ValueError(f'Invalid pokemon name: {sprite}')
        return sprite.lower()
    
    
    @dataclass(kw_only=True)
    class Query(QueryModel):
        id: int = None
        first_name: str = None
        last_name: str = None
        session_id: int = None
        start_date: datetime = None
        end_date: datetime = None

    @dataclass(kw_only=True)
    class StatsQuery(QueryModel):
        start_date: datetime = None
        end_date: datetime = None

    @dataclass(init=False)
    class View(DirectView):
        view_name = 'Player'

        id: int
        first_name: str
        last_name: str
        sprite: str

    @dataclass(init=False)
    class DetailView(View):
        view_name = 'PlayerDetail'

        full_name: str
        attendance: float

        # General Stats
        total_net: Decimal
        cash_net: Decimal
        tournament_net: Decimal
        other_net: Decimal
        six_nine: int
        quads: int
        straight_flush: int

        # Tournament Stats
        tournament_placements: ViewModel['TournamentPlacements']
