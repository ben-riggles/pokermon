from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

from sqlalchemy.orm import validates

from app.common.pokemon import random_pokemon, validate_pokemon
from app.extensions import db
from app.models import DBModel, QueryModel, ViewModel


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

    @dataclass
    class View(ViewModel):
        id: int
        first_name: str
        last_name: str
        sprite: str

        def __init__(self, player: Player):
            self.id = player.id
            self.first_name = player.first_name
            self.last_name = player.last_name
            self.sprite = player.sprite

    @dataclass(init=False)
    class DetailView(View):
        full_name: str
        total_net: Decimal
        cash_net: Decimal
        tournament_net: Decimal
        other_net: Decimal
        six_nine: int
        quads: int
        straight_flush: int
