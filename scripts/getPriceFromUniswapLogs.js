
const { Provider } = require("@ethersproject/providers");
const { Contract, providers, BigNumber, ContractFactory } = require("ethers");
const {hre, ethers, network, getNamedAccounts} = require("hardhat");

async function main() {

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);

  // Get instance of creator, then show it's address and balance

  const ERC721Creator = await ethers.getContract("Creator")
  console.log(`creator address ${ERC721Creator.address}`);
  const balanceBefore = await ERC721Creator.getBalance()
  console.log(`creator balance before${ethers.utils.formatEther(balanceBefore).toString()}`);

  // Set fee for creation:

  await ERC721Creator.setFee(1000000000000000)
  const fee = await ERC721Creator.getFee()
  console.log(`fee = ${fee}`);

  //  Create firs collection using creator , get address and get address


  const Collection = await ERC721Creator.createERC721('alireza','arz',2000000000000000, 1000,"chert",{value: fee})
  const tx = await Collection.wait(1)
  const newContractAddress = tx.events[0].args[1]
  console.log(`collection address${newContractAddress}`);

  const balanceAfter = await ERC721Creator.getBalance()
  console.log(`creator balance after${ethers.utils.formatEther(balanceAfter).toString()}`);


  //

  const provider =  ethers.getDefaultProvider()
  const NFTcontractBalance = await provider.getBalance(newContractAddress)
  console.log(ethers.utils.formatEther(NFTcontractBalance).toString());

  const CreatorContractBalance = await provider.getBalance(ERC721Creator.address)
  console.log(ethers.utils.formatEther(CreatorContractBalance).toString());

//   const NftInstant = (await ethers.getContractFactory("ERC721V2")).attach(newContractAddress).connect(deployer)
//   console.log(NftInstant.deployed);
  console.log(await Provider.getCode(newContractAddress));
  console.log(await provider.getCode(ERC721Creator.address));

  

  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
