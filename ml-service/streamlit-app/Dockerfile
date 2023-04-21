FROM python:3.11

WORKDIR /ml-service

COPY requirements-streamlit.txt requirements.txt

RUN pip install -r requirements.txt
RUN pip install streamlit --upgrade

COPY . /ml-service 

EXPOSE 4006

CMD [ "streamlit","run","app.py","--server.port" ,"4006" ]