from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import TournamentManager
from app.models.query import TournamentQuery
from app.models.view import TournamentView

api = Namespace('tournaments', 'Tournaments Description')
session_view = TournamentView.model(api)


@api.route('/')
class TournamentListRoutes(Resource):
    @api.expect(TournamentQuery.parser)
    @api.marshal_list_with(session_view)
    def get(self):
        return TournamentManager.query(TournamentQuery.parse(), as_view=TournamentView)
