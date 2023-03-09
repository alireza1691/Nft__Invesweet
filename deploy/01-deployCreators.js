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

    const Creator = await deploy("Creator", {
        from: deployer,
        args: ERC721CreatorArguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    //(string memory _name, string memory _symbol, uint256 _mintFee ,uint256 _maxSupply, address _owner, string memory _uri) ERC721(_name,_symbol)  {

    // const CollectionV2Arguments = ["test","tst",1,1000,deployer,"someURI"]
    // const CollectionV2 = await deploy("CollectionV2", {
    //     from: deployer,
    //     args: CollectionV2Arguments,
    //     log: true,
    //     waitConfirmations: waitBlockConfirmations,
    
    // })

}

module.exports.tags = ["all", "creators"]