import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, ConnectButton } from 'web3uikit'

const Navbar = () => {

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
    <Link href='/'style={{"marginLeft":"12px","marginRight":"30px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Home</Link>
    <Link href='/Create' style={{"marginLeft":"12px","marginRight":"30px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Create</Link>
    <Link href='/Mint'style={{"marginLeft":"12px","marginRight":"30px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Mint</Link>
    <Link href='/' style={{"marginLeft":"12px","marginRight":"30px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >Dashboard</Link>
    <Link href='/'style={{"marginLeft":"12px","marginRight":"30px", "color": "#467889" ,"fontSize":"20px","textDecorationLine":"blink","padding":"10px 20px"}} >About</Link>
    
    </div>
    <div  className='connectButton'  >
    <button>Connect</button>
    
    </div>
    </nav>



  )
}

export default Navbar
