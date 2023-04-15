import React, { useState } from 'react'
import { useRouter } from 'next/router'

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
function Details() {
    const [contractAddress, setContractAddress] = useState()
    const router = useRouter()

    useState(()=>{
        const contractA = router.query.contractAddress
        setContractAddress(contractA)
    },[])


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
        <button onClick={()=>enterContractAddress()} >Mint</button>
        </div>
    </div>
    
</div>
  )
}

export default Details
