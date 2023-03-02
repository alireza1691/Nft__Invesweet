const Moralis = require("moralis").default;
require("dotenv").config();

const options = ['us-east-1','us-west-2','eu-central-1','ap-southeast-1']

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
}).then(async () =>{
    const streams = await Moralis.Streams.setSettings({
        region: options[1],
    });
    const settingResponse = await Moralis.Streams.readSettings()
    console.log(settingResponse);
})