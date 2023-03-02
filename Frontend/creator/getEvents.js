import Moralis  from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import addressFile from './Blockchain/ERC721CreatorAddress.js'
import abiFile from './Blockchain/ERC721721Creator.js'

require ('dotenv').config()

try {
    const abi = abiFile; // Add ABI

    const chainId = process.env.CHAIN_ID

    const address = addressFile[chainId][ERC721Creator[0]];

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