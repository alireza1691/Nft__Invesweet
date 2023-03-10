const { addressFile, frontEndCreatorAbiFile, frontEndERC721V1AbiFile } = require("../helper-hardhat-config")
const fs = require("fs")

const { ethers, network } = require("hardhat")
require("dotenv").config

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const Creator = await ethers.getContract("Creator")
    const Nft = await ethers.getContract("ERC721V1")

    fs.writeFileSync(
        `${frontEndCreatorAbiFile}ERC721Creator.json`,
        Creator.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndERC721V1AbiFile}ERC721V1.json`,
        Nft.interface.format(ethers.utils.FormatTypes.json)
    )

}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const ERC721Creator = await ethers.getContract("Creator")
    const ERC721V1 = await ethers.getContract("ERC721V1")
    const addressesFile = JSON.parse(fs.readFileSync(addressFile, "utf8"))
    if (chainId in addressesFile) {
        if (!addressesFile[chainId]["ERC721Creator"].includes(ERC721Creator.address)) {
            addressesFile[chainId]["ERC721Creator"].push(ERC721Creator.address)
        }
        if (!addressesFile[chainId]["ERC721V1"].includes(ERC721V1.address)) {
            addressesFile[chainId]["ERC721V1"].push(ERC721V1.address)
        }
        
    } else {
        addressesFile[chainId] = { erc721Creator: [ERC721Creator.address]} 
        addressesFile[chainId]= { erc721v1:[ERC721V1.address]} 
    }

    fs.writeFileSync(addressFile, JSON.stringify(addressesFile))
    // fs.writeFileSync(ERC20CreatorAddress, JSON.stringify(addressesFile))
    console.log(addressesFile);
    // console.log(addressesFile);
}
module.exports.tags = ["all", "frontend"]