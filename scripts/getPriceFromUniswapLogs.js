
const { Provider } = require("@ethersproject/providers");
const { Contract, providers, BigNumber, ContractFactory } = require("ethers");
const {hre, ethers, network, getNamedAccounts} = require("hardhat");

async function main() {

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);

  const ERC721Creator = await ethers.getContract("Creator")
  console.log(ERC721Creator.address);
  console.log('ERC721 Successfully deployed');
  const Collection = await ERC721Creator.createERC721('alireza','arz',1000000000000000, 1000,"chert")
  const tx = await Collection.wait(1)
  const newContractAddress = tx.events[0].args[1]
  console.log(newContractAddress);

  const balance = await ERC721Creator.signer.getBalance()
  console.log(ethers.utils.formatEther(balance).toString());

  const provider =  ethers.getDefaultProvider()
  const NFTcontractBalance = await provider.getBalance(newContractAddress)
  console.log(ethers.utils.formatEther(NFTcontractBalance).toString());

  const CreatorContractBalance = await provider.getBalance(ERC721Creator.address)
  console.log(ethers.utils.formatEther(CreatorContractBalance).toString());

  const NftInstant = (await ethers.getContractAt("ERC721V2")).attach(newContractAddress).connect(deployer)
  console.log(NftInstant.deployed);
  console.log(await provider.getCode(newContractAddress));

  

  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
