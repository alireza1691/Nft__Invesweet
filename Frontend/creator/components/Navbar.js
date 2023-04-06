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
    <Link href='/'style={{"marginLeft":"12px","marginRight":"60px","fontSize":"20px","color":"black"}} >Home</Link>
    <Link href='/' style={{"marginLeft":"12px","marginRight":"60px"}} >About</Link>
    <Link href='/' style={{"marginLeft":"12px","marginRight":"60px"}} >Orders</Link>
    <ConnectButton></ConnectButton>
    </nav>
  )
}
