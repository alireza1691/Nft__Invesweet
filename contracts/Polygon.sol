// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolygonAccountsHandler is Ownable,ReentrancyGuard {

/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
/// param Documents a parameter just like in doxygen (must be followed by parameter name)


// ****************************************************
// ********************** Events **********************
// ****************************************************

/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
/// @param to a parameter just like in doxygen (must be followed by parameter name)
event Deposit(address to, uint256 amount);
event Transfer(address from, address to, uint256 amount);
event WithdrawFromExchange(address to, uint256 amount);
event DepositToExchange(address from, uint256 amount);
// event Deposit(address to, uint256 amount);


// ****************************************************
// ******************** Variables *********************
// ****************************************************

uint256 private immutable minAmount;
uint8 private immutable fee;
uint256 private income;

// ****************************************************
// ******************* Constructor ********************
// ****************************************************


    constructor(uint256 _minAmount, uint8 _fee) {
        minAmount = _minAmount;
        fee = _fee;
    }
// ****************************************************
// ********************* Mappings *********************
// ****************************************************


    mapping (address => uint256) private balances;
    mapping (address => uint256) private pendingAmount;

// ****************************************************
// ********************  functions ********************
// ****************************************************


    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// return Documents the return variables of a contract’s function state variable
    /// inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function deposit() external payable {
        require(msg.value >= minAmount, "Amount is under minimum");
        balances[msg.sender] += msg.value;
        // ** If we want to set fee for deposit, we can replace these lines instead:
        // balances[msg.sender] += _amount(msg.value,fee);
        // income += msg.value - _amount(msg.value,fee);
    }

        /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// return Documents the return variables of a contract’s function state variable
    /// inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function withdrawFromExchangeRequest(address to, uint256 amount) external{
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[to] += amount;
    }
    function TransferToExchangeRequest(uint256 amount) external{
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        pendingAmount[msg.sender] += amount;
        emit DepositToExchange(msg.sender, amount);
    }

    function increaseBalanceByOwner(address to, uint256 amount) external onlyOwner{
        balances[to] += amount;
        // ** If we want to set fee for deposit, we can replace these lines instead:
        // balances[to] += _amount(amount,fee);
        // income += msg.value - _amount(amount,fee);
    }
    function decreaseBalanceByOwner(address to, uint256 amount) external onlyOwner{
        balances[to] -= amount;
        // ** If we want to set fee for depo dsit, we can replace these lines instead:
        // balances[to] += _amount(amount,fee);
        // income += msg.value - _amount(amount,fee);
    }


    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// return Documents the return variables of a contract’s function state variable
    /// inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function transfer(address to, uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool success,) = to.call{value: _amount(amount, fee)}("");
        require(success, "Transaction failed");
        income += amount - _amount(amount, fee);
    }

    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// return Documents the return variables of a contract’s function state variable
    /// inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function internalTransfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += _amount(amount, fee);
        income += amount - _amount(amount, fee);
    }

    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details
    /// param Documents a parameter just like in doxygen (must be followed by parameter name)
    /// return Documents the return variables of a contract’s function state variable
    /// inheritdoc	Copies all missing tags from the base function (must be followed by the contract name)
    function claimIncome(address to, uint256 amount) external onlyOwner{
        require(amount <= income, "amount bigger than income");
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transaction failed");
        income -= amount;
    }

// ****************************************************
// ****************** View functions ******************
// ****************************************************

function showBalance (address user) view public returns (uint256) {
    return balances[user];
}

function showIncome() view public returns (uint256) {
    return income;
}
// ****************************************************
// ****************** Pure functions ******************
// ****************************************************

/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details
/// @param initalAmount amount before calculating fee
/// @param txFee the fee that should be deducated(this amount is amount in thousandth)
    function _amount(uint256 initalAmount ,uint txFee) internal pure returns(uint256) {
        return (initalAmount * (1000 - txFee)) / 1000;
    }




    receive() external payable{}

}