pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Skills {

  // _skillSets[skillSetId][ownerAddress] => 32 byte skillset:
  // Each skillset contains 32 [8bit] skill values, per $LEVEL owner address:
  mapping(uint256 => mapping(address => uint256)) private _skillSets;

  constructor() {}

  function setSkill(
    address to,
    uint256 skillSet,
    uint256 skill,
    uint256 value
  ) public {

    // Create inverse mask for skill offset:
    //
    // ie. skill = 3
    // ........ 11111111 00000000 00000000 00000000 < skill mask (slot 3)
    // ........ 11111111 11111111 11111111 11111111 < xor mask (0xff...ff)
    // xor
    // ........ 00000000 11111111 11111111 11111111 < inverse mask (slot 3)
    uint256 inverseMask = 0xff << skill * 8 ^ 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    // Use inverse mask to empty previous value in skill slot:
    //
    // ie. skill = 3
    // ........ xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx < old value
    // ........ 00000000 11111111 11111111 11111111 < inverse mask (slot 3)
    // and
    // ........ 00000000 xxxxxxxx xxxxxxxx xxxxxxxx < template
    uint256 template = _skillSets[skillSet][to] & inverseMask;

    // Shift and add new skill value to the empty skill slot:
    //
    // ie. skill = 3, value = 42
    // ........ 00000000 xxxxxxxx xxxxxxxx xxxxxxxx < template
    // ........ 00101010 00000000 00000000 00000000 < shifted value
    // ........ 00101010 xxxxxxxx xxxxxxxx xxxxxxxx < new value
   _skillSets[skillSet][to] = template | (value << skill * 8);
  }

  function setSkills(
    address to,
    uint256 skillSet,
    uint256[] memory skills,
    uint256[] memory values
  ) public {
    // Simple iteration through skill setter:
    for (uint256 i = 0; i < skills.length; i++) {
      setSkill(to, skillSet, skills[i], values[i]);
    }
  }

  function setSkillSet(
    address to,
    uint256 skillSet,
    uint256 value
  ) public {
    _skillSets[skillSet][to] = value;
  }

  function setSkillSets(
    address to,
    uint256[] memory skillSets,
    uint256[] memory values
  ) public {
    // Simple iteration through skillSet setter:
    for (uint256 i = 0; i < skillSets.length; i++) {
      setSkillSet(to, skillSets[i], values[i]);
    }
  }

  function skillSetOf(
    address owner,
    uint256 skillSet
  ) public view returns (uint256) {
    return _skillSets[skillSet][owner];
  }

  function getSkill(address owner, uint256 skillSet, uint256 skill) public view returns (uint256) {
    // Shift bits to put skill in first byte:
    uint256 shiftedValue = _skillSets[skillSet][owner] >> (skill * 8);
    // Chop all bits to the left of the first byte:
    return uint256(uint8(shiftedValue));
  }

}