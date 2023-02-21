//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error Collection__NotEnoughValue();
error Collection__MaximumSupply();
error Collection__NotAuthorized();

contract CollectionV2 is  ERC721URIStorage{

address immutable private i_creator;
address immutable private i_owner;
uint256 private s_counter = 0;
uint256 immutable private i_mintFee;
uint256 immutable private i_maxSupply;
string private uri;

mapping(uint256 => address) private _owners;

constructor(string memory _name, string memory _symbol, uint256 _mintFee ,uint256 _maxSupply, address _owner, string memory _uri) ERC721(_name,_symbol)  {
    i_creator = msg.sender;
    i_mintFee = _mintFee;
    i_maxSupply = _maxSupply;
    i_owner = _owner;
    uri = _uri;
}


modifier onlyCreator() {
    if(msg.sender == i_creator) {
        _;
    }
    else {
        revert Collection__NotAuthorized(); 
    }
    
}
modifier onlyOwner() {
    if(msg.sender == i_owner) {
        _;
    }
    else {
        revert Collection__NotAuthorized(); 
    }
    
}

function _mintWithEther (address requestFrom , uint256 amount) external onlyCreator returns(uint256) {
    if (amount <= i_mintFee) {
        revert Collection__NotEnoughValue();
    }
    if (i_maxSupply > 0 && s_counter >= i_maxSupply) {
        revert Collection__MaximumSupply();
    }
    _safeMint(requestFrom, s_counter);
    _setTokenURI(s_counter,uri);
    s_counter ++;
    return (s_counter-1);
}
// function _mintWithUsd () external {
// }

function getTokenURI(uint256 tokenId) public view returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    // return tokenURI(tokenId);
    return uri;
}

function changeUri (string memory newUri) external onlyOwner{
    uri = newUri;
}

function price () external view returns(uint256){
    return i_mintFee;
}

function maxSupply() external view returns(uint256){
    return i_maxSupply;
}
function collectionOwner() external view returns(address){
    return i_owner;
}
function count() external view returns(uint256){
    return s_counter;
}
function getOwner (uint256 tokenId) external view returns(address){
    return _owners[tokenId];
}


}