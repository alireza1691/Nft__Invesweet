import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, ConnectButton } from 'web3uikit'
import { useState } from 'react'
import { ethers } from 'ethers'

const Navbar = ({setUser ,setSigner , setProvider }) => {


  const [ isConnected, setIsConnected] = useState(false)
  // const [ user, setUser] = useState()
  // const [ provider, setProvider] = useState()
  // const [ signer, setSigner] = useState()




  const conncetWalletHandler = async () => {
    console.log("call");
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        setUser(accounts[0]);
        console.log(`${accounts[0]} connected!`);
        let connectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setProvider(connectedProvider);
        console.log(connectedProvider);

        // let signer = connectedProvider.getSigner()
        const _signer = connectedProvider.getSigner(accounts[0]);
        setSigner(_signer);
        console.log(_signer);

        const chainId = await _signer.getChainId();
        console.log("chain id", chainId);
      } catch (error) {
        console.log(error);
      }
    }
  };


  // function openForm() {
  //   // document.getElementById("myForm").style.display = "block";
  //   console.log("fun called");
  // }
  
  // function closeForm() {
  //   document.getElementById("myForm").style.display = "none";
  //   console.log("fun called");
  // }

  return (
    <nav style={{"width":"95%"}}>
    <div className='logo'>
        {/* <h1>Fou Coffee</h1> */}
        {/* <img src='' alt=''/> */}
        <Image src="/logo.png" width={128} height={128} alt="Is loading"/>
    </div>
    {/*  */}
    <div className='dropDown' style={{"width":"50%"}}>
      {/* ,"fontSize":"20px","color":"black","backgroundColor":"#EBEBDF","fontStyle":"normal","border":"solid","borderColor":"#DDDDCF","padding":"10px 10px","textDecorationLine":"blink" */}
    <Link href='/'style={{"marginLeft":"auto","marginRight":"auto", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Home</Link>
    <Link href='/Create' style={{"marginLeft":"auto","marginRight":"auto", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Create</Link>
    <Link href='/Mint'style={{"marginLeft":"auto","marginRight":"auto", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Mint</Link>
    <Link href='/Dashboard' style={{"marginLeft":"auto","marginRight":"auto", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Dashboard</Link>
    <Link href='/About'style={{"marginLeft":"auto","marginRight":"auto", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >About</Link>
    
    </div>
    <div  className='connectButton'  >
      { isConnected ? (<button style={{"backgroundColor":"#467889","color":"#E9F3F7"}} disabled>Connected</button>) :
    (<button onClick={() =>conncetWalletHandler()}>Connect</button>)
  }
    </div>
    </nav>



  )
}

export default Navbar
