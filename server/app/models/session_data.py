from app.extensions import db
from app.models import BaseModel


class SessionData(BaseModel):
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'))
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'))

    cash_net = db.Column(db.Numeric(scale=2))
    tournament_net = db.Column(db.Numeric(scale=2))
    tournament_placement = db.Column(db.Integer)
    other_net = db.Column(db.Numeric(scale=2))
    six_nine = db.Column(db.Numeric)
    quads = db.Column(db.Numeric)

    def __repr__(self):
        return f'SessionData ({self.player_id}, {self.session_id})'
