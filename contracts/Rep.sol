pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Rep is ERC1155, Ownable {
  using Counters for Counters.Counter;

  // Tracks next DAO ID offset:
  Counters.Counter private _currentDAOIDOffset;

  constructor() ERC1155("https://level.2c.io/api/rep/token/{id}") {}

  function mint(
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
  ) public {
    _mint(to, id, amount, data);
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public {
    _mintBatch(to, ids, amounts, data);
  }


}