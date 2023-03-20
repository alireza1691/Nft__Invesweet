// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Transfer {

    // address private immutable linkTokenAddress = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB;
    // address private immutable myAddress = 0x7170b89c5A6e05Af11BABE9715b68833B8028004;
    // address private immutable owner = 0x39A77B13BA2C5FA2249f7e5a4194582824D58c8E;
    // address private immutable istAddress = 0x9c3565DF44B79a7dbdAb3678f0B00B9Beabc7d70;
    // address private immutable daiTokenAddressPolygon = 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063;

    function _approve(uint256 amount,address tokenAddress, address spender) external payable returns (bool){
        (bool ok,) = tokenAddress.call(abi.encodeWithSignature("approve(address,uint256)",spender,amount));
         return ok;
    }

    // function getTotalSupply () external  returns(bytes memory) {
    //     (bool ok,bytes memory data) = linkTokenAddress.call(abi.encodeWithSignature("totalsupply()"));
    //     return data;
    // }

    function ckeckAllowance(address tokenAddress , address owner , address spender) external view returns(uint256) {
        return IERC20(tokenAddress).allowance(owner,spender);
    }

    function transfer (address tokenAddress, address to ,uint256 amount) external returns(bool){
        (bool ok,) =
         tokenAddress.call(abi.encodeWithSignature("transfer(address,uint256)",to,amount));
        // linkTokenAddress.call("transfer(address, uint256)",myAddress,amount);
         return ok;
    }
    function checkBalances(address who, address tokenAddress) external view returns(uint256){
        return IERC20(tokenAddress).balanceOf(who);
    }

    // function getSelector(string calldata _func) external pure returns (bytes4) {
    //     return bytes4(keccak256(bytes(_func)));
    // }

    // receive() external payable {}

    // function callOtherFunc( uint256 amount) public returns(bool) {
    //   (bool success, ) = linkTokenAddress.call(abi.encodeWithSelector(bytes4(keccak256(bytes("transfer(address,uint256)"))),myAddress,amount*10**18));
    //     return(success);
    // }
    


    

}