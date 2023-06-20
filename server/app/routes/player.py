from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import PlayerManager
import app.models as models

api = Namespace('players', 'Players Description')
player_view = models.Player.View.model(api)
player_detail_view = models.Player.DetailView.model(api)


@api.route('/')
class PlayerListRoutes(Resource):
    @api.expect(models.Player.Query.parser)
    @api.marshal_list_with(player_view)
    def get(self):
        return PlayerManager.query(models.Player.Query.parse(), as_view=models.Player.View)
    
    @api.expect(player_view)
    @api.marshal_with(player_view)
    def post(self):
        player = models.Player(**api.payload)
        return PlayerManager.create(player, as_view=models.Player.View)
    

@api.route('/<int:id>')
class PlayerRoutes(Resource):
    @api.marshal_with(player_view)
    def get(self, id):
        try:
            return PlayerManager.read(id, as_view=models.Player.View)
        except NoResultFound:
            abort(404)
    
    @api.expect(player_view, validate=True)
    @api.marshal_with(player_view)
    def put(self, id):
        player = models.Player(**api.payload)
        try:
            return PlayerManager.update(id, player, as_view=models.Player.View)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(player_view)
    def delete(self, id):
        try:
            return PlayerManager.delete(id, as_view=models.Player.View)
        except NoResultFound:
            abort(404)
    

@api.route('/details')
class PlayerDetailListRoutes(Resource):
    @api.expect(models.Player.Query.parser)
    @api.marshal_list_with(player_detail_view)
    def get(self):
        query = models.Player.Query.parse()
        return PlayerManager.query(query, as_view=models.Player.DetailView)


@api.route('/<int:id>/details')
class PlayerDetailRoutes(Resource):
    @api.marshal_with(player_detail_view)
    def get(self, id):
        try:
            return PlayerManager.read(id, as_view=models.Player.DetailView)
        except NoResultFound:
            abort(404)