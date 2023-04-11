from pydantic import BaseModel

class Data(BaseModel):
    age: int
    gestation:int
    parity:int
    GA:int
    Hct:int
    BMI:float
    HxPPH: int
    DM:int
    PIH:int
