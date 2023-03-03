// import Moralis  from 'moralis';
const Moralis = require('moralis').default
const EvmChain = require ('@moralisweb3/common-evm-utils')
// import { EvmChain } from '@moralisweb3/evm-utils';
// import addressFile from './Blockchain/ERC721CreatorAddress.js'
const addressFile = require ('./Blockchain/ERC721CreatorAddress.json')
const abiFile = require ('./Blockchain/ERC721Creator.json')

require ('dotenv').config()

async function main() {

try {
    const abi = abiFile; // Add ABI

    const chainId = process.env.CHAIN_ID

    const address = addressFile[chainId].erc721Creator[0];

    const chain = EvmChain.ETHEREUM;

    await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
        // ...and any other configuration
    });

    const response = await Moralis.EvmApi.events.getContractEvents({
        address,
        chain,
        abi,
    });

    console.log(response?.result);
} catch (e) {
    console.error(e);
}

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })