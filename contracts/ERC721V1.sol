// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721V1 is ERC721{

    uint256 private s_fee;

    uint256 private immutable i_maxSupply;

    address private immutable i_owner;

       // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    constructor (string memory _name,string memory _symbol, uint256 fee, uint256 maxSupply,address owner) ERC721(_name, _symbol){
        s_fee = fee;
        i_maxSupply = maxSupply;
        i_owner = owner;
    }

    modifier onlyOwner {
        require(msg.sender == i_owner, "Only owner");
        _;
    }

    function _mint(address to, uint256 tokenId) internal virtual override{
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        require(tokenId <= i_maxSupply, "Max number minted");
        require(msg.value >= s_fee, "Msg.value less than NFT price");

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

    function changeFee(uint256 newFee) external onlyOwner {
        s_fee = newFee;
    }
}