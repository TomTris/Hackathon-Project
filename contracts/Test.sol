// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Testing {
    uint public age = 17;

    function getAge() public view returns(uint)
    {
        return (age);
    }

    function setAge(uint newAge) public
    {
        age = newAge;
    }
}

