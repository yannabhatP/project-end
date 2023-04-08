import Image from "next/image";
const myLogo = ({src,width,quality})=>{
    return `${src}?w=${width}&q=${quality || 75}`
}
const styleMyLogo = {
    "borderRadius":"50px",
}
function CustomLogo ({url,h,w}) {
    return <Image loader={myLogo} style={styleMyLogo} src={url} height={h} width={w} alt={'default'}/>
}
export default CustomLogo