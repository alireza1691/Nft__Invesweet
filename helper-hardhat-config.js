const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    5: {
        name: "goerli",
        subscriptionId: "6926",
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: ethers.utils.parseEther("0.01"), // 0.01 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const ERC20CreatorAddress = "./Frontend/creator/Blockchain/ERC20CreatorAddress.json"
const ERC721CreatorAddress = "./Frontend/creator/Blockchain/ERC721CreatorAddress.json"
const ProxyERC721CreatorAddress = "./Frontend/creator/Blockchain/ProxyERC721CreatorAddress.json"
const ProxyERC20CreatorAddress = "./Frontend/creator/Blockchain/ProxyERC20CreatorAddress.json"
const ProxyAdminERC721CreatorAddress = "./Frontend/creator/Blockchain/ProxyAdminERC721CreatorAddress.json"
const ProxyAdminERC20CreatorAddress = "./Frontend/creator/Blockchain/ProxyAdminERC20CreatorAddress.json"
const frontEndERC20CreatorAbiFile = "./Frontend/creator/Blockchain/"
const frontEndERC721CreatorAbiFile = "./Frontend/creator/Blockchain/"
const ProxyAbiFile = "./Frontend/creator/Blockchain/"
const AdminProxyAbiFile = "./Frontend/creator/Blockchain/"

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    ERC20CreatorAddress,
    ERC721CreatorAddress,
    frontEndERC20CreatorAbiFile,
    frontEndERC721CreatorAbiFile,
    ProxyERC721CreatorAddress,
    ProxyERC20CreatorAddress,
    ProxyAdminERC721CreatorAddress,
    ProxyAdminERC20CreatorAddress,
    ProxyAbiFile,
    AdminProxyAbiFile
}