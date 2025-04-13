const hre = require("hardhat");

async function main() {
  const Credential = await hre.ethers.getContractFactory("Credential");
  const credential = await Credential.deploy();
  await credential.waitForDeployment();
  console.log("Contract deployed to:", credential.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
