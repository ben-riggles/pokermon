from app.extensions import db
from app.models.db import DBModel


class Session(DBModel):
    date = db.Column(db.Date)
    other_game = db.Column(db.String(100))
    tournament = db.Column(db.Boolean, nullable=False, default=True)

    def __repr__(self):
        return f'Session ({self.date})'
    
    def serialize(self) -> str:
        return f'{{id: {self.id}, date: {self.date}}}'
