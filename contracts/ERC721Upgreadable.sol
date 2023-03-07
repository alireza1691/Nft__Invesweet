// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";


contract ERC721V1 is ERC721Upgradeable {

    string private _name;
    string private _symbol;
    uint256 private _price;

    function __ERC721_init_unchained(string memory name_, string memory symbol_) internal override onlyInitializing {
        _name = name_;
        _symbol = symbol_;
    }

    
}

