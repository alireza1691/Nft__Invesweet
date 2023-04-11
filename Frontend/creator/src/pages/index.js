import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "bulma/css/bulma.css";
import { BigNumber, ethers } from "ethers";
import { useState, useEffect, React } from "react";
import addresses from "../../Blockchain/addresses.json";
import ERC721CreatorAbi from "../../Blockchain/Creator.json";
import ERC721V1ABI from "../../Blockchain/ERC721V1.json"
import { useMoralis, useWeb3Contract } from "react-moralis"
// require ('dotenv').config()
// import { MoralisNextApi } from "@moralisweb3/next";

// import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
// import { EvmChain } from "@moralisweb3/evm-utils";

import { _, fill } from "lodash";
// import logo from "../public/invesweet.png"
import Header from "../../components/Header";
import ERC721CreatorBox from "../../components/CreateERC721Box"
import ERC20CreatorBox from "../../components/CreateERC20Box"
import Account from "components/Account";
import Mint from "components/Mint"
import PopUp from "components/popUp";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Input, Card } from "web3uikit";
import ERC721ABI from "../../Blockchain/ERC721ABI.json";
import IERC721ABI from "../../Blockchain/IERC721ABI.json";

// Moralis.start({
//   apiKey: 'YOUR_API_KEY',
//   });

export default function Home({signer}) {

  const { web3, isWeb3Enabled } = useMoralis();
  

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
      const ContractAddress = await addresses[chainId]
        .ERC721V1Creator[0];
      // If we ewant to use specififc network like goerli we can get address like that:
      // const ContractAddressGoerli = await addresses["5"]
      //   .ERC721V1Creator[0];
      const contract = new ethers.Contract(
        ContractAddress,
        ERC721CreatorAbi,
        provider
      );
      const contractConnectToSigner = contract.connect(signer);
      await contractConnectToSigner.createCollection(
        name,
        symbol,
        ethers.utils.formatEther(price) ,
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
    const contractAddress = addresses[chainId].ERC721Creator[0]
    const nftAddress = "0xCC699414A49a0d87e1c223be49A3CE38B5a082d4"
    const contract = new ethers.Contract(contractAddress,ERC721CreatorAbi,provider)
    const erc721V2Contract = new ethers.Contract(nftAddress,ERC721V1ABI,provider)
    console.log(erc721V2Contract);
    // const price = await erc721V2Contract.price()
    console.log("everything ok till line 228");
    const code = await provider.getCode("0xCC699414A49a0d87e1c223be49A3CE38B5a082d4")

    await contract.connect(signer).mint(nftAddress, {value: 1000})
    // } catch (error) {
    //  console.log(error); 
    // }
    //
  }

  
  const getUri = async (address) => {
    try {
      let contract = new ethers.Contract("0x23581767a106ae21c074b2276D25e5C3e136a68b",IERC721ABI, provider)
      let countToken
      console.log(contract);
      let element
      element = await contract.ownerOf(0)
      // let events = contract.queryFilter("Transfer",,)
      console.log(events);
      // for (let index = 0; index < 9999999; index++) {
      //   const element = await contract.ownerOf(index)
      //   countToken = index+1
      //   if (element == "0x0000000000000000000000000000000000000000") {
      //     break
      //   }
      // }
      // for (let index = 0; element =! 0 ; index++) {
        // element = await contract.balanceOf("0x39A77B13BA2C5FA2249f7e5a4194582824D58c8E")
      //   countToken = index + 1
      // }
      console.log(element);

    // console.log("something ...");
    } catch (error) {
      console.log(error);
    }
   
  }
  const [tabHandler, setTabHandler] = useState("tab-erc721");
  useEffect(() => {
    console.log(tabHandler);
  }, [tabHandler]);

  function showS() {
    console.log("test");
    console.log(signer);
  }

  return (
    // <div
    //   className=""
    //   style={{
    //     background:
    //       "linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(50,0,84,1) 40%, rgba(0,130,157,1) 100%)",
    //   }}
    // >
    //   {/* <div className={styles.container}> */}
      
    //   {/* <Image style={{'zIndex': '10', 'objectFit':'cover','fle':'fill'}}  src='/invesweett.png' layout="fill" objectFit='cover'/> */}
      
    // </div>
    <div style={{"height":"1024px"}} >
    <div className="row">
      <div className="column" style={{"backgroundColor":"white"}}>
        <div style={{"marginTop":"100px"}}>
          <h1 style={{"textAlign":"center","color":"#467889","fontFamily":"'Courier New', Courier, monospace","fontSize":"45px","fontWeight":"bold","width":"90%"}}>Tokenize your assets</h1>
          <p style={{"fontSize":"20px","fontWeight":"600","color":"#467889","marginTop":"50px","fontFamily":"monospace","borderRadius":"10px","padding":"10px","textAlign":"center"}} >Tokenize your asset, make your tickets, create your collection</p>
          {/* <p style={{"fontSize":"20px","fontWeight":"600","color":"#467889","marginTop":"50px","fontFamily":"monospace","backgroundColor":"#E9F3F7","borderRadius":"10px","padding":"10px"}} >Tokenize each asset you need as NFT</p> */}
        </div>
        
        </div>
      
      <div className="column" style={{"backgroundColor":"white"}}>
        <div className="logoHover" >
        <Image src="/logo.png" width={480} height={300} className="logoHover" style={{"paddingLeft":"30px"}}></Image>
        </div>
      </div>
    </div>
    <div style={{"marginTop":"50px"}} className="row">
      <div className="column" style={{"backgroundColor":"white"}}>
        <div style={{"textAlign":"center"}}>
        <p style={{"fontSize":"20px","fontWeight":"600","color":"#467889","marginTop":"50px","fontFamily":"monospace","backgroundColor":"#E9F3F7","borderRadius":"10px","padding":"10px"}} >Main aim of Invesweet is increaseing Nft usage in real life. Users can create own collections depends on what they need.</p>

        </div>
        
        </div>
      <div className="column" style={{"backgroundColor":"white"}}>
        
      </div>
      <div className="column" style={{"backgroundColor":"white"}}>
      </div>
    </div>
    <div className="row">
      <div className="column" style={{"backgroundColor":"white"}}>
      </div>
      
      <div className="column" style={{"backgroundColor":"white"}}>
        <p style={{"fontSize":"20px","fontWeight":"600","color":"#467889","marginTop":"50px","fontFamily":"monospace","backgroundColor":"#E9F3F7","borderRadius":"10px","padding":"10px"}} >Some test text</p>
      </div>
    </div>
    
    </div>
  );
}
