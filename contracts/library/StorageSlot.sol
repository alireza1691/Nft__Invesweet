// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

library StorageSlot {
    struct Addresses {
        address ERC20Creator;
    }

    function getAddress(bytes32 slot) internal pure returns(Addresses storage r) {
        assembly {
            r.slot := slot
        }
    }
}