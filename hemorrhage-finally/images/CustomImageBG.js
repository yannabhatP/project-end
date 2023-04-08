import Image from "next/image";

function CustomImageBG ({url,h,w,o,br}) {
    const  styleImage = {
        "opacity":o,
        "borderRadius":br
    }
    return <Image src={url} width={w} height={h} style={styleImage} alt={`default`}/>
}

export default CustomImageBG