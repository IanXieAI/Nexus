// scripts/deploy.js
// Deployment script for NexusToken ($NEX)
//
// Usage:
//   Sepolia testnet:  npx hardhat run scripts/deploy.js --network sepolia
//   Ethereum mainnet: npx hardhat run scripts/deploy.js --network mainnet
//
// Environment variables required (see .env.example):
//   SEPOLIA_RPC_URL        - RPC endpoint for Sepolia
//   DEPLOYER_PRIVATE_KEY   - Private key of the deploying wallet
//   ETHERSCAN_API_KEY      - For automatic contract verification

const { ethers } = require("hardhat");

async function main() {
  // ------------------------------------------------------------------
  // Resolve deployer
  // ------------------------------------------------------------------
  const [deployer] = await ethers.getSigners();
  console.log("Deploying NexusToken with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  // ------------------------------------------------------------------
  // Deploy
  // ------------------------------------------------------------------
  const NexusToken = await ethers.getContractFactory("NexusToken");

  // The deployer receives all 1,000,000,000 NEX and initial ownership.
  // Transfer ownership to a multisig / DAO after deployment.
  const nexusToken = await NexusToken.deploy(deployer.address);
  await nexusToken.waitForDeployment();

  const contractAddress = await nexusToken.getAddress();
  console.log("NexusToken deployed to:", contractAddress);

  // ------------------------------------------------------------------
  // Print deployment summary
  // ------------------------------------------------------------------
  const totalSupply = await nexusToken.totalSupply();
  console.log(
    "Total supply:",
    ethers.formatEther(totalSupply),
    "NEX"
  );

  // ------------------------------------------------------------------
  // Optional: verify on Etherscan
  // Run separately with:
  //   npx hardhat verify --network sepolia <contractAddress> <deployer.address>
  // ------------------------------------------------------------------
  console.log("\nTo verify on Etherscan run:");
  console.log(
    `  npx hardhat verify --network <network> ${contractAddress} ${deployer.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
