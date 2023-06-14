// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A simple contract to manage paymanet for different products.
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details


contract Payment is Ownable{

    uint256 private itemCounter;
    bytes private str = abi.encodePacked("alireza","haghshenas");

    constructor() {
        
    }

    // struct item {
    //     address holders;
    //     uint256 price;
    //     string name;
    // }
    mapping (address => mapping( uint256 => uint256 )) balanceOfItem;
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

    function withdraw() external onlyOwner{
        (bool ok,) = msg.sender.call{value: address(this).balance}("");
        require(ok, "Withdraw failed!");
    }

    function getPrice(uint256 itemIndex) view public returns (uint256 price) {
        price = itemToPrice[itemIndex];
    }

    function getCounter() view external returns (uint256) {
        return itemCounter;
    }

    function checkPurchasedItem(address user, uint256 itemIndex) view public returns (uint256) {
        return balanceOfItem[user][itemIndex];
    }
    

    receive() external payable{}
}


