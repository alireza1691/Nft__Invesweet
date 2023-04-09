import { Button } from 'bootstrap'
import React from 'react'

function Create() {
  return (
    <div className='boxCreate'>
        <div>
            <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Create your NFTs</h6>
            <input className='input' placeholder='Enter/Paste contract address...' style={{"color":"black","width":"50%","margin":"5px"}} ></input>
            {/* <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px","marginTop":"7px"}} >hi</button> */}
            {/* <div class="dropdown">
                <button class="dropbtn">Max</button>
                <div class="dropdown-content">
                    <a href="#">Limit</a>
                    <a href="#">Unlimit</a>
                </div>
            </div> */}
            <div className='submitbtn'>
            <button >Submit</button>
            </div>
        </div>
        
    </div>
  )
}

export default Create
