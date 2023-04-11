import React from 'react'

export default function Dashboard() {
  return (
    <div className='boxCreate'>
        <div>
            <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Your balance:</h6>
            <h6>00</h6>
            <div className='submitbtn'>
                <button style={{"width":"100px"}}>Withdraw</button>
            </div>
        </div>
        <div>
            <h3 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Your Contracts:</h3>
            <p>some test string</p>
        </div>
        <div>
            <h3 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Minted Nft:</h3>
            <p>some number</p>
        </div>
    </div>
    
  )
}
