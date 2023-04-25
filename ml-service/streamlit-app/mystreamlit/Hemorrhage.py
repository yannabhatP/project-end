import streamlit as st
from classes.Prediction import Predict
class HemorrhagePredict:
    def __init__(self):
        self.input={}
        st.header("ทำนายความเสี่ยงของการตกเลือด")
        st.write("")
    
    def customInputNumber(self,newKey,label,minValue,maxValue,step=None):
        self.input[newKey] = st.number_input(label=label,min_value=minValue,max_value=maxValue,step=step)
    
    def calBMI(self,weight,height):
        return weight / (height/100)**2
    
    def setBMI(self):
        self.height = st.number_input("height (ความสูง) ซม.",min_value=1,max_value=250)
        self.weight = st.number_input("weight (น้ำหนัก) กก.",min_value=1,max_value=200)
        self.input['bmi']= self.BMI = st.number_input('BMI (ค่า BMI)',value=self.calBMI(self.weight,self.height),disabled=True)

    def setNumberInput(self):
        self.customInputNumber('age','Age (อายุ)',1,100,1)
        self.customInputNumber('gestation','Gestation (จำนวนการตั้งครรภ์ รวมปัจจุบัน รวมแท้ง)',1,20)
        self.customInputNumber('parity','Parity (จำนวนลูกที่คลอดออกมาได้)',0,20,1)
        self.customInputNumber('ga','GA (อายุครรภ์ต่อสัปดาห์)',1,100)
        self.customInputNumber('hct','Hct (ความเข้มข้นเลือด)',1,100)

    def customRadio(self,newKey,label,choice):
        self.input[newKey] =  st.radio(label,choice)
        if self.input[newKey] == 'เคย' or self.input[newKey] == 'เป็น' or self.input[newKey] == 'มี':
            self.input[newKey] = 1
        elif self.input[newKey] == 'ไม่เคย' or self.input[newKey] == 'ไม่เป็น' or self.input[newKey] == 'ไม่มี':
            self.input[newKey] = 0

    def setRadio(self):
        self.customRadio('hxpph','Hx PPH (เคยตกเลือดมาก่อนในท้องที่แล้ว)',('เคย','ไม่เคย'))
        self.customRadio('dm','DM (เป็นเบาหวานในท้องนี้)',('เป็น','ไม่เป็น'))
        self.customRadio('pih',"PIH (มีประวัติความดันสูงขณะตั้งครรภ์)",('มี','ไม่มี'))

    def predict(self):
        predict = Predict(self.input)
        result = predict.getResult()
        print(result)
        if result == 0:
            st.balloons()
            st.write()
            st.success('คุณไม่อยู่ในกลุ่มเสี่ยงของการตกเลือด',icon="✅")
        elif result== 1:
            st.error('คุณอยู่ในกลุ่มเสี่ยงของการตกเลือด',icon="🚨")
        

    def setButton(self):
        self.submit = st.button('Predict',on_click=self.checking)
        self.back = st.markdown('[Back](http://eng.src.ku.ac.th:3002/search)')

    def checking(self):
        for i in self.input:
            match i :
                case 'bmi' :
                    if self.input['bmi'] < 0 or self.input['bmi'] > 100:
                        st.info(f"กรุณากรอกข้อมูลให้ครบถ้วน {i}")
                        return
                        
                case "age" | "gestation" | "parity" | "ga" | "hct" :
                    if self.input[i] == 0:
                        st.info(f"กรุณากรอกข้อมูลให้ครบถ้วน {i}")
                        return
        self.predict()

    def window(self):
        self.setNumberInput()
        self.setBMI()
        self.setRadio()
        self.setButton()
        
       