from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from classes.data import Data
from classes.predict import Predict
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3002",
    "http://eng.src.ku.ac.th:3002"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {"message":"Hello World"}

@app.post('/')
async def prediction(data:Data):
    predict = Predict(data.dict())
    result = predict.getResult()
   
    return result