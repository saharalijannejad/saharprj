const { expect } = require("chai");describe("TokenPayment", function() {
    let tokenPayment;
    let token;  beforeEach(async function () {
      const TokenPayment = await ethers.getContractFactory("Balance2");
      tokenPayment = await TokenPayment.deploy();
      await tokenPayment.deployed();  
        const Token = await ethers.getContractFactory("Token");
      token = await Token.deploy();
      await token.deployed();
    });  it("should receive tokens and update balances", async function() {
      const [sender, recipient] = await ethers.getSigners();    // Transfer tokens to sender
      await token.transfer(sender.address, 100);    // Sender approves TokenPayment contract to spend tokens
      await token.connect(sender).approve(tokenPayment.address, 100);    // Sender sends tokens to TokenPayment contract
      await tokenPayment.connect(sender).receiveToken(token.address, 50, 1);    // Check balances and token amounts
      expect(await token.balanceOf(tokenPayment.address)).to.equal(50);
      expect(await tokenPayment.balances(sender.address)).to.equal(50);
      expect(await tokenPayment.getSenderTokenAmount(sender.address, 1)).to.equal(50);
    });
  });