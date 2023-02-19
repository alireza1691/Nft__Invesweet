// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";



contract ERC20v2 is ERC20 ,ERC20Burnable{
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256 immutable private i_decimals;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    address private immutable i_owner;
    uint256 private s_burnPercent;
    uint256 private  _maxSupply;

    constructor(string memory name, string memory symbol, uint256 maxSupply, uint256 firstSupply, uint256 burnPercent, uint256 decimals ,address owner) ERC20(name,symbol)  {
        _name = name;
        _symbol = symbol;
        _mint(msg.sender, firstSupply);
        i_decimals = decimals;
        i_owner = owner;
        s_burnPercent = burnPercent;
        _maxSupply = maxSupply;
    }

    modifier onlyOwner {
        require(msg.sender == i_owner);
        _;
    }

    modifier supplyLimit (uint256 amount){
        if (_maxSupply > 0 ) {
            require (_maxSupply >= _totalSupply + amount,"Max Supply");
        }
        _;
       
    }

    function mint(address userAddress, uint256 amount) external onlyOwner{
        _mint(userAddress, amount);
    }

    // function _beforeTokenTransfer(address from, uint256 amount) internal  /*returns(uint256)*/{
    //     uint256 burnedAmount = amount * ((1000 - s_burnPercent)/1000);
    //     unchecked {
    //         _balances[from] = burnedAmount;
    //         // Overflow not possible: amount <= accountBalance <= totalSupply.
    //         _totalSupply -= burnedAmount;
    //     }
        
       
    // }

   function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");

        uint256 finalAmount = amount;
        if (s_burnPercent > 0) {
            uint256 burnedAmount = (s_burnPercent * amount);
            finalAmount -= burnedAmount;
            unchecked {
                _balances[address(0)] -= burnedAmount;
                _totalSupply -= burnedAmount;
            }
        }

        unchecked {
            _balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _balances[to] += finalAmount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    function _mint(address account, uint256 amount) internal override supplyLimit(amount) {
        require(account != address(0), "ERC20: mint to the zero address");

        super._beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _beforeTokenTransfer(address from,address to,uint256 amount) internal virtual override{
        if (s_burnPercent > 0) {
            uint256 fromBalance = _balances[from];
            uint256 burnedAmount = (s_burnPercent * amount);
            unchecked {
                _balances[from] = fromBalance - burnedAmount;
                _balances[address(0)] -= burnedAmount;
                _totalSupply -= burnedAmount;
            }
        }
    }

    function setBurnPercent(uint256 amount) external onlyOwner{
        s_burnPercent = amount;
    }

    function burnByOwner( uint256 amount) external onlyOwner{
        _burn(msg.sender, amount);
    }

    function destroy () external onlyOwner {
        selfdestruct(payable(i_owner));
    }

 
}