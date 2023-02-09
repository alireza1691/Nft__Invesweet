// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Creator {

    address private immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function create( string memory name, string memory symbol, uint256 maxSupply, uint256 firstSupply , uint256 mineReward,uint256 decimals) external {
        // ERC20 newToken = new ERC20()
    }
}

contract ERC20New is ERC20 {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 immutable private i_decimals;
    uint256 immutable private i_totalSupply;
    string private s_name;
    string private s_symbol;
    address private immutable i_owner;
    uint256 private s_mineReward;

    constructor(string memory name, string memory symbol, uint256 maxSupply, uint256 firstSupply, uint256 mineReward, uint256 decimals ,address owner) ERC20(name,symbol)  {
        s_name = name;
        s_symbol = symbol;
        _mint(msg.sender, firstSupply);
        i_decimals = decimals;
        i_owner = owner;
        s_mineReward = mineReward;
        i_totalSupply = maxSupply;
    }
    function mintByOwner(address userAddress, uint256 amount) external onlyOwner{
        _mint(userAddress, amount);
    }

    function setMineReward(uint256 amount) external onlyOwner{
        s_mineReward = amount;
    }
    function burnByOwner( uint256 amount) external onlyOwner{
        _burn(msg.sender, amount);
    }

    modifier onlyOwner {
        require(msg.sender == i_owner);
        _;
    }
}