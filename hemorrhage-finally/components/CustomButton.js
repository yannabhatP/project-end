 
 
 export default function CustomButton({icon,text}) {
   return (
     <div className="align-items-center row" >
        <div className="col ">
            {icon}
        </div>
        <div className="col me-2">
            <h4 className="text-light">{`${text}`}</h4>
        </div>
     </div>
   )
 }
 