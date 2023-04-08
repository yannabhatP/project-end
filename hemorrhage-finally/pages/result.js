import Layout from "@/components/Layout"
import Sidebar from "@/components/Sidebar"
import HeaderCollapse from "@/components/HeaderCollapse"
import DownIcon from "@/icons/DownIcon"
import CustomButton from "@/components/CustomButton"
import UnsuccessIcon from "@/icons/UnsuccessIcon"
import SuccessIcon from "@/icons/SuccessIcon"
import { useRouter } from "next/router"
import { calBMI, changeBirthDayToAge, decoding } from "@/lib/utils"
import { getCookie } from 'cookies-next';
import { getSession } from "next-auth/react"

import axios from "axios"
import React from "react"
import Link from "next/link"
export default function Result({mlService,per_id,tokenID,person,phaseone,result,resultService}) {
    const router = useRouter()
    const [person_id] = React.useState(per_id)
    const [dataPerson] = React.useState(person)
    const [dataPhaseone] = React.useState(phaseone)
    const [resultReq,setResultReq] = React.useState({})
    const [resultData,setResultData] = React.useState(null)
    const submitResult = async(event) => {
        event.preventDefault();
        const res = {
            id:person_id,
            product:event.target.product.value,
            predict:(resultData[1] === 1) ?"ตกเลือด":"ไม่ตกเลือด"
    }
        await axios.post(resultService,res,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.reload())
        .catch(err => alert(err))
    }
    const loadResult = async()=>{

        await axios.get(`${resultService}/${per_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(data => setResultReq(data.data))
        .catch(err => alert(err))

        if (Object.keys(resultReq).length === 0){
            const data= {
                age:changeBirthDayToAge(dataPerson.bdate),
                gestation:dataPhaseone.gestation,
                parity:dataPhaseone.parity,
                GA:dataPhaseone.GA,
                Hct:dataPhaseone.Hct,
                height:dataPhaseone.height,
                weight:dataPhaseone.weight,
                BMI:calBMI(dataPhaseone.height,dataPhaseone.weight).toFixed(2),
                HxPPH:(dataPhaseone.HxPPH === 'ใช่')? 1 :0,
                DM:(dataPhaseone.DM === 'ใช่')? 1 :0,
                PIH:(dataPhaseone.PIH === 'ใช่')? 1 :0,
            } 
            await axios.post(mlService,data)
            .then(data => setResultData(data.data))
            .catch(err => alert(err))
        }
    }
    return (
    <div className="container" style={{marginTop:'140px'}}>
        <div  data-bs-toggle="collapse" href="#collapse1" role="button" onClick={loadResult} aria-expanded="false" aria-controls="collapse1">
            <HeaderCollapse title={`ผลลัพธ์`} icon={<DownIcon/>}/>
        </div>
        <div className="collapse m-2" id="collapse1">
            {Object.keys(resultReq).length === 0 &&
                <form className=" p-2 m-2 justify-content-center rounded" onSubmit={submitResult} >
                    <div className="row g-3 gap-2 m-2 p-2" style={{background:'#AAA8F0'}}>
                        <div className="input-group mb-2 align-items-center">
                            <div className="form-check ms-4">
                                <input id="product" className="form-check-input" type={'radio'} name={'product'} value={`ตกเลือด`}/>
                                <label className="form-check-label text-light" htmlFor="product">{`ตกเลือด`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="product" className="form-check-input" type={'radio'} name={'product'} value={`ไม่ตกเลือด`}/>
                                <label className="form-check-label text-light" htmlFor="product">{`ไม่ตกเลือด`}</label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between m-2">
                        <button type="reset" className="btn btn-danger ">
                            <CustomButton icon={<UnsuccessIcon/>} text={`ยกเลิก`}/>
                        </button>
                        <button type="submit" className="btn btn-success ">
                            <CustomButton icon={<SuccessIcon/>} text={`ตกลง`}/>
                        </button>
                    </div>
                </form>
            }
            {Object.keys(resultReq).length !== 0 &&
                <div className="row g-3 gap-2 m-2 p-2" style={{background:'#7E7CEA'}}>
                    <div className="input-group mb-2 align-items-center">
                        <label className="text-light">{`ผลลัพธ์ : ${resultReq.product}`}</label>
                    </div>
                    <div className="input-group mb-2 align-items-center">
                        <label className="text-light">{`ผลลัพธ์การคาดการณ์ : ${resultReq.predict}`}</label>
                    </div>
                </div>
            }
            
        </div>
    </div>
  )
}
export const getServerSideProps = async(context) => {
    const session = await getSession(context)
    const {req} = context
    const  per_id = decoding(getCookie('per_id',{req}))
    const tokenID = getCookie(`tokenID`,{req})
    const  resultService = process.env.SERVICE_RESULT
    const personService = process.env.SERVICE_PERSON
    const phase1Service = process.env.SERVICE_PHASEONE
    const mlService = process.env.SERVICE_ML
  
    try{
        const promise1 = await axios.get(`${personService}/${per_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        const promise2 = await axios.get(`${phase1Service}/${per_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        
        return {
            props:{
                person :promise1.data,
                phaseone:promise2.data,
                
                resultService,
                mlService,
                per_id,
                tokenID
            }
        }
    }catch{

    }
    return {
        props:{
            resultService,
            mlService,
            per_id,
            tokenID
        }
    }
}
Result.getLayout = function getLayout(page){
    return(
        <Layout>
            <Sidebar/>
            {page}
        </Layout>
    )
}