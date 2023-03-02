const Moralis = require("moralis").default;
const dotenv = require("dotenv");
dotenv.config();

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
}).then(async () =>{
    const streams = await Moralis.Streams.getAll({
        limit: 100
    });
    console.log(streams.jsonResponse.result);
})