pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Skills.sol";

contract Level is ERC721, Skills, Multicall, Ownable {
  using Counters for Counters.Counter;

  // Tracks next token ID:
  Counters.Counter private _currentTokenId;

  // Base URI for token metadata:
  string private _baseURIExtended;

  // Mapping of token IDs by owner address:
  mapping(address => uint256) private _tokenByOwner;

  constructor() ERC721("Level", "LEVEL") {
    _baseURIExtended = "https://level.2c.io/api/level/token/";
  }

  function _baseURI() internal view override returns (string memory) {
    return _baseURIExtended;
  }

  function setBaseURI(string memory baseURI_) external onlyOwner returns (string memory) {
    _baseURIExtended = baseURI_;
    return _baseURIExtended;
  }

  // Current total supply of minted tokens:
  function totalSupply() public view returns (uint256) {
    return _currentTokenId.current();
  }

  // Get token ID by owner address:
  function tokenOfOwner(address owner) public view returns (uint256) {
    require(ERC721.balanceOf(owner) == 1, "Address does not own a token!");
    return _tokenByOwner[owner];
  }

  function mint() external payable returns (uint256) {
    // Enforce one token per address:
    require(balanceOf(msg.sender) == 0, "Address can only have one LEVEL token!");

    // Get current token ID:
    uint256 tokenId = _currentTokenId.current();

    // Mint to sender:
    _mint(msg.sender, tokenId);
    // Set token id by owner:
    _tokenByOwner[msg.sender] = tokenId;
    // Increment current token ID:
    _currentTokenId.increment();

    return tokenId;
  }

  // Disable transferability:
  function _beforeTokenTransfer(
      address from,
      address to,
      uint256 tokenId
  ) internal override {
      super._beforeTokenTransfer(from, to, tokenId);
      require(from == address(0), "Token can only be transferred during minting!");
  }
}