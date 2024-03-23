# Main Header

...

## Developer Installation

### Initial Setup

- Install python: https://www.python.org/downloads/
  - Note: I'm using Python 3.10.1. Theoretically newer versions should be fine
- In a command line, navigate to `.../poker_stats/server`
- Create a virtual environment:
  - (Windows) `python -m venv .venv`
  - (Mac) you might need to specify `python3 -m venv .venv`
  - Alternatively, if using VSCode:
    - Press F1 to bring up commands
    - Search "Python: Create Environment". Select `Venv`
    - Select your python interpreter
- Enter the virtual environment:
  - (Windows) `.\.venv\Scripts\activate.bat`
  - (Linux / Mac) `source ./.venv/bin/activate`
  - If installed using VSCode, you should be able to press Ctrl+Shift+`
  - Note: Powershell doesn't get along with this. If using VSCode, change the default terminal.
- Install the needed packages: `pip install -r requirements.txt`

### Database initialization

- Download the Google Sheets poker data page as a csv
  - A version of this (`data.csv`) can be found in the top level dir. It is not guaranteed to be up-to-date
- Enter the virtual environment (see above)
- Run `flask init-db path/to/data/file.csv`
  - Warning: This will get rid of the contents of any existing db you have and make a new one from scratch
- Your db will be located in `poker_stats/server/db.sqlite3`

### Regular Use

- Navigate to `.../poker_stats/server`
- Enter the virtual environment (see above)
- Run `flask run --debug`
  - The `--debug` is optional but recommended when developing

### Visual API

- Once the api is up and running, it can be viewed at `localhost:5000`
- You can use swagger to manually call endpoints, or to view the expected inputs/outputs

### On the Server `jsonbateman.com`

`gunicorn -w 4 -b 0.0.0.0:7777 app:app --log-file /root/logs/pokermon/pokermon-logs.log --access-logfile /root/logs/pokermon/pokermon-access.log --error-logfile /root/logs/pokermon/pokermon-error.log --log-level debug`

Flask recommends you use a WSGI (Web Server Gateway Interface) to proxy info between a webserver and a
python application, one popular one is guinicorn. I installed gunicorn on the server and ran it using this command.
This command spawns four workers for some load balancing, runs it on the server on port :7777 and writes logs
to the root user directory in a /log folder.
