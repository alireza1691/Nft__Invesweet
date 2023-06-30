// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "./ERC721Upgreadable.sol";
import "./ERC721Product.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "./Storage.sol";



/*  WHAT REMAINED:

    add eth price
    use specific price if value less than 1$
    move variables into library
    add proxy


*/




contract ERC721ProductCreator is Ownable {
    
    event ERC721Create(address indexed contractAddress, address indexed owner, string symbol);

    address private s_owner;
    uint256 private deployCost;
    uint256 private mintFee;
    uint256 private withdrawalFee;

    mapping (address => uint256) private balances;
    mapping (address => address[]) private addressToContracts;
    // mapping (address => address) private contractToOwner;
    constructor() {
        s_owner = msg.sender;
    }

    // this func will remove after moving variables into library
    function setFee (uint256 index, uint256 feeAmount) external onlyOwner {
        if (index == 0 ) {
            deployCost = feeAmount;
        }
        if (index == 1) {
            mintFee = feeAmount;
        }
        if (index == 2) {
            withdrawalFee = feeAmount;
        } 
         
    }

    function createERC721(string memory name, string memory symbol) payable external returns(address) {
        require(msg.value >= deployCost, "create requires fee");
        ERC721Product newNft = new ERC721Product(name, symbol , msg.sender);
        emit ERC721Create(address(newNft), msg.sender, symbol);
        // contractToOwner[address(newNft)] = msg.sender;
        return address(newNft);
    }

    function withdraw(uint256 amount) external payable onlyOwner{
        if (amount <= address(this).balance) {
            (bool ok,) = _msgSender().call{value: amount }("");
            require(ok,"Call failed");
        }
            
    }
    
        // Getter funcs:
    function getUserContracts(address user) external view returns(address[] memory){
        return addressToContracts[user];
    }

    function balance() external view returns(uint256) {
        return address(this).balance;
    }

    function getUserBalance (address who) external view returns(uint256) {
        return balances[who];
    }

 
    receive() external payable {}
}
