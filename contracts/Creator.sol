// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import "./ERC721Upgreadable.sol";
import "./ERC721V1.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "./Storage.sol";



/*  WHAT REMAINED:

    add eth price
    use specific price if value less than 1$
    move variables into library
    add proxy


*/



// contract Storage is Ownable{

//     address private owner;
//     bytes32 public constant SLOT = keccak256("Invesweet");
//     constructor() {
//         owner = msg.sender;
//     }

//     function changeOwnership (address newOwner) external onlyOwner {
//         owner = newOwner;
//     }

//     function getMintFee() external view returns(uint256){
//         return Fees.fee(SLOT).mintFee;
//     }
//     function getDeployFee() external view returns(uint256){
//         return Fees.fee(SLOT).mintFee;
//     }
//     function getWithdrawalFee() external view returns(uint256){
//         return Fees.fee(SLOT).mintFee;
//     }

//     function setMintFee(uint256 newAmount) external onlyOwner {
//         Fees.fee(SLOT).mintFee = newAmount;
//     }
//     function setDeployFee(uint256 newAmount) external onlyOwner {
//         Fees.fee(SLOT).deployFee = newAmount;
//     }
//     function setWithdrawalFee(uint256 newAmount) external onlyOwner {
//         Fees.fee(SLOT).withdrawalFee = newAmount;
//     }
// }

// library Fees{
//     struct FuncFees {
//         uint256 mintFee;
//         uint256 deployFee;
//         uint256 withdrawalFee;
//     }

//     function fee(bytes32 slot) internal pure returns(FuncFees storage r) {
//         assembly {
//             r.slot := slot
//         }
//     }
// }




contract Creator is Ownable {
    
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

    function createERC721(string memory name, string memory symbol, uint256 price, uint256 maxSupply, string memory imageURL) payable external returns(address) {
        require(msg.value >= deployCost, "create requires fee");
        ERC721V1 newNft = new ERC721V1(name, symbol ,price , maxSupply, msg.sender, imageURL);
        emit ERC721Create(address(newNft), msg.sender, symbol);
        // contractToOwner[address(newNft)] = msg.sender;
        return address(newNft);
    }

    
    function getUserContracts(address user) external view returns(address[] memory){
        return addressToContracts[user];
    }

    function balance() external view returns(uint256) {
        return address(this).balance;
    }
    
    // function mint(address nftContractAddress) external payable {
    // function mint(ERC721V1 ContractInstance) external payable {

    //     // ERC721V1 ContractInstance = ERC721V1(nftContractAddress);
    //     uint256 price = ContractInstance.getPrice();
    //     require(msg.value >= price);
    //     ContractInstance.mint(msg.sender);
    //     address owner = ContractInstance.getOwner();
    //     balances[owner] += (msg.value * (1000 - mintFee) ) /1000;
    // }

    // Getter funcs:
    function getUserBalance (address who) external view returns(uint256) {
        return balances[who];
    }

    function withdraw(uint256 amount) external payable {
        if (balances[msg.sender] >= amount) {
            uint256 withdrawable = (amount * (1000 - withdrawalFee))/1000;
            balances[msg.sender] -= amount;
            (bool ok,) = _msgSender().call{value: withdrawable }("");
            require(ok,"Call failed");
        }
    }
    receive() external payable {}
}
