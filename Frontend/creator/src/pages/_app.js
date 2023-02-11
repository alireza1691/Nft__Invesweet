import '@/styles/globals.css'
import Header from "../../components/Header"
import Main from "../pages/index"

export default function App({ Component, pageProps }) {
  return(
    <>
    <Header/>
      <Component {...pageProps}/>
    </>
    )
}
