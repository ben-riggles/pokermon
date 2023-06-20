from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

from app.extensions import db
from app.models import DBModel, QueryModel, ViewModel


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

    @dataclass
    class View(ViewModel):
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

        def __init__(self, session_data: SessionData):
            self.id = session_data.id
            self.player_id = session_data.player_id
            self.session_id = session_data.session_id
            self.cash_net = session_data.cash_net
            self.tournament_net = session_data.tournament_net
            self.tournament_placement = session_data.tournament_placement
            self.other_net = session_data.other_net
            self.six_nine = session_data.six_nine
            self.quads = session_data.quads
            self.straight_flush = session_data.straight_flush
