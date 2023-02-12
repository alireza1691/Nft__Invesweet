import Head from 'next/head'
import Image from 'next/image'
// import "../public/Invesweet.png";
import styles from '../src/styles/Home.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'
import { React ,useState, useEffect } from 'react'
// import logo from "../public/invesweett.png"
// import { ConnectButton } from "web3uikit"



const Header = ({conncetWalletHandler, isConnected}) =>{


    return (
        
        <div className={styles.container}>
          <div  style={{'backgroundColor':'black'}}>
            <div className='box ' style={{'zIndex':'10','backgroundColor':'black'}}>
              <nav className='navbar' style={{'zIndex':'10','backgroundColor':'black'}}>
              {/* <img src={"/invesweett.png"} alt="Logo" width="90px" height="10px" className='mr-6'></img> */}
                <div className="navbar-end">
                  { isConnected ? (<button  className='button is-white is-outlined' onClick={() => conncetWalletHandler()} disabled>Connected</button>) : (<button onClick={() =>conncetWalletHandler()} className='button is-white is-outlined' >
                    Connect Wallet
                  </button>) }
                  {/* <ConnectButton></ConnectButton> */}
                </div>
              </nav>
            </div>
          </div>
        </div>
        

    
    )
  }
  
  export default Header
  