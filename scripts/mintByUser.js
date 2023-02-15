
const {hre, ethers, network, getNamedAccounts} = require("hardhat");

async function main() {

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);

  const ERC721Creator = await ethers.getContract("ERC721Creator")
  console.log(ERC721Creator.address);
  console.log('ERC721 Successfully deployed');
  const Collection = await ERC721Creator.createCollection(1,100,'alireza','arz',deployer.address,"chert")
  const tx = await Collection.wait(1)
  const newContractAddress = tx.events[0].args[1]
  console.log(newContractAddress);
  

  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
