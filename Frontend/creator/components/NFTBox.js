import { ethers } from "ethers";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { Contract } from "web3uikit";
import { erc721CreatorAbi } from '../Blockchain/ERC721Creator.json'

export default function NFTBox(price,nftAddress,tokenId, contractCreatorAddress, seller, provider, signer) {
    const [imageuri , setImageuri] = useState('')

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    // async function updateUI () {
    //     const nft = new ethers.Contract(contractCreatorAddress,erc721CreatorAbi,signer) 
    // }
}

