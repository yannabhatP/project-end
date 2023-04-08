import Layout from "@/components/Layout"
import Sidebar from "@/components/Sidebar"
import GirlIcon from "@/icons/GirlIcon"
import HeaderPage from "@/components/HeaderPage"
import CustomButton from "@/components/CustomButton"
import UnsuccessIcon from "@/icons/UnsuccessIcon"
import SuccessIcon from "@/icons/SuccessIcon"
import { getSession } from "next-auth/react"
import { changeBirthDayToAge, decoding, getMinFormat,getMaxFormat } from "@/lib/utils"
import { getCookie } from 'cookies-next';
import axios from "axios"
import React from 'react';
import { useRouter } from "next/router"
import EditIcon from "@/icons/EditIcon"
export default function Personal({data,per_id,personService,tokenID}) {
    const [person_id] = React.useState(per_id)
    const [person] = React.useState(data)
    const [service] = React.useState(personService)
    const router = useRouter()

    const updateData = async(e)=>{
        e.preventDefault();
        router.push({pathname:"/update/personal"})
    }
    const submitData = async(e) => {
        e.preventDefault();
        const person = {
            id:person_id,
            gender:e.target.gender.value,
            fname:e.target.fName.value,
            lname:e.target.lName.value,
            bdate:e.target.birthday.value,
        }
        await axios.post(service,person,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.reload())
        .catch(err=>alert(err))
    }

    return (
        
        <div className="container" style={{marginTop:'140px'}}>
            <HeaderPage children={[<GirlIcon/>]} title={`ข้อมูลส่วนตัวผู้ป่วย`}/>
            {Object.keys(person).length === 0 &&
                <form className="justify-content-center" onSubmit={submitData}>
                    <div className="m-2 p-2 rounded" style={{background:'#7E7CEA'}}>
                        <div className="row g-3 gap-2 ">
                            <div className="col-auto">
                                <label htmlFor="gender" className="col-form-label text-light" >{'คำนำหน้า'}</label>
                                <select className="form-select "  aria-label="Default select example" name="gender" id="gender">
                                    <option value={"นาง"}>{"นาง"}</option>
                                    <option selected value={"นาวสาว"}>{"นางสาว"}</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="FName" className="col-form-label text-light" >{`ชื่อ`}</label>
                                <input className="form-control" id="FName" type={'text'} name={'fName'} required/>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="LName" className="col-form-label text-light" >{`นามสกุล`}</label>
                                <input className="form-control" id="LName" type={'text'} name={'lName'} required/>
                            </div>
                        </div>
                        <div className="row g-3 gap-2 m-2 p-2">
                            <div className="col-auto">
                                <label htmlFor="HNID" className="col-form-label text-light" >{`เลขประจำตัวโรงพยาบาล`}</label>
                                <input className="form-control" id="HNID" type={'text'} name={'id'} value={person_id} disabled/>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="birthday" className="col-form-label text-light" >{`วัน/เดือน/ปี เกิด`}</label>
                                <input className="form-control" id="birthday" type={'date'} name={'birthday'}  max={getMaxFormat()} required/>
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
            }{Object.keys(person).length !== 0 &&
                <form className="justify-content-center" onSubmit={updateData}>
                    <div className="m-2 p-2 rounded" style={{background:'#7E7CEA'}}>
                        <div className="row g-3 gap-2 m-2 p-2">
                            <div className="col-auto m-2">
                                <label htmlFor="FName" className="col-form-label text-light" >{`ชื่อ`}</label>
                                <label htmlFor="FName" className="col-form-label text-light ms-2" >{`${person.gender} ${person.fname}`}</label>
                            </div>
                            <div className="col-auto m-2">
                                <label htmlFor="LName" className="col-form-label text-light " >{`นามสกุล`}</label>
                                <label htmlFor="LName" className="col-form-label text-light ms-2" >{`${person.lname}`}</label>
                            </div>
                        </div>
                        <div className="row g-3 gap-2 m-2 p-2">
                            <div className="col-auto m-2">
                                <label htmlFor="HNID" className="col-form-label text-light" >{`เลขประจำตัวโรงพยาบาล`}</label>
                                <label htmlFor="HNID" className="col-form-label text-light ms-2" >{`${person.id}`}</label>
                            </div>
                            <div className="col-auto m-2">
                                <label htmlFor="birthday" className="col-form-label text-light " >{`อายุ`}</label>
                                <label htmlFor="birthday" className="col-form-label text-light ms-2" >{`${changeBirthDayToAge(person.bdate)}`}</label>
                            </div>
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
export const getServerSideProps = async(context) => {
    const session = await getSession(context)
    const {req} = context
    const per_id = decoding(getCookie(`per_id`,{req}))
    const tokenID = getCookie(`tokenID`,{req})
    if (!session) {
        return {
            redirect:{
                destination:'/'
            }
        }
    }
    const personService = `${process.env.SERVICE_PERSON}`
    try {
        const res = await axios.get(`${personService}/${per_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        return {
            props: {
                data :res.data,
                per_id,
                personService,
                tokenID
            }
        }
    } catch (error) {
        
    }
    return{
        props:{
            data:{},
            per_id,
            personService,
            tokenID
        }
    }

}
Personal.getLayout = function getLayout(page){
    return(
        <Layout>
            <Sidebar/>
            {page}
        </Layout>
    )
}