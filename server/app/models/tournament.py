from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime

import app.models as models


@dataclass
class Tournament:
    session_id: int
    date: datetime
    buy_in: int
    num_players: int
    placements: list[int]
    num_paid: int
    prizes: list[int]

    def __init__(self, session: models.Session):
        data = session.session_data.filter(models.SessionData.tournament_placement != None).all()
        if not data:
            return object()
        
        ordered_data = sorted(data, key=lambda x: x.tournament_placement)
        buy_in = abs(min(x.tournament_net for x in ordered_data))
        prizes = [x.tournament_net + buy_in for x in ordered_data]
        prizes = [x for x in prizes if x != 0]
        
        self.session_id = session.id
        self.date = session.date
        self.buy_in = buy_in
        self.num_players = len(data)
        self.placements = [x.player_id for x in ordered_data]
        self.num_paid = len(prizes)
        self.prizes = prizes


    @dataclass(kw_only=True)
    class Query(models.QueryModel):
        id: int = None
        player_id: int = None
        session_id: int = None
        start_date: datetime = None
        end_date: datetime = None

    @dataclass
    class View(models.ViewModel):
        session_id: int
        date: datetime
        buy_in: int
        num_players: int
        placements: list[int]
        num_paid: int
        prizes: list[int]

        def __init__(self, tournament: Tournament):
            self.session_id = tournament.session_id
            self.date = tournament.date
            self.buy_in = tournament.buy_in
            self.num_players = tournament.num_players
            self.placements = tournament.placements
            self.num_paid = tournament.num_paid
            self.prizes = tournament.prizes