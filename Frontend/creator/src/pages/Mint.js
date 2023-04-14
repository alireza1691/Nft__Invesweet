import { Button } from 'bootstrap'
// import e from 'express'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import fs from 'fs';
// import * as fs from 'fs';
// var fs = require('fs');

export default function Mint() {

  const router = useRouter()

  const [contractRoute, setContractRoute] = useState()
  // let contractAddress

  function enterContractAddress() {
    router.push(`/mint/${contractRoute}`)
  }

  useEffect (() => {
    console.log(contractRoute);

  },[contractRoute])

  return (
    <div className='boxCreate'>
        <div>
            <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Create your NFTs</h6>
            <input className='input' placeholder='Enter/Paste contract address...' style={{"color":"black","width":"50%","margin":"5px"}} onChange={(e) => setContractRoute(e.target.value)}></input>
            {/* <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px","marginTop":"7px"}} >hi</button> */}
            {/* <div class="dropdown">
                <button class="dropbtn">Max</button>
                <div class="dropdown-content">
                    <a href="#">Limit</a>
                    <a href="#">Unlimit</a>
                </div>
            </div> */}
            <div className='submitbtn'>
            <button onClick={enterContractAddress()} >Submit</button>
            </div>
        </div>
        
    </div>
  )
}

