from app.extensions import db
from app.models import BaseModel


class Session(BaseModel):
    date = db.Column(db.Date)
    other_game = db.Column(db.String(100))

    def __repr__(self):
        return f'Session ({self.date})'
    
    def serialize(self) -> str:
        return f'{{id: {self.id}, date: {self.date}}}'
