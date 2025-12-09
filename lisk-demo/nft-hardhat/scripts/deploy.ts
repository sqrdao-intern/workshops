import { ethers } from "hardhat";

async function main() {
  const nft = await ethers.deployContract("NFT");
  await nft.waitForDeployment();

  console.log(`NFT deployed at ${nft.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
