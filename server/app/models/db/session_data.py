from app.extensions import db
from app.models.db import DBModel


class SessionData(DBModel):
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'))
    player = db.relationship('Player', backref=db.backref('session_data', lazy='dynamic'))

    session_id = db.Column(db.Integer, db.ForeignKey('session.id'))
    session = db.relationship('Session', backref=db.backref('session_data', lazy='dynamic'))

    cash_net = db.Column(db.Numeric(scale=2))
    tournament_net = db.Column(db.Numeric(scale=2))
    tournament_placement = db.Column(db.Integer)
    other_net = db.Column(db.Numeric(scale=2))
    six_nine = db.Column(db.Numeric, nullable=False, default=0)
    quads = db.Column(db.Numeric, nullable=False, default=0)

    def __repr__(self):
        return f'SessionData ({self.player_id}, {self.session_id})'
