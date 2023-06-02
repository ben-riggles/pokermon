import unittest
import click
from flask import Flask
from flask_cors import CORS
from flask_migrate import upgrade
from flask_restx import Api

from config import DevelopmentConfig
from app.common.imports import import_data
from app.extensions import db, migrate
import app.routes as routes

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
api = Api(app)
CORS(app)

# Initialize Flask extensions here
db.init_app(app)
migrate.init_app(app, db)

for ns in routes.namespaces():
    api.add_namespace(ns)


@app.cli.command('test')
def run_tests():
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@app.cli.command('init-db')
@click.argument('csv')
def init_db(csv):
    db.reflect()
    db.drop_all()

    upgrade()
    #db.create_all()

    import_data(csv)
