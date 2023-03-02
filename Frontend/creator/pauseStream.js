const Moralis = require("moralis").default;
const dotenv = require("dotenv");
dotenv.config();

const status = "paused";  // we can replace it to "active"

var stream;

Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
}).then(async () =>{
    const streams = await Moralis.Streams.getAll({
        limit: 100
    });
    stream = streams.jsonResponse.result[0]
    await Moralis.Streams.updateStatus({
        id: stream.id,
        status: status
    })
})