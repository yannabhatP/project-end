import pickle as pic
import os

class MyModel:
    def __init__(self) :
        self.getDataPath()
        self.readFile()

    def getCurrentPath(self):
        return os.getcwd()
    
    def getDataPath(self):
        self.path = self.getCurrentPath() + "/data/model"

    def getPath(self):
        return self.path
    
    def readFile(self):
        self.file = open(self.path,'rb')

    def getFile(self):
        return self.file

    def storeData(self):
        return pic.load(self.file)