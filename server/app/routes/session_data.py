from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionDataManager
import app.models as models

api = Namespace('session_data', 'Session Data Description')
session_data_view = models.SessionData.View.model(api)


@api.route('/')
class SessionDataListRoutes(Resource):
    @api.expect(models.SessionData.Query.parser)
    @api.marshal_list_with(session_data_view)
    def get(self):
        return SessionDataManager.query(models.SessionData.Query.parse(), as_view=models.SessionData.View)
    
    @api.expect(session_data_view)
    @api.marshal_with(session_data_view)
    def post(self):
        data = models.SessionData(**api.payload)
        return SessionDataManager.create(data, as_view=models.SessionData.View)
    

@api.route('/<int:id>')
class SessionDataRoutes(Resource):
    @api.marshal_with(session_data_view)
    def get(self, id):
        try:
            return SessionDataManager.read(id, as_view=models.SessionData.View)
        except NoResultFound:
            abort(404)
    
    @api.expect(session_data_view, validate=True)
    @api.marshal_with(session_data_view)
    def put(self, id):
        data = models.SessionData(**api.payload)
        try:
            return SessionDataManager.update(id, data, as_view=models.SessionData.View)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(session_data_view)
    def delete(self, id):
        try:
            return SessionDataManager.delete(id, as_view=models.SessionData.View)
        except NoResultFound:
            abort(404)
