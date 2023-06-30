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


    const Token = await deploy("Token", {
        from: deployer,
        args: ["test","tst", deployer],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const SafeTreasury = await deploy("SafeTreasury", {
        from: deployer,
        args: [5],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    
    })

}

module.exports.tags = ["all", "creators"]