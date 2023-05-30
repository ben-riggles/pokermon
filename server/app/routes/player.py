from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import PlayerManager
from app.models.db import Player
from app.models.query import PlayerQuery
from app.models.view import PlayerView, PlayerDetailView

api = Namespace('players', 'Players Description')
player_view = PlayerView.model(api)
player_detail_view = PlayerDetailView.model(api)


@api.route('/')
class PlayerListRoutes(Resource):
    @api.expect(PlayerQuery.parser)
    @api.marshal_list_with(player_view)
    def get(self):
        players = PlayerManager.query(PlayerQuery.parse())
        return [PlayerView(p).serialize() for p in players]
    
    @api.expect(player_view)
    @api.marshal_with(player_view)
    def post(self):
        player = Player(**api.payload)
        player = PlayerManager.create(player)
        return PlayerView(player).serialize()
    

@api.route('/<int:id>')
class PlayerRoutes(Resource):
    @api.marshal_with(player_view)
    def get(self, id):
        try:
            player = PlayerManager.read(id)
        except NoResultFound:
            abort(404)
        return PlayerView(player).serialize()
    
    @api.expect(player_view, validate=True)
    @api.marshal_with(player_view)
    def put(self, id):
        player = Player(**api.payload)
        player = PlayerManager.update(id, player)
        return PlayerView(player).serialize()
    
    @api.marshal_with(player_view)
    def delete(self, id):
        try:
            player = PlayerManager.delete(id)
        except NoResultFound:
            abort(404)
        return PlayerView(player).serialize()
    

@api.route('/details')
class PlayerDetailListRoutes(Resource):
    @api.expect(PlayerQuery.parser)
    @api.marshal_list_with(player_detail_view)
    def get(self):
        query = PlayerQuery.parse()
        players = PlayerManager.query(query)
        return [PlayerDetailView(p, query=query).serialize() for p in players]


@api.route('/<int:id>/details')
class PlayerDetailRoutes(Resource):
    @api.marshal_with(player_detail_view)
    def get(self, id):
        try:
            player = PlayerManager.read(id)
        except NoResultFound:
            abort(404)
        return PlayerDetailView(player).serialize()