from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import PlayerManager
from app.models import Player

api = Namespace('players', 'Players Description')
player_view = Player.View.model(api)
player_detail_view = Player.DetailView.model(api)


@api.route('/')
class PlayerListRoutes(Resource):
    @api.expect(Player.Query.parser)
    @api.marshal_list_with(player_view)
    def get(self):
        return PlayerManager.query(Player.Query.parse(), view=Player.View)
    
    @api.expect(player_view)
    @api.marshal_with(player_view)
    def post(self):
        player = Player(**api.payload)
        return PlayerManager.create(player, view=Player.View)
    

@api.route('/<int:id>')
class PlayerRoutes(Resource):
    @api.marshal_with(player_view)
    def get(self, id):
        try:
            return PlayerManager.read(id, view=Player.View)
        except NoResultFound:
            abort(404)
    
    @api.expect(player_view, validate=True)
    @api.marshal_with(player_view)
    def put(self, id):
        player = Player(**api.payload)
        try:
            return PlayerManager.update(id, player, view=Player.View)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(player_view)
    def delete(self, id):
        try:
            return PlayerManager.delete(id, view=Player.View)
        except NoResultFound:
            abort(404)
    

@api.route('/details')
class PlayerDetailListRoutes(Resource):
    @api.expect(Player.Query.parser)
    @api.marshal_list_with(player_detail_view)
    def get(self):
        query = Player.Query.parse()
        return PlayerManager.query(query, view=Player.DetailView)


@api.route('/<int:id>/details')
class PlayerDetailRoutes(Resource):
    @api.marshal_with(player_detail_view)
    def get(self, id):
        try:
            return PlayerManager.read(id, view=Player.DetailView)
        except NoResultFound:
            abort(404)