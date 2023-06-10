// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Importing the Chainlink Client contract from OpenZeppelin
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract OracleContract is ChainlinkClient {
    // The address of the oracle node
    address private oracle;
    // The job ID for the Chainlink node to execute
    bytes32 private jobId;
    // The fee to pay the oracle for executing the job
    uint256 private fee;
    
    // The result of the oracle job
    uint256 public result;
    
    constructor() public {
        // Set up the Chainlink client with a default endpoint and a link token address
        setChainlinkToken(0x514910771AF9Ca656af840dff83E8264EcF986CA);
        setChainlinkOracle(0xc99B3D447826532722E41bc36e644ba3479E4365);
        
        // Set up the job ID and fee for the oracle job
        jobId = "29fa9aa13bf1468788b7cc4a500a45b8";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }
    
    function requestResult() public {
        // Create a new Chainlink request with the specified parameters
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set additional parameters for the request, such as API endpoint and response format
        req.add("get", "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        req.add("path", "ethereum.usd");
        
        // Send the request to the oracle node and pay the fee
        sendChainlinkRequestTo(oracle, req, fee);
    }
    
    function fulfill(bytes32 _requestId, uint256 _result) public recordChainlinkFulfillment(_requestId) {
        // Store the result of the oracle job in a public variable
        result = _result;
    }
}
