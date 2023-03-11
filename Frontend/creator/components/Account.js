import Head from 'next/head'
import Image from 'next/image'
// import "../public/Invesweet.png";
import styles from '../src/styles/Home.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'
import { React ,useState, useEffect } from 'react'
import { Card } from 'web3uikit'



const Account = ({setName, setSymbol, setMaxSupply, setCirculatingSupply,setBurnPercentage, setDecimals, createERC20}) =>{


    const [disabler1, setDisabler1] = useState('')
    const [disabler2, setDisabler2] = useState('')

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


    return (
        
        <div>
           <p>test</p>
        </div>
        

    
    )
  }
  
  export default Account
  