import Head from 'next/head'
import Image from 'next/image'
// import "../public/Invesweet.png";
import styles from '../src/styles/Home.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'
import { React ,useState, useEffect } from 'react'



const CreateERC20Box = ({setName, setSymbol, setMaxSupply, setCirculatingSupply,setBurnPercentage, setDecimals, createERC20}) =>{


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
            <div className="field">
                    <label className="label">Create your ERC20 token:</label>
                    <div className="control" style={{ "zIndex": "0" }}>
                      {/* <h6 className='mt-4'>Selected token amount:</h6> */}
                      <div>
                        <nav className="navbar">
                        <div className=" my-1">
                            <h6 style={{ fontSize: "14px" }}>
                              Write name and symbol of your collection:
                            </h6>
                            <input
                              style={{ width: "200px" }}
                              className="input"
                              type="text"
                              placeholder="Enter name"
                            //   value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className=" my-1">
                            <input
                              style={{ width: "200px" }}
                              className="input"
                              type="text"
                              placeholder="Enter symbol"
                            //   value={symbol}
                              onChange={(e) => setSymbol(e.target.value)}
                            />
                          </div>
                          <p6>
                            If you want to set max supply for token enter amount:
                          </p6>
                          <div className="select navbar my-1">
                            {disabler1 == 2 ? (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Token has not max supply"
                                // value={0}
                                // onChange={(e) => setMaxSupply(0)}
                                disabled
                              />
                            ) : (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Enter max cap..."
                                // value={number}
                                onChange={(e) => setMaxSupply(e.target.value)}
                              />
                            )}
                            <select
                              style={{ width: "120px", marginLeft: "4px" }}
                              id="selectBox2"
                              onChange={() => changeFunc("selectBox2")}
                            >
                              <option value={1}>Capped</option>
                              <option value={2}>Not capped</option>
                            </select>
                          </div>
                          <div className=" my-1">
                            <input
                              style={{ width: "200px" }}
                              className="input"
                              type="text"
                              placeholder="Enter circulating supply"
                            //   value={circulatingSupplyNumber}
                              onChange={(e) => setCirculatingSupply(e.target.value)}
                            />
                            <p style={{'fontSize':'13px' , 'color':'GrayText'}}>the amount that transfered to owner after creation of contract</p>
                            
                          </div>
                          <p>Burn a specific amount in each transfer:</p>
                          <div className="select navbar my-1">
                          
                            {disabler2 == 2 ? (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Token is not burnable"
                                // value={0}
                                // onChange={(e) => setBurnPercentage(0)}
                                disabled
                              />
                            ) : (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Enter burn percentage..."
                                // value={burnPercentageNumber}
                                onChange={(e) => setBurnPercentage(e.target.value)}
                              />
                            )}
                            <select
                              style={{ width: "120px", marginLeft: "4px" }}
                              id="selectBox3"
                              onChange={() => changeFunc("selectBox3")}
                            >
                              <option value={1}>Brunable</option>
                              <option value={2}>Not burn</option>
                            </select>
                          </div>
                        </nav>
                      </div>
                      <div className=" my-1">
                            <input
                              style={{ width: "200px" }}
                              className="input"
                              type="text"
                              placeholder="Enter decimals"
                            //   value={decimalNumber}
                              onChange={(e) => setDecimals(e.target.value)}
                            />
                          </div>
                  
                    </div>
                  </div>
                  <button
                    onClick={() => createERC20()}
                    className="button is-dark is-outlined is-centered mr-4"
                  >
                    Approve
                  </button>
        </div>
        

    
    )
  }
  
  export default CreateERC20Box
  