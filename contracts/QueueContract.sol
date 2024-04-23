// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract QueueContract {
  uint256[] queue; // array
  uint32 constant public SIZE = 10; // size of array

  // Push value at index 0
  function push(uint val) public {
    require(queue.length != SIZE, "Array is at maximum capacity");
    queue.push(0);
    for (uint256 i = queue.length - 1; i > 0; i--) {
      queue[i] = queue[i-1];
    }
    queue[0] = val;
  }

  // Remove value
  function pop() public {
    require(queue.length != 0, "Array is empty");
    for (uint256 i = 0; i < queue.length - 1; i++) {
      queue[i] = queue[i + 1];
    }
    queue.pop();
  }

  // Get value of array
  function get() public view returns (uint[] memory) {
    return queue;
  }

  // Modify the value at a specific index.
  function update(uint val, uint index) public {
    require(index > queue.length, "Invalid Index");
    queue[index] = val;
  }
}
