from custommodel.MLModel import MLModel

class Predict(MLModel):
    def __init__(self,data):
        super().__init__()
        self.data= data
        self.listData = []
        self.model = self.getModel()
        self.getValueFromJSON()
        self.prediction()

    def getValueFromJSON(self):
        for i in self.data:
            self.listData.append(self.data.get(i))
    
    def prediction(self):
        self.result = self.model.predict([self.listData])

    def checkResult(self):
        if self.result == 0:
            return 0
        elif self.result == 1:
            return 1
        
    def getResult(self):
        return self.checkResult()