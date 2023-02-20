const { ethers, network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
 
module.exports = async () => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const creationFee = ethers.utils.parseEther("0.01")

    const ERC20CreatorArguments = [creationFee]
    const ERC721CreatorArguments = []
    const ERC20Creator = await deploy("ERC20Creator", {
        from: deployer,
        args: ERC20CreatorArguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const ERC721Creator = await deploy("ERC721Creator", {
        from: deployer,
        args: ERC721CreatorArguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

}

module.exports.tags = ["all", "creators"]