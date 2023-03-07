// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract ERC721V1 is ERC721Upgradeable {

    string private _name;
    string private _symbol;
    uint256 private _price;


    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;


    function __ERC721_init_unchained(string memory name_, string memory symbol_) internal override onlyInitializing {
        require(msg.value >= _price, "Insufficient fee");
        _name = name_;
        _symbol = symbol_;
    }

      function _mint(address to, uint256 tokenId) internal virtual override {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");         
        require(msg.value > _price, "ERC721: mint needs mintFee");
        _beforeTokenTransfer(address(0), to, tokenId, 1);

        // Check that tokenId was not minted by `_beforeTokenTransfer` hook
        require(!_exists(tokenId), "ERC721: token already minted");

        unchecked {
            // Will not overflow unless all 2**256 token ids are minted to the same owner.
            // Given that tokens are minted one by one, it is impossible in practice that
            // this ever happens. Might change if we allow batch minting.
            // The ERC fails to describe this case.
            _balances[to] += 1;
        }

        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);

        _afterTokenTransfer(address(0), to, tokenId, 1);
    }

    function withdraw () external payable {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
    }

    
}

