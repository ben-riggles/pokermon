FROM python:3.10.12-bookworm
COPY . .
WORKDIR /server
RUN pip3 install -r requirements.txt
RUN flask init-db ../data.csv
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "-p", "7777"]
