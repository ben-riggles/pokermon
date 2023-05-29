from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionManager
from app.models.db import Session
from app.models.query import SessionQuery
from app.models.view import SessionView

api = Namespace('sessions', 'Sessions Description')
session_view = SessionView.model(api)


@api.route('/')
class SessionListRoutes(Resource):
    @api.expect(SessionQuery.parser)
    @api.marshal_list_with(session_view)
    def get(self):
        sessions = SessionManager.query(SessionQuery.parse())
        return [SessionView(s).serialize() for s in sessions]
    
    @api.expect(session_view)
    @api.marshal_with(session_view)
    def post(self):
        session = Session(**api.payload)
        session = SessionManager.create(session)
        return SessionView(session).serialize()
    

@api.route('/<int:id>')
class SessionRoutes(Resource):
    @api.marshal_with(session_view)
    def get(self, id):
        try:
            session = SessionManager.read(id)
        except NoResultFound:
            abort(404)
        return SessionView(session).serialize()
    
    @api.expect(session_view, validate=True)
    @api.marshal_with(session_view)
    def put(self, id):
        session = Session(**api.payload)
        session = SessionManager.update(id, session)
        return SessionView(session).serialize()
    
    @api.marshal_with(session_view)
    def delete(self, id):
        try:
            session = SessionManager.delete(id)
        except NoResultFound:
            abort(404)
        return SessionView(session).serialize()
