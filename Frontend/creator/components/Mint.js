import Head from 'next/head'
import Image from 'next/image'
// import "../public/Invesweet.png";
import styles from '../src/styles/Home.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'
import { React ,useState, useEffect } from 'react'
import { Card } from 'web3uikit'
import { Contract } from 'ethers'
import collectionV2ABI from '../Blockchain/CollectionV2.json'



const Account = ({provider, mint}) =>{


    const [disabler1, setDisabler1] = useState('')
    const [disabler2, setDisabler2] = useState('')

    let imageURI

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
        const nftContract = new Contract(contractAddress,collectionV2ABI,provider)
        const uri = nftContract.getTokenURI(1)
        return uri
      }

      function getUserOwnedContracts () {

      }


    return (
        
        <div>
            <div>
                <Card>
                    <Image loader={()=>imageURI} src={imageURI} height="200" width="200" />
                </Card>
            <button onClick={() => mint()}>Mint</button>
            </div>
        </div>
        

    
    )
  }
  
  export default Account
  