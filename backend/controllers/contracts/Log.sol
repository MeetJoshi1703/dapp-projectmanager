// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DataStorage {

  // State variable to store the string
  string public storedString;

  // Function to set the string value
  function setString(string memory newString) public {
    storedString = newString;
  }

  // Function to retrieve the stored string value
  function getString() public view returns (string memory) {
    return storedString;
  }
}