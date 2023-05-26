import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ERC721V1ABI from "../../../Blockchain/ERC721V1.json";
import CreatorABI from "../../../Blockchain/Creator.json";
import { ethers } from "ethers";
import { Card } from "web3uikit";
import { BlockForkEvent } from "@ethersproject/abstract-provider";

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

// generated contract address:  0xfc199488302f88928cf7fe60e300ec8a61029e57
// new add:    0x71bffbba41cca384425761326e5eb10317958517
function mintInterface({ signer, name, url }) {
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [contractAdd, setContractAddress] = useState();
  const [_url, _setURL] = useState();
  const router = useRouter();
  const { aspath } = useRouter();

  const address = router.query.contractAddress;

  const generatorContractAddress = "0xAfF6B98EA4dff833CA91Dda2C3c0e9c6A5B090aA";

  async function urlGetter() {
    console.log(address);
    const contractInst = new ethers.Contract(address, ERC721V1ABI, signer);
    console.log(contractInst);
    const url_ = await contractInst.tokenURI(1);
    console.log(url_);
    // _setURL(url_.toString())
  }

  async function imageURI() {
    console.log(address);
    // const _contractAddress = router.query.contractAddress
    const contractInst = new ethers.Contract(address, ERC721V1ABI, signer);
    const price = await contractInst.getPrice();
  }

  async function mint() {
    // ** This function will revert by smart contract
    console.log(address);
    console.log(signer);
    try {
      const contractInstant = new ethers.Contract(
        generatorContractAddress,
        CreatorABI,
        signer
      );
      const nftContractInstance = new ethers.Contract(
        address,
        ERC721V1ABI,
        signer
      );
      const price = await nftContractInstance.getPrice();

      // console.log(price.toString());
      await contractInstant.mint(address, {
        value: price,
        gasLimit: "100000",
        gasPrice: ethers.utils.parseUnits("5", "gwei").toHexString(),
      });
      console.log(ethers.utils.parseUnits("10.0", "gwei").toHexString());
      // gasLimit: "0x2710",
    } catch (error) {
      console.log(error);
    }
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
        <h6 style={{ color: "#467889", fontWeight: "bold", fontSize: "18px" }}>
          Contract address: {address}
        </h6>
        <Card
          title={"Selected NFT"}
          description={""}
          style={{ height: "260px", width: "260px", left: "48px" }}
          onClick={""}
        >
          <Image loader={() => imageURI} src={url} height="260" width="260" />
        </Card>
        <div className="submitbtn">
          <button onClick={() => mint()}>Mint</button>
          <button onClick={() => urlGetter()}>getURL</button>
          <p>{_url}</p>
        </div>
      </div>
    </div>
  );
}

export default mintInterface;
