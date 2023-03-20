
const {hre, ethers, network, getNamedAccounts} = require("hardhat");

async function main() {

    const accounts = await ethers.getSigners()
    const contractFactory = await ethers.getContractFactory("Token")
    const ERC20 = await contractFactory.deploy("name","symbol",accounts[1].address)
    console.log("Instance created");
    await ERC20.deployed()
    console.log("token address",ERC20.address);
    const Transfer = await ethers.getContractFactory("Transfer")
    const transfer = await Transfer.deploy()
    await transfer.deployed()
    console.log("transfer address", transfer.address);
    console.log("user1:", accounts[1].address);
    console.log("user2:", accounts[2].address);
    const tx =  await transfer.connect(accounts[1])._approve(100000000,ERC20.address,accounts[2].address)
    await tx.wait()
    const acc2Allowance = await transfer.connect(accounts[1]).ckeckAllowance(ERC20.address,accounts[1].address,accounts[2].address)
    console.log(await acc2Allowance.toString());
    await transfer.connect(accounts[1]).transfer(ERC20.address,accounts[2].address,1000000)
    const balance = await transfer.connect(accounts[1]).checkBalances(accounts[2].address,ERC20.address)
    console.log(balance);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
