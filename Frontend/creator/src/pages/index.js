import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bulma/css/bulma.css'
import {BigNumber, ethers} from 'ethers'
import { useState, useEffect ,React} from 'react'
import ERC20CreatorAddress from "../../Blockchain/ERC20CreatorAddress.json"
import ERC721CreatorAddress from "../../Blockchain/ERC721CreatorAddress.json"
import ERC20CreatorAbi from "../../Blockchain/ERC20Creator.json"
import ERC721CreatorAbi from "../../Blockchain/ERC721Creator.json"

// import Moralis from 'moralis';
// import { EvmChain } from "@moralisweb3/evm-utils";

import { _, fill } from 'lodash'
// import logo from "../public/invesweet.png"
import Header from "../../components/Header"
import 'bootstrap/dist/css/bootstrap.css'

// Moralis.start({
//   apiKey: 'YOUR_API_KEY',
//   });





export default function Home() {

const [isConnected, setIsConnected] = useState(false);
const [user, setUser] = useState()
const [provider, setProvider] = useState();
const [name, setName] = useState("");
const [symbol, setSymbol] = useState("");
const [price, setPrice] = useState(0);
const [url, setUrl] = useState("");
const [description, setDescription] = useState("");
const [maxSupply, setMaxSupply] = useState(0)
const [limitDisabler, setLimitDisabler] = useState(1)

let number

function changeFunc() {
  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  setLimitDisabler(selectedValue)
  }


  const conncetWalletHandler = async () => {
    console.log("call");      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        setIsConnected(true)
        setUser(accounts[0])
        console.log(`${accounts[0]} connected!`);
        let connectedProvider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(connectedProvider)
      } catch (error) {
        console.log(error);
      }
    }
  }

  // const contractERC721Create = async (price,max,name,symbol,requestfrom,uri) => {
    const contractERC721Create = async () => {
    let uri = {"name": name.toString(),
    "description": description.toString(),
    "image": url.toString(),
  }
    const contract = new ethers.Contract(ERC721CreatorAddress,ERC721CreatorAbi,provider)
    await contract.createCollection(name,symbol,price,maxSupply,user,uri,{value: ethers.utils.parseEther("0.01")})
  }

  const [tabHandler, setTabHandler] = useState("tab-erc721")
  useEffect(() => {
    console.log(tabHandler);

   }, [tabHandler])



  return (
    <div className='' style={{"background":'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(50,0,84,1) 40%, rgba(0,130,157,1) 100%)'}} >
    {/* <div className={styles.container}> */}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header conncetWalletHandler={conncetWalletHandler} isConnected={isConnected} />
        {/* <Image style={{'zIndex': '10', 'objectFit':'cover','fle':'fill'}}  src='/invesweett.png' layout="fill" objectFit='cover'/> */}
        <div>
        <section style={{ 'zIndex':'10'}}>
        <div className="tabs is-fullwidth pt-3 mr-4 ml-5 is-centered has-text-white" style={{ 'zIndex':'10'}} >
            <ul style={{ 'zIndex':'10'}}>
              <li className={tabHandler == 'tab-swap' ? "is-active" : ""} data-target= "tab-erc721" onClick={(e) =>setTabHandler("tab-swap")} ><a>Swap</a></li>
              <li className={tabHandler == 'tab-pool' ? "is-active" : ""} data-target= "tab-pool" onClick={(e) =>setTabHandler("tab-pool")} ><a>Pools</a></li>
              <li className={tabHandler == 'tab-faucet' ? "is-active" : ""} data-target= "tab-faucet" onClick={(e) =>setTabHandler("tab-faucet")} ><a>Faucet</a></li>
              <li className={tabHandler == 'tab-docs' ? "is-active" : ""} data-target= "tab-docs" onClick={(e) =>setTabHandler("tab-docs")} ><a>Airdrop</a></li>
            </ul> 
          </div>
          </section>
          </div>
          <main className={styles.main}>
            
            <div className='column is-one-third'>
            <section style={{'zIndex':'20' , "width": "400px", 'justifyContent':'center','justifyItems':'center','borderRadius':'20px'}}>
              <div className='box '>
                <div id=' tab-content'>
                  <div className={tabHandler == 'tab-erc721' ? "" : "is-hidden"} id='tab-erc721'>
                  <div className="field">
                    <label className="label">Create your collection</label>
                    <div className="control">
                    {/* <h6 className='mt-4'>Selected token amount:</h6> */}
                      <div>
                        <nav className='navbar'>
                          <div className=" my-1">
                            <h6 style={{"fontSize":'14px'}}>Write name and symbol of your collection:</h6>
                          <input style={{'width':'200px'}} className="input" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
                          </div>
                          <div className=" my-1">
                          <input style={{'width':'200px'}} className="input" type="text" placeholder="Enter symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)}/>
                          </div>
                          <p6>If you want to collection be limited choose and enter amount:</p6>
                          <div className="select navbar my-1" > 
                          
                          {limitDisabler == 2 ? <input style={{'width':'200px', 'marginRight':'4px'}} className="input" type="text" placeholder="Enter amount" value={number} onChange={(e) => setMaxSupply(e.target.value)} disabled/> : <input style={{'width':'200px','marginRight':'4px'}} className="input" type="text" placeholder="Enter amount" value={number} onChange={(e) => setMaxSupply(e.target.value)}/>}
                          <select style={{'width':'120px','marginLeft':'4px'}}  id="selectBox" onChange={()=>changeFunc()}>
                            <option value={1}>Limit</option>
                            <option value={2}>Unlimit</option>
                          </select>
                          </div>
                          <div className="  my-1">
                          <input className="input" type="text" placeholder="Enter price" onChange={(e) => setPrice(e.target.value)}/>
                          </div>
                          <div className="  my-1">
                          <input className="input" type="text" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}/>
                          </div>
                          <div className=" my-1">
                          <input className="input" type="text" placeholder="Enter image URL" onChange={(e) => setUrl(e.target.value)}/>
                          </div>
                        </nav>
                      </div>
                      {/* <h6 className='mt-4'>You will receive:</h6> */}
                      {/* <div> */}
                        {/* <nav className='navbar'>
                        <div className="select navbar-end">
                        <input className="input" type="text" placeholder="0" />
                          <select>
                            <option>USDC</option>
                            <option>ETH</option>
                          </select>
                        </div>
                        </nav> */}
                    {/* </div> */}
                    {/* <p className="help navbar-end">Maximim slippage:      1%</p> */}
                    </div>
                  </div>
                  <button onClick={() => contractERC721Create()} className='button is-dark is-outlined is-centered mr-4'>Approve</button>
                  {/* <button onClick={() => approve} className='button is-dark is-centered' >Transact</button> */}
                  </div>
                  <div className={tabHandler == 'tab-pool' ? "" : "is-hidden"} id='tab-pool' >
                  <div className="field">
                    <label className="label">Pool</label>
                    <div className="control">
                    {/* <h6 className='mt-4'>Selected token amount:</h6> */}
                      <div>
                        <nav className='navbar'>
                          <div className="select navbar-end">
                          <input className="input" type="text" placeholder="Enter your amount..."/>
                          <select>
                            <option>ETH</option>
                            <option>USDC</option>
                          </select>
                          </div>
                        </nav>
                      </div>
                      {/* <h6 className='mt-4'>You will receive:</h6> */}
                      <div>
                        <nav className='navbar'>
                        <div className="select navbar-end">
                        <input className="input" type="text" placeholder="0"/>
                          <select>
                            <option>USDC</option>
                            <option>ETH</option>
                          </select>
                        </div>
                        </nav>
                    </div>
                    <p className="help navbar-end">APY:      11%</p>
                    </div>
                  </div>
                  <button onClick={() => ""} className='button is-dark is-outlined is-centered mr-4'>Approve</button>
                  <button onClick={() => approve} className='button is-dark is-centered' >Provide</button>
                  </div>
                  <div className={tabHandler == 'tab-faucet' ? "" : "is-hidden"} id='tab-faucet' >
                  <div className="field">
                    <label className="label">Claim test token</label>
                  </div>
                  <button onClick={() => ""} className='button is-dark is-outlined is-centered mt-2'>Submit</button>
                  <p className="help">Note that these tokens have not any real value</p>
                  </div>
                  <div className={tabHandler == 'tab-docs' ? "" : "is-hidden"} id='tab-docs' >
                  <div className="field">
                    <label className="label">Claim Airdrop</label>
                  </div>
                  <button onClick={() => ""} className='button is-dark is-outlined is-centered mt-2'>Check eligibility</button>
                
                  <button onClick={() => ""} className='button is-dark is-outlined is-centered mt-2 ml-2' disabled>Claim</button>
                  <p className="help">Before claim make sure you are eligible!</p>
                  </div>
                </div>
              </div>
              </section>
            </div>
            
          </main>
      <footer className={styles.footer}>
        <a
          className='has-text-black'
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Alireza Haghshenas
        </a>
      </footer>
    </div>
    // </div>
    
  )
}