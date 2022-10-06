const hre = require("hardhat");

async function main() {
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");
  const mynft = await MyNFT.deploy();

  await mynft.deployed();

  console.log(
    `Contract deployed at ${mynft.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
