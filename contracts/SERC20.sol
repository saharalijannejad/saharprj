//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract SERC20  {

 string public name;
string public symbol;
uint8 public decimals;
uint256 public totalSupply;

mapping(address => uint256) public balanceOf;
mapping(address => mapping(address => uint256)) public allowance;

constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint256 _totalSupply
) {
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply = _totalSupply;
    balanceOf[msg.sender] = _totalSupply;
}


event Mint(address indexed _to, uint256 _value);

function mint(uint256 _amount, address _to) external returns (bool success) {
    balanceOf[_to] += _amount;
    totalSupply += _amount;
    emit Mint(_to, _amount);
    return true;
}



}