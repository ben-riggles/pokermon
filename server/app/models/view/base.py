from __future__ import annotations
from abc import ABC
from dataclasses import dataclass, fields as class_fields
from datetime import datetime
from decimal import Decimal
import typing
from flask_restx import Model, Namespace, fields


@dataclass
class ViewModel(ABC):
    __subclasses = {}

    def __init_subclass__(cls) -> None:
        ViewModel.__subclasses[cls.__name__] = cls
        return super().__init_subclass__()

    @staticmethod
    def __get(name: str) -> ViewModel:
        return ViewModel.__subclasses[name]
    
    def __field_to_resttype(field_type: typing.Type, api: Namespace) -> fields.Raw:
        if field_type == int:
            return fields.Integer(required=False)
        elif field_type == float:
            return fields.Float(reuiqred=False)
        elif field_type == Decimal:
            return fields.Float(required=False)
        elif field_type == str:
            return fields.String(required=False)
        elif field_type == bool:
            return fields.Boolean(required=False)
        elif field_type == datetime:
            return fields.Date(required=False)
        elif typing.get_origin(field_type) is list:
            nested_type = field_type.__args__[0]
            field = ViewModel.__field_to_resttype(nested_type, api)
            return fields.List(field, required=False)
        elif field_type in ViewModel.__subclasses:
            return fields.Nested(ViewModel.__get(field_type).model(api), required=False)
        else:
            raise TypeError(f'Unknown type found in ViewModel: {field_type}')

    @classmethod
    def model(cls, api: Namespace) -> Model:
        model_dict = {}
        for field in class_fields(cls):
            model_dict[field.name] = ViewModel.__field_to_resttype(field.type, api)
        return api.model(cls.__name__, model_dict)
