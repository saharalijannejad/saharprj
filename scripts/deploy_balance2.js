const {ethers} = require("hardhat");

async function main() {
  const Lock = await ethers.getContractFactory("Balance2");
  const lock = await Lock.deploy();



  console.log(
    ` Balance deployed to : ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
