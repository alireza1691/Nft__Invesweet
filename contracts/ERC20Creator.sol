// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20v2.sol";


contract ERC20Creator {

    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function create( string memory name, string memory symbol, uint256 maxSupply, uint256 firstSupply , uint256 mineReward,uint256 decimals) external {
        ERC20v2 newToken = new ERC20v2(name,symbol,maxSupply,firstSupply,mineReward,decimals,msg.sender);
    }
}
