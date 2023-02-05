//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./CollectionV2.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "./Collection.sol";
// import "./CollectionV2.sol";

error CollectionCreator__NotFound();
error CollectionCreator__TransactionFailed();
error CollectionCreator__BalanceZero();

contract CollectionCreator{

    event Withdraw();
    event NewCollection(address requestCollectionFrom, address contractAddress);
    event Name();

address immutable private owner;

constructor(){
    owner = msg.sender;
}

mapping (address => address[]) private ownerToCollection;
mapping (address => uint256) private balances;

function createSingleNft () external {}

function createCollection(
    uint256 _price, uint256 _maxSupply, string memory _name, string memory _symbol, address _requsetFrom, string memory _uri
    ) external {
        CollectionV2 newNft = new CollectionV2(_name,_symbol,_price,_maxSupply,_requsetFrom, _uri);
        address _contractAddress = address(newNft);
        ownerToCollection[_requsetFrom].push(_contractAddress);
    emit NewCollection(_requsetFrom, _contractAddress);
}

function mint(address collectionAddress) payable external {
    CollectionV2(collectionAddress)._mintWithEther(msg.sender,msg.value);
    balances[CollectionV2(collectionAddress).collectionOwner()] += msg.value;
}

function withdraw() external payable {
    if (balances[msg.sender] == 0) {
        revert CollectionCreator__BalanceZero();
    }
    (bool ok,) = msg.sender.call{value: (balances[msg.sender] * 995 / 1000)}("");
    if (ok == false) {
        revert CollectionCreator__TransactionFailed();
    }
    balances[msg.sender] = 0;
}

function getBalance (address userAddress) public view returns(uint256) {
    return balances[userAddress];
}


}