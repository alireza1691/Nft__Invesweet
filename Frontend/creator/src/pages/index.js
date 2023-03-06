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
import CollectionV2 from "../../Blockchain/CollectionV2.json"
import { useMoralis, useWeb3Contract } from "react-moralis"
// require ('dotenv').config()
import { MoralisNextApi } from "@moralisweb3/next";

import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
// import { EvmChain } from "@moralisweb3/evm-utils";

import { _, fill } from "lodash";
// import logo from "../public/invesweet.png"
import Header from "../../components/Header";
import ERC721CreatorBox from "../../components/CreateERC721Box"
import ERC20CreatorBox from "../../components/CreateERC20Box"
import Account from "components/Account";
import Mint from "components/Mint"
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

      // Get address for both localhost and goerli network:
      const ContractAddress = await ERC721CreatorAddress[chainId]
        .erc721Creator[0];
      const ContractAddressGoerli = await ERC721CreatorAddress["5"]
        .erc721Creator[0];
      const contract = new ethers.Contract(
        ContractAddressGoerli,
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
  //__________**********_____________
  // not completed yet:
  const mint = async () => {
    // try {
    const contractAddress = ERC721CreatorAddress["5"].erc721Creator[0]
    const nftAddress = "0xCC699414A49a0d87e1c223be49A3CE38B5a082d4"
    const contract = new ethers.Contract(contractAddress,ERC721CreatorAbi,provider)
    const erc721V2Contract = new ethers.Contract(nftAddress,CollectionV2,provider)
    console.log(erc721V2Contract);
    // const price = await erc721V2Contract.price()
    console.log("everything ok till line 228");
    const code = await provider.getCode("0xCC699414A49a0d87e1c223be49A3CE38B5a082d4")
    console.log(code);
    await contract.connect(signer).mint(nftAddress, {value: 1000})
    // } catch (error) {
    //  console.log(error); 
    // }
    //
  }

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
                className={tabHandler == "tab-account" ? "is-active" : ""}
                data-target="tab-account"
                onClick={(e) => setTabHandler("tab-account")}
              >
                <a style={{'fontSize':'16px','fontWeight':'bold'}}>Faucet</a>
              </li>
              <li
                className={tabHandler == "tab-mint" ? "is-active" : ""}
                data-target="tab-mint"
                onClick={(e) => setTabHandler("tab-mint")}
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
                  <ERC721CreatorBox setName={setName} setSymbol={setSymbol} setDescription={setDescription} setMaxSupply={setMaxSupply} setPrice={setPrice} setUrl={setUrl} contractERC721Create={contractERC721Create}/>
                  {/* <button onClick={() => approve} className='button is-dark is-centered' >Transact</button> */}
                </div>
                <div
                  className={tabHandler == "tab-erc20" ? "" : "is-hidden"}
                  id="tab-erc20"
                >
                  <ERC20CreatorBox setName={setName} setSymbol={setSymbol} setMaxSupply={setMaxSupply} setCirculatingSupply={setCirculatingSupply} setBurnPercentage={setBurnPercentage} setDecimals={setBurnPercentage} createERC20={createERC20}/>
                </div>
                <div
                  className={tabHandler == "tab-account" ? "" : "is-hidden"}
                  id="tab-account"
                >
                 <Account/>
                </div>
                <div
                  className={tabHandler == "tab-mint" ? "" : "is-hidden"}
                  id="tab-mint"
                >
                 <Mint provider={provider} mint={mint}/>
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
