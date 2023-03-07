
const {hre, ethers, network, getNamedAccounts} = require("hardhat");

async function main() {

    let params = ["testName","testSymbol"]
    const ERC721Upgreadable = await ethers.getContractFactory("ERC721Upgreadable")
    console.log("Deploying ERC721Upgreadable, ProxyAdmin, and then Proxy...")
    const proxy = await upgrades.deployProxy(ERC721Upgreadable, params, { initializer: '__ERC721_init' })
    console.log("Proxy of Box deployed to:", proxy.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
