from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

from app.extensions import db
from app.models import DBModel, QueryModel, DirectView


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
    straight_flush = db.Column(db.Numeric, nullable=False, default=0)

    def __repr__(self):
        return f'SessionData ({self.player_id}, {self.session_id})'
    

    @dataclass(kw_only=True)
    class Query(QueryModel):
        id: int = None
        player_id: int = None
        session_id: int = None
        start_date: datetime = None
        end_date: datetime = None

    @dataclass(init=False)
    class View(DirectView):
        view_name = 'SessionData'

        id: int
        player_id: int
        session_id: int
        cash_net: Decimal
        tournament_net: Decimal
        tournament_placement: int
        other_net: Decimal
        six_nine: int
        quads: int
        straight_flush: int
