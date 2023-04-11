import Layout from "@/components/Layout"
import Sidebar from "@/components/Sidebar"
import HeaderPage from "@/components/HeaderPage"
import PostpartumIcon from "@/icons/PostPartumIcon"
import CustomButton from "@/components/CustomButton"
import UnsuccessIcon from "@/icons/UnsuccessIcon"
import SuccessIcon from "@/icons/SuccessIcon"
import React from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import { decoding,calBMI, changeBMI } from '../lib/utils';
import { getCookie } from 'cookies-next';
import axios from "axios"
import EditIcon from "@/icons/EditIcon"
export default function Phaseone({data ,per_id,serviceURL,tokenID}) {
    const [person_id] = React.useState(per_id)
    const [phaseone] = React.useState(data)
    const [service] = React.useState(serviceURL)
    const [h,setH] =React.useState(``)
    const [w,setW] =React.useState(``)
    const router = useRouter()
    const updateData = async(e)=>{
        e.preventDefault();
        router.push({pathname:"/update/phaseone"})
    }
    const submitData = async(e) => {
        e.preventDefault();
        const ph1Form = {
            id:person_id,
            phInp:Number(e.target.ph1_Inp.value),
            phInp1:Number(e.target.ph1_Inp1.value),
            gestation:Number(e.target.gestation.value),
            parity:Number(e.target.parity.value),
            GA:Number(e.target.GA.value),
            phInp3:e.target.ph1_Inp3.value,
            hemorrhage:e.target.hemorrhage.value,
            hemorrhage1:e.target.hemorrhage1.value,
            hemorrhage1Yes:e.target.hemorrhage1Yes.value,
            phInp4:Number(e.target.ph1_Inp4.value),
            weight:Number(e.target.weight.value),
            height:Number(e.target.height.value),
            Hct:Number(e.target.Hct.value),
            HxPPH:e.target.HxPPH.value,
            DM:e.target.DM.value,
            PIH:e.target.PIH.value,
            hemorrhage3:e.target.hemorrhage3.value,
            hemorrhage4:e.target.hemorrhage4.value,
            hemorrhage4Yes:e.target.hemorrhage4Yes.value,
            hemorrhage5:e.target.hemorrhage5.value,
            phInp6:Number(e.target.ph1_Inp6.value),
            hemorrhage6:e.target.hemorrhage6.value,
            hemorrhage7:e.target.hemorrhage7.value,
            hemorrhage8:e.target.hemorrhage8.value,
            phInp7:Number(e.target.ph1_Inp7.value),
        }
        
        await axios.post(service,ph1Form,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.reload())
        .catch(err => alert(err))
    }
    return (
        <div className="container" style={{marginTop:'140px'}}>
            <HeaderPage children={<PostpartumIcon/>} title={`ระยะเเรกรับ`}/>
            {Object.keys(phaseone).length === 0 &&
                <form className="justify-content-center " onSubmit={submitData}>
                    <div className="row g-3 gap-2 m-2 p-2 rounded" style={{background:'#7E7CEA'}}>
                        <legend className="fs-5 text-light">เสี่ยงปานกลาง</legend>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp" className="col-form-label text-light" >{`เคยผ่าตัดมดลูก`}</label>
                            <input className="form-control rounded ms-2 me-2" id="ph1Inp" type={'number'} name={'ph1_Inp'} max={20} required/>
                            <label htmlFor="ph1Inp" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp1" className="col-form-label text-light" >{`เคยผ่าตัดคลอด`}</label>
                            <input className="form-control rounded ms-2 me-2" id="ph1Inp1" type={'number'} name={'ph1_Inp1'} max={20} required/>
                            <label htmlFor="ph1Inp1" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="gestation" className="col-form-label text-light" >{`จำนวนการตั้งครรภ์`}</label>
                            <input className="form-control rounded ms-2 me-2" id="gestation" type={'number'} name={'gestation'} max={20} required/>
                            <label htmlFor="gestation" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="parity" className="col-form-label text-light" >{`จำนวนลูกที่คลอดออกมาได้`}</label>
                            <input className="form-control rounded ms-2 me-2" id="parity" type={'number'} name={'parity'} max={20} required/>
                            <label htmlFor="parity" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="GA" className="col-form-label text-light" >{`อายุครรภ์ต่อสัปดาห์`}</label>
                            <input className="form-control rounded ms-2 me-2" id="GA" type={'number'} name={'GA'} max={100} required/>
                            <label htmlFor="GA" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="ph1Inp3" className="col-form-label text-light" >{`เคยคลอดทางช่องคลอดมากกว่า 4 ครั้ง`}</label>
                            <div className="form-check ms-4">
                                <input id="ph1Inp3" className="form-check-input" type={'radio'} name={'ph1_Inp3'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="ph1Inp3">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="ph1Inp3" className="form-check-input" type={'radio'} name={'ph1_Inp3'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="ph1Inp3">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="ph1Inp3" className="col-form-label text-light" >{`เคยมีประวัติเลือดออกทางช่องคลอด ระหว่างฝากท้องในครั้งนี้`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage" className="form-check-input" type={'radio'} name={'hemorrhage'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage" className="form-check-input" type={'radio'} name={'hemorrhage'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="ph1Inp3" className="col-form-label text-light" >{`มีก้อนเนื้องอกมดลูกขนาดใหญ่ในครั้งนี้`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage1" className="form-check-input" type={'radio'} name={'hemorrhage1'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage1">{`ใช่`}</label>
                                
                            </div>
                            <div className="form-check ms-4">
                            <label className="form-check-label text-light" htmlFor="hemorrhage1">{`ขนาด`}</label>
                                <input className="form-control rounded ms-2 me-2" id="hemorrhage1" type={'number'} name={'hemorrhage1Yes'}></input>
                                <label className="form-check-label text-light" htmlFor="hemorrhage1">{`ซม.`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage1" className="form-check-input" type={'radio'} name={'hemorrhage1'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage1">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp4" className="col-form-label text-light" >{`ปริมาณน้ำหนักก่อนคลอด`}</label>
                            <input className="form-control rounded ms-2 me-2" id="ph1Inp4" type={'number'} name={'ph1_Inp4'} required/>
                            <label htmlFor="ph1Inp2" className="col-form-label text-light" >{`กรัม`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="weight" className="col-form-label text-light" >{`น้ำหนัก`}</label>
                            <input className="form-control rounded ms-2 me-2" id="weight" onChange={e=>setW(e.target.value)} type={'number'} name={'weight'} min={20} required/>
                            <label htmlFor="weight" className="col-form-label text-light" >{`กก.`}</label>
                            <label htmlFor="height" className="col-form-label text-light ms-2" >{`ความสูง`}</label>
                            <input className="form-control rounded ms-2 me-2" id="height" onChange={e=>setH(e.target.value)} type={'number'} name={'height'} min={100} required/>
                            <label htmlFor="weight" className="col-form-label text-light" >{`ซม.`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="bmi" className="col-form-label text-light" >{`อ้วนมาก (BMI > 40)`}</label>
                            <label htmlFor="bmi" className="col-form-label text-light ms-2 me-2 " >{`BMI : ${calBMI(h,w).toFixed(2)} การแปรผล : ${changeBMI(calBMI(h,w).toFixed(2))}`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="Hct" className="col-form-label text-light" >{`ความเข้มข้นเลือด`}</label>
                            <input className="form-control rounded ms-2 me-2" id="Hct" type={'number'} name={'Hct'} max={100} required/>
                            <label htmlFor="Hct" className="col-form-label text-light" >{`%`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="HxPPH" className="col-form-label text-light" >{`เคยมีประวัติการตกเลือด`}</label>
                            <div className="form-check ms-4">
                                <input id="HxPPH" className="form-check-input" type={'radio'} name={'HxPPH'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="HxPPH">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="HxPPH" className="form-check-input" type={'radio'} name={'HxPPH'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="HxPPH">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="DM" className="col-form-label text-light" >{`เป็นเบาหวานในท้องนี้`}</label>
                            <div className="form-check ms-4">
                                <input id="DM" className="form-check-input" type={'radio'} name={'DM'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="DM">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="DM" className="form-check-input" type={'radio'} name={'DM'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="DM">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="PIH" className="col-form-label text-light" >{`มีประวัติความดันสูงขณะตั้งครรภ์`}</label>
                            <div className="form-check ms-4">
                                <input id="PIH" className="form-check-input" type={'radio'} name={'PIH'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="PIH">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="PIH" className="form-check-input" type={'radio'} name={'PIH'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="PIH">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage3" className="col-form-label text-light" >{`ตั้งครรภ์แฝด`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage3" className="form-check-input" type={'radio'} name={'hemorrhage3'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage3">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage3" className="form-check-input" type={'radio'} name={'hemorrhage3'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage3">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage4" className="col-form-label text-light" >{`มารดาเคยมีประวัติการขูดมดลูกก่อนการตั้งครรภ์`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage4" className="form-check-input" type={'radio'} name={'hemorrhage4'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage4">{`ใช่`}</label>
                            </div>
                            <div className="form-check m-4">
                                <label className="form-check-label text-light" htmlFor="hemorrhage4">{`จำนวน`}</label>
                                <input className="form-control rounded " id="hemorrhage4" type={'number'} name={'hemorrhage4Yes'}></input>
                                <label className="form-check-label text-light" htmlFor="hemorrhage4">{`ครั้ง.`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage4" className="form-check-input" type={'radio'} name={'hemorrhage4'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage4">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2  align-items-center">
                            <label htmlFor="hemorrhage5" className="col-form-label text-light" >{`การคุมกำเนิดก่อนตั้งครรภ์`}</label>
                            <div className="row">
                                <div className="col-auto form-check ms-4">
                                    <input id="hemorrhage5" className="form-check-input" type={'radio'} name={'hemorrhage5'} value={`กิน`}/>
                                    <label className="form-check-label text-light" htmlFor="hemorrhage5">{`กิน`}</label>
                                </div>
                                <div className="col-auto form-check ms-4">
                                    <input id="hemorrhage5" className="form-check-input" type={'radio'} name={'hemorrhage5'} value={`ฉีด`}/>
                                    <label className="form-check-label text-light" htmlFor="hemorrhage5">{`ฉีด`}</label>
                                </div>
                                <div className="col-auto form-check ms-4">
                                    <input id="hemorrhage5" className="form-check-input" type={'radio'} name={'hemorrhage5'} value={`ฝั่ง`}/>
                                    <label className="form-check-label text-light" htmlFor="hemorrhage5">{`ฝั่ง`}</label>
                                </div>
                                <div className="col-auto form-check ms-4">
                                    <input id="hemorrhage5" className="form-check-input" type={'radio'} name={'hemorrhage5'} value={`ใส่ห่วง`}/>
                                    <label className="form-check-label text-light" htmlFor="hemorrhage5">{`ใส่ห่วง`}</label>
                                </div>
                                <div className="col-auto form-check ms-4">
                                    <input id="hemorrhage5" className="form-check-input" type={'radio'} name={'hemorrhage5'} value={`ไม่เคย`}/>
                                    <label className="form-check-label text-light" htmlFor="hemorrhage5">{`ไม่เคย`}</label>
                                </div>
                            </div>
                            
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp6" className="col-form-label text-light" >{`หยุดการใช้ยาคุมกำเนิดช่วงระยะเวลาก่อนมีครรภ์`}</label>
                            <input className="form-control rounded ms-2 me-2" id="ph1Inp6" type={'number'} name={'ph1_Inp6'} required/>
                            <label htmlFor="ph1Inp6" className="col-form-label text-light" >{`เดือน`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage6" className="col-form-label text-light" >{`ได้รับยายับยั้งการคลอด`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage6" className="form-check-input" type={'radio'} name={'hemorrhage6'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage6">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage6" className="form-check-input" type={'radio'} name={'hemorrhage6'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage6">{`ไม่`}</label>
                            </div>
                        </div>
                        <legend className="fs-5 text-light">เสี่ยงสูง</legend>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage7" className="col-form-label text-light" >{`รกเกาะต่ำ (Placenta previa)`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage7" className="form-check-input" type={'radio'} name={'hemorrhage7'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage7">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage7" className="form-check-input" type={'radio'} name={'hemorrhage7'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage7">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage8" className="col-form-label text-light" >{`รกฝังแน่น (Accreta/percreta)`}</label>
                            <div className="form-check ms-4">
                                <input id="hemorrhage8" className="form-check-input" type={'radio'} name={'hemorrhage8'} value={`ใช่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage8">{`ใช่`}</label>
                            </div>
                            <div className="form-check ms-4">
                                <input id="hemorrhage8" className="form-check-input" type={'radio'} name={'hemorrhage8'} value={`ไม่`}/>
                                <label className="form-check-label text-light" htmlFor="hemorrhage8">{`ไม่`}</label>
                            </div>
                        </div>
                        <div className="input-group row mb-2">
                            <label htmlFor="ph1Inp7" className="col-form-label text-light" >{`เกร็ดเลือดต่ำกว่า 70,000 (Platelet count < 70K)`}</label>
                            <label htmlFor="ph1Inp7" className="col-form-label text-light" >{`ค่าเกร็ดเลือด`}</label>
                            <input className="form-control rounded ms-2 me-2" id="ph1Inp7" type={'number'} name={'ph1_Inp7'} required/>
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
            {Object.keys(phaseone).length !== 0 &&
                <form className="justify-content-center " onSubmit={updateData}>
                    <div className="row g-3 gap-2 m-2 p-2 rounded" style={{background:'#7E7CEA'}}>
                        <legend className="fs-5 text-light">เสี่ยงปานกลาง</legend>
                        <div className="input-group m-2">
                            <label htmlFor="ph1Inp" className="col-form-label text-light" >{`เคยผ่าตัดมดลูก`}</label>
                            <label htmlFor="ph1Inp" className="col-form-label text-light ms-2 me-2" >{`${phaseone.phInp}`}</label>
                            <label htmlFor="ph1Inp" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp1" className="col-form-label text-light" >{`เคยผ่าตัดคลอด`}</label>
                            <label htmlFor="ph1Inp1" className="col-form-label text-light ms-2 me-2" >{`${phaseone.phInp1}`}</label>
                            <label htmlFor="ph1Inp1" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="gestation" className="col-form-label text-light" >{`จำนวนการตั้งครรภ์`}</label>
                            <label htmlFor="gestation" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.gestation}`}</label>
                            <label htmlFor="gestation" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="parity" className="col-form-label text-light" >{`จำนวนลูกที่คลอดออกมาได้`}</label>
                            <label htmlFor="parity" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.parity}`}</label>
                            <label htmlFor="parity" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="GA" className="col-form-label text-light" >{`อายุครรภ์ต่อสัปดาห์`}</label>
                            <label htmlFor="GA" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.GA}`}</label>
                            <label htmlFor="GA" className="col-form-label text-light" >{`ครั้ง`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="ph1Inp3" className="col-form-label text-light" >{`เคยคลอดทางช่องคลอดมากกว่า 4 ครั้ง`}</label>
                            <label htmlFor="ph1Inp3" className="col-form-label text-light ms-2 me-2" >{`${phaseone.phInp3}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage" className="col-form-label text-light" >{`เคยมีประวัติเลือดออกทางช่องคลอด ระหว่างฝากท้องในครั้งนี้`}</label>
                            <label htmlFor="hemorrhage" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage1" className="col-form-label text-light" >{`มีก้อนเนื้องอกมดลูกขนาดใหญ่ในครั้งนี้`}</label>
                            <label htmlFor="hemorrhage1" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage1}`}</label>
                            {phaseone.hemorrhage1 === `ใช่` &&
                                <>
                                    <label htmlFor="hemorrhage1" className="col-form-label text-light ms-2 me-2 ">{`ขนาด ${phaseone.hemorrhage1Yes} ซม.`}</label><br/>
                                </>
                            }
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp4" className="col-form-label text-light" >{`ปริมาณน้ำหนักก่อนคลอด`}</label>
                            <label htmlFor="ph1Inp4" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.phInp4}`}</label>
                            <label htmlFor="ph1Inp4" className="col-form-label text-light" >{`กรัม`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="weight" className="col-form-label text-light" >{`น้ำหนัก`}</label>
                            <label htmlFor="ph1Inp4" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.weight}`}</label>
                            <label htmlFor="weight" className="col-form-label text-light" >{`กก.`}</label>
                            <label htmlFor="height" className="col-form-label text-light ms-2" >{`ความสูง`}</label>
                            <label htmlFor="ph1Inp4" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.height}`}</label>
                            <label htmlFor="weight" className="col-form-label text-light" >{`ซม.`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="bmi" className="col-form-label text-light" >{`อ้วนมาก (BMI > 40)`}</label>
                            <label htmlFor="bmi" className="col-form-label text-light ms-2 me-2 " >{`BMI : ${calBMI(phaseone.height,phaseone.weight).toFixed(2)} การแปรผล : ${changeBMI(calBMI(phaseone.height,phaseone.weight).toFixed(2))}`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="Hct" className="col-form-label text-light" >{`ความเข้มข้นเลือด`}</label>
                            <label htmlFor="Hct" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.Hct}`}</label>
                            <label htmlFor="Hct" className="col-form-label text-light" >{`%`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="HxPPH" className="col-form-label text-light" >{`เคยมีประวัติการตกเลือด`}</label>
                            <label htmlFor="HxPPH" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.HxPPH}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="DM" className="col-form-label text-light" >{`เป็นเบาหวานในท้องนี้`}</label>
                            <label htmlFor="DM" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.DM}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="PIH" className="col-form-label text-light" >{`มีประวัติความดันสูงขณะตั้งครรภ์`}</label>
                            <label htmlFor="PIH" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.PIH}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage3" className="col-form-label text-light" >{`ตั้งครรภ์แฝด`}</label>
                            <label htmlFor="hemorrhage3" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage3}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage4" className="col-form-label text-light" >{`มารดาเคยมีประวัติการขูดมดลูกก่อนการตั้งครรภ์`}</label>
                            <label htmlFor="hemorrhage4" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage4}`}</label>
                            { phaseone.hemorrhage4 === `เคย` &&
                                <>
                                    <label htmlFor="hemorrhage4" className="col-form-label text-light ms-2 me-2 ">{`จำนวน ${phaseone.hemorrhage4Yes} ครั้ง`}</label>
                                </>
                            }
                        </div>
                        <div className="input-group mb-2  align-items-center">
                            <label htmlFor="hemorrhage5" className="col-form-label text-light" >{`การคุมกำเนิดก่อนตั้งครรภ์`}</label>
                            <label htmlFor="hemorrhage5" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage5}`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp6" className="col-form-label text-light" >{`หยุดการใช้ยาคุมกำเนิดช่วงระยะเวลาก่อนมีครรภ์`}</label>
                            <label htmlFor="ph1Inp6" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.phInp6}`}</label>
                            <label htmlFor="ph1Inp6" className="col-form-label text-light" >{`เดือน`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage6" className="col-form-label text-light" >{`ได้รับยายับยั้งการคลอด`}</label>
                            <label htmlFor="hemorrhage6" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage6}`}</label>
                        </div>
                        <legend className="fs-5 text-light">เสี่ยงสูง</legend>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage7" className="col-form-label text-light" >{`รกเกาะต่ำ (Placenta previa)`}</label>
                            <label htmlFor="hemorrhage7" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage7}`}</label>
                        </div>
                        <div className="input-group mb-2 align-items-center">
                            <label htmlFor="hemorrhage8" className="col-form-label text-light" >{`รกฝังแน่น (Accreta/percreta)`}</label>
                            <label htmlFor="hemorrhage8" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.hemorrhage8}`}</label>
                        </div>
                        <div className="input-group mb-2">
                            <label htmlFor="ph1Inp7" className="col-form-label text-light" >{`เกร็ดเลือดต่ำกว่า 70,000 (Platelet count < 70K)`}</label>
                            <label htmlFor="ph1Inp7" className="col-form-label text-light" >{`ค่าเกร็ดเลือด`}</label>
                            <label htmlFor="ph1Inp7" className="col-form-label text-light ms-2 me-2 " >{`${phaseone.phInp7}`}</label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center m-2">
                        <button type="submit" className="btn btn-warning ">
                            <CustomButton icon={<EditIcon/>} text={`ตกลง`}/>
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}
export const getServerSideProps = async(context)=>{
    const session = await getSession(context)
    const {req} = context
    const  per_id = decoding(getCookie('per_id',{req}))
    const tokenID = getCookie('tokenID',{req})
    
    if(!session){
        return{
            redirect:{
                destination:'/'
            }
        }
    }
    
    try {
        const response =  await axios.get(`${process.env.SERVICE_PHASEONE}/${per_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        return {
            props:{
                data:response.data,
                per_id,
                serviceURL: process.env.SERVICE_PHASEONE,
                tokenID
            }
        }
    }catch(err){console.log(err)}
    return{
        props:{
            data:{},
            per_id,
            serviceURL: process.env.SERVICE_PHASEONE,
            tokenID
        }
    }
  }
Phaseone.getLayout = function getLayout(page){
    return(
        <Layout>
            <Sidebar/>
            {page}
        </Layout>
    )
}