from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import TournamentManager
import app.models as models

api = Namespace('tournaments', 'Tournaments Description')
session_view = models.Tournament.View.model(api)


@api.route('/')
class TournamentListRoutes(Resource):
    @api.expect(models.Tournament.Query.parser)
    @api.marshal_list_with(session_view)
    def get(self):
        return TournamentManager.query(models.Tournament.Query.parse(), as_view=models.Tournament.View)
