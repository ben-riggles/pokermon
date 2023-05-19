from app.extensions import db
from app.models import BaseModel


class Player(BaseModel):
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    data = db.relationship('SessionData', backref='player')

    def __repr__(self):
        return f'Player ({self.first_name} {self.last_name})'
