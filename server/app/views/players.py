from flask import Blueprint

bp = Blueprint('players', __name__)


@bp.route('/')
def player_list():
    return 'Player List'