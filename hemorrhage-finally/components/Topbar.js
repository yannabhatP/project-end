import Image from "next/image"
import CustomLogo from "@/images/CustomLogo"
const myLogo = ({src,width,quality})=>{
    return `${src}?w=${width}&q=${quality || 75}`
}
const styleMyLogo = {
    "borderRadius":"50px",
}

export default function Topbar(){
    return(
        <nav  className="navbar fixed-top " style={{background:"#041758"}}>
            <div className="container-fluid ">
                <div className="navbar-brand row align-items-center">
                    <div className="col">
                        <CustomLogo url={`https://healthserv.net/imgcntupload/hsp010504e210620022216.jpg`} w={50} h={50}/>
                        <CustomLogo url={`https://e7.pngegg.com/pngimages/493/54/png-clipart-faculty-of-engineering-kasetsart-university-research-kasetsart-university-thumbnail.png`} w={50} h={50}/>   
                    </div>
                    <div className="col">
                        <h6 className=" align-items-center text-light fw-bold">{`Postpartum Hemorrhage Prediction`}</h6>
                    </div>
                </div>
            </div>
        </nav>
    )
}