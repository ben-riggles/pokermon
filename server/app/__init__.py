import unittest
import click
from flask import Flask

from config import DevelopmentConfig
from app.common.imports import import_data
from app.extensions import db
import app.views as views

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)

# Initialize Flask extensions here
db.init_app(app)

# Register blueprints here
app.register_blueprint(views.players_bp, url_prefix='/players')


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
    db.create_all()

    import_data(csv)
