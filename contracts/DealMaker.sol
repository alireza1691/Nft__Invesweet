// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DealMaker {

    uint256 dealCounter;
    uint256 prePayAmount;
    uint256 fee;
    uint256 collateralPeriod = 1 days; 

    enum Process {
        createdByCostumer,
        collateralDeposit,
        checkProduct,
        confirmProduct,
        withdraw
        }


    struct Deal {
        address seller;
        address costumer;
        uint256 collateralAmount;
        uint256 totalAmount;
        uint256 requestTimeStamp;
    }

    
    mapping (uint256 => Deal) public dealProcess;
    mapping (address => mapping (uint256 => Process)) public status;

    function requestDeal(address secondParty,uint256 totalAmount, uint256 collateralAmount) external payable returns (uint256) {
        require(msg.value > fee, "Request requires fee");
        dealProcess[dealCounter] = Deal(secondParty, msg.sender, collateralAmount, totalAmount, block.timestamp);
        dealCounter ++;
        return dealCounter-1;
    }

    function payCollateral(uint256 dealIndex) external payable {
        uint256 cAmount = dealProcess[dealIndex].collateralAmount;
        require(msg.value >= cAmount, "Insufficient collateral");
        status[msg.sender][dealIndex] = Process.collateralDeposit;
    }

    function confirmProduct(uint256 dealIndex) external payable {
        uint256 cAmount = dealProcess[dealIndex].collateralAmount;
        require(msg.value >= cAmount, "Insufficient collateral");
        status[msg.sender][dealIndex] = Process.collateralDeposit;
    }



}