//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A title that should describe the contract/interface
/// @author The name of the author
/// @notice Explain to an end user what this does
/// @dev Explain to a developer any extra details



contract Storage is Ownable{

    address private _owner;
    bytes32 public constant SLOT = keccak256("Invesweet");
    constructor() {
        _owner = msg.sender;
    }

    function changeOwnership (address newOwner) external onlyOwner {
        _owner = newOwner;
    }

    function getMintFee() external view returns(uint256){
        return Fees.fee(SLOT).mintFee;
    }
    function getDeployFee() external view returns(uint256){
        return Fees.fee(SLOT).mintFee;
    }
    function getWithdrawalFee() external view returns(uint256){
        return Fees.fee(SLOT).mintFee;
    }

    function setMintFee(uint256 newAmount) external onlyOwner {
        Fees.fee(SLOT).mintFee = newAmount;
    }
    function setDeployFee(uint256 newAmount) external onlyOwner {
        Fees.fee(SLOT).deployFee = newAmount;
    }
    function setWithdrawalFee(uint256 newAmount) external onlyOwner {
        Fees.fee(SLOT).withdrawalFee = newAmount;
    }
}

library Fees{
    struct FuncFees {
        uint256 mintFee;
        uint256 deployFee;
        uint256 withdrawalFee;
    }

    function fee(bytes32 slot) internal pure returns(FuncFees storage r) {
        assembly {
            r.slot := slot
        }
    }
}

