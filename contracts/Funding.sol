// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Funding {
    struct Share {
        address wallet;
        uint256 amount;
    }

    struct Project {
        string name;
        string[] categories;
        uint256 totalFund;
        uint256 currFund;
        bool finished;
        address owner;
        uint    percentage;
        uint    moneyOwner;
        Share[] shares;
        bool    claimed;
        string  hash;
    }

    string[] private   categories;
    Project[] private  projects;
    uint private       nbr = 3327323;

    event ProjectRegistered(string hash, uint256 totalFund, address owner);
    event MoneyTransfered(string hash, uint fund, address _from);
    event RefundIssued(string hash, uint total);
    event DistributeMoney(string hash, uint total);
    event ClaimMoney(string hash, uint total);

    constructor()
    {
        categories.push("AI");
        categories.push("Data");
    }

function bytes32ToHexString(bytes32 _bytes32) private pure returns (string memory) {
        bytes memory hexChars = "0123456789abcdef";
        bytes memory str = new bytes(64);
        for (uint256 i = 0; i < 32; i++) {
            str[i * 2] = hexChars[uint8(_bytes32[i] >> 4)];
            str[i * 2 + 1] = hexChars[uint8(_bytes32[i] & 0x0f)];
        }
        return string(str);
    }

    function getHash() public view returns (string memory) {
        bytes32 hash = keccak256(abi.encode(nbr));
        return bytes32ToHexString(hash);
    }

    function getIndexByHash(string memory hash) private view returns(int)
    {
        for (uint i = 0; i < projects.length; i++)
        {
            if (areStringsSame(hash, projects[i].hash))
                return (int(i));
        }
        return (-1);
    }

    function areStringsSame(string memory first, string memory second) private pure returns(bool)
    {
        bytes memory f = bytes(first);
        bytes memory s = bytes(second);

        if (f.length != s.length)
        {
            return false;
        }
        for (uint i = 0; i < f.length; i++)
        {
            if (f[i] != s[i])
                return false;
        }
        return true;
    }

    function checkIfInArray(string[] memory strings, string memory checked) private pure returns (bool)
    {
        for (uint i = 0; i < strings.length; i++)
        {
            if (areStringsSame(strings[i], checked))
                return true;
        }
        return false;
    }

    function checkIfCategoriesAreValid(string[] memory categoriesPassed) private view returns(bool)
    {
        for (uint i = 0; i < categoriesPassed.length; i++)
        {
            if (!checkIfInArray(categories, categoriesPassed[i]))
                return false;
        }
        return true;
    }

    modifier categoriesWalid(string[] memory categoriesPassed, uint soldPercentage)
    {
        require(checkIfCategoriesAreValid(categoriesPassed), "categories are not valid");
        require(soldPercentage < 100 && soldPercentage != 0, "percentage doesnt make sense");
        _;
    }

    modifier uniqueCategory(string memory category)
    {
        require(!checkIfInArray(categories, category), "Already in categories");
        _;
    }

    function registerProject( string memory name, string[] memory categories, uint256 totalFund, uint soldPercentage) external payable categoriesWalid(categories, soldPercentage) {
        projects.push();
        Project storage newProject = projects[projects.length - 1];

        newProject.name = name;
        for (uint i = 0; i < categories.length; i++) {
            newProject.categories.push(categories[i]);
        }
        newProject.totalFund = totalFund;
        newProject.finished = false;
        newProject.owner = msg.sender;
        newProject.percentage = soldPercentage;
        newProject.hash = getHash();
        newProject.moneyOwner = msg.value;
        newProject.claimed = false;
        nbr++;
        emit ProjectRegistered(newProject.hash, totalFund, msg.sender);
    }

    function getMaxMoneyPossibleToSend(string memory hash) public view returns(uint)
    {
        int i = getIndexByHash(hash);
        require(i != -1, "hash doesnt exist");
        uint e = uint(i);
        
        return (projects[e].totalFund - projects[e].currFund);
    }

    function donateToProject(string memory hash) external payable returns(bool)
    {
        int i = getIndexByHash(hash);
        require(i != -1, "hash doesnt exist");
        require(!projects[uint(i)].finished, "project finished");

        uint e = uint(i);
        projects[e].currFund += msg.value;
        emit MoneyTransfered(hash, msg.value, msg.sender);
        bool found = false;
        for (uint item = 0; item < projects[e].shares.length; item++)
        {
            if (projects[e].shares[item].wallet == msg.sender)
            {
                projects[e].shares[item].amount += msg.value;
                found = true;
                break;
            }
        }
        if (!found)
        {
            projects[e].shares.push(Share(msg.sender, msg.value));
        }
        if(projects[e].currFund == projects[e].totalFund)
        {
            projects[e].finished = true;
        }
        return false;
    }

    function refund(string memory hash) external 
    {
        int i = getIndexByHash(hash);
        require(i != -1, "project doesnt exist");
        require(msg.sender == projects[uint(i)].owner, "not owner");
        require(projects[uint(i)].finished == false, "finished fund");

        uint e = uint(i);
        for (uint ind = 0; ind < projects[e].shares.length; ind++)
        {
            payable(projects[e].shares[ind].wallet).transfer(projects[e].shares[ind].amount);
        }
        payable (projects[e].owner).transfer(projects[e].moneyOwner);
        emit RefundIssued(hash, projects[e].currFund + projects[e].moneyOwner);
        projects[e].currFund = 0;
    }

    function distrubiteMoney(string memory hash) external payable
    {
        int i = getIndexByHash(hash);
        require(i != -1, "project doesnt exist");
        uint   e = uint(i);
        
        for (uint ind = 0; ind < projects[e].shares.length; i++)
        {
            payable(projects[e].shares[ind].wallet).transfer(msg.value * projects[e].shares[ind].amount / projects[e].currFund);
        }

        emit DistributeMoney(hash, msg.value);
    }

    function claimMoney(string memory hash) external
    {
        int i = getIndexByHash(hash);
        require(i != -1, "hash doesnt exist");
        uint e = uint(i);
        require(!projects[e].claimed, "already claimed");
        require(projects[e].finished, "not finished");
        payable(projects[e].owner).transfer(projects[e].moneyOwner + projects[e].totalFund);
        projects[e].claimed = true;
        emit ClaimMoney(hash, projects[e].moneyOwner + projects[e].totalFund);
    }

    function addCategory(string memory category) external uniqueCategory(category)
    {
        categories.push(category);
    }

    function getProjects() external view returns(Project[] memory)
    {
        return projects;
    }

    function getCategories() external view returns(string[] memory)
    {
        return categories;
    }

}
