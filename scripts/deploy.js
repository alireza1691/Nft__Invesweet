
const {hre, ethers, network, getNamedAccounts} = require("hardhat");
const ERC721V2Abi = require ('../artifacts/contracts/CollectionV2.sol/CollectionV2.json')

async function main() {

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);


  const Creator = await ethers.getContract("Creator")
  console.log(Creator.address);
  console.log('ERC721 Successfully deployed');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
