const { ethers, network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
 
module.exports = async () => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const arguments = []
    const ERC20Creator = await deploy("ERC20Creator", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const ERC721Creator = await deploy("CollectionCreator", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

}

module.exports.tags = ["all", "creators"]