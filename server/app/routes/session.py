from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionManager
from app.models.db import Session
from app.models.query import SessionQuery
from app.models.view import SessionView, SessionDetailView

api = Namespace('sessions', 'Sessions Description')
session_view = SessionView.model(api)
session_detail_view = SessionDetailView.model(api)


@api.route('/')
class SessionListRoutes(Resource):
    @api.expect(SessionQuery.parser)
    @api.marshal_list_with(session_view)
    def get(self):
        return SessionManager.query(SessionQuery.parse(), as_view=SessionView)
    
    @api.expect(session_view)
    @api.marshal_with(session_view)
    def post(self):
        session = Session(**api.payload)
        return SessionManager.create(session, as_view=SessionView)
    

@api.route('/<int:id>')
class SessionRoutes(Resource):
    @api.marshal_with(session_view)
    def get(self, id):
        try:
            return SessionManager.read(id, as_view=SessionView)
        except NoResultFound:
            abort(404)
    
    @api.expect(session_view, validate=True)
    @api.marshal_with(session_view)
    def put(self, id):
        session = Session(**api.payload)
        try:
            return SessionManager.update(id, session, as_view=SessionView)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(session_view)
    def delete(self, id):
        try:
            return SessionManager.delete(id, as_view=SessionView)
        except NoResultFound:
            abort(404)
    

@api.route('/details')
class SessionDetailListRoutes(Resource):
    @api.expect(SessionQuery.parser)
    @api.marshal_list_with(session_detail_view)
    def get(self):
        query = SessionQuery.parse()
        return SessionManager.query(query, as_view=SessionDetailView)


@api.route('/<int:id>/details')
class SessionDetailRoutes(Resource):
    @api.marshal_with(session_detail_view)
    def get(self, id):
        try:
            return SessionManager.read(id, as_view=SessionDetailView)
        except NoResultFound:
            abort(404)
