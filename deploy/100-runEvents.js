const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const {hre, ethers, network, getNamedAccounts} = require("hardhat");

const runApp = async () => {
    
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  });

  const address = (await ethers.getContract("ERC20Creator")).address;

  const chain = EvmChain.ETHEREUM;

  const response = await Moralis.EvmApi.events.getContractLogs({
    address,
    chain,
  });

  console.log(response.toJSON());
};

runApp();