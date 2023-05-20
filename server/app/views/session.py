from flask_restx import Namespace, Resource

from app.managers import SessionManager

api = Namespace('sessions', 'Sessions Description')


@api.route('/')
class SessionList(Resource):
    @api.doc('list sessions')
    def get(self):
        sessions = SessionManager.query()
        return [x.serialize() for x in sessions]