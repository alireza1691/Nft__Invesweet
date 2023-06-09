
const { Provider } = require("@ethersproject/providers");
const { Contract, providers, BigNumber, ContractFactory } = require("ethers");
const { formatEther } = require("ethers/lib/utils");
const {hre, ethers, network, getNamedAccounts} = require("hardhat");
const compiledContract = require('../artifacts/contracts/ERC721V1.sol/ERC721V1.json')

async function main() {

  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const user =  accounts[1]
  console.log(deployer.address,'\n',user.address);

  // Get instance of creator, then show it's address and balance
  const zeroAddress = "0x0000000000000000000000000000000000000000"
  const tokenContract = await ethers.getContract("Token")
  const tokenAddress =  tokenContract.address
    console.log("token address:",tokenAddress);
 
//   const tx = await tokenContract.deployed()
  const safeT = await ethers.getContract("SafeTreasury")
  await tokenContract.connect(deployer).approve(safeT.address, 100)
  await safeT.connect(deployer).deposit(tokenAddress, 100)
  const balance1 = await safeT.balance(tokenAddress, deployer.address)
  console.log("Deposit succeed, current balance:",balance1.toString());
  await safeT.connect(deployer).withdraw(tokenAddress, 40)
  const balance2 = await safeT.balance(tokenAddress, deployer.address)
  console.log("Withdraw for 40 token succeed, current balance:",balance2.toString());
  await safeT.connect(deployer).authorize(user.address)
  console.log("New address authorized");
  await safeT.connect(user).withdrawByAA(tokenAddress,10)
  const balance3 = await safeT.balance(tokenAddress, deployer.address)
  console.log("Withdraw by authorized address succeed, Heres new balance after withdraw 10 tokens:", balance3.toString());
  const userBalance = await tokenContract.balanceOf(user.address)
  console.log("Here is the balance of withdrawed token: ",userBalance.toString());

  await safeT.connect(deployer).depositNT({value: 1000})
  const balance4 = await safeT.balance(zeroAddress, deployer.address)
  console.log("Deposit of native token succeed, here is the balance: ",balance4.toString());
  await safeT.connect(deployer).withdrawNT(300)
  console.log("Withdrawal succeed");
  const balance5 = await safeT.balance(zeroAddress, deployer.address)
  console.log("Balance after native token withdrawal: ", balance5.toString());
  await safeT.connect(user).withdrawNTByAA(100)
  const balance6 = await safeT.balance(zeroAddress, deployer.address)
  console.log("Balance after 100 native token withdrawed by anuthorized address : ", balance6.toString());

  await safeT.connect(deployer).externalTransfer(tokenAddress, user.address, 10)
  const balance7 = await tokenContract.balanceOf(user.address)
  console.log("Balance of user after external transfer by deployer: ",balance7.toString());

  await safeT.connect(deployer).internalTransfer(tokenAddress, user.address, 10)
  const balance8 = await safeT.balance(tokenAddress, user.address)
  console.log("Balance of user after internal transfer by deployer :",balance8.toString() );




}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
