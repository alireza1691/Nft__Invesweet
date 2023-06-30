// SPDX-License-Identifier: MIT


/// @title This contract is ERC721 based contract which mints NFTs instead of user assets. when NFT burns, assets will be withdrawable for the user who burns.
/// @author Alireza Haghshenas
/// @notice This contract deploys by invesweet creator contract.
/// @dev Mint function should call by creator contract, not directly in this contract

// import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";


// ******************************************************************
// ******************************************************************
// **************This contract not developed yet*********************
// ******************************************************************
// ******************************************************************
pragma solidity ^0.8.17;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TransferHelper.sol";

error ERC721Metadata__URI_QueryFor_NonExistentToken();

contract ERC721Collateral is ERC721URIStorage{

    // Events
    event Tokenize(address from,address token, uint256 amount, uint256 tokenId);
    event Withdraw(address user, address contractAddress, uint256 value);

    // Variables
    string private s_url;
    address private owner;
    uint256 private counterTokenID = 1;
    uint256 private fee;
    address payable private creatorContract;
    uint256 private sumMintFees;


    constructor (string memory name,string memory symbol, uint256 mintCost, address contractOwner, string memory imgUrl) ERC721(name, symbol){
        fee = mintCost;
        owner = contractOwner;
        s_url = imgUrl;
        creatorContract = payable(msg.sender);
    }

    struct collateral {
        address tokenAddress;
        uint256 balance;
    }

    mapping (uint256 => collateral) private collaterals;
    mapping (address => mapping(address => uint256)) private balance;

    // modifiers
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyCreator {
        require(msg.sender == creatorContract, "Only owner");
        _;
    }

    function deposit (address token, address to, uint256 amount) external {
        TransferHelper.safeTransferFrom(token, _msgSender(), to, amount);
        balance[_msgSender()][token] += amount;
    }


    function tokenize (address token, uint256 amount) external payable {
        require(msg.value >= fee, "Requires fee");
        require(balance[_msgSender()][token] >= amount, "Insufficient fund");
        balance[_msgSender()][token] -= amount;
        _mint(_msgSender(), counterTokenID);
        collaterals[counterTokenID] = collateral(token, amount);
        counterTokenID ++;
        emit Tokenize(_msgSender(), token, amount, counterTokenID - 1);
    }

    function Reclaim(uint256 tokenId) external {
        require(ownerOf(tokenId) == _msgSender(), "Token belongs someone else");
        address tokenAddress = collaterals[tokenId].tokenAddress;
        uint256 tokenAmount = collaterals[tokenId].balance;
        delete collaterals[tokenId];
        _burn(tokenId);
        balance[_msgSender()][tokenAddress] += tokenAmount;
    }
    function withdraw (address token, uint256 amount) external {
        require(balance[_msgSender()][token] >= amount, "Insufficient balance");
        TransferHelper.safeTransfer(token, _msgSender(), amount);
    }

    function claimFee() external onlyOwner{
        
    }

    function tokenURI(uint256 tokenId) public view override virtual returns (string memory) {
        if (!_exists(tokenId)) {
            revert ERC721Metadata__URI_QueryFor_NonExistentToken();
        }
        // (, int256 price, , , ) = i_priceFeed.latestRoundData();
        // string memory imageURI = s_lowImageURI;
        // if (price >= s_tokenIdToHighValues[tokenId]) {
        //     imageURI = s_highImageURI;
        // }
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"token address":"',
                                collaterals[tokenId].tokenAddress,
                                '", "amount":"',
                                collaterals[tokenId].balance,
                                '","description": something , "image":"',
                                s_url,
                                '"}'
                            )
                        )
                    )
                )
            );
    }


 
}