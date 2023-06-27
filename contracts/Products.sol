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

contract CollateralNFT is ERC721URIStorage{

    // Events
    event Tokenize(address from,address token, uint256 amount, uint256 tokenId);
    event Withdraw(address user, address contractAddress, uint256 value);

    // Variables
    address private owner;
    uint256 private counterTokenID = 1;
    uint256 private productCounter = 1;
    address payable private creatorContract;
    uint256 private sumMintFees;


    constructor (string memory name,string memory symbol, address contractOwner) ERC721(name, symbol){
        owner = contractOwner;
        creatorContract = payable(msg.sender);
    }

    struct Product {
        string name;
        uint256 price;
        string imgUrl;
        uint256 maxSupp;
    }
    // Product[] products;
    mapping (uint256 => Product) private indexToProduct;
    mapping (uint256 => Product) private tokenIdToProduct;

    // modifiers
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyCreator {
        require(msg.sender == creatorContract, "Only owner");
        _;
    }

    function addProduct(string memory pName, string memory pImgUrl, uint256 pPrice, uint256 pMaxSupply) public onlyOwner onlyCreator{
        indexToProduct[productCounter] = Product(pName, pPrice, pImgUrl, pMaxSupply);
        productCounter ++;
    }

    function purchase(uint256 productCounterIndex)  external payable{
        Product memory pdt = indexToProduct[productCounterIndex];
        require(pdt.price <= msg.value, "Insufficient value");
        _safeMint(msg.sender, counterTokenID);
        tokenIdToProduct[counterTokenID] = pdt;
        counterTokenID ++;
    }

    function claimFee() external onlyOwner{
        
    }

    function tokenURI(uint256 tokenId) public view override virtual returns (string memory) {
        if (!_exists(tokenId)) {
            revert ERC721Metadata__URI_QueryFor_NonExistentToken();
        }
        Product memory pdt = indexToProduct[tokenId];
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"token name":"',
                                pdt.name,
                                '", "image URL":"',
                                pdt.imgUrl,
                                '", "max supply":"',
                                pdt.maxSupp,
                                '", "price":"',
                                pdt.price,
                                '","description": something"}'
                            )
                        )
                    )
                )
            );
    }


 
}