import Layout from "@/components/Layout"
import Topbar from "@/components/Topbar"
import CustomImageBG from "@/images/CustomImageBG"
import CustomLogo from "@/images/CustomLogo"
import ImageAss from "/public/image/OBGN.png"
import GoogleIcon from "@/icons/GoogleIcon"
import { signIn } from "next-auth/react"
export default function Home() {
  return (
    <div className="container" style={{marginTop:'140px'}}>
        <div className="d-flex justify-content-center">
          <CustomLogo url={`https://my.ku.th/img/KU_Logo_PNG.png`} w={110} h={130}/> 
        </div>
        <div className="d-flex justify-content-center">
           <p className="fst-italic" style={{marginTop:'1rem',color:'#525953'}}>{`Postpartum Hemorrhage `}</p>
        </div>
        <div className="d-flex justify-content-center">
          <CustomImageBG url={ImageAss} w={456} h={320} o={'100%'} br={"10%"}/>
        </div>
        <div className="d-flex justify-content-center m-5">
          <button type="button" className="btn d-flex align-items-center" onClick={() => signIn("google",{callbackUrl:"http://eng.src.ku.ac.th:3002/search"})} style={{background:'#4947A3'}}>
            <GoogleIcon/>
            <p style={{marginTop:'1rem',color:'white',marginLeft:'1.5rem'}}>{`เข้าสู่ระบบด้วย google`}</p>
          </button>
        </div>
    </div>
  )
}

Home.getLayout = function getLayout(page){
  return (
    <Layout>
      <Topbar/>
      {page}
    </Layout>
  )
}
