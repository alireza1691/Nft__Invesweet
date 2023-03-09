
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

  // const balanceBeforeMint = await Creator.getBalance(deployer.address)
  // console.log(balanceBeforeMint.toString());



  const Collection = await Creator.createERC721('test','tst',10,1000,"some uri")
  const tx = await Collection.wait(1)
  const CollectionV1Address = tx.events[0].args[0]
  console.log(`here's collection address: ${CollectionV1Address}`);
  const collectionContract = await ethers.getContractFactory("ERC721V1")
  const collectionInstance = collectionContract.attach(CollectionV1Address)
  console.log("getting contract instance...");
  const singleNft = await collectionInstance.mint({value:1000})
  const anotherNft = await collectionInstance.mint({value:1000})
  const tx2 = await singleNft.wait(1)
  const tx3 = await anotherNft.wait(1)
  console.log(tx3.events[0]);
  // *********________ This way we can create instance for new contract: _____________*******************
  //
  // const CollectionV2Contract = await ethers.getContractAt("CollectionV2", CollectionV2)
  // console.log(CollectionV2Contract);
  // _____________________________________________________

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
