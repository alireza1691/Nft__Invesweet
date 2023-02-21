const { ERC20CreatorAddress, ERC721CreatorAddress, frontEndERC20CreatorAbiFile , frontEndERC721CreatorAbiFile, ProxyERC721CreatorAddress, ProxyERC20CreatorAddress, ProxyAdminERC721CreatorAddress, ProxyAdminERC20CreatorAddress, ProxyAbiFile, AdminProxyAbiFile } = require("../helper-hardhat-config")
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
    const ERC20Creator = await ethers.getContract("ERC20Creator")
    const ERC721Creator = await ethers.getContract("ERC721Creator")
    // const Proxy = await ethers.getContract("Proxy")
    // const ProxyAdmin = await ethers.getContract("ProxyAdmin")
    // fs.writeFileSync(frontEndERC721CreatorAbiFile, ERC721Creator.interface.format(ethers.utils.FormatTypes.json))
    // fs.writeFileSync(frontEndERC20CreatorAbiFile, ERC20Creator.interface.format(ethers.utils.FormatTypes.json))
    fs.writeFileSync(
        `${frontEndERC721CreatorAbiFile}ERC721Creator.json`,
        ERC721Creator.interface.format(ethers.utils.FormatTypes.json)
    )
    fs.writeFileSync(
        `${frontEndERC20CreatorAbiFile}ERC20Creator.json`,
        ERC20Creator.interface.format(ethers.utils.FormatTypes.json)
    )
    // fs.writeFileSync(
    //     `${ProxyAbiFile}ProxyAbi.json`,
    //     Proxy.interface.format(ethers.utils.FormatTypes.json)
    // )
    // fs.writeFileSync(
    //     `${AdminProxyAbiFile}ProxyAdminAbi.json`,
    //     ProxyAdmin.interface.format(ethers.utils.FormatTypes.json)
    // )
}

async function updateContractAddresses() {
    const chainId = network.config.chainId.toString()
    const ERC721Creator = await ethers.getContract("ERC721Creator")
    const ERC20Creator = await ethers.getContract("ERC20Creator")
    const ERC721CreatorAddressFile = JSON.parse(fs.readFileSync(ERC721CreatorAddress, "utf8"))
    const ERC20CreatorAddressFile = JSON.parse(fs.readFileSync(ERC20CreatorAddress, "utf8"))
    if (chainId in ERC721CreatorAddressFile) {
        if (!ERC721CreatorAddressFile[chainId]["erc721Creator"].includes(ERC721Creator.address)) {
            ERC721CreatorAddressFile[chainId]["erc721Creator"].push(ERC721Creator.address)
        }
        
    } else {
        ERC721CreatorAddressFile[chainId] = { erc721Creator: [ERC721Creator.address]} 
    }

    if (chainId in ERC20CreatorAddressFile) {
        if (!ERC20CreatorAddressFile[chainId]["erc20Creator"].includes(ERC20Creator.address)) {
            ERC20CreatorAddressFile[chainId]["erc20Creator"].push(ERC20Creator.address)
        }
        
    } else {
        ERC20CreatorAddressFile[chainId]= { erc20Creator:[ERC20Creator.address]} 
    }

    fs.writeFileSync(ERC721CreatorAddress, JSON.stringify(ERC721CreatorAddressFile))
    fs.writeFileSync(ERC20CreatorAddress, JSON.stringify(ERC20CreatorAddressFile))
    console.log(ERC721CreatorAddressFile);
    console.log(ERC20CreatorAddressFile);
}
module.exports.tags = ["all", "frontend"]