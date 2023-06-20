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
        return PlayerManager.query(PlayerQuery.parse(), as_view=PlayerView)
    
    @api.expect(player_view)
    @api.marshal_with(player_view)
    def post(self):
        player = Player(**api.payload)
        return PlayerManager.create(player, as_view=PlayerView)
    

@api.route('/<int:id>')
class PlayerRoutes(Resource):
    @api.marshal_with(player_view)
    def get(self, id):
        try:
            return PlayerManager.read(id, as_view=PlayerView)
        except NoResultFound:
            abort(404)
    
    @api.expect(player_view, validate=True)
    @api.marshal_with(player_view)
    def put(self, id):
        player = Player(**api.payload)
        try:
            return PlayerManager.update(id, player, as_view=PlayerView)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(player_view)
    def delete(self, id):
        try:
            return PlayerManager.delete(id, as_view=PlayerView)
        except NoResultFound:
            abort(404)
    

@api.route('/details')
class PlayerDetailListRoutes(Resource):
    @api.expect(PlayerQuery.parser)
    @api.marshal_list_with(player_detail_view)
    def get(self):
        query = PlayerQuery.parse()
        return PlayerManager.query(query, as_view=PlayerDetailView)


@api.route('/<int:id>/details')
class PlayerDetailRoutes(Resource):
    @api.marshal_with(player_detail_view)
    def get(self, id):
        try:
            return PlayerManager.read(id, as_view=PlayerDetailView)
        except NoResultFound:
            abort(404)