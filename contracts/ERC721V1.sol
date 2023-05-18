// SPDX-License-Identifier: MIT


/// @title A ERC721 standard contract(NFT) but with some changes.
/// @author Alireza Haghshenas
/// @notice This contract deploys by invesweet creator contract.
/// @dev Mint function should call by creator contract, not directly in this contract

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

error ERC721Metadata__URI_QueryFor_NonExistentToken();

contract ERC721V1 is ERC721URIStorage{

    event Mint(address user,address nftContract, uint256 tokenId);
    event Withdraw(address user, address contractAddress, uint256 value);

    // variables
    string private s_url;
    address private owner;
    uint256 private counterTokenID;
    uint256 private fee;
    uint256 private immutable maxSupply;
    address payable private creatorContract;
    uint256 private sumMintFees;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;
    mapping(address => uint256) private verfiyBurn;


    constructor (string memory name,string memory symbol, uint256 mintCost, uint256 maximumSupply,address contractOwner, string memory imgUrl) ERC721(name, symbol){
        fee = mintCost;
        maxSupply = maximumSupply;
        owner = contractOwner;
        s_url = imgUrl;
        creatorContract = payable(msg.sender);
    }

    // modifiers
    modifier onlyOwner {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyCreator {
        require(msg.sender == creatorContract, "Only owner");
        _;
    }
    function mint () external payable onlyCreator {
        // require(msg.value >= s_fee, "Msg.value less than NFT price");
        require(counterTokenID <= maxSupply,"Maximun number was minted");
        // (bool ok,) = parent.call{value: (msg.value)}("");
        // // (bool ok) = parentContract.send((s_fee)/100);
        // if (ok) {
        _mint(msg.sender, counterTokenID);
        _setTokenURI(counterTokenID, s_url);
        counterTokenID ++;
        // }
        emit Mint(msg.sender, address(this), counterTokenID);
    }


    function burn (uint256 tokenId) external {
        _burn(tokenId);
        verfiyBurn[msg.sender] += 1;
    }


    function _mint(address to, uint256 tokenId) internal virtual override{
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        require(tokenId <= maxSupply, "Max number minted");

        _beforeTokenTransfer(address(0), to, tokenId, 1);

        // Check that tokenId was not minted by `_beforeTokenTransfer` hook
        require(!_exists(tokenId), "ERC721: token already minted");

        unchecked {
            // Will not overflow unless all 2**256 token ids are minted to the same owner.
            // Given that tokens are minted one by one, it is impossible in practice that
            // this ever happens. Might change if we allow batch minting.
            // The ERC fails to describe this case.
            _balances[to] += 1;
        }

        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
        _afterTokenTransfer(address(0), to, tokenId, 1);
    }

    function changeFee(uint256 newFee) external onlyOwner {
        fee = newFee;
    }

    function withdraw () external payable {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        if (ok) {
            emit Withdraw(msg.sender, address(this), address(this).balance);
        }
    }

    // should add only owner modifier
    function setUri(string memory newUri) external onlyOwner {
        s_url = newUri;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return s_url;
    }

    function getBalance () external view returns(uint256) {
        return address(this).balance;
    }

    function getPrice () external view returns(uint256) {
        return fee;
    }

    function getOwner () external view returns(address) {
        return owner;
    }

    function getSumMintFee() view external returns(uint256) {
        return sumMintFees;
    }
    // function getParentContract() external view returns(address) {
    //     return parentContract;
    // }
    function getUri(uint256 tokenId) view external returns(string memory){
        return tokenURI(tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
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
                                '{"name":"',
                                name(), // You can add whatever name here
                                '", "description":"An NFT that changes generated by INVESWEET contract", ',
                                '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                                s_url,
                                '"}'
                            )
                        )
                    )
                )
            );
    }


    function checkVerifyNum (address who) external view returns(uint256) {
        return verfiyBurn[who];
    }

 
}