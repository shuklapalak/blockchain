// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract QueueContract {
  uint256[] arr; // array
  uint32 constant public SIZE = 10; // size of array

  // Push value at index 0
  function push(uint val) public {
    require(arr.length != SIZE, "Array is at maximum capacity");
    arr.push(0);
    for (uint256 i = arr.length - 1; i > 0; i--) {
      arr[i] = arr[i-1];
    }
    arr[0] = val;
  }

  // Remove value
  function pop() public {
    require(arr.length != 0, "Array is empty");
    for (uint256 i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    arr.pop();
  }

  // Get value of array
  function get() public view returns (uint[] memory) {
    return arr;
  }

  // Modify the value at a specific index.
  function update(uint val, uint index) public {
    require(index > arr.length, "Invalid Index");
    arr[index] = val;
  }
}
