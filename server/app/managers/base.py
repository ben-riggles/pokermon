from __future__ import annotations
from abc import ABC

import app.models as models


class Manager(ABC):
    __subclasses = {}
    model: models.ViewModel = None
    view_dict = {}

    def __init_subclass__(cls) -> None:
        if cls.__name__ in ['DBModelManager']:
            return
        if cls.model is None:
            raise TypeError(f'Model type must be specified for manager {cls.__name__}')
        DBModelManager.__subclasses[cls.model] = cls
        return super().__init_subclass__()

    @staticmethod
    def get(model_type: models.DBModel | models.ViewModel) -> Manager:
        return Manager.__subclasses[model_type]
    
    @classmethod
    def _convert_view(cls, model: models.DBModel, view: models.ViewModel, query: models.QueryModel = None) -> models.ViewModel:
        try:
            func = cls.view_dict[view]
        except KeyError:
            raise TypeError(f'No converter for view type {view}')
        return func(model, query)
    

class DBModelManager(Manager, ABC):
    model: models.DBModel = None

    @classmethod
    def create(cls, model: models.DBModel, view: models.ViewModel = None) -> models.DBModel | models.ViewModel:
        if (type(model) != cls.model):
            raise TypeError(f'Model type {type(model)} must match manager model type {cls.model}')
        
        model = model.create()
        if view is not None:
            return cls._convert_view(model, view)
        return model

    @classmethod
    def read(cls, id: int, view: models.ViewModel = None) -> models.DBModel:
        model = cls.model.query.filter_by(id = id).one()
        if view is not None:
            return cls._convert_view(model, view)
        return model
    
    @classmethod
    def update(cls, id: int, model: models.DBModel, view: models.ViewModel = None) -> models.DBModel:
        if (type(model) != cls.model):
            raise TypeError(f'Model type {type(model)} must match manager model type {cls.model}')
        
        model = cls.read(id).update(model)
        if view is not None:
            return cls._convert_view(model, view)
        return model
    
    @classmethod
    def delete(cls, id: int, view: models.ViewModel = None) -> models.DBModel:
        model = cls.read(id).delete()
        if view is not None:
            return cls._convert_view(model, view)
        return model
