import React from 'react'

function Create() {
  return (
    <div className='boxCreate'>
        <div>
            <h6>Create your NFTs</h6>
            <input className='input' placeholder='Enter name...' style={{"color":"black","width":"50%","margin":"5px"}} ></input>
            <input className='input' placeholder='Enter symbol...' style={{"color":"black","width":"50%","margin":"5px"}} ></input>
            <input className='input' placeholder='Enter price...' style={{"color":"black","width":"50%","margin":"5px"}} ></input>
            <input className='input' placeholder='Enter max supply...' style={{"color":"black","width":"50%","margin":"5px"}} ></input>
            <div>
            <button style={{"border":"solid","width":"80px","padding":"5px 10px","margin":"10px","borderRadius":"5px"}} >Submit</button>
            </div>
        </div>
        
    </div>
  )
}

export default Create
