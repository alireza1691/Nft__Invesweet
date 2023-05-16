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
    // string private s_name;
    // string private s_symbol;
    string [] private s_url;
    address private _owner;
    uint256 private counterTokenID;
    uint256 private s_fee;
    uint256 private immutable i_maxSupply;
    address payable private parentContract;
    uint256 private sumMintFees;
    // address private immutable i_owner;

       // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;
    mapping(uint256 => uint256) private tokenIdToUrlIndex;

    constructor (string memory name,string memory symbol, uint256 fee, uint256 maxSupply,address owner, string memory imgUrl) ERC721(name, symbol){
        // s_name = name;
        // s_symbol = symbol;
        s_fee = fee;
        i_maxSupply = maxSupply;
        _owner = owner;
        s_url[0] = imgUrl;
        parentContract = payable(msg.sender);
    }

    // modifiers
    modifier onlyOwner {
        require(msg.sender == _owner, "Only owner");
        _;
    }

    modifier onlyCreator {
        require(msg.sender == parentContract, "Only owner");
        _;
    }
    function mint (uint256 index) external payable onlyCreator {
        // require(msg.value >= s_fee, "Msg.value less than NFT price");
        require(counterTokenID <= i_maxSupply,"Maximun number was minted");
        // (bool ok,) = parent.call{value: (msg.value)}("");
        // // (bool ok) = parentContract.send((s_fee)/100);
        // if (ok) {
        _mint(msg.sender, counterTokenID);
        _setTokenURI(counterTokenID, s_url[index]);
        counterTokenID ++;
        // }
        emit Mint(msg.sender, address(this), counterTokenID);
    }
    // function mintDirectly () external payable {
    //     // require(msg.value >= s_fee, "msg.value less than NFT price");
    //     require(counterTokenID <= i_maxSupply,"Maximun number was minted");
    //     require(msg.value >= s_fee,"fee exceeds entered amount");
    //     // parentContract.delegatecall(abi.encodeWithSignature("mint(address)",parentContract));
    //     // (bool ok,) = parentContract.call{value: (msg.value)}("");
    //     (bool ok) = parentContract.send((s_fee));
    //     if (ok) {
    //         _mint(msg.sender, counterTokenID);
    //     counterTokenID ++;
    //     }
    //     sumMintFees += msg.value;
    //     emit Mint(msg.sender, address(this), counterTokenID);
    // }

    function _mint(address to, uint256 tokenId) internal virtual override{
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        require(tokenId <= i_maxSupply, "Max number minted");

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
        s_fee = newFee;
    }

    function withdraw () external payable {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        if (ok) {
            emit Withdraw(msg.sender, address(this), address(this).balance);
        }
    }

    function _baseURI(uint256 index) internal view virtual returns (string memory) {
        return s_url[index];
    }
    // should add only owner modifier
    function setUrl(string memory newUrl, uint256 index) external onlyOwner {
        s_url[index] = newUrl;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        _owner = newOwner;
    }

    function getBalance () external view returns(uint256) {
        return address(this).balance;
    }

    function getPrice () external view returns(uint256) {
        return s_fee;
    }

    function getOwner () external view returns(address) {
        return _owner;
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
        string memory imageURL = s_url[tokenIdToUrlIndex[tokenId]];
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
                                imageURL,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

 
}