import React from 'react'
import axios from 'axios'
import { useRouter } from "next/router"

export default function DeleteModal({user_id,ID,deleteUser}) {
    const router = useRouter()
    
    return (
        <div className="modal fade" id={ID} data-bs-backdrop="static"  tabIndex="-1"  data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{`คุณต้องการลบผู้ใช้ ใช่หรือไม่`}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-success" onClick={()=>deleteUser(user_id)} data-bs-dismiss="modal" >{`ใช่`}</button>
                        <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">{`ไม่`}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
