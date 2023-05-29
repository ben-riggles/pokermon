from __future__ import annotations
from datetime import datetime
import sqlalchemy

from app.extensions import db


class DBModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    modified = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    @classmethod
    @property
    def columns(cls) -> list[str]:
        return [
            prop.key for prop in sqlalchemy.orm.class_mapper(cls).iterate_properties
            if isinstance(prop, sqlalchemy.orm.ColumnProperty) and prop.key not in ['id', 'timestamp', 'modified']
        ]
    
    def create(self) -> DBModel:
        self.id = None
        self.timestamp = None
        db.session.add(self)
        db.session.commit()
        return self

    def update(self, other: DBModel) -> DBModel:
        if type(self) != type(other):
           raise TypeError('Update must receive a matching model type')
        for col in self.__class__.columns:
            setattr(self, col, getattr(other, col))
        db.session.merge(self)
        db.session.commit()
        return self
    
    def delete(self) -> DBModel:
        db.session.delete(self)
        db.session.commit()
        return self
