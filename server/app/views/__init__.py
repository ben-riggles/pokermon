from importlib import import_module
from pathlib import Path

def namespaces():
    for f in Path(__file__).parent.glob('*.py'):
        if '__init__.py' in str(f):
            continue
        module = import_module(f'app.views.{f.stem}')
        yield module.api
