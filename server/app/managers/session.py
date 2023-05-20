from app.models import Session


class SessionManager:
    def query() -> list[Session]:
        return Session.query.all()
