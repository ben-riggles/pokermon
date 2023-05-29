from __future__ import annotations
from abc import ABC, abstractmethod
from functools import lru_cache
from importlib import import_module
from pathlib import Path
from typing import Type

from app.extensions import db
from app.models.db import DBModel


class Manager(ABC):
    __subclasses = {}
    model: DBModel = None

    def __init_subclass__(cls) -> None:
        if cls.model is None:
            raise TypeError(f'Model type must be specified for manager {cls.__name__}')
        Manager.__subclasses[cls.model] = cls
        return super().__init_subclass__()

    @staticmethod
    def get(model_type: DBModel) -> Manager:
        return Manager.__subclasses[model_type]

    @classmethod
    def create(cls, model: DBModel) -> DBModel:
        if (type(model) != cls.model):
            raise TypeError(f'Model type {type(model)} must match manager model type {cls.model}')
        return model.create()

    @classmethod
    def read(cls, id: int) -> DBModel:
        return cls.model.query.filter_by(id = id).one()
    
    @classmethod
    def update(cls, id: int, model: DBModel) -> DBModel:
        if (type(model) != cls.model):
            raise TypeError(f'Model type {type(model)} must match manager model type {cls.model}')
        existing = cls.read(id)
        return existing.update(model)
    
    @classmethod
    def delete(cls, id: int) -> DBModel:
        model = cls.read(id)
        return model.delete()