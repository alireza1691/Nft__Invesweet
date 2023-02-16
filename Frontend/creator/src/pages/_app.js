import '@/styles/globals.css'
import Header from "../../components/Header"
import Main from "../pages/index"
// import { MoralisProvider } from "react-moralis"
// import { NotificationProvider } from "web3uikit"

// let {connectWallethandler, isConnected} = Main

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function App({ Component, pageProps }) {
  return(
    <>
    {/* // <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}> */}
      <Component {...pageProps}/>
    {/* // </MoralisProvider> */}
    </>
    )
}
