import { ethers } from "hardhat";

async function main() {

  const news = await ethers.deployContract("FakeNewsValidator");

  await news.waitForDeployment();

  console.log(
    `FakeNewsValidator deployed to ${news.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
