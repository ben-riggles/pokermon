from app.models import Player, SessionData
import pandas as pd


class PlayerManager:
    def query() -> list[Player]:
        q = SessionData.query
        return Player.query.all()
