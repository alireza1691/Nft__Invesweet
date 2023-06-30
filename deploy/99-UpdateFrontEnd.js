const { addressFile, frontEndCreatorAbiFile, frontEndERC721V1AbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const abi1 = require("../artifacts/contracts/ERC721V1.sol/ERC721V1.json")
const abi2 = require("../artifacts/contracts/ERC721Product.sol/ERC721Product.json")
const abi3 = require("../artifacts/contracts/ERC721Collateral.sol/ERC721Collateral.json")

const { ethers, network } = require("hardhat")
require("dotenv").config

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        console.log("Contract addresses updated");
        await updateAbi()
        console.log("ABIs updated");
        console.log("Front end written!")
    }
}


async function updateAbi() {

    const Creator = await ethers.getContract("Creator")
    // const Nft = await ethers.getContract("ERC721V1")
    const ProductsCreator = await ethers.getContract("ERC721ProductCreator")
    // const Products = await ethers.getContract("ERC721Product")
    const CollateralNFTCreator = await ethers.getContract("ERC721CollateralCreator")
    // const CollateralNFT = await ethers.getContract("ERC721Collateral")

  

    fs.writeFileSync(
        `${frontEndCreatorAbiFile}ERC721Creator.json`,
        Creator.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndERC721V1AbiFile}ERC721V1.json`,
        // Nft.interface.format(ethers.utils.FormatTypes.json)
        JSON.stringify(abi1.abi)
        
    )
    fs.writeFileSync(
        `${frontEndCreatorAbiFile}ERC721ProductCreator.json`,
        ProductsCreator.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndERC721V1AbiFile}ERC721Product.json`,
        // Products.interface.format(ethers.utils.FormatTypes.json)
        JSON.stringify(abi2.abi)
    )
    fs.writeFileSync(
        `${frontEndCreatorAbiFile}ERC721CollateralCreator.json`,
        CollateralNFTCreator.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndERC721V1AbiFile}ERC721Collateral.json`,
        // CollateralNFT.interface.format(ethers.utils.FormatTypes.json)
        JSON.stringify(abi3.abi)
    )

}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    // const ERC721Creator = await ethers.getContract("Creator")
    const Creator = await ethers.getContract("Creator")
    // const Nft = await ethers.getContract("ERC721V1")
    const ProductsCreator = await ethers.getContract("ERC721ProductCreator")
    // const Products = await ethers.getContract("ERC721Product")
    const CollateralNFTCreator = await ethers.getContract("ERC721CollateralCreator")
    // const CollateralNFT = await ethers.getContract("ERC721Collateral")

    // const ERC721V1 = await ethers.getContract("ERC721V1")
    const addressesFile = JSON.parse(fs.readFileSync(addressFile, "utf8"))
    if (chainId in addressesFile) {
        if (!addressesFile[chainId]["ERC721Creator"].includes(Creator.address)) {
            addressesFile[chainId]["ERC721Creator"].push(Creator.address)
        }
        // if (!addressesFile[chainId]["ERC721ProductCreator"].includes(ProductsCreator.address)) {
        //     addressesFile[chainId]["ERC721ProductCreator"].push(ProductsCreator.address)
        // }
        // if (!addressesFile[chainId]["ERC721CollateralCreator"].includes(CollateralNFTCreator.address)) {
        //     addressesFile[chainId]["ERC721CollateralCreator"].push(CollateralNFTCreator.address)
        // }
        
    } else {
        addressesFile[chainId] = { Creator: [Creator.address]} 
        // addressesFile[chainId]= { ProductsCreator:[ProductsCreator.address]} 
        // addressesFile[chainId]= { CollateralNFTCreator:[CollateralNFTCreator.address]} 
    }

    fs.writeFileSync(addressFile, JSON.stringify(addressesFile))
    // fs.writeFileSync(ERC20CreatorAddress, JSON.stringify(addressesFile))
    console.log(addressesFile);
    // console.log(addressesFile);
}
module.exports.tags = ["all", "frontend"]