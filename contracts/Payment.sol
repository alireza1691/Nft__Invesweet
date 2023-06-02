// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details


contract Payment is Ownable{

    uint256 private itemCounter;

    constructor() {
        
    }
    mapping (address => mapping( uint256 => uint256 )) balanceOfItem;
    mapping (address => uint) name;
    mapping (uint256 => uint256) itemToPrice;

    function pay(uint256 itemIndex) payable external {
        uint256 price = itemToPrice[itemIndex];
        require(price <= msg.value, "Insufficient amount");
        balanceOfItem[msg.sender][itemIndex] += 1;
    }

    function addItem (uint256 price) external onlyOwner returns( uint256 itemIndex) {
        itemIndex = itemCounter;
        itemToPrice[itemCounter] = price;
        itemCounter++;

    }

    function getPrice(uint256 itemIndex) view public returns (uint256 price) {
        price = itemToPrice[itemIndex];
    }

}


