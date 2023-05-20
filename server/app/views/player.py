from flask_restx import Namespace, Resource

from app.managers import PlayerManager

api = Namespace('players', 'Players Description')


@api.route('/')
class PlayerList(Resource):
    @api.doc('list players')
    def get(self):
        players = PlayerManager.query()
        return [x.serialize() for x in players]