// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721V1 is ERC721{

    event Mint(address user,address nftContract, uint256 tokenId);
    event Withdraw(address user, address contractAddress, uint256 value);

    string private s_name;
    string private s_symbol;
    string private s_url;
    address private _owner;
    uint256 private counterTokenID;
    uint256 private s_fee;
    uint256 private immutable i_maxSupply;
    address private parentContract;
    // address private immutable i_owner;

       // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    constructor (string memory name,string memory symbol, uint256 fee, uint256 maxSupply,address owner, string memory imgUrl) ERC721(s_name, s_symbol){
        s_name = name;
        s_symbol = symbol;
        s_fee = fee;
        i_maxSupply = maxSupply;
        _owner = owner;
        s_url = imgUrl;
    }

    modifier onlyOwner {
        require(msg.sender == _owner, "Only owner");
        _;
    }

    function mint () external payable {
        require(msg.value >= s_fee, "Msg.value less than NFT price");
        (bool ok,) = parentContract.call{value: msg.value}("");
        if (ok) {
            _mint(msg.sender, counterTokenID);
        counterTokenID ++;
        }
    }

    function _mint(address to, uint256 tokenId) internal virtual override{
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        require(tokenId <= i_maxSupply, "Max number minted");

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
        emit Mint(to, address(this), tokenId);
        _afterTokenTransfer(address(0), to, tokenId, 1);
    }

    function changeFee(uint256 newFee) external onlyOwner {
        s_fee = newFee;
    }

    function withdraw () external payable {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        if (ok) {
            emit Withdraw(msg.sender, address(this), address(this).balance);
        }
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return s_url;
    }
    // should add only owner modifier
    function setUri(string memory newUri) external onlyOwner {
        s_url = newUri;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        _owner = newOwner;
    }

    function getBalance () external view returns(uint256) {
        return address(this).balance;
    }

    function getPrice () external view returns(uint256) {
        return s_fee;
    }
 
}