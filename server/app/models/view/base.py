from __future__ import annotations
from abc import ABC
from dataclasses import dataclass, asdict, fields as class_fields
from datetime import datetime
from decimal import Decimal
from flask_restx import Model, Namespace, fields


@dataclass
class ViewModel(ABC):
    @classmethod
    def model(cls, api: Namespace) -> Model:
        model_dict = {}
        for field in class_fields(cls):
            if field.type == int:
                model_dict[field.name] = fields.Integer(required=False)
            elif field.type == float:
                model_dict[field.name] = fields.Float(reuiqred=False)
            elif field.type == Decimal:
                model_dict[field.name] = fields.Float(required=False)
            elif field.type == str:
                model_dict[field.name] = fields.String(required=False)
            elif field.type == bool:
                model_dict[field.name] = fields.Boolean(required=False)
            elif field.type == datetime:
                model_dict[field.name] = fields.Date(required=False)
            elif isinstance(field.type, ViewModel):
                print(field)
                model_dict[field.name] = fields.Nested(field, required=False)
            else:
                raise TypeError(f'Unknown type found in ViewModel: {field.type}')
        return api.model(cls.__name__, model_dict)
    
    def serialize(self) -> str:
        # print(self)
        # print(asdict(self))
        return asdict(self)
