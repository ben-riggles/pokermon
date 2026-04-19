FROM python:3.10.12-bookworm
COPY . .
WORKDIR /server
RUN pip3 install -r requirements.txt
RUN flask init-db ../data.csv
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:7777", "app:app"]
