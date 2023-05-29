from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionDataManager
from app.models.db import SessionData
from app.models.query import SessionDataQuery
from app.models.view import SessionDataView

api = Namespace('session_data', 'Session Data Description')
session_data_view = SessionDataView.model(api)


@api.route('/')
class SessionDataListRoutes(Resource):
    @api.expect(SessionDataQuery.parser)
    @api.marshal_list_with(session_data_view)
    def get(self):
        data = SessionDataManager.query(SessionDataQuery.parse())
        return [SessionDataView(x).serialize() for x in data]
    
    @api.expect(session_data_view)
    @api.marshal_with(session_data_view)
    def post(self):
        data = SessionData(**api.payload)
        data = SessionDataManager.create(data)
        return SessionDataView(data).serialize()
    

@api.route('/<int:id>')
class SessionDataRoutes(Resource):
    @api.marshal_with(session_data_view)
    def get(self, id):
        try:
            data = SessionDataManager.read(id)
        except NoResultFound:
            abort(404)
        return SessionDataView(data).serialize()
    
    @api.expect(session_data_view, validate=True)
    @api.marshal_with(session_data_view)
    def put(self, id):
        data = SessionData(**api.payload)
        data = SessionDataManager.update(id, data)
        return SessionDataView(data).serialize()
    
    @api.marshal_with(session_data_view)
    def delete(self, id):
        try:
            data = SessionDataManager.delete(id)
        except NoResultFound:
            abort(404)
        return SessionDataView(data).serialize()
