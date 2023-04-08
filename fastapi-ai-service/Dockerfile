FROM python:3
WORKDIR /service-ml
COPY ./requirements.txt .
RUN pip install -r ./requirements.txt
COPY . .
EXPOSE 8000
