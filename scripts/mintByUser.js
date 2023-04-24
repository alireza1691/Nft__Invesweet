
const { Provider } = require("@ethersproject/providers");
const { Contract, providers, BigNumber, ContractFactory } = require("ethers");
const {hre, ethers, network, getNamedAccounts} = require("hardhat");
const compiledContract = require('../artifacts/contracts/ERC721V1.sol/ERC721V1.json')

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

  await ERC721Creator.setFee(ethers.utils.parseEther("0.1"))
  const fee = await ERC721Creator.getFee()
  console.log(`fee = ${ethers.utils.formatEther(fee)} ETH`);

  //  Create first collection using creator , get address and get address


  const Collection = await ERC721Creator.createERC721('alireza','arz',ethers.utils.parseEther("0.1"), 1000,"chert",{value: fee})
  const tx = await Collection.wait(1)
  const newContractAddress = tx.events[0].args.contractAddress
  console.log(newContractAddress);

  const balanceAfter = await ERC721Creator.getBalance()
  console.log(`creator balance after${ethers.utils.formatEther(balanceAfter).toString()}`);


  //
  const provider =  ethers.getDefaultProvider()
  const collectionContract = (await ethers.getContractFactory("ERC721V1")).attach(newContractAddress)
//   const NFTcontractBalance = await provider.getBalance(newContractAddress)
    const NFTcontractBalance = await collectionContract.getBalance()
  console.log("Balance before mint",ethers.utils.formatEther(NFTcontractBalance).toString());

    const mintPrice = await collectionContract.getPrice()
    const mintTx = await ERC721Creator.mint(newContractAddress,{value: mintPrice})
    // await mintTx.wait(1)
    // console.log(mintTx);

    const NFTcontractBalanceAfterMint = await collectionContract.getBalance()
    console.log("Balance after mint",ethers.utils.formatEther(NFTcontractBalanceAfterMint).toString());
    const balanceAfterMint = await ERC721Creator.getBalance()
    console.log(`creator balance after Mint${ethers.utils.formatEther(balanceAfterMint).toString()}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
