const assert = require('assert');
const SERC20 = artifacts.require('SERC20');

describe('SERC20', () => {
  let token;
  const initialSupply = 1000;

  beforeEach(async () => {
    token = await SERC20.new('MyToken', 'MTK', 18, initialSupply);
  });

  describe('mint()', () => {
    it('should increase the balance of the recipient', async () => {
      const recipient = accounts[1];
      const amount = 500;

      await token.mint(amount, recipient);

      const balance = await token.balanceOf(recipient);
      assert.equal(balance, amount);
    });

    it('should increase the total supply', async () => {
      const recipient = accounts[1];
      const amount = 500;

      await token.mint(amount, recipient);

      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply, initialSupply + amount);
    });

    it('should emit a Mint event', async () => {
      const recipient = accounts[1];
      const amount = 500;

      const result = await token.mint(amount, recipient);

      assert.ok(result.logs.length > 0);
      assert.equal(result.logs[0].event, 'Mint');
      assert.equal(result.logs[0].args._to, recipient);
      assert.equal(result.logs[0].args._value, amount);
    });
  });
});
