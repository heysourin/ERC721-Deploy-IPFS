// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;//? Using library in solidity

    Counters.Counter private _tokenIds; //? It will keep count on tokenId

    constructor() ERC721("XENON", "XNN"){

    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns(uint){
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

//Todo: 'npm install @alch/alchemy-web3' to use ipfs