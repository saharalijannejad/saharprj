const hre = require("hardhat");

async function main() {
  const Lock = await hre.ethers.getContractFactory("SERC20");
  const lock = await Lock.deploy("SAHAR","SAR",1,20);

  await lock.deployed();

  console.log(
    ` erc20 deployed to : ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
