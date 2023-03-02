const Moralis = require("moralis").default;
const express = require('express')
const app = express()
const cors = require('cors')
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const {hre, ethers, network, getNamedAccounts} = require("hardhat");
const contractAddresses = require("./Blockchain/ERC721CreatorAddress");
require ('dotenv').config()

const port = 5001

const runApp = async () => {

    app.use(cors())
    app.use(express.json())
    app.get("/getLogs",async (req,res) => {
        try {
            const { query } = req;
            const response = await Moralis.EvmApi.events.getContractLogs({
                address: query.address,
                chain: query.chain
            })

            return res.status(200).json(response)
        } catch (e) {
            console.log("Something went wrong");
            return res.status(400).json()
        }
    })
    
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
    // ...and any other configuration
  });
  const chainId = process.env.CHAIN_ID

  const chain = EvmChain.ETHEREUM;

  const address = contractAddresses[chainId]["erc721Creator"][0];

  const response = await Moralis.EvmApi.events.getContractLogs({
    address,
    chain,
  });

  console.log(response.toJSON());
};
const stream = {
    chains: [EvmChain.ETHEREUM, EvmChain.POLYGON], // list of blockchains to monitor
    description: "monitor Bobs wallet", // your description
    tag: "bob", // give it a tag
    webhookUrl: "https://YOUR_WEBHOOK_URL", // webhook url to receive events,
    includeNativeTxs: true
  }

runApp();