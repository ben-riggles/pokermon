from __future__ import annotations
from abc import ABC

from app.models.db import DBModel
from app.models.query import QueryModel
from app.models.view import ViewModel


class Manager(ABC):
    __subclasses = {}
    model: ViewModel = None
    view_dict = {}

    def __init_subclass__(cls) -> None:
        if cls.__name__ == 'DBModelManager':
            return
        if cls.model is None:
            raise TypeError(f'Model type must be specified for manager {cls.__name__}')
        DBModelManager.__subclasses[cls.model] = cls
        return super().__init_subclass__()

    @staticmethod
    def get(model_type: DBModel | ViewModel) -> Manager:
        return Manager.__subclasses[model_type]
    

class DBModelManager(Manager, ABC):
    model: DBModel = None

    @classmethod
    def _convert_view(cls, model: DBModel, view: ViewModel, query: QueryModel = None) -> ViewModel:
        try:
            func = cls.view_dict[view]
        except KeyError:
            raise TypeError(f'No converter for view type {view}')
        return func(model, query)

    @classmethod
    def create(cls, model: DBModel, as_view: ViewModel = None) -> DBModel | ViewModel:
        if (type(model) != cls.model):
            raise TypeError(f'Model type {type(model)} must match manager model type {cls.model}')
        
        model = model.create()
        if as_view is not None:
            return cls._convert_view(model, as_view)
        return model

    @classmethod
    def read(cls, id: int, as_view: ViewModel = None) -> DBModel:
        model = cls.model.query.filter_by(id = id).one()
        if as_view is not None:
            return cls._convert_view(model, as_view)
        return model
    
    @classmethod
    def update(cls, id: int, model: DBModel, as_view: ViewModel = None) -> DBModel:
        if (type(model) != cls.model):
            raise TypeError(f'Model type {type(model)} must match manager model type {cls.model}')
        
        model = cls.read(id).update(model)
        if as_view is not None:
            return cls._convert_view(model, as_view)
        return model
    
    @classmethod
    def delete(cls, id: int, as_view: ViewModel = None) -> DBModel:
        model = cls.read(id).delete()
        if as_view is not None:
            return cls._convert_view(model, as_view)
        return model
