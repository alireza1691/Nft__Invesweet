// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title A smart contract that works as a treasury to keep user assets safe.
/// @author Alireza Haghshenas Github: alireza1691
/// @notice This smart contract was written as a first version to test and develop and its not recommended to deploy on mainnet chains.


contract SafeTreasury is Ownable , ReentrancyGuard{

    error SafeTreasury__NotAuthorized();
    error SafeTreasury__InsufficientBalance();
    error SafeTreasury__TransactionFailed();
    error SafeTreasury__AddressNotFound();

    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// @param user is address of user who deposited.
    /// @param token is address of ERC20 smart contract of the token.
    /// @param amount is amount of deposited token.
    event Deposit(address user, address token, uint256 amount);
    event Withdraw(address user, address token, uint256 amount);
    event Authorize(address owner, address authorizedAddress);
    event RemoveAuthorize(address owner, address authorizedAddress);
    event Transfer(address from, address to, address token, uint256 amount);
    event ExternallTransfer(address from, address to, address token, uint256 amount);


    // Mappings:
    // Mapping to get the address who authorized another address. We need this when an authorzied address wants to withdraw or transfer funcds of another address.
mapping (address => address) private authorizedAddressesToMainAddress;
    // Mapping to get token balance of each address (token address => user address => balance)
mapping (address => mapping(address => uint256)) private tokenAddressToOwnerToBalance;


    // External functions:
/// @notice Depist ERC20 token into contract, thereby increasing balance of the address who deposited.
/// @dev Before calling this function, to transfer ERC20 token from user to address(this) we need to approve the amount in ERC20 smart contract as requirement of transferFrom function.
/// @param tokenAddress is address of ERC20 token contract.
/// @param amount is amount of ERC20 token.
function deposit(address tokenAddress, uint256 amount) external {
    (bool success) = IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
    require(success, "Transaction failed");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] += amount;
    emit Deposit(msg.sender, tokenAddress, amount);
}

/// @notice Deposit native toke of the chain and the amount is msg.value (NT stands for: native token).
/// @dev Note that here we assume address of native token as address(0) adn since we enter amount of native token as msg.value, there isn't any input in this function
function depositNT() external payable {
    tokenAddressToOwnerToBalance[address(0)][msg.sender] += msg.value;
    emit Deposit(msg.sender, address(0), msg.value);
}

/// @notice Withdrawal of assets if amount less than balance or equal.
/// @dev Explain to a developer any extra details
function withdraw (address tokenAddress, uint256 amount) external nonReentrant returns(address){
    address from;
    if (tokenAddressToOwnerToBalance[tokenAddress][msg.sender] < amount) {
        address mainAddress = getAuthorized(msg.sender);
        uint256 mainAddressBalance = tokenAddressToOwnerToBalance[tokenAddress][mainAddress];
        require(mainAddress != address(0) &&
        mainAddressBalance >= amount
        ,"Insufficient balance");
        tokenAddressToOwnerToBalance[tokenAddress][mainAddress] -= amount;
        (bool authorizrdSuccessTransfer) = IERC20(tokenAddress).transfer(msg.sender, (amount*995)/1000 );
        require(authorizrdSuccessTransfer,"Transacion failed");
    from = mainAddress;
    } else {
        tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
        (bool successTransfer) = IERC20(tokenAddress).transfer(msg.sender, (amount*995)/1000 );
        require(successTransfer,"Transacion failed");
    from = msg.sender;
    }
    emit Withdraw(from, tokenAddress, amount);
    return from;
}
/// @notice Withdrawal of native token of the current chain.
/// @dev This withdrawal is the same as the previous one but to withdraw native token we should call this function instead of the previous one.
function withdrawNT(uint256 amount) external payable nonReentrant returns(address){
    address from;
    if (tokenAddressToOwnerToBalance[address(0)][msg.sender] < amount) {
        address mainAddress = getAuthorized(msg.sender);
        uint256 mainAddressBalance = tokenAddressToOwnerToBalance[address(0)][mainAddress];
        require(mainAddress != address(0) &&
        mainAddressBalance >= amount
        ,"Insufficient balance");
        tokenAddressToOwnerToBalance[address(0)][mainAddress] -= amount;
        (bool authorizrdSuccessTransfer,) = msg.sender.call{value: (amount*995)/1000 }("");
        require(authorizrdSuccessTransfer,"Transacion failed");
    from = mainAddress;
    }
    else {
        tokenAddressToOwnerToBalance[address(0)][msg.sender] -= amount;
    (bool successTransfer,) = msg.sender.call{value:  (amount*995)/1000 }("");
    require(successTransfer,"Transacion failed");
    from = msg.sender;
    }
    emit Withdraw(from, address(0), amount);
    return (from);
    
}
    // Transfer asset from this smart contract to another address
function externalTransfer(address tokenAddress, address to, uint256 amount) external nonReentrant{
    require(tokenAddressToOwnerToBalance[tokenAddress][msg.sender] >= amount, "Insufficient balance");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    bool success = IERC20(tokenAddress).transfer(to, (amount * 995)/1000);
    require(success,"Transaction failed");
    emit ExternallTransfer(msg.sender, to, tokenAddress, amount);
}

    // Transfer asset inside contract without withdrawing fund from this smart contract.
    // It decreases the balance of sender address and increases balance of receiver address.
function transfer(address tokenAddress, address to, uint256 amount) external{
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    tokenAddressToOwnerToBalance[tokenAddress][to] += (amount * 995)/1000;
    emit Transfer(msg.sender, to, tokenAddress, amount);
}

    // With this function an address can authorize another address to have access its assets.
function authorize(address authorizedAddress) external {
    authorizedAddressesToMainAddress[authorizedAddress]= msg.sender;
    emit Authorize(msg.sender, authorizedAddress);
}

    // This function will remove authorized address. 
function removeAuthorize(address authorizedAddress) external {
    if (authorizedAddressesToMainAddress[authorizedAddress] != msg.sender) {
        revert SafeTreasury__AddressNotFound();
    }
    authorizedAddressesToMainAddress[authorizedAddress] = address(0);
    emit RemoveAuthorize(msg.sender, authorizedAddress);
}

    // What else we need?
    // A function to withdraw fees by owner

    // View funcs:

    // Show token balance of an address using token address and user address.
function balance(address tokenAddress, address userAddress) public view returns (uint256) {
    return tokenAddressToOwnerToBalance[tokenAddress][userAddress];
}

    // To get an address that authorized another address.
    // If returns address(0),'from' address not authorized by any address.
function getAuthorized(address from) view public returns (address) {
    return authorizedAddressesToMainAddress[from];
}

}