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

    const Creator = await deploy("Creator", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    const ERC721CollateralCreator = await deploy("ERC721CollateralCreator", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    const ERC721ProductCreator = await deploy("ERC721ProductCreator", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    //(string memory _name, string memory _symbol, uint256 _mintFee ,uint256 _maxSupply, address _owner, string memory _uri) ERC721(_name,_symbol)  {

    // const CollectionV1Arguments = ["test","tst",1,1000,deployer,"someURI"]
    // const CollectionV2 = await deploy("ERC721V1", {
    //     from: deployer,
    //     args: CollectionV1Arguments,
    //     log: true,
    //     waitConfirmations: waitBlockConfirmations,
    // })

}

module.exports.tags = ["all", "creators"]