import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
function TabSidebar({children,title,url}){
    const router = useRouter()
    const linkPage = () => {
        if(url === `/signout`){
            signOut("google",{callbackUrl:"http://localhost:3000"})
            router.push({pathname:'/'})
        }else{
            router.push({pathname:url})
        }
    }
    return(
        <button type="button" className="btn d-flex align-items-center row border border-light border-3" onClick={linkPage}>
            <div className="col ">
                {children}
            </div>
            <div className="col">
                <p className="text-light">{`${title}`}</p>
            </div>

        </button>
    )
}
export default TabSidebar