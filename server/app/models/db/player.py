from app.extensions import db
from app.models.db import DBModel


class Player(DBModel):
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))

    def __repr__(self):
        return f'Player ({self.first_name} {self.last_name})'
