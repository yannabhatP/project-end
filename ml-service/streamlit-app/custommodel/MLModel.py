import os
from classes.File import CustomReadFile
import pickle as pickle

class MLModel(CustomReadFile):
    def __init__(self):
        self.getDataPath()
        super().__init__(self.path, 'rb')
        
    def getCurrentPath(self):
        return os.getcwd()
    
    def getDataPath(self):
        self.path = self.getCurrentPath()+"/data/model"

    def getPath(self):
        return self.path
    
    def getModel(self):
        return pickle.load(self.getFile())
    