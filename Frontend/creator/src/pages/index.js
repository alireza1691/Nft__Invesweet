import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "bulma/css/bulma.css";
import { BigNumber, ethers } from "ethers";
import { useState, useEffect, React } from "react";
import ERC20CreatorAddress from "../../Blockchain/ERC20CreatorAddress.json";
import ERC721CreatorAddress from "../../Blockchain/ERC721CreatorAddress.json";
import ERC20CreatorAbi from "../../Blockchain/ERC20Creator.json";
import ERC721CreatorAbi from "../../Blockchain/ERC721Creator.json";
import { useMoralis, useWeb3Contract } from "react-moralis"
// require ('dotenv').config()
import { MoralisNextApi } from "@moralisweb3/next";

import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
// import { EvmChain } from "@moralisweb3/evm-utils";

import { _, fill } from "lodash";
// import logo from "../public/invesweet.png"
import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.css";

// Moralis.start({
//   apiKey: 'YOUR_API_KEY',
//   });

export default function Home() {

  const { web3, isWeb3Enabled } = useMoralis();
  

  const runApp = async () => {

    const abi = {ERC20CreatorAbi}; // Add ABI
  
    const address = await ERC20CreatorAddress[chainId]
        .erc20Creator[0];
    console.log(address);
    const chain = EvmChain.ETHEREUM;

    try {
     
      await Moralis.start({
          apiKey: 'TsLS6Uwt4tfB5QoDEmhh82BVsIRK7zqdwPI9LmTyUmt4aLend9KxfZWfpfTc7iEF',
          // ...and any other configuration
      });
  
      const response = await Moralis.EvmApi.events.getContractEvents({
          address,
          chain,
          abi,
      });
  
      console.log(response?.result);
  } catch (e) {
      console.error(e);
  }
  }

 
  const chainId = "31337";
  const apiKey = process.env.MORALIS_API_KEY

  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [maxSupply, setMaxSupply] = useState(0);
  const [limitDisablerERC721, setLimitDisablerERC721] = useState(1);
  const [limitDisablerERC20, setLimitDisablerERC20] = useState(1);
  const [ERC20BurnDisabler, setERC20BurnDisabler] = useState(1);
  const [maxCap, setMaxCap] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [burnPercentage, setBurnPercentage] = useState(0);
  // const [chainId , setChainId] = useState()

  let number, circulatingSupplyNumber, burnPercentageNumber, decimalNumber;

  // const { runContractFunction: create } = useWeb3Contract({
  //   abi: ERC20CreatorAbi,
  //   contractAddress: ERC20CreatorAddress[chainId].erc20Creator[0],
  //   functionName: "create",
  //   params: {name : name,
  //     symbol : symbol,
  //     maxCap : maxCap,
  //     circulatingSupply : circulatingSupply,
  //     burnPercent : burnPercentage,
  //     decimals : decimals,
  //   },
  //   value : ethers.utils.parseEther("0.01")
  // })
  // const ERC20 = () => {
  //   let err
  //   try {
  //     create
  //   } catch (error) {
  //     console.log(error);
  //     err = error
  //   }
  //   console.log(err);
    
  // }
  

  function changeFunc(whichDisabler) {
    var selectBox = document.getElementById(whichDisabler);
    
    if (whichDisabler == "selectBox1") {
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;
      setLimitDisablerERC721(selectedValue);
    }
    if (whichDisabler == "selectBox2") {
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;
      setLimitDisablerERC20(selectedValue);
    }
    if (whichDisabler == "selectBox3") {
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;
      setERC20BurnDisabler(selectedValue)
    }
    if (selectedValue == 2) {
      setMaxSupply(0);
    }
  }

  const conncetWalletHandler = async () => {
    console.log("call");
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setIsConnected(true);
        setUser(accounts[0]);
        console.log(`${accounts[0]} connected!`);
        let connectedProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        setProvider(connectedProvider);
        console.log(connectedProvider);

        // let signer = connectedProvider.getSigner()
        const _signer = connectedProvider.getSigner(accounts[0]);
        setSigner(_signer);
        console.log(_signer);

        const chainId = await _signer.getChainId();
        console.log("chain id", chainId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const contractERC721Create = async (price,max,name,symbol,requestfrom,uri) => {
  const contractERC721Create = async () => {
    try {
      let uri = {
        name: name.toString(),
        description: description.toString(),
        image: url.toString(),
      };
      const ContractAddress = await ERC721CreatorAddress[chainId]
        .erc721Creator[0];
      const contract = new ethers.Contract(
        ContractAddress,
        ERC721CreatorAbi,
        provider
      );
      const contractConnectToSigner = contract.connect(signer);
      await contractConnectToSigner.createCollection(
        name,
        symbol,
        price,
        maxSupply,
        uri
      );
    } catch (error) {
      window.alert(error);
      console.log(error);
    }
  };

  const createERC20 = async () => {
    try {
      const ERC20ContractAddress = await ERC20CreatorAddress[chainId]
        .erc20Creator[0];
        console.log(ERC20ContractAddress);
      const ERC20Contract = new ethers.Contract(
        ERC20ContractAddress,
        ERC20CreatorAbi,
        provider
      );
      const contractConnectToSigner = ERC20Contract.connect(signer);
      const tx = await contractConnectToSigner.create(name,symbol,maxCap,circulatingSupply,burnPercentage,decimals,{value: ethers.utils.parseEther("0.01")})
      window.alert(`ERC20 Token with name : ${name} and symbol : ${symbol} was successfully created!`)
    } catch (error) {
      console.log(error)
    }  
  };

  const [tabHandler, setTabHandler] = useState("tab-erc721");
  useEffect(() => {
    console.log(tabHandler);
  }, [tabHandler]);

  return (
    <div
      className=""
      style={{
        background:
          "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(50,0,84,1) 40%, rgba(0,130,157,1) 100%)",
      }}
    >
      {/* <div className={styles.container}> */}
      
      {/* <Image style={{'zIndex': '10', 'objectFit':'cover','fle':'fill'}}  src='/invesweett.png' layout="fill" objectFit='cover'/> */}
      <Header 
        conncetWalletHandler={conncetWalletHandler}
        isConnected={isConnected} 
      />
      <button onClick={()=> runApp()}>RunApp</button>
      <div>
        <section>
          <div className="tabs is-fullwidth pt-3 mr-4 ml-5 is-centered has-text-white">
            <ul>
              <li
                className={tabHandler == "tab-erc721" ? "is-active" : ""}
                data-target="tab-erc721"
                onClick={(e) => setTabHandler("tab-erc721")}
              >
                <a style={{'fontSize':'16px','fontWeight':'bold'}}>Create NFT</a>
              </li>
              <li
                className={tabHandler == "tab-erc20" ? "is-active" : ""}
                data-target="tab-erc20"
                onClick={(e) => setTabHandler("tab-erc20")}
              >
                <a style={{'fontSize':'16px','fontWeight':'bold'}}>Create Token</a>
              </li>
              <li
                className={tabHandler == "tab-faucet" ? "is-active" : ""}
                data-target="tab-faucet"
                onClick={(e) => setTabHandler("tab-faucet")}
              >
                <a style={{'fontSize':'16px','fontWeight':'bold'}}>Faucet</a>
              </li>
              <li
                className={tabHandler == "tab-docs" ? "is-active" : ""}
                data-target="tab-docs"
                onClick={(e) => setTabHandler("tab-docs")}
              >
                <a style={{'fontSize':'16px','fontWeight':'bold'}}>Airdrop</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <main className={styles.main}>
        <div className="column is-one-third">
          <section
            style={{
              zIndex: "20",
              width: "400px",
              justifyContent: "center",
              justifyItems: "center",
              borderRadius: "20px",
            }}
          >
            <div className="box " >
              <div id=" tab-content">
                <div
                  className={tabHandler == "tab-erc721" ? "" : "is-hidden"}
                  id="tab-erc721"
                >
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className=" my-1">
                            <input
                              style={{ width: "200px" }}
                              className="input"
                              type="text"
                              placeholder="Enter symbol"
                              value={symbol}
                              onChange={(e) => setSymbol(e.target.value)}
                            />
                          </div>
                          <p6>
                            If you want to collection be limited choose and
                            enter amount:
                          </p6>
                          <div className="select navbar my-1">
                            {limitDisablerERC721 == 2 ? (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="ERC721 Token is unlimited"
                                value={number}
                                onChange={(e) => setMaxSupply(0)}
                                disabled
                              />
                            ) : (
                              <input
                                style={{ width: "200px", marginRight: "4px" }}
                                className="input"
                                type="text"
                                placeholder="Enter amount"
                                value={number}
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
                          {/* <figure class="image is-128x128">
                            <img src={url}/>
                          </figure> */}
                        </nav>
                      </div>
                      {/* <h6 className='mt-4'>You will receive:</h6> */}
                      {/* <div> */}
                      {/* <nav className='navbar'>
                        <div className="select navbar-end">
                        <input className="input" type="text" placeholder="0" />
                          <select>
                            <option>USDC</option>
                            <option>ETH</option>
                          </select>
                        </div>
                        </nav> */}
                      {/* </div> */}
                      {/* <p className="help navbar-end">Maximim slippage:      1%</p> */}
                    </div>
                  </div>
                  <button
                    onClick={() => contractERC721Create()}
                    className="button is-dark is-outlined is-centered mr-4"
                  >
                    Approve
                  </button>
                  {/* <button onClick={() => approve} className='button is-dark is-centered' >Transact</button> */}
                </div>
                <div
                  className={tabHandler == "tab-erc20" ? "" : "is-hidden"}
                  id="tab-erc20"
                >
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className=" my-1">
                            <input
                              style={{ width: "200px" }}
                              className="input"
                              type="text"
                              placeholder="Enter symbol"
                              value={symbol}
                              onChange={(e) => setSymbol(e.target.value)}
                            />
                          </div>
                          <p6>
                            If you want to set max supply for token enter amount:
                          </p6>
                          <div className="select navbar my-1">
                            {limitDisablerERC20 == 2 ? (
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
                                value={number}
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
                              value={circulatingSupplyNumber}
                              onChange={(e) => setCirculatingSupply(e.target.value)}
                            />
                            <p style={{'fontSize':'13px' , 'color':'GrayText'}}>the amount that transfered to owner after creation of contract</p>
                            
                          </div>
                          <p>Burn a specific amount in each transfer:</p>
                          <div className="select navbar my-1">
                          
                            {ERC20BurnDisabler == 2 ? (
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
                                value={burnPercentageNumber}
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
                              value={decimalNumber}
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
                <div
                  className={tabHandler == "tab-faucet" ? "" : "is-hidden"}
                  id="tab-faucet"
                >
                  <div className="field" style={{ "zIndex": "0" }}>
                    <label className="label">Claim test token</label>
                  </div >
                  <button
                    onClick={() => ""}
                    className="button is-dark is-outlined is-centered mt-2"
                  >
                    Submit
                  </button>
                  <p className="help">
                    Note that these tokens have not any real value
                  </p>
                </div>
                <div
                  className={tabHandler == "tab-docs" ? "" : "is-hidden"}
                  id="tab-docs"
                >
                  <div className="field" style={{ "zIndex": "0" }}>
                    <label className="label">Claim Airdrop</label>
                  </div>
                  <button
                    onClick={() => ""}
                    className="button is-dark is-outlined is-centered mt-2"
                  >
                    Check eligibility
                  </button>

                  <button
                    onClick={() => ""}
                    className="button is-dark is-outlined is-centered mt-2 ml-2"
                    disabled
                  >
                    Claim
                  </button>
                  <p className="help">
                    Before claim make sure you are eligible!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          className="has-text-black"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Alireza Haghshenas
        </a>
      </footer>
    </div>
    // </div>
  );
}
