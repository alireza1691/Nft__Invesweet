// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20v2.sol";


contract ERC20Creator {

    event NewERC20(address indexed owner, address indexed tokenAddress,string name, string indexed symbol);

    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function create( string memory name, string memory symbol, uint256 maxCap, uint256 firstSupply,uint256 burnPercent ,uint256 decimals) external {
        ERC20v2 newToken = new ERC20v2(name,symbol,maxCap,firstSupply,burnPercent,decimals,msg.sender);
        address newTokenAddress = address(newToken);
        emit NewERC20(msg.sender, newTokenAddress, name, symbol);
    }
}
