pragma solidity ^0.4.17;

contract Reserve {
  address[16] public reserves;

  function reserve(uint modelId) public returns (uint) {
    require(modelId >= 0 && modelId <= 3);

    reserves[modelId] = msg.sender;

    return modelId;
  }

  function getReserves() public view returns (address[16]) {
    return reserves;
  }

}
