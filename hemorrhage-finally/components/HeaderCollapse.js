
export default function HeaderCollapse({icon,title}) {
  return (
    <div className="row row-cols-auto d-flex justify-content-around align-items-center p-4 m-2 rounded" style={{background:'#4947A3'}}>
        <div className="col">
            <h5 className="text-light">{`${title}`}</h5>
        </div>
        <div className="col">
            {icon}
        </div>
    </div>
  )
}
