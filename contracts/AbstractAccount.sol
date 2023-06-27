
pragma solidity ^0.8.0;

contract AbstractAccountWallet {
    address public owner;
    mapping (address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 amount) public payable {
        require(msg.value == amount, "Incorrect amount sent");
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function transfer(address recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }
}
