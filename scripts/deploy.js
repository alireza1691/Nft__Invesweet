
const {hre, ethers, network, getNamedAccounts} = require("hardhat");
const ERC721V2Abi = require ('../artifacts/contracts/CollectionV2.sol/CollectionV2.json')

async function main() {

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);


  const ERC721Creator = await ethers.getContract("ERC721Creator")
  console.log(ERC721Creator.address);
  console.log('ERC721 Successfully deployed');

  const balanceBeforeMint = await ERC721Creator.getBalance(deployer.address)
  console.log(balanceBeforeMint.toString());



  const Collection = await ERC721Creator.createCollection('test','tst',10,1000,"some uri")
  const tx = await Collection.wait(1)
  const CollectionV2 = tx.events[0].args[1]
  console.log(CollectionV2);
  const signleNft = await ERC721Creator.mint(CollectionV2,{value:1000})
  const balanceAfterMint = await ERC721Creator.getBalance(deployer.address)
  console.log(balanceAfterMint.toString());

  // *********________ This way we can create instance for new contract: _____________*******************
  //
  // const CollectionV2Contract = await ethers.getContractAt("CollectionV2", CollectionV2)
  // console.log(CollectionV2Contract);
  // _____________________________________________________


  console.log(signleNft);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
