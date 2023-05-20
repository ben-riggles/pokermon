from app.models import Player


class PlayerManager:
    def query() -> list[Player]:
        return Player.query.all()
