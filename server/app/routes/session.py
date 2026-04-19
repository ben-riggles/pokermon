from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionManager
from app.models import Session

api = Namespace('sessions', 'Sessions Description')
session_view = Session.View.model(api)
session_detail_view = Session.DetailView.model(api)


@api.route('/')
class SessionListRoutes(Resource):
    @api.expect(Session.Query.parser)
    @api.marshal_list_with(session_view)
    def get(self):
        return SessionManager.query(Session.Query.parse(), view=Session.View)
    
    @api.expect(session_view)
    @api.marshal_with(session_view)
    def post(self):
        session = Session(**api.payload)
        return SessionManager.create(session, view=Session.View)
    

@api.route('/<int:id>')
class SessionRoutes(Resource):
    @api.marshal_with(session_view)
    def get(self, id):
        try:
            return SessionManager.read(id, view=Session.View)
        except NoResultFound:
            abort(404)
    
    @api.expect(session_view, validate=True)
    @api.marshal_with(session_view)
    def put(self, id):
        session = Session(**api.payload)
        try:
            return SessionManager.update(id, session, view=Session.View)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(session_view)
    def delete(self, id):
        try:
            return SessionManager.delete(id, view=Session.View)
        except NoResultFound:
            abort(404)
    

@api.route('/details')
class SessionDetailListRoutes(Resource):
    @api.expect(Session.Query.parser)
    @api.marshal_list_with(session_detail_view)
    def get(self):
        query = Session.Query.parse()
        return SessionManager.query(query, view=Session.DetailView)


@api.route('/<int:id>/details')
class SessionDetailRoutes(Resource):
    @api.marshal_with(session_detail_view)
    def get(self, id):
        try:
            return SessionManager.read(id, view=Session.DetailView)
        except NoResultFound:
            abort(404)
