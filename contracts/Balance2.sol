//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 import "hardhat/console.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Balance2 {
    struct Payment {
        address sender;
        uint256 tokenId;
        uint256 amount;
    } 
       mapping(address => uint256) public balances;
       Payment[] public payments;   
    
     function receiveToken(IERC20 token, uint256 amount) public {
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        payments.push(Payment(msg.sender, 0, amount));
        balances[msg.sender] += amount;
    }  
      function receiveERC1155(uint256 tokenId, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payments.push(Payment(msg.sender, tokenId, amount));
    }  
      function getPaymentsCount() public view returns (uint256) {
        return payments.length;
    } 
       function getPayment(uint256 index) public view returns (address sender, uint256 tokenId, uint256 amount) {
        Payment storage payment = payments[index];
        return (payment.sender, payment.tokenId, payment.amount);
    }
}