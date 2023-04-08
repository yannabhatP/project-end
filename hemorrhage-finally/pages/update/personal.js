import Layout from "@/components/Layout"
import Sidebar from "@/components/Sidebar"
import GirlIcon from "@/icons/GirlIcon"
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

export default function UpdatePersonal({data,per_id,personService,tokenID}) {
    const [person_id] = React.useState(per_id)
    const [person] = React.useState(data)
    const [service] = React.useState(personService)
    const router = useRouter()
    
    const changePerson = async(event) =>{
        event.preventDefault();
        const person = {
          id:person_id,
          gender:event.target.gender.value,
          fname:event.target.fName.value,
          lname:event.target.lName.value,
          bdate:event.target.birthday.value,
        }
        await axios.put(`${personService}/${person_id}`,person,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.push({pathname:'/personal'}))
        .catch(err => alert(err))
        
      }


    return (
        
        <div className="container" style={{marginTop:'140px'}}>
            <HeaderPage children={[<GirlIcon/>]} title={`ข้อมูลส่วนตัวผู้ป่วย`}/>
                <form className="justify-content-center" onSubmit={changePerson}>
                    <div className="m-2 p-2 rounded" style={{background:'#AAA8F0'}}>
                        <div className="row g-3 gap-2 ">
                            <div className="col-auto">
                                <label htmlFor="gender" className="col-form-label text-light" >{'คำนำหน้า'}</label>
                                <select className="form-select "  aria-label="Default select example" name="gender" id="gender" defaultValue={person.gender}>
                                    <option value={"นาง"}>{"นาง"}</option>
                                    <option value={"นาวสาว"}>{"นางสาว"}</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="FName" className="col-form-label text-light" >{`ชื่อ`}</label>
                                <input className="form-control" id="FName" type={'text'} name={'fName'} defaultValue={data.fname}/>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="LName" className="col-form-label text-light" >{`นามสกุล`}</label>
                                <input className="form-control" id="LName" type={'text'} name={'lName'} defaultValue={data.lname}/>
                            </div>
                        </div>
                        <div className="row g-3 gap-2 m-2 p-2">
                            <div className="col-auto">
                                <label htmlFor="HNID" className="col-form-label text-light" >{`เลขประจำตัวโรงพยาบาล`}</label>
                                <input className="form-control" id="HNID" type={'text'} name={'id'} value={person_id} disabled/>
                            </div>
                            <div className="col-auto">
                                <label htmlFor="birthday" className="col-form-label text-light" >{`วัน/เดือน/ปี เกิด`}</label>
                                <input className="form-control" id="birthday" type={'date'} name={'birthday'} defaultValue={data.bdate} disabled/>
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
UpdatePersonal.getLayout = function getLayout(page){
    return(
        <Layout>
            <Sidebar/>
            {page}
        </Layout>
    )
}