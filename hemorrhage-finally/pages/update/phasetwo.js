import Layout from "@/components/Layout"
import Sidebar from "@/components/Sidebar"
import BabyIcon from "@/icons/BabyIcon"
import HeaderPage from "@/components/HeaderPage"
import CustomButton from "@/components/CustomButton"
import UnsuccessIcon from "@/icons/UnsuccessIcon"
import SuccessIcon from "@/icons/SuccessIcon"
import { getSession } from "next-auth/react"
import {  decoding } from "@/lib/utils"
import { getCookie, setCookie } from 'cookies-next';
import axios from "axios"
import React from 'react';
import { useRouter } from "next/router"
export default function UpdatePhasetwo({data,per_id,serviceURL,tokenID}) {
    const [person_id] = React.useState(per_id)
    const [phasetwo] = React.useState(data)
    const [service] = React.useState(serviceURL)
    const router = useRouter()
    console.log(data)
    const changePhaseTwo = async(event) =>{
        event.preventDefault();
        const ph2Form = {
          id:person_id,
          hemorrhage:event.target.hemorrhage.value,
          hemorrhage1:event.target.hemorrhage1.value,
          hemorrhage2:event.target.hemorrhage2.value,
          hemorrhage3:event.target.hemorrhage3.value,
          hemorrhage4:event.target.hemorrhage4.value,
        }
        await axios.put(`${service}/${person_id}`,ph2Form,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.push({pathname:'/phasetwo'}))
        .catch(err =>  alert(err))
      }
    return (
    <div className="container" style={{marginTop:'140px'}}>
        <HeaderPage children={[<BabyIcon/>]} title={`ระยะเเรกคลอด`}/>
            <form className="justify-content-center rounded" onSubmit={changePhaseTwo} >
                <div className="row g-3 gap-2 m-2 p-2" style={{background:'#AAA8F0'}}>
                    <legend className="fs-5 text-light">เสี่ยงปานกลาง</legend>
                    <div className="input-group mb-2  align-items-center">
                        <label htmlFor="hemorrhage" className="col-form-label text-light" >{`มาโรงพยาบาลด้วยอาการ`}</label>
                        <div className="row">
                            <div className="col-auto form-check ms-4">
                                <input id="hemorrhage" className="form-check-input" type={'radio'} name={'hemorrhage'} value={`เลือดออก`} defaultChecked={phasetwo.hemorrhage===`เลือดออก`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage">{`เลือดออก`}</label>
                            </div>
                            <div className="col-auto form-check ms-4">
                                <input id="hemorrhage" className="form-check-input" type={'radio'} name={'hemorrhage'} value={`มีน้ำเดิน`} defaultChecked={phasetwo.hemorrhage===`มีน้ำเดิน`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage">{`มีน้ำเดิน`}</label>
                            </div>
                            <div className="col-auto form-check ms-4">
                                <input id="hemorrhage" className="form-check-input" type={'radio'} name={'hemorrhage'} value={`เจ็บครรภ์`} defaultChecked={phasetwo.hemorrhage===`เจ็บครรภ์`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage">{`เจ็บครรภ์`}</label>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-2 align-items-center">
                        <label htmlFor="hemorrhage1" className="col-form-label text-light" >{`ได้รับยากระตุ้นการหดรัดตัวของ มดลูกนานเกิน 24 ชั่วโมง (Prolonged oxytocin >24 hr.)`}</label>
                        <div className="form-check ms-4">
                            <input id="hemorrhage1" className="form-check-input" type={'radio'} name={'hemorrhage1'} value={`ใช่`} defaultChecked={phasetwo.hemorrhage1 === `ใช่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage1">{`ใช่`}</label>
                        </div>
                        <div className="form-check ms-4">
                            <input id="hemorrhage1" className="form-check-input" type={'radio'} name={'hemorrhage1'} value={`ไม่`} defaultChecked={phasetwo.hemorrhage1 === `ไม่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage1">{`ไม่`}</label>
                        </div>
                    </div>
                    <div className="input-group mb-2 align-items-center">
                        <label htmlFor="hemorrhage2" className="col-form-label text-light" >{`ได้รับยาแมกนีเซียมซัลเฟต (Magnesium sulfate)`}</label>
                        <div className="form-check ms-4">
                            <input id="hemorrhage2" className="form-check-input" type={'radio'} name={'hemorrhage2'} value={`ใช่`} defaultChecked={phasetwo.hemorrhage2 === `ใช่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage2">{`ใช่`}</label>
                        </div>
                        <div className="form-check ms-4">
                            <input id="hemorrhage2" className="form-check-input" type={'radio'} name={'hemorrhage2'} value={`ไม่`} defaultChecked={phasetwo.hemorrhage2 === `ไม่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage2">{`ไม่`}</label>
                        </div>
                    </div>
                    <div className="input-group mb-2 align-items-center">
                        <label htmlFor="hemorrhage3" className="col-form-label text-light" >{`ระยะที่ 2 ของการคลอดยาวนาน (Prolonged 2nd stage)`}</label>
                        <div className="form-check ms-4">
                            <input id="hemorrhage3" className="form-check-input" type={'radio'} name={'hemorrhage3'} value={`ใช่`} defaultChecked={phasetwo.hemorrhage3 === `ใช่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage3">{`ใช่`}</label>
                        </div>
                        <div className="form-check ms-4">
                            <input id="hemorrhage3" className="form-check-input" type={'radio'} name={'hemorrhage3'} value={`ไม่`} defaultChecked={phasetwo.hemorrhage3 === `ไม่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage3">{`ไม่`}</label>
                        </div>
                    </div>
                    <div className="input-group mb-2 align-items-center">
                        <label htmlFor="hemorrhage4" className="col-form-label text-light" >{`ได้รับยากระตุ้นการหดตัวของมดลูกเป็นเวลานานเกิน 8 ชม. (Prolonged oxytocin use)`}</label>
                        <div className="form-check ms-4">
                            <input id="hemorrhage4" className="form-check-input" type={'radio'} name={'hemorrhage4'} value={`ใช่`} defaultChecked={phasetwo.hemorrhage4 === `ใช่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage4">{`ใช่`}</label>
                        </div>
                        <div className="form-check ms-4">
                            <input id="hemorrhage4" className="form-check-input" type={'radio'} name={'hemorrhage4'} value={`ไม่`} defaultChecked={phasetwo.hemorrhage4 === `ไม่`}/>
                            <label className="form-check-label text-light" htmlFor="hemorrhage4">{`ไม่`}</label>
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
    </div>
  )
}
export const getServerSideProps = async(context)=>{
    const session = await getSession(context)
    const {req} = context
    const  per_id = decoding(getCookie('per_id',{req}))
    const tokenID = getCookie('tokenID',{req})
    
    if(!session ){
        return{
            redirect:{
                destination:'/'
            }
        }
    }
    try {
        const response =  await axios.get(`${process.env.SERVICE_PHASETWO}/${per_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        return {
            props:{
                data:response.data,
                per_id,
                serviceURL: process.env.SERVICE_PHASETWO,
                tokenID
            }
        }
    }catch(err){console.log(err)}
    return{
        props:{
            data:{},
            per_id,
            serviceURL: process.env.SERVICE_PHASETWO,
            tokenID
        }
    }
}
UpdatePhasetwo.getLayout = function getLayout(page){
    return(
        <Layout>
            <Sidebar/>
            {page}
        </Layout>
    )
}