// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MedicalRecord is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => address) public tokenIdtoPersonAddress;

    constructor() ERC721("Medical Record", "MEDREC") {

    }

    function getTokenURI(uint256 tokenId, string memory base64SVGString) public returns(string memory) {
        bytes memory dataURI = abi.encodePacked(
            '{'
                '"name": "Medical Record #', tokenId.toString(), '",',
                '"description": "Medical Record NFT",',
                '"image": "', base64SVGString, '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,", Base64.encode(dataURI)
            )
        );
    }

    function mint(address _toAddr, string memory base64SVGString) public {
        require(bytes(base64SVGString).length != 0, "Please provide the svg base64 qr");
        uint256 newItemId = _tokenIds.current();
        _safeMint(_toAddr, newItemId);
        tokenIdtoPersonAddress[newItemId] = _toAddr;
        _setTokenURI(newItemId, getTokenURI(newItemId, base64SVGString));

        _tokenIds.increment();
    }

    function updateQr(address _toAddr, uint256 tokenId, string memory base64SVGString) public returns(bool) {
        require(_exists(tokenId), "Please use an existing Token");
        require(ownerOf(tokenId) == _toAddr, "You must own this token");
        _setTokenURI(tokenId, getTokenURI(tokenId, base64SVGString));

        return true;
    }
}
