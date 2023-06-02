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
// struct Token {
//     mapping (address => uint256) userBalance;
// }

mapping (address => address) authorizedAddressesToMainAddress;
mapping (address => mapping(address => uint256)) tokenAddressToOwnerToBalance;

function deposit(address tokenAddress, uint256 amount) external {
    (bool ok) = IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
    require(ok,"Transaction failed");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] += amount;
}

function  withdraw (address tokenAddress, uint256 amount) external{
    uint256 balance = tokenAddressToOwnerToBalance[tokenAddress][msg.sender];
    if (balance < amount) {
        revert();
    }
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    (bool ok) = IERC20(tokenAddress).transfer(msg.sender, amount);
    require(ok,"failed");
}
function withdrawByAuthorized(address tokenAddress,uint256 amount) external {
        address main = getAuthorized(msg.sender);
        uint256 mainAddressBalance = tokenAddressToOwnerToBalance[tokenAddress][main];
        if (mainAddressBalance < amount ) {
            revert();
        }
        tokenAddressToOwnerToBalance[tokenAddress][main] -= amount;
        (bool ok) = IERC20(tokenAddress).transfer(msg.sender, amount);
        require(ok,"failed");
}

function transfer(address tokenAddress, address to, uint256 amount) external{
    uint256 balance = tokenAddressToOwnerToBalance[tokenAddress][msg.sender];
    if (balance >= amount) {
        tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
        IERC20(tokenAddress).transfer(to, (amount * 995)/1000);
    }
}

function cheque(address tokenAddress, address to, uint256 amount) external{
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    tokenAddressToOwnerToBalance[tokenAddress][to] += (amount * 995)/1000;
}
function authorize(address authorizedAddress) external {
    authorizedAddressesToMainAddress[authorizedAddress]= msg.sender;
}

// View funcs
function balance(address tokenAddress, address userAddress) public view returns (uint256) {
    return tokenAddressToOwnerToBalance[tokenAddress][userAddress];
}

function getAuthorized(address from) view public returns (address) {
    return authorizedAddressesToMainAddress[from];
}

}