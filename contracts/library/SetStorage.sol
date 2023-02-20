// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract SetStorage {

    address private owner;
    
    constructor() {
        owner = msg.sender;
    }

    function getAddress() internal {

    }

    function storeAddress() external {

    }
}