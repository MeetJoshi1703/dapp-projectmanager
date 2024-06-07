// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TaskRewardToken is ERC20{
    address public owner;
    uint256 public constant TOKENS_PER_INTERACTION = 100 * 10 ** 18; 
    uint256 public constant MAX_TRANSFER_AMOUNT = 5 * 10 ** 18; 

    constructor() ERC20("TaskRewardToken", "TRT") {
        
        owner=msg.sender;
        _mint(msg.sender, 1000 * 10 ** 18);
    }

      function rewardEmployee(address employee, uint256 amount) public {
    require(msg.sender == owner, "Only the owner can call this function");
    require(amount <= MAX_TRANSFER_AMOUNT, "Cannot transfer more than 5 tokens");
    require(totalSupply() >= amount, "Insufficient balance");
    _transfer(owner, employee, amount);
    }

    
}
