import Head from 'next/head'
import Image from 'next/image'
// import "../public/Invesweet.png";
import styles from '../src/styles/Home.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'
import { React ,useState, useEffect } from 'react'
import { Card } from 'web3uikit'
import { Contract, ethers } from 'ethers'
import ERC721V1ABI from '../Blockchain/ERC721V1.json'
import { getContractFactory } from '@nomiclabs/hardhat-ethers/types'
import popUp from './popUp'
import IERC721ABI from '../Blockchain/IERC721ABI.json'
import { Provider } from '@ethersproject/providers'


// creator address on mumbai:    0xaff6b98ea4dff833ca91dda2c3c0e9c6a5b090aa
// ERC721V1 address on mumbai:   

// export const [popUpVisibility, setPopUpvisibility] = useState(false);

const mint = ({provider, mint, signer, getUri}) =>{


    const [disabler1, setDisabler1] = useState('')
    const [disabler2, setDisabler2] = useState('')
    const [contractAddress, setContractAddress] = useState("0x")
    const [isVisible, setIsVisible] = useState(false);

    let imageURI = "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"

    // const  URI = await getContractFactory()
    function changeFunc(whichDisabler) {
        var selectBox = document.getElementById(whichDisabler);
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        
        if (whichDisabler == "selectBox2") {
          setDisabler1(selectedValue);
          if (selectedValue == 2) {
            setMaxSupply(0);
          }
        }
        if (whichDisabler == "selectBox3") {
          setDisabler2(selectedValue);
          if (selectedValue == 2) {
            setBurnPercentage(0);
          }
        }
        
      }

      function updateImageUri (contractAddress) {
        const nftContract = new Contract(contractAddress,ERC721V1ABI,provider)
        const uri = nftContract.getTokenURI(1)
        return uri
      }

      function getUserOwnedContracts () {
        console.log("test");
      }

      function handleCardClick() {
        // setIsVisible(true)
        console.log(isVisible);
      }
      useEffect(() => {
        console.log(contractAddress);
      },[contractAddress])



    return (
        <div>
        <div>
          {/* <popUp/> */}
            <div style={{"height":"360px","width":"300px"}}>
                <Card title={"something"} description={"another thing"} style={{"height":"260px","width":"260px", "left":"48px"}} onClick={handleCardClick}>
                    <Image loader={()=>imageURI} src={imageURI} height="260" width="260" />
                </Card>
            {/* <button className='button px-4 py-1 my-2' onClick={() => mint()} style={{"left":"140px"}} >Mint</button> */}
            <input className='input' style={{"left":"30px"}} placeholder={"Enter Contract Address..."} onChange={(event) =>setContractAddress(event.target.value)} ></input>
            <button className='button px-4 py-1 my-2' style={{"left":"140px"}} onClick={()=> getUri(contractAddress)}>get Uri</button>
            </div>
        </div>
        </div>

    
    )
  }
  
  export default mint

  // module.exports = {

  // }
  