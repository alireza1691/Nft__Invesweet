import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ERC721V1ABI from '../../../Blockchain/ERC721V1.json'
import { ethers } from 'ethers'
import { Card } from 'web3uikit'

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
// new add:    0x71bffbba41cca384425761326e5eb10317958517
function mintInterface({signer, name, url}) {

    const [tokenName, setTokenName] = useState()
    const [tokenSymbol, setTokenSymbol] = useState()
    const [contractAddress, setContractAddress] = useState()
    const [_url, _setURL] = useState()
    const router = useRouter()

    const address = router.query.contractAddress

    async function urlGetter() {
      const contractInst = new ethers.Contract( address, ERC721V1ABI, signer) 
      console.log(contractInst);
      const url_ = await contractInst.baseURI()
      console.log(url_.toString());
      _setURL(url_.toString())
    }

    async function imageURI() {
      console.log(address);
      // const _contractAddress = router.query.contractAddress
      const contractInst = new ethers.Contract( address, ERC721V1ABI, signer)
      const _name = await contractInst.name()
      setTokenName(_name)
      const _symbol = await contractInst.baseURI()
      imgUrl = _symbol
      // setTokenSymbol(_symbol)
      // console.log(_name);
      // console.log(_symbol);
      return imgUrl
    }

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

    useEffect(() => {
      // console.log(address);
      // imageURI()
      const interval = setInterval(() => {
        // imageURI();
        // console.log(name);
        // console.log(url);
        // console.log(router.query.contractAddress);
      }, 100000);
    },[])

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
        <h6 style={{"color":"#467889","fontWeight":"bold","fontSize":"18px"}}>Contract address: {address}</h6>
        <Card title={"Selected NFT"} description={""} style={{"height":"260px","width":"260px", "left":"48px"}} onClick={""}>
          <Image loader={()=>imageURI} src={url} height="260" width="260" />
        </Card>
        <div className='submitbtn'>
        <button onClick={()=>mint()} >Mint</button>
        <button onClick={()=>urlGetter()} >getURL</button>
        <p>{_url}</p>
        </div>
    </div>
    
</div>
  )
}

export default mintInterface
