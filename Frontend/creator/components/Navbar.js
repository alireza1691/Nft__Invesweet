import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, ConnectButton } from 'web3uikit'

export default function Navbar() {
  return (
    <nav>
    <div className='logo'>
        {/* <h1>Fou Coffee</h1> */}
        {/* <img src='' alt=''/> */}
        <Image src="/logo.png" width={128} height={128} alt="Is loading"/>
    </div>
    {/*  */}
    <div className='dropDown'>
      {/* ,"fontSize":"20px","color":"black","backgroundColor":"#EBEBDF","fontStyle":"normal","border":"solid","borderColor":"#DDDDCF","padding":"10px 10px","textDecorationLine":"blink" */}
    <Link href='/'style={{"marginLeft":"12px","marginRight":"60px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Home</Link>
    <Link href='/Create' style={{"marginLeft":"12px","marginRight":"60px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Create</Link>
    <Link href='/' style={{"marginLeft":"12px","marginRight":"60px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Orders</Link>
    
    </div>
    <div  className='connectButton'  >
    <button >Connect</button>
    </div>
    {/* <ConnectButton ></ConnectButton> */}
    </nav>
  )
}
