import Head from "next/head";
import  {SessionProvider} from "next-auth/react"
export default function Layout({children,session}) {
    return(
        <SessionProvider session={session}>
            <Head>
                <title>{`PPH Prediction`}</title>
            </Head>
            <main >{children}</main>
        </SessionProvider>
    )
}