
export default function HeaderPage({children,title}) {
  return (
    <div className="row row-cols-auto d-flex justify-content-center align-items-center p-4 m-2 rounded" style={{background:'#4947A3'}}>
        <div className="col">
            {children[0]}
        </div>
        <div className="col">
            <h5 className="text-light">{`${title}`}</h5>
        </div>
    </div>
  )
}
