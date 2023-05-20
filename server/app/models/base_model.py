from datetime import datetime

from app.extensions import db


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    modified = db.Column(db.DateTime, default=datetime.now)
