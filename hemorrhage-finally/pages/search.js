import Layout from "@/components/Layout"
import Topbar from "@/components/Topbar"
import SearchIcon from "@/icons/SearchIcon"
import ImageAss from "/public/image/OBGN.png"
import CustomImageBG from "@/images/CustomImageBG"
import { useRouter } from "next/router"
import { setCookie } from "cookies-next"
import { encoding,decoding } from "@/lib/utils"
import { getSession } from "next-auth/react"
import axios from "axios"

function Search({tokenID,user}){
    const router =  useRouter()
    setCookie('tokenID',tokenID)
    setCookie('typeUser',user.data.type)
    const submitHN = async(e) => {
        e.preventDefault()
        const ev = e.target
        setCookie(`per_id`,encoding(ev.gsearch.value))
        router.push({pathname:`/personal`})
    }
    
    return(
        <>
            <div className="container" style={{marginTop:'140px',background:'#4947A3'}}>
                <form className="d-flex m-2 p-3 rounded" onSubmit={submitHN} >
                    <input className="form-control me-2" type="search" placeholder="Search" name="gsearch" aria-label="Search"/>
                    <button className="btn btn-light d-flex align-items-center text-dark" type="submit">
                        <SearchIcon/>
                        Search
                    </button>
                </form>
            </div>
            <div className="d-flex justify-content-center mt-5 pt-5">
                <CustomImageBG url={ImageAss} w={700} h={560} o={'100%'} br={"10%"}/>
            </div>
        </>

        
        
    )
}
export const getServerSideProps = async(context) => {
    const session = await getSession(context)
    const {req} = context
    var tokenID
    var user

    if (!session) {
        return {
            redirect:{
                destination:'/'
            }
        }
    }
    
    try {
        const res = await axios.get(`${process.env.SERVICE_AUTH}/${session.user.email}`)
        tokenID = res.data.token
        user = res.data
        return {
            props:{
                tokenID,
                user
            }
        }
        
    } catch (error) {
        console.log(error)
    }
    return{
        redirect:{
            destination:'/'
        }
    }

}
Search.getLayout = function getLayout(page){
    return (
      <Layout>
        <Topbar/>
        {page}
      </Layout>
    )
}

export default Search