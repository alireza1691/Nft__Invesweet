// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20v2.sol";

    error ERC20Creator__NotOwner();
    error ERC20Creator__TransactionFailed();
    error ERC20Creator__CreateExceedsFee();

contract ERC20Creator {

    event NewERC20(address indexed owner, address indexed tokenAddress,string name, string indexed symbol);

    address payable private immutable owner;
    uint256 private createFee;

    constructor(uint256 fee) {
        owner = payable(msg.sender);
        createFee = fee;
    }
    modifier onlyOwner {
        if (msg.sender == owner) {
            _;
        } else {
            revert ERC20Creator__NotOwner();
        }
    }

    mapping (address => address[]) private userTokens;

    function create( string memory name, string memory symbol, uint256 maxCap, uint256 firstSupply,uint256 burnPercent ,uint256 decimals) payable external {
        if (msg.value < createFee) {
            revert ERC20Creator__CreateExceedsFee();
        }
        ERC20v2 newToken = new ERC20v2(name,symbol,maxCap,firstSupply,burnPercent,decimals,msg.sender);
        address newTokenAddress = address(newToken);
        userTokens[msg.sender].push(newTokenAddress);
        emit NewERC20(msg.sender, newTokenAddress, name, symbol);
    }

    function changeFee( uint256 newFee) external onlyOwner {
        createFee = newFee;
    }

    function withdraw() external onlyOwner{
        uint256 balance = address(this).balance;
        (bool ok,) = msg.sender.call{value: balance}("");
        if (ok == false) {
            revert ERC20Creator__TransactionFailed();
        }
    }

    // View funcs:

    function getTokenAddresses(address userAddress) external view returns(address[] memory){
        return userTokens[userAddress];
    }
    function getContractBalance() external view returns(uint256){
        return address(this).balance;
    }
}
