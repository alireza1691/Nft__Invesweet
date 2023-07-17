import '@/styles/globals.css'
import Head from "next/head";
import Main from "../pages/index"
import { MoralisProvider } from "react-moralis"
import Layout from 'components/Layout';
import { useState } from 'react';
import { ThirdwebProvider } from "@thirdweb-dev/react";
export default function App({ Component, pageProps }) {


  const [ user, setUser] = useState()
  const [ provider, setProvider] = useState()
  const [ signer, setSigner] = useState()
  const [ url, setUrl] = useState()
  const [ name, setName] = useState()

 // hello


  return(
    <ThirdwebProvider >
    <MoralisProvider /* appId={APP_ID} serverUrl={SERVER_URL} */initializeOnMount={false}>
    <Layout  setUser={setUser} setSigner={setSigner} setProvider={setProvider} signer={signer} >
      <Component {...pageProps} signer={signer} setUrl={setUrl} setName={setName} name={name} url={url} />
    </Layout>
    </MoralisProvider>
    </ThirdwebProvider>

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
