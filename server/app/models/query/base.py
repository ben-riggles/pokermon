from __future__ import annotations
from dataclasses import dataclass, fields, asdict
import datetime
from flask_restx import reqparse, inputs


@dataclass
class QueryModel:
    @classmethod
    @property
    def parser(cls) -> reqparse.RequestParser:
        req = reqparse.RequestParser()
        for field in fields(cls):
            if field.type == datetime.datetime:
                req.add_argument(field.name, type=inputs.date_from_iso8601)
            elif field.type == bool:
                req.add_argument(field.name, type=inputs.boolean)
            else:
                req.add_argument(field.name, type=field.type)
        return req
    
    @classmethod
    def parse(cls) -> QueryModel:
        return cls.parser.parse_args()
    
    def __dict__(self):
        return {k: v for k, v in asdict(self) if v is not None}
