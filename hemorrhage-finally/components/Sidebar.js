import ListIcon from "@/icons/ListIcon"
import CustomLogo from "@/images/CustomLogo"
import TabSidebar from "./TabSidebar"
import GirlIcon from "@/icons/GirlIcon"
import PostpartumIcon from "@/icons/PostPartumIcon"
import BabyIcon from "@/icons/BabyIcon"
import ResultIcon from "@/icons/ResultIcon"
import UserIcon from "@/icons/UserIcon"
import LogoutIcon from "@/icons/LogoutIcon"
import SearchIcon from "@/icons/SearchIcon"
import { useRouter } from "next/router"

export default function Sidebar(){
    const router = useRouter()
    return (
        <>
          <nav  className="navbar fixed-top " style={{background:"#041758"}}>
            <div className="container-fluid ">
                <div className="navbar-brand row align-items-center">
                    <div className="col" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                      <ListIcon/>
                    </div>
                    <div className="col">
                        <CustomLogo url={`https://healthserv.net/imgcntupload/hsp010504e210620022216.jpg`} w={50} h={50}/>
                        <CustomLogo url={`https://e7.pngegg.com/pngimages/493/54/png-clipart-faculty-of-engineering-kasetsart-university-research-kasetsart-university-thumbnail.png`} w={50} h={50}/>   
                    </div>
                    <div className="col">
                        <h6 className=" align-items-center text-light fw-bold">{`Postpartum Hemorrhage Prediction`}</h6>
                    </div>
                </div>
                <button className="btn btn-light d-flex align-items-center text-dark" onClick={()=>router.push({pathname:'/search'})}>
                        <SearchIcon/>
                        Search
                </button>
            </div>
          </nav>
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{background:"#041758"}}>
            <div className="offcanvas-header">
              <CustomLogo url={`https://healthserv.net/imgcntupload/hsp010504e210620022216.jpg`} w={50} h={50}/>
              <h5 className="offcanvas-title text-white" id="offcanvasExampleLabel">{"yaannabat Pliensak"}</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body  ">
              <div className="d-grid gap-3 mx-auto"> 
                <TabSidebar children={<GirlIcon/>} title={`ข้อมูลส่วนตัวผู้ป่วย`} url={`/personal`}/>
                <TabSidebar children={<PostpartumIcon/>} title={`ระยะเเรกรับ`} url={`/phaseone`}/>
                <TabSidebar children={<BabyIcon/>} title={`ระยะคลอด`} url={`/phasetwo`}/>
                <TabSidebar children={<ResultIcon/>} title={`ผลลัพธ์`} url={`/result`}/>
                <TabSidebar children={<UserIcon/>} title={`รายชื่อผู้ใช้`} url={`/user`}/>
                <TabSidebar children={<LogoutIcon/>} title={`ออกจากระบบ`} url={`/signout`}/>
              </div>
              
              
            </div>
            
          </div>
        </>
    )
}