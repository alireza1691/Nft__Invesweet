import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ERC721V1ABI from "../../../Blockchain/ERC721V1.json";
import CreatorABI from "../../../Blockchain/Creator.json";
import { ethers } from "ethers";
import { Card } from "web3uikit";
import { BlockForkEvent } from "@ethersproject/abstract-provider";
import address from "../../../Blockchain/addresses.json"
import Link from "next/link";

// const chainId = (process.env.CHAIN_ID)
// const ERC721address = address[chainId].ERC721V1[0]

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

//
// }

// export const getStaticProps = async (context) => {

//     const id = context.params.id
//     const res = await fetch("https://jsonplaceholder.typicode.com/photos/"+ id)
//     const data = await res.json()
//     return {
//         props: { product: data}
//     }
// }
const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr

  const separator = "..."
  const seperatorLength = separator.length
  const charsToShow = strLen - seperatorLength
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)
  return (
      fullStr.substring(0, frontChars) +
      separator +
      fullStr.substring(fullStr.length - backChars)
  )
}

// generated contract address:  0xfc199488302f88928cf7fe60e300ec8a61029e57
// new add:    0x71bffbba41cca384425761326e5eb10317958517
function mintInterface({ signer, name, url }) {
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [contractAdd, setContractAddress] = useState();
  const [_url, _setURL] = useState("");
  const router = useRouter();
  const { aspath } = useRouter();

  const address = router.query.contractAddress;

  const nftAddress = "0x32d0503eb825825cefe4541a364910661588e9c5"

  async function mint() {
    // ** This function will revert by smart contract
    console.log(address);
    console.log(signer);
    try {
      // const contractInstant = new ethers.Contract(
      //   address,
      //   CreatorABI,
      //   signer
      // );
      const nftContractInstance = new ethers.Contract(
        address,
        ERC721V1ABI,
        signer
      );
      const price = await nftContractInstance.getPrice();

      console.log(price.toString());
      await nftContractInstance.mint({
        // value: ethers.utils.parseUnits("0.1","ether"),
        value: price,
        gasLimit: "1000000",
        gasPrice: ethers.utils.parseUnits("50", "gwei").toHexString(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getImage() {
    const nftContractInstance = new ethers.Contract(
      address,
      ERC721V1ABI,
      signer
    );
    const imgUrl = await nftContractInstance.baseURI();
    console.log(imgUrl);
      _setURL(imgUrl)
  }

  // useEffect( () => {
  //   const interval = setInterval(() => {
  //   }, 1000);
  // },[])

  return (
    <div className="boxCreate">
      <div>
        <h6 style={{ color: "#467889", fontWeight: "bold", fontSize: "18px" }}>
          Mint
        </h6>
        <h6 style={{ color: "#467889", fontWeight: "bold", fontSize: "18px" , width: "auto"}}>
          Contract address: {truncateStr(address || "" , 15)}
        </h6>
        {/* <Card
          title={"Selected NFT"}
          description={""}
          style={{ height: "260px", width: "260px", left: "48px" }}
          onClick={""}
        >
          <Image loader={() => imageURI} src={url} height="260" width="260" />
        </Card> */}
        <div className="submitbtn">
          <button onClick={() => mint()}>Mint</button>
          {/* <button onClick={() => urlGetter()}>getURL</button>
          <p>{_url}</p> */}
        </div>
        <p style={{"fontSize":"12px", "fontFamily":"sans-serif"}}>To send transaction you may need test token, <a href="https://mumbaifaucet.com/">claim test token </a></p>
        {/* <div className="submitbtn">
          <button onClick={() => getImage()}>Url</button>
          {_url.length !== 0 ? <p>{_url}</p> : ""}
          {_url.length !== 0 ? <Image src={"https://wallpaperaccess.com/full/187163.jpg"} width="50" ></Image> : ""}
        </div> */}
      </div>
    </div>
  );
}

export default mintInterface;
