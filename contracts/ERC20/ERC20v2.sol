// SPDX-License-Identifier: MIT


/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    address public marketingWallet;
    address public constant BURN_ADDRESS = address(0);
    uint256 public sellTaxRate = 10; // 1% tax, 0.5% to marketing wallet, 0.5% to rewards pool
    uint256 public lastDistributeBurnTime;
    uint256 public constant DISTRIBUTEBURN_TIMELOCK = 8 hours;

    event MarketingWalletUpdated(address indexed newMarketingWallet);
    event SellTaxRateUpdated(uint256 indexed newSellTaxRate);
    event BurnDistributed(uint256 indexed amount);

    /**
     * @dev Constructor function that initializes the contract.
     * @param _marketingWallet The address of the marketing wallet.
     */
    constructor(address _marketingWallet) ERC20("MyToken", "MTK") {
        require(_marketingWallet!= address(0), "Invalid marketing wallet address");
        marketingWallet = _marketingWallet;
        uint256 initialSupply = 1000000 * (10 ** decimals()); // 1 million tokens with 18 decimal places
        _mint(_msgSender(), initialSupply);
        lastDistributeBurnTime = block.timestamp;
    }

    /**
     * @dev Overrides the _transfer function to apply taxes on non-marketing transfers.
     * @param sender The address of the sender.
     * @param recipient The address of the recipient.
     * @param amount The amount to be transferred.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
        if (recipient!= marketingWallet && sender!= marketingWallet && recipient!= BURN_ADDRESS && sender!= address(this)) {
            uint256 taxAmount = amount * sellTaxRate / 1000;
            uint256 marketingAmount = taxAmount / 2;
            uint256 rewardsAmount = taxAmount - marketingAmount;
            super._transfer(sender, marketingWallet, marketingAmount);
            super._transfer(sender, address(this), rewardsAmount);
            amount -= taxAmount;
        }
        super._transfer(sender, recipient, amount);
    }

    /**
     * @dev Function to distribute the burn. Can only be called once every 8 hours.
     */
    function distributeBurn() external {
        require(block.timestamp >= lastDistributeBurnTime + DISTRIBUTEBURN_TIMELOCK, "Distribute burn is time locked");
        uint256 balance = balanceOf(address(this));
        if (balance > 0) {
            _transfer(address(this), BURN_ADDRESS, balance);
            emit BurnDistributed(balance);
        }
        lastDistributeBurnTime = block.timestamp;
    }

    /**
     * @dev Function to update the marketing wallet address. Can only be called by the owner.
     * @param _marketingWallet The new marketing wallet address.
     */
    function setMarketingWallet(address _marketingWallet) external onlyOwner {
        require(_marketingWallet!= address(0), "Invalid marketing wallet address");
        marketingWallet = _marketingWallet;
        emit MarketingWalletUpdated(_marketingWallet);
    }

    /**
     * @dev Function to update the sell tax rate. Can only be called by the owner.
     * @param _sellTaxRate The new sell tax rate.
     */
    function setSellTaxRate(uint256 _sellTaxRate) external onlyOwner {
        require(_sellTaxRate <= 100, "Invalid sell tax rate"); // Max 10% tax
        sellTaxRate = _sellTaxRate;
        emit SellTaxRateUpdated(_sellTaxRate);
    }
}