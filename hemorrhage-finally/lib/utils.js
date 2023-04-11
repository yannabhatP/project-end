var today = new Date()

export const  decoding = (data)=>{
    const decoded =Buffer.from(data,'base64').toString("utf-8")
    return decoded
}

export const encoding =  (data)=>{
    const encoded = Buffer.from(data).toString("base64")
    return encoded
}

const oneYsPerMs = 31536000000

export const changeBirthDayToAge = (iso) =>{

    var d = new Date()
    let bornISO = new Date(iso).getTime()
    let nowISO = Date.now()
    let diff = Math.abs(nowISO-bornISO)
    let year = Math.floor(diff/oneYsPerMs)
    return year
}
export const changeBMI = (bmi) => {
    var intBMI = Number(bmi)
    if (intBMI < 18.5) {
        return "น้ำหนักต่ำกว่าเกณฑ์"
    }
    else if(intBMI >= 18.5 && intBMI <23){
        return "น้ำหนักสมส่วน"
    }
    else if(intBMI >= 23 && intBMI < 25){
        return "น้ำหนักเกินมาตรฐาน"
    }
    else if(intBMI >= 25 && intBMI < 30){
        return "อ้วน"
    }
    else{
        return "อ้วนมาก"
    }
}

export const  getMinFormat = () => {
    var yyyy = today.getFullYear() 
    
    return "01/01"+yyyy
}

export const getMaxFormat= ()=>{
    var yyyy = today.getFullYear()
    return yyyy+"-01-01"
}

export const calBMI = (height,weight)=> {
    const h = Number(height)/100
    const w = Number(weight)
    return w/h**2 
}