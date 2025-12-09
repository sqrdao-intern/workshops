// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint256 public currentTokenId;

    struct Metadata {
        string name;
        string description;
        string mediaURI;
    }

    mapping(uint256 => Metadata) private _metadata;

    event Minted(uint256 indexed tokenId, address indexed owner, string name, string uri);
    event Burned(uint256 indexed tokenId, address indexed owner);

    constructor() ERC721("Lisk Workshop NFT", "LISK-NFT") {}

    function mint(
        address recipient,
        string calldata name,
        string calldata description,
        string calldata mediaURI
    ) external returns (uint256) {
        if (recipient == address(0)) revert("Invalid recipient");
        if (bytes(name).length == 0) revert("Name required");
        if (bytes(mediaURI).length == 0) revert("URI required");

        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, mediaURI);

        _metadata[newItemId] = Metadata({
            name: name,
            description: description,
            mediaURI: mediaURI
        });

        emit Minted(newItemId, recipient, name, mediaURI);
        return newItemId;
    }

    function burn(uint256 tokenId) external {
        address owner = _requireOwned(tokenId);
        _checkAuthorized(owner, msg.sender, tokenId);

        _burn(tokenId);
        delete _metadata[tokenId];

        emit Burned(tokenId, owner);
    }

    function tokenMetadata(uint256 tokenId)
        external
        view
        returns (Metadata memory metadata, address owner)
    {
        owner = _requireOwned(tokenId);
        metadata = _metadata[tokenId];
    }

    function tokensOfOwner(address owner)
        external
        view
        returns (Metadata[] memory metadataList, uint256[] memory tokenIds)
    {
        uint256 balance = balanceOf(owner);
        metadataList = new Metadata[](balance);
        tokenIds = new uint256[](balance);

        uint256 index;
        for (uint256 tokenId = 1; tokenId <= currentTokenId; tokenId++) {
            address tokenOwner = _ownerOf(tokenId);
            if (tokenOwner == owner && tokenOwner != address(0)) {
                metadataList[index] = _metadata[tokenId];
                tokenIds[index] = tokenId;
                index++;
            }
        }
    }
}
