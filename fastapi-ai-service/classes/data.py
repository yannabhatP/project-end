from pydantic  import BaseModel
class Data(BaseModel):
    age: int
    gestation:int
    parity:int
    GA:int
    Hct:int
    height:float
    weight:float
    BMI:float
    HxPPH: int
    DM:int
    PIH:int
