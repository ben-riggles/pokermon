from sqlalchemy.orm import validates

from app.common.pokemon import random_pokemon, validate_pokemon
from app.extensions import db
import app.models as models


class Player(models.DBModel):
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
