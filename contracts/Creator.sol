// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ERC721Upgreadable.sol";
import "./ERC721V1.sol";
import "./ERC20v2.sol";


contract Creator {
    
    event ERC721Create(address indexed contractAddress, address indexed owner, string symbol);

    address private s_owner;
    uint256 private s_ERC721Fee;

    mapping (address => uint256) private balances;
    mapping (address => address[]) private addressToContracts;
    constructor() {
        s_owner = msg.sender;
    }


    function createERC721(string memory name, string memory symbol, uint256 mintFee, uint256 maxSupply, string memory imageURL) payable external returns(address) {
        require(msg.value >= s_ERC721Fee, "create exceeds fee");
        ERC721V1 newNft = new ERC721V1(name, symbol ,mintFee, maxSupply, msg.sender, imageURL);
        emit ERC721Create(address(newNft), msg.sender, symbol);
        return address(newNft);
    }

    
    function getUserContracts(address user) external view returns(address[] memory){
        return addressToContracts[user];
    }

    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }
    
    function mint(address nftContractAddress) external payable {
        ERC721V1 ContractInstance = ERC721V1(nftContractAddress);
        uint256 price = ContractInstance.getPrice();
        require(msg.value >= price);
        ContractInstance.mint();
    }

}