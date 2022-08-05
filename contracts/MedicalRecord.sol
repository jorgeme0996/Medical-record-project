// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MedicalRecord is ERC721URIStorage, Pausable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct User {
        address userAddr;
        string email;
        bool isActive;
    }

    mapping(address => User) users;

    mapping(uint256 => address) tokenIdtoPersonAddress;

    constructor() ERC721("Medical Record", "MEDREC") {}

    function getTokenURI(uint256 tokenId, string memory base64SVGString, string memory _url)
        public
        pure
        returns (string memory)
    {
        bytes memory dataURI = abi.encodePacked(
            "{"
            '"name": "Medical Record #',
            tokenId.toString(),
            '",',
            '"description": "See your mediacal record in this url: ', _url ,'",',
            '"image": "',
            base64SVGString,
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint(
        address _toAddr,
        string memory _base64SVGString,
        string memory _email,
        string memory _url
    ) public onlyOwner {
        require(
            bytes(_base64SVGString).length != 0 && bytes(_email).length != 0,
            "Please provide the svg base64 qr"
        );
        users[_toAddr] = User({
            userAddr: _toAddr,
            email: _email,
            isActive: true
        });
        require(
            users[_toAddr].isActive,
            "In order to get your NFT you have to be a user of the contract"
        );
        uint256 newItemId = _tokenIds.current();
        _safeMint(_toAddr, newItemId);
        tokenIdtoPersonAddress[newItemId] = _toAddr;
        _setTokenURI(newItemId, getTokenURI(newItemId, _base64SVGString, _url));

        _tokenIds.increment();
    }

    function updateQr(
        address _toAddr,
        uint256 _tokenId,
        string memory _base64SVGString,
        string memory _url
    ) public returns (bool) {
        require(_exists(_tokenId), "Please use an existing Token");
        require(ownerOf(_tokenId) == _toAddr, "You must own this token");
        _setTokenURI(_tokenId, getTokenURI(_tokenId, _base64SVGString, _url));

        return true;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
