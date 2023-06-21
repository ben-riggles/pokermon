from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import TournamentManager
from app.models import Tournament

api = Namespace('tournaments', 'Tournaments Description')
tournament_view = Tournament.View.model(api)


@api.route('/')
class TournamentListRoutes(Resource):
    @api.expect(Tournament.Query.parser)
    @api.marshal_list_with(tournament_view)
    def get(self):
        return TournamentManager.query(Tournament.Query.parse(), view=Tournament.View)
    

@api.route('/<int:session_id>')
class TournamentRoutes(Resource):
    @api.marshal_with(tournament_view)
    def get(self, id):
        try:
            return TournamentManager.read(id, view=Tournament.View)
        except NoResultFound:
            abort(404)
