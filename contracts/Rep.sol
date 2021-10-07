pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Rep {

  mapping(uint256 => mapping(address => uint256)) private _skills;
  mapping(uint256 => uint256) private _masks;
  mapping(uint256 => uint256) private _inverseMasks;

  constructor() {

    // Generate bit masks for each of 32 skill slots:
    //
    // _masks[0] = 0x00000000000000000000000000000000000000000000000000000000000000ff;
    // _masks[1] = 0x000000000000000000000000000000000000000000000000000000000000ff00;
    // _masks[2] = 0x0000000000000000000000000000000000000000000000000000000000ff0000;
    // ...
    // _masks[31] = 0xff00000000000000000000000000000000000000000000000000000000000000;
    for (uint256 i = 0; i < 32; i++) {
      _masks[i] = 0xff << i*8;
    }

  }

  function _getSkillSlotBitmask(uint256 skill) private pure returns (uint256) {
    // Shift a 1-byte bitmask to the provided skill slot:
    // ie. skill = 3
    // 0x00000000000000000000000000000000000000000000000000000000000000ff < 0xff
    // 0x00000000000000000000000000000000000000000000000000000000ff000000 < shifted 3 * 8 bits
    return 0xff << skill * 8;
  }

  function setSkill(
    address to,
    uint256 skillSet,
    uint256 skill,
    uint256 value
  ) public {
    // Shift 8bit value by skill offset:
    // ie. skill = 3, value = 42
    // ........ 00101010 00000000 00000000 00000000
    uint256 shiftedValue = value << ( skill * 8 );

    // Create inverse mask for skill offset:
    //
    // 0xff << skill * 8 yields a bitmask for the provided skill slot
    //
    // ie. skill = 3
    // ........ 11111111 00000000 00000000 00000000 < skill mask (slot 3)
    // ........ 11111111 11111111 11111111 11111111 < xor mask (0xff...ff)
    // ........ 00000000 11111111 11111111 11111111 < inverse mask (slot 3)
    uint256 inverseMask = _getSkillSlotBitmask(skill) ^ 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

    // Use inverse mask to mask out previous value in skill slot:
    // ie. skill = 3
    // ........ xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx < old value
    // ........ 00000000 11111111 11111111 11111111 < inverse mask (slot 3)
    // ........ 00000000 xxxxxxxx xxxxxxxx xxxxxxxx < template
    //
    // This template includes all old values except the skill slot being set:
    uint256 template = _skills[skillSet][to] & inverseMask;

    // Add new shifted skill slot value to old value template:
    // ie. skill = 3, value = 42
    // ........ 00000000 xxxxxxxx xxxxxxxx xxxxxxxx < template
    // ........ 00101010 00000000 00000000 00000000 < shifted value
    // ........ 00101010 xxxxxxxx xxxxxxxx xxxxxxxx < new value
   _skills[skillSet][to] = template | shiftedValue;
  }

  function getSkill(address owner, uint256 skillSet, uint256 skill) public view returns (uint256) {

    // 1. Bitwise & the skill slot to filter only the skill slot's value:
    // ie. skill = 3, value = 42
    // ........ 00101010 xxxxxxxx xxxxxxxx xxxxxxxx < value
    // ........ 11111111 00000000 00000000 00000000 < skill mask (slot 3)
    // ........ 00101010 00000000 00000000 00000000 < filtered skill value (slot 3)
    uint256 filteredValue = _skills[skillSet][owner] & _getSkillSlotBitmask(skill);
    // 2. Shift >> the skill slot by it's offset to get it's value:
    // ie. skill = 3, value = 42
    // ........ 00101010 00000000 00000000 00000000 < filtered skill value (slot 3)
    // ........ 00000000 00000000 00000000 00101010 < shifted skill value (42)
    uint256 value = filteredValue >> (skill * 8);
    return value;
  }

}