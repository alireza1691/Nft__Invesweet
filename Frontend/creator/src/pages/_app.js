import '@/styles/globals.css'
import Head from "next/head";
import Header from "../../components/Header"
import Main from "../pages/index"
import { MoralisProvider } from "react-moralis"
import Layout from 'components/Layout';
import { useState } from 'react';
// import { NotificationProvider } from "web3uikit"

// let {connectWallethandler, isConnected} = Main

// const APP_ID = process.env.NEXT_PUBLIC_APP_ID
// const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default function App({ Component, pageProps }) {


  // const [ isConnected, setIsConnected] = useState(false)
  const [ user, setUser] = useState()
  const [ provider, setProvider] = useState()
  const [ signer, setSigner] = useState()




  return(
    <MoralisProvider /* appId={APP_ID} serverUrl={SERVER_URL} */initializeOnMount={false}>
    <Layout  setUser={setUser} setSigner={setSigner} setProvider={setProvider} signer={signer} >
      <Component {...pageProps} signer={signer}/>
    </Layout>
    </MoralisProvider>

  )
  // return(
  //   <>
  //   <div>
  //   <Head>
  //       <title>Invesweet</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <link rel="icon" href="/favicon.ico" />
  //   </Head>
  //   <MoralisProvider /* appId={APP_ID} serverUrl={SERVER_URL} */initializeOnMount={false}>
  //     <Component {...pageProps}/>
  //   </MoralisProvider>
  //   </div>
  //   </>
  //   )
}
