// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract ERC721V1Upgreadable is ERC721Upgradeable {

    event Withdraw(address user, address contractAddress, uint256 value);

    string private _name;
    string private _symbol;
    uint256 private _price;
    string private _url;
    address private _owner;
    uint256 private counterID;


    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    modifier onlyOwner {
        require(msg.sender == _owner, "Not owner");
        _;
    }

    function __ERC721_init(string memory name_, string memory symbol_,address owner,string memory imageURL) internal onlyInitializing {
        require(msg.value >= _price, "Insufficient fee");
        _owner = owner;
        _url = imageURL;
        __ERC721_init_unchained(name_, symbol_);
    }



    function __ERC721_init_unchained(string memory name_, string memory symbol_) internal override onlyInitializing {
        _name = name_;
        _symbol = symbol_;
    }

    function _safeMint(address to) internal virtual {
        _safeMint(to, counterID, "");
        counterID ++;
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
        if (ok) {
            emit Withdraw(msg.sender, address(this), address(this).balance);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _url;
    }
    // should add only owner modifier
    function setUri(string memory newUri) external onlyOwner {
        _url = newUri;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        _owner = newOwner;
    }


    
}

