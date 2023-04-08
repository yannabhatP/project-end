import Layout from "@/components/Layout"
import React from "react"
import { getSession } from "next-auth/react"
import { decoding,calBMI, changeBMI } from '../lib/utils';
import { getCookie } from 'cookies-next';
import axios from "axios"
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router"
import ShowUser from "@/components/ShowUser";

function User({data,service,tokenID,typeUser}){
    const router = useRouter()
    const [user] = React.useState(data)
    const [type] = React.useState(typeUser)
    const addNewUser = async(e) => {
        e.preventDefault();
        const ev = e.target
        const userdata = {
            fname:ev.fname.value,
            lname:ev.lname.value,
            email:ev.email.value,
            type:ev.type.value
        }
        console.log(userdata)
        await axios.post(service,userdata,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.reload())
        .catch(err=>alert(err))
    }
    const deleteUser = async(user_id)=>{
        await axios.delete(`${service}/${user_id}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.reload())
        .catch(err=>alert(err))
    }
    const sendEditUser = async(userdata,email) => {
        await axios.put(`${service}/${email}`,userdata,{headers: { Authorization: `Bearer ${tokenID}` }})
        .then(()=>router.reload())
        .catch(err=>alert(err))
    }
    return(
        <div className="container" style={{marginTop:'140px'}}>
            <div className="card">
                <div className="card-header">
                    <div className="conatiner">
                        <div className="row">
                            <div className="col">
                                <label className="text text-dark fs-5 fw-bold">{`ID`}</label>
                            </div>
                            <div className="col">
                                <label className="text text-dark fs-5 fw-bold">{`Firstname`}</label>
                            </div>
                            <div className="col">
                                <label className="text text-dark fs-5 fw-bold">{`Lastname`}</label>
                            </div>
                            <div className="col">
                                <label className="text text-dark fs-5 fw-bold">{`email`}</label>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{`เพิ่ม`}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {user.map((data,index) => (
                        <ShowUser key={index} index={index} data={data} type={type} deleteUser={deleteUser} sendEditUser={sendEditUser}/>
                    ))}
                </div>
            </div>
            
            
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{`เพิ่มผู้ใช้ใหม่`}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="g-3 p-2" onSubmit={addNewUser}>
                                <div className="row p-2 m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputFirstName" className="form-control-plaintext">{`ชื่อ`}</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" id="inputFirstName" name="fname"/>
                                    </div>
                                </div>
                                <div className="row p-2 m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputLastName" className="form-control-plaintext">{`นามสกุล`}</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" id="inputLastName" name="lname"/>
                                    </div>
                                </div>
                                <div className="row p-2 m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputEmail" className="form-control-plaintext">{`อีเมล์`}</label>
                                    </div>
                                    <div className="col-auto">
                                        <input type="text" className="form-control" id="inputEmail" name="email"/>
                                    </div>
                                </div>
                                <div className="row p-2 m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputEmail" className="form-control-plaintext">{`ตำเเหน่ง`}</label>
                                    </div>
                                    <select className="form-select col-auto" aria-label="Default select example" name="type">
                                        <option defaultValue={`กรุณาเลือกตำเเหน่ง`} >{`กรุณาเลือกตำเเหน่ง`}</option>
                                        <option value="DEV">{`DEV`}</option>
                                        <option value="USER">{`USER`}</option>
                                        <option value="ADMIN">{`ADMIN`}</option>
                                    </select>
                                </div>
                                <div className="row p-2 m-2 g-2">
                                    <button type="submit" className="btn btn-outline-success" data-bs-dismiss="modal">{`เพิ่ม`}</button>
                                    <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">{`ปิด`}</button>
                                </div>
                            </form> 
                        </div>
                        <div className="modal-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async(context)=>{
    const session = await getSession(context)
    const {req} = context
    const  per_id = decoding(getCookie('per_id',{req}))
    const typeUser = getCookie('typeUser',{req})
    const tokenID = getCookie('tokenID',{req})
    
    if(!session ){
        return{
            redirect:{
                destination:'/'
            }
        }
    }
    try {
        const response =  await axios.get(`${process.env.SERVICE_USER}`,{headers: { Authorization: `Bearer ${tokenID}` }})
        return {
            props:{
                data:response.data,
                per_id,
                service: process.env.SERVICE_USER,
                tokenID,
                typeUser
            }
        }
    }catch(err){console.log(err)}
    return{
        props:{
            data:{},
            per_id,
            service: process.env.SERVICE_USER,
            tokenID,
            typeUser
        }
    }
}
User.getLayout = function getLayout(page){
    return (
      <Layout>
        <Sidebar/>
        {page}
      </Layout>
    )
}

export default User