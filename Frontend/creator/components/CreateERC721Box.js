import Head from 'next/head'
import Image from 'next/image'
// import "../public/Invesweet.png";
import styles from '../src/styles/Home.module.css'
import 'bulma/css/bulma.css'
import Link from 'next/link'
import { React ,useState, useEffect } from 'react'



const CreateERC721Box = ({setName, setSymbol, setDescription, setMaxSupply, setPrice, setUrl, contractERC721Create}) =>{

    const [disabler, setDisabler] = useState('')

    function changeFunc(whichDisabler) {
        var selectBox = document.getElementById(whichDisabler);
        
        if (whichDisabler == "selectBox1") {
          var selectedValue = selectBox.options[selectBox.selectedIndex].value;
          setDisabler(selectedValue);
        }
        if (selectedValue == 2) {
          setMaxSupply(0);
        }
      }
    

    return (
        <div>
        <div className="field" >
                    <label className="label">Create your collection</label>
                    <div className="control"  style={{ "zIndex": "0" }}>
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
                            If you want to collection be limited choose and
                            enter amount:
                          </p6>
                          <div className="select navbar my-1">
                            {disabler == 2 ? (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Token is unlimited"
                                // value={0}
                                // onChange={(e) => setMaxSupply(0)}
                                disabled
                              />
                            ) : (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Enter amount"
                                // value={number}
                                onChange={(e) => setMaxSupply(e.target.value)}
                              />
                            )}
                            <select
                              style={{ width: "120px", marginLeft: "4px" }}
                              id="selectBox1"
                              onChange={() => changeFunc("selectBox1")}
                            >
                              <option value={1}>Limit</option>
                              <option value={2}>Unlimit</option>
                            </select>
                          </div>
                          <div className="  my-1">
                            <h6 style={{'fontSize':'14px'}} >Price:</h6>
                            <input
                              className="input"
                              type="text"
                              placeholder="Enter price"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                          <div className="  my-1">
                          <h6 style={{'fontSize':'14px'}} >Description:</h6>
                            <input
                              className="input"
                              type="text"
                              placeholder="Enter description"
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className=" my-1">
                          <h6 style={{'fontSize':'14px'}} >URL:</h6>
                            <input
                              className="input"
                              type="text"
                              placeholder="Enter image URL"
                              onChange={(e) => setUrl(e.target.value)}
                            />
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => contractERC721Create()}
                    className="button is-dark is-outlined is-centered mr-4"
                  >
                    Approve
                  </button>
                  </div>

    
    )
  }
  
  export default CreateERC721Box
