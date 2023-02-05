//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error Collection__NotEnoughValue();
error Collection__MaximumSupply();
error Collection__NotAuthorized();

contract CollectionV2 is ERC721{

address immutable private i_creator;
address immutable private i_owner;
uint256 private s_counter = 0;
uint256 immutable private i_price;
uint256 immutable private i_maxSupply;
string private i_uri;

constructor(string memory _name, string memory _symbol, uint256 _price ,uint256 _maxSupply, address _owner, string memory _uri) ERC721(_name,_symbol)  {
    i_creator = msg.sender;
    i_price = _price;
    i_maxSupply = _maxSupply;
    i_owner = _owner;
    i_uri = _uri;
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

function _mintWithEther (address requestFrom , uint256 amount) public onlyCreator{
    if (amount <= i_price) {
        revert Collection__NotEnoughValue();
    }
    if (i_maxSupply > 0 && s_counter > i_maxSupply) {
        revert Collection__MaximumSupply();
    }
 _safeMint(requestFrom, s_counter);
 s_counter ++;
}

// function _mintWithUsd () external {
// }


function changeUri (string memory newUri) external onlyOwner{
    i_uri = newUri;
}

function price () external view returns(uint256){
    return i_price;
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

}