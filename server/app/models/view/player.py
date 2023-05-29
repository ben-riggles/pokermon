from dataclasses import dataclass

from app.models.db import Player
from app.models.view import ViewModel


@dataclass
class PlayerView(ViewModel):
    id: int
    first_name: str
    last_name: str

    def __init__(self, player: Player):
        self.id = player.id
        self.first_name = player.first_name
        self.last_name = player.last_name
