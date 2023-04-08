from classes.mymodel import MyModel

class Predict:
    def __init__(self,data):
        self.data = data
        self.listData = []
        model = MyModel()
        self.model = model.storeData()
        self.getValueFromJson()
        self.prediction()

    def getValueFromJson(self):
        for i in self.data:
            if i != "height" and i !="weight":   
                self.setValueInArray(self.data.get(i))

    def setValueInArray(self,value):
        self.listData.append(value)

    def prediction(self):
        self.result = self.model.predict([self.listData])

    def checkResult(self):
        if self.result == 0:
            return "คุณไม่อยู่ในกลุ่มเสี่ยงของการตกเลือด",0
        elif self.result == 1:
            return "คุณอยู่ในกลุ่มเสี่ยงของการตกเลือด",1
        
    def getResult(self):
        return self.checkResult()