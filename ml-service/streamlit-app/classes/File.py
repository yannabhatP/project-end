

class CustomReadFile:
    def __init__(self,filename,mode):
        self.filename = filename
        self.mode = mode
        self.readFile()
       

    def readFile(self):
        self.file = open(self.filename,self.mode)

    def getFile(self):
        return self.file

