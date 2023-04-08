import React from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'

export default function ShowUser({data,index,deleteUser,sendEditUser,type}) {
    const [user] = React.useState(data)
    const [idx] = React.useState(index)
    
    return (
        <>
             <div className="conatiner" key={index}>
                <div className="row">
                    <div className="col">
                        <label className="text text-dark fs-5 fw-bloder"> {`${user.id}`}</label>
                    </div>
                    <div className="col">
                        <label className="text text-dark fs-5 fw-bloder">{`${user.fname}`}</label>
                    </div>
                    <div className="col">
                        <label className="text text-dark fs-5 fw-bloder">{`${user.lname}`}</label>
                    </div>
                    <div className="col">
                        <label className="text text-dark fs-5 fw-bloder">{`${user.email}`}</label>
                    </div>
                    {type ==='DEV' &&
                        <div className="col-auto">
                            <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target= {`#staticBackdropE${idx}`}/*data-bs-target="#staticBackdrop2"*/ > {`เเก้ไข`}</button>
                        </div>
                    }
                    {type === 'ADMIN' &&
                        <>
                            <div className="col-auto">
                                <button type="button" className="btn btn-outline-danger"  data-bs-toggle="modal" data-bs-target={`#staticBackdropD${idx}`}>{`ลบ`}</button>
                            </div>
                            <div className="col-auto">
                                <button type="button" className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target= {`#staticBackdropE${idx}`}/*data-bs-target="#staticBackdrop2"*/ > {`เเก้ไข`}</button>
                            </div>
                        </>
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
