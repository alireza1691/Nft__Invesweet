// SPDX-License-Identifier: MIT

import './StorageSlot.sol';

pragma solidity ^0.8.17;

contract SetStorage {

    address private owner;
    bytes32 public constant SLOT = keccak256("Invesweet");
    constructor() {
        owner = msg.sender;
    }

    function getAddress() internal view returns(address){
        return StorageSlot.getAddress(SLOT).value;
    }

    function storeAddress(address newAddress) external {
        StorageSlot.getAddress(SLOT).value = newAddress;
    }
}