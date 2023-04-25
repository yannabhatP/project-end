import React from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

export default function ShowUser({data,index,deleteUser,sendEditUser,type}) {
    const [user] = React.useState(data)
    const [idx] = React.useState(index)
    
    return (
        <>
            <div className="conatiner list-group m-1 p-1" key={index}>
                <div className="list-group-item ">
                    <div className='row'>
                        <div className="col-3">
                            <label className="text text-start text-dark fs-6 fw-bloder">{`${user.fname}`}</label>
                        </div>
                        <div className="col-3">
                            <label className="text text-start text-dark fs-6 fw-bloder">{`${user.lname}`}</label>
                        </div>
                        <div className="col-3">
                            <label className="text text-start text-dark fs-6 fw-bloder">{`${user.email}`}</label>
                        </div>
                    </div>
                    
                    {type ==='DEV' &&
                        <div className="col-2">
                            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target= {`#staticBackdropE${idx}`} > {`เเก้ไข`}</button>
                        </div>
                    }
                    {type === 'ADMIN' &&
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={`#staticBackdropD${idx}`}>{`ลบ`}</button>
                            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target= {`#staticBackdropE${idx}`}>{`เเก้ไข`}</button>
                        </div>
                    }
                </div>
            </div>
            {type ==='DEV' &&
                <EditModal user={user} ID={`staticBackdropE${idx}`} sendEditUser={sendEditUser}/>
            }
            {type === 'ADMIN' &&
                <>
                    <DeleteModal user_id={user.id} ID={`staticBackdropD${idx}`} deleteUser={deleteUser} />
                    <EditModal user={user} ID={`staticBackdropE${idx}`} sendEditUser={sendEditUser}/>
                </>
            }
            <DeleteModal user_id={user.id} ID={`staticBackdropD${idx}`} deleteUser={deleteUser} />
            <EditModal user={user} ID={`staticBackdropE${idx}`} sendEditUser={sendEditUser}/>
        </>
    )
}
