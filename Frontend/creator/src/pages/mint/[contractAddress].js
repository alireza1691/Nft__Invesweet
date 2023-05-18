import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ERC721V1ABI from '../../../Blockchain/ERC721V1.json'
import { ethers } from 'ethers'

// export const getStaticPaths = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/photos")
//     const data = await res.json()

//     const paths = data.map(product => {
//         return {
//             params: {id: product.id.toString()}
//         }
//     })
//     return {
//         paths,
//         fallback: false
//     }

   
// }

// export const getStaticProps = async (context) => {

//     const id = context.params.id 
//     const res = await fetch("https://jsonplaceholder.typicode.com/photos/"+ id)
//     const data = await res.json()
//     return {
//         props: { product: data}
//     }
// }

// generated contract address:  0xfc199488302f88928cf7fe60e300ec8a61029e57
function mintInterface({signer}) {
    const [contractAddress, setContractAddress] = useState()
    const router = useRouter()

    let address = router.query.contractAddress

    async function mint () {
      console.log(address);
      console.log(signer);
      try {
        const contractInstant = new ethers.Contract( address, ERC721V1ABI, signer)
      const price = await contractInstant.getPrice()
      console.log(price.toString());
      await contractInstant.mint({value: price ,gasLimit: "0x2710", gasPrice: ethers.utils.parseUnits("1.0", "gwei").toHexString()})
      } catch (error) {
        console.log(error);
      }
      
    }

    // useState(()=>{
    //     setContractAddress(router.query.contractAddress)
    //     console.log(contractAddress);
    // },[address])


    // function log() {
    //     const name = router.query.contractAddress
    //     console.log(name);
    // }
    // log()
  return ( 
    <div className='boxCreate'>
    <div>
        <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Mint</h6>
        <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Contract address: {contractAddress}</h6>
        <div className='submitbtn'>
        <button onClick={()=>mint()} >Mint</button>
        </div>
    </div>
    
</div>
  )
}

export default mintInterface
