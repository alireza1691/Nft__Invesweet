// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details


contract SafeTreasury is Ownable{

    /* What we want?
    Function to deposit
    Function to withdraw
    Function to get permit for specific token to specific address
    Function to withdraw permtied amount of token
    Function to authorize another address that can withdraw all funds
    Function to remove authorize address


    */

// Mappings:

// Mapping to get the address who authorized another address. We need this when an authorzied address wants to withdraw or transfer funcds of another address.
mapping (address => address) authorizedAddressesToMainAddress;
// Mapping to get token balance of each address (token address => user address => balance)
mapping (address => mapping(address => uint256)) tokenAddressToOwnerToBalance;


// External functions:

// Depist token to contract and increase balance of the address.
/// @dev Before calling this function, to transfer ERC20 token in smart contract we need to approve the amount that smart contract can spend token.
function deposit(address tokenAddress, uint256 amount) external {
    (bool ok) = IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
    require(ok,"Transaction failed");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] += amount;
}

// Deposit native toke of the chain and the amount is msg.value.
// NT stands for: native token
function depositNT() external payable {
    tokenAddressToOwnerToBalance[address(0)][msg.sender] += msg.value;
}


// Withdrawal of assets if amount less than balance or equal.
function withdraw (address tokenAddress, uint256 amount) external{
    require(tokenAddressToOwnerToBalance[tokenAddress][msg.sender] >= amount,"Insufficient balance");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    (bool ok) = IERC20(tokenAddress).transfer(msg.sender, amount);
    require(ok,"Withdraw failed");
}

// Withdrawal of native token of the current chain.
// This withdrawal is same as previous one but we set token address as
function withdrawNT(uint256 amount) external payable {
    require(tokenAddressToOwnerToBalance[address(0)][msg.sender] > amount,"Insufficient balance");
    tokenAddressToOwnerToBalance[address(0)][msg.sender] -= amount;
    (bool ok,) = msg.sender.call{value: amount}("");
    require(ok,"Withdraw failed");
}

// Withdrawal just for addresses who authorized by another address and they have access to another address assets.
// AD stands for: authorized address
function withdrawByAD(address tokenAddress,uint256 amount) external {
        address main = getAuthorized(msg.sender);
        uint256 mainAddressBalance = tokenAddressToOwnerToBalance[tokenAddress][main];
        require (mainAddressBalance > amount,"Insufficient balance" );
        tokenAddressToOwnerToBalance[tokenAddress][main] -= amount;
        (bool ok) = IERC20(tokenAddress).transfer(msg.sender, amount);
        require(ok,"Withdraw failed");
}

function withdrawNTByAD(uint256 amount) external {
        address main = getAuthorized(msg.sender);
        uint256 mainAddressBalance = tokenAddressToOwnerToBalance[address(0)][main];
        require (mainAddressBalance > amount,"Insufficient balance" );
        tokenAddressToOwnerToBalance[address(0)][main] -= amount;
        (bool ok, ) = msg.sender.call{value: (amount*995)/1000 }("");
        require(ok,"Withdraw failed");
}

function externalTransfer(address tokenAddress, address to, uint256 amount) external{
    require(tokenAddressToOwnerToBalance[tokenAddress][msg.sender] >= amount, "Insufficient balance");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    bool ok = IERC20(tokenAddress).transfer(to, (amount * 995)/1000);
    require(ok,"Transaction failed");
}

function internallTransfer(address tokenAddress, address to, uint256 amount) external{
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    tokenAddressToOwnerToBalance[tokenAddress][to] += (amount * 995)/1000;
}

function authorize(address authorizedAddress) external {
    authorizedAddressesToMainAddress[authorizedAddress]= msg.sender;
}

function removeAuthorize(address authorizedAddress) external {
    require(authorizedAddressesToMainAddress[authorizedAddress] == msg.sender, "You have not any authorized address");
        authorizedAddressesToMainAddress[authorizedAddress] = address(0);
}
// remove authorize should add

// View funcs
function balance(address tokenAddress, address userAddress) public view returns (uint256) {
    return tokenAddressToOwnerToBalance[tokenAddress][userAddress];
}

function getAuthorized(address from) view public returns (address) {
    return authorizedAddressesToMainAddress[from];
}

}