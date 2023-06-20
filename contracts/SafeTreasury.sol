// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// ****************************************************
// ********************** Imports **********************
// ****************************************************


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

library TransferHelper {
    /// @notice Transfers tokens from the targeted address to the given destination
    /// @notice Errors with 'STF' if transfer fails
    /// @param token The contract address of the token to be transferred
    /// @param from The originating address from which the tokens will be transferred
    /// @param to The destination address of the transfer
    /// @param value The amount to be transferred
    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) =
            token.call(abi.encodeWithSelector(IERC20.transferFrom.selector, from, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'STF');
    }

    /// @notice Transfers tokens from msg.sender to a recipient
    /// @dev Errors with ST if transfer fails
    /// @param token The contract address of the token which will be transferred
    /// @param to The recipient of the transfer
    /// @param value The value of the transfer
    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.transfer.selector, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'ST');
    }

    /// @notice Approves the stipulated contract to spend the given allowance in the given token
    /// @dev Errors with 'SA' if transfer fails
    /// @param token The contract address of the token to be approved
    /// @param to The target of the approval
    /// @param value The amount of the given token the target will be allowed to spend
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(IERC20.approve.selector, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'SA');
    }

    /// @notice Transfers ETH to the recipient address
    /// @dev Fails with `STE`
    /// @param to The destination of the transfer
    /// @param value The value to be transferred
    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'STE');
    }
}


/// @title A smart contract that works as a treasury to keep user assets safe.
/// @author Alireza Haghshenas Github: alireza1691
/// @notice This smart contract was written as a first version to test and develop and its not recommended to deploy on mainnet chains.


contract SafeTreasury is Ownable , ReentrancyGuard{

    
// ****************************************************
// ********************** Events **********************
// ****************************************************


    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// @param user is address of user who deposited.
    /// @param token is address of ERC20 smart contract of the token.
    /// @param amount is amount of deposited token.
    event Deposit(address user, address token, uint256 amount);
    event Withdraw(address user, address token, uint256 amount);
    /// @param authorizedAddress is the address that authorized by another address. Authorized address has access to authorizer address assets.
    /// @param authorizedAddress is the address that authorized an address.
    event Authorize(address authorizer, address authorizedAddress);
    event RemoveAuthorize(address authorizer, address authorizedAddress);
    event Transfer(address from, address to, address token, uint256 amount);
    event ExternallTransfer(address from, address to, address token, uint256 amount);

 // ****************************************************
// ******************** Variables *********************
// ****************************************************


uint8 private immutable fee;


// ****************************************************
// ******************* Constructor ********************
// ****************************************************


    constructor( uint8 _fee) {
        fee = _fee;
    }


// ****************************************************
// ********************** Mappings **********************
// ****************************************************

    // Mapping to get the address who authorized another address. We need this when an authorzied address wants to withdraw or transfer funcds of another address.
mapping (address => address) private authorizedAddressesToMainAddress;
    // Mapping to get token balance of each address (token address => user address => balance)
mapping (address => mapping(address => uint256)) private tokenAddressToOwnerToBalance;
mapping (address => uint256) private income;


// ****************************************************
// ********************  functions ********************
// ****************************************************


/// @notice Depist ERC20 token into contract, thereby increasing balance of the address who deposited.
/// @dev Before calling this function, to transfer ERC20 token from user to address(this) we need to approve the amount in ERC20 smart contract as requirement of transferFrom function.
/// @param tokenAddress is address of ERC20 token contract.
/// @param amount is amount of ERC20 token.
function deposit(address tokenAddress, uint256 amount) external {
    TransferHelper.safeTransferFrom(tokenAddress, msg.sender, address(this), amount);
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
        TransferHelper.safeTransfer( tokenAddress, msg.sender, _amount(amount,fee) );
        income[tokenAddress] += amount - _amount(amount,fee);
        from = mainAddress;
    } else {
        tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
        TransferHelper.safeTransfer( tokenAddress, msg.sender, _amount(amount,fee));
        income[tokenAddress] += amount - _amount(amount,fee);
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
        TransferHelper.safeTransferETH(msg.sender, _amount(amount,fee));
        income[address(0)] += amount - _amount(amount,fee);
        from = mainAddress;
    }
    else {
        tokenAddressToOwnerToBalance[address(0)][msg.sender] -= amount;
        TransferHelper.safeTransferETH(msg.sender, amount);
        income[address(0)] += amount - _amount(amount,fee);
        from = msg.sender;
    }
    emit Withdraw(from, address(0), amount);
    return (from);
}


/// @notice Transfer asset from this smart contract to another address.
/// @dev Since we assume that native token address = 0, iff the token address as input was 0, we should send native token using 'call'.
function externalTransfer(address tokenAddress, address to, uint256 amount) external nonReentrant{
    require(tokenAddressToOwnerToBalance[tokenAddress][msg.sender] >= amount, "Insufficient balance");
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    if (tokenAddress == address(0)) {
        TransferHelper.safeTransferETH(to, _amount(amount,fee));
        income[address(0)] += amount - _amount(amount,fee);
    } else {
        TransferHelper.safeTransfer(tokenAddress, to, _amount(amount,fee));
        income[tokenAddress] += amount - _amount(amount,fee);
    }
    emit ExternallTransfer(msg.sender, to, tokenAddress, amount);
}


/// @notice Transfer to another address account inside contract.
/// @dev This function changes the balance of the sender address and 'to' address by the amount.
function transfer(address tokenAddress, address to, uint256 amount) external{
    tokenAddressToOwnerToBalance[tokenAddress][msg.sender] -= amount;
    tokenAddressToOwnerToBalance[tokenAddress][to] += (amount * 995)/1000;
    emit Transfer(msg.sender, to, tokenAddress, amount);
}


/// @notice Authorizing an address that can access to your assets.
/// @dev Authorized address can removed using 'removeAuthorize' function
function authorize(address authorizedAddress) external {
    authorizedAddressesToMainAddress[authorizedAddress]= msg.sender;
    emit Authorize(msg.sender, authorizedAddress);
}


/// @notice Remove the authorized address with the address that already authorized it.
/// @dev To access authorized addresses by an address, we can use relevant emited events 'event Authorize(address owner, address authorizedAddress);').
function removeAuthorize(address authorizedAddress) external {
    require(authorizedAddressesToMainAddress[authorizedAddress] == msg.sender,"Couldn't find address");
    authorizedAddressesToMainAddress[authorizedAddress] = address(0);
    emit RemoveAuthorize(msg.sender, authorizedAddress);
}

function claimFee (address tokenAddress, uint256 amount) external onlyOwner{
    require(income[tokenAddress] >= amount, "Bigger than income");
    TransferHelper.safeTransfer(tokenAddress, msg.sender, amount);
}


// ****************************************************
// ****************** view functions ******************
// ****************************************************



/// @notice Getting balance of an address for a token using both token address and user address
/// @dev Same as before address(0) will return balance of native token
function balance(address tokenAddress, address userAddress) public view returns (uint256) {
    return tokenAddressToOwnerToBalance[tokenAddress][userAddress];
}

/// @notice Getting an address that authorized another address.
/// @dev If it returns address(0),'from' address is not authorized by any address.
/// @dev If this function returns address 'A', address 'from' will have access to 'A' assets.
function getAuthorized(address from) view public returns (address) {
    return authorizedAddressesToMainAddress[from];
}

// ****************************************************
// ****************** pure functions ******************
// ****************************************************


/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
/// @param initalAmount amount before calculating fee
/// @param txFee the fee that should be deducated(this amount is amount in thousandth)
function _amount(uint256 initalAmount ,uint txFee) internal pure returns(uint256) {
    return (initalAmount * (1000 - txFee)) / 1000;
}


}