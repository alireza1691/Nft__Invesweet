import { Button } from 'bootstrap'
// import e from 'express'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { xor } from 'lodash'
import { ethers } from 'ethers'
import { Contract } from 'web3uikit'
import ERC721V1ABI from '../../Blockchain/ERC721V1.json'
// import fs from 'fs';
// import * as fs from 'fs';
// var fs = require('fs');

export default function Mint({ setUrl, setName, signer, setAddr}) {

  const router = useRouter()

  const [disabler, setDisabler] = useState(true)
  const [contractAdd, setContractAdd] = useState('')
  const [message, setMessage] = useState('Enter Address...')

  // function setAddress(param) {
  //   address = param
  // }

  // addr:   0x5af0b1dd6759b01f4341175e947b3bca905a7cab


  async function enterContractAddress() {
    // add require
    // setAddr(contractAdd)
    const inst = new ethers.Contract(contractAdd, ERC721V1ABI, signer)
    console.log(inst);
    const name = await inst.name()
    console.log( name);
    setName(name)
    const uri = await inst.symbol()
    console.log(uri.toString());
    setUrl(uri)
    router.push(`/mint/${contractAdd}`)
  }

  async function mint () {
    const contractInstant = new ethers.Contract()
  }

  useEffect (() => {
    console.log(contractAdd);
    if (contractAdd.length > 0) {
      if ( contractAdd.indexOf(0) == 0 && contractAdd.length == 42 ) {
        setDisabler(false)
        setMessage('Click on submit to check contract address')
      } else {
        setDisabler(true)
        setMessage('Address not valid')
      }
    } else {
      setDisabler(true)
      setMessage('Enter Address...')
    }
    
  },[contractAdd])

  return (
    <div className='boxCreate'>
        <div>
            <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Mint from:</h6>
            <input className='input' placeholder='Enter/Paste contract address...' style={{"color":"black","width":"60%","margin":"5px"}} onChange={(e) => setContractAdd(e.target.value)}></input>
            <h6 style={{"color":"darkgray","fontWeight":"normal","fontSize":"14px"}}>{message}</h6>
            {/* <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px","marginTop":"7px"}} >hi</button> */}
            {/* <div class="dropdown">
                <button class="dropbtn">Max</button>
                <div class="dropdown-content">
                    <a href="#">Limit</a>
                    <a href="#">Unlimit</a>
                </div>
            </div> */}
            { disabler ? <div className='submitbtnDisabled'>
            <button disabled onClick={() => mint()}>Submit</button>
            </div> :
            <div className='submitbtn'>
            <button onClick={()=>enterContractAddress()} >Submit</button>
            </div>}
        </div>
        
    </div>
  )
}

