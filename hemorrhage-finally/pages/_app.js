import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css'
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return getLayout(
    <SessionProvider session={session} basePath="/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  )
}
