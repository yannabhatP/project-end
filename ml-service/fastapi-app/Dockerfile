FROM python:3.9

WORKDIR /ml-service

COPY requirements-fastapi.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /ml-service

EXPOSE 4005

CMD [ "uvicorn","service:app","--host","0.0.0.0","--port","4005" ]