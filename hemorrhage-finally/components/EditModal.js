import React from 'react'

export default function EditModal({user,ID,sendEditUser}) {
    const editUser = (e) => {
        e.preventDefault();
        const ev = e.target
        const userdata = {
            fname:ev.fname.value,
            lname:ev.lname.value,
        }
        
        sendEditUser(userdata,user.email)
    }
    return (
        <div className="modal fade" id={ID}  tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{`แก้ไขข้อมูลของผู้ใช้`}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="g-3 p-2" onSubmit={editUser}>
                            <div className="row p-2 m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputFirstName" className="form-control-plaintext">{`ชื่อ`}</label>
                                </div>
                                <div className="col-auto">
                                    <input type="text" className="form-control" id="inputFirstName" name="fname" defaultValue={user.fname}/>
                                </div>
                            </div>
                            <div className="row p-2 m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputLastName" className="form-control-plaintext">{`นามสกุล`}</label>
                                </div>
                                <div className="col-auto">
                                    <input type="text" className="form-control" id="inputLastName" name="lname" defaultValue={user.lname}/>
                                </div>
                            </div>
                            <div className="row p-2 m-2 g-2">
                                <button type="submit" className="btn btn-outline-success" data-bs-dismiss="modal">{`ตกลง`}</button>
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">{`ปิด`}</button>
                            </div>
                        </form> 
                    </div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </div>
  )
}
