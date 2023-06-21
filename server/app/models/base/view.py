from __future__ import annotations
from abc import ABC
from dataclasses import dataclass, fields as class_fields
from datetime import datetime
from decimal import Decimal
from flask_restx import Model, Namespace, fields
import re
from typing import Type


@dataclass
class ViewModel(ABC):
    __subclasses = {}
    view_name = None

    def __init_subclass__(cls) -> None:
        ViewModel.__subclasses[cls.view_name] = cls
        return super().__init_subclass__()

    @staticmethod
    def __get(name: str) -> ViewModel:
        return ViewModel.__subclasses[name]
    
    def __field_to_resttype(field_type: Type, api: Namespace) -> fields.Raw:
        if field_type in [int, 'int']:
            return fields.Integer(required=False)
        elif field_type in [float, 'float']:
            return fields.Float(reuiqred=False)
        elif field_type in [Decimal, 'Decimal']:
            return fields.Float(required=False)
        elif field_type in [str, 'str']:
            return fields.String(required=False)
        elif field_type in [bool, 'bool']:
            return fields.Boolean(required=False)
        elif field_type in [datetime, 'datetime']:
            return fields.Date(required=False)
        elif 'list' in field_type:
            nested_type = re.search(r"\[([A-Za-z_]+)\]", field_type).group(1)
            return fields.List(ViewModel.__field_to_resttype(nested_type, api), required=False)
        elif 'ViewModel' in field_type:
            nested_type = re.search(r"\[\'([A-Za-z_]+)\'\]", field_type).group(1)
            try:
                return fields.Nested(ViewModel.__get(nested_type).model(api), required=False)
            except KeyError:
                raise TypeError(f'Unknown nested view model: {nested_type}')
        else:
            raise TypeError(f'Unknown type found in ViewModel: {field_type}')

    @classmethod
    def model(cls, api: Namespace) -> Model:
        model_dict = {field.name: ViewModel.__field_to_resttype(field.type, api) for field in class_fields(cls)}
        view_name = cls.view_name if cls.view_name is not None else f'{api.name}.{cls.__name__}'
        return api.model(view_name, model_dict)
    

@dataclass
class DirectView(ViewModel):
    def __init__(self, model: Type[T]):
        for field in class_fields(self):
            val = getattr(model, field.name)
            setattr(self, field.name, val)
