from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionDataManager
from app.models import SessionData

api = Namespace('session_data', 'Session Data Description')
session_data_view = SessionData.View.model(api)


@api.route('/')
class SessionDataListRoutes(Resource):
    @api.expect(SessionData.Query.parser)
    @api.marshal_list_with(session_data_view)
    def get(self):
        return SessionDataManager.query(SessionData.Query.parse(), view=SessionData.View)
    
    @api.expect(session_data_view)
    @api.marshal_with(session_data_view)
    def post(self):
        data = SessionData(**api.payload)
        return SessionDataManager.create(data, view=SessionData.View)
    

@api.route('/<int:id>')
class SessionDataRoutes(Resource):
    @api.marshal_with(session_data_view)
    def get(self, id):
        try:
            return SessionDataManager.read(id, view=SessionData.View)
        except NoResultFound:
            abort(404)
    
    @api.expect(session_data_view, validate=True)
    @api.marshal_with(session_data_view)
    def put(self, id):
        data = SessionData(**api.payload)
        try:
            return SessionDataManager.update(id, data, view=SessionData.View)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(session_data_view)
    def delete(self, id):
        try:
            return SessionDataManager.delete(id, view=SessionData.View)
        except NoResultFound:
            abort(404)
