from flask import abort
from flask_restx import Namespace, Resource
from sqlalchemy.exc import NoResultFound

from app.managers import SessionManager
import app.models as models

api = Namespace('sessions', 'Sessions Description')
session_view = models.Session.View.model(api)
session_detail_view = models.Session.DetailView.model(api)


@api.route('/')
class SessionListRoutes(Resource):
    @api.expect(models.Session.Query.parser)
    @api.marshal_list_with(session_view)
    def get(self):
        return SessionManager.query(models.Session.Query.parse(), as_view=models.Session.View)
    
    @api.expect(session_view)
    @api.marshal_with(session_view)
    def post(self):
        session = models.Session(**api.payload)
        return SessionManager.create(session, as_view=models.Session.View)
    

@api.route('/<int:id>')
class SessionRoutes(Resource):
    @api.marshal_with(session_view)
    def get(self, id):
        try:
            return SessionManager.read(id, as_view=models.Session.View)
        except NoResultFound:
            abort(404)
    
    @api.expect(session_view, validate=True)
    @api.marshal_with(session_view)
    def put(self, id):
        session = models.Session(**api.payload)
        try:
            return SessionManager.update(id, session, as_view=models.Session.View)
        except NoResultFound:
            abort(404)
    
    @api.marshal_with(session_view)
    def delete(self, id):
        try:
            return SessionManager.delete(id, as_view=models.Session.View)
        except NoResultFound:
            abort(404)
    

@api.route('/details')
class SessionDetailListRoutes(Resource):
    @api.expect(models.Session.Query.parser)
    @api.marshal_list_with(session_detail_view)
    def get(self):
        query = models.Session.Query.parse()
        return SessionManager.query(query, as_view=models.Session.DetailView)


@api.route('/<int:id>/details')
class SessionDetailRoutes(Resource):
    @api.marshal_with(session_detail_view)
    def get(self, id):
        try:
            return SessionManager.read(id, as_view=models.Session.DetailView)
        except NoResultFound:
            abort(404)
