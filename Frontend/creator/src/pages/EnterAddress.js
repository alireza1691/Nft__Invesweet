import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


export default function EnterAddress() {

    // addr:   0x5af0b1dd6759b01f4341175e947b3bca905a7cab

    const router = useRouter()

    const [disabler, setDisabler] = useState(true)
    const [contractAdd, setContractAdd] = useState('')
    const [message, setMessage] = useState('Enter Address...')


  async function enterContractAddress() {
    router.push(`/Mint/${contractAdd}`)
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
    <div>
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
            <button disabled >Submit</button>
            </div> :
            <div className='submitbtn'>
            <button onClick={()=>enterContractAddress()} >Submit</button>
            </div>}
        </div>
        
    </div>
    </div>
  )
}
