/**
 * Hardhat Ignition deployment module for NexusToken ($NEX).
 *
 * Ignition handles nonce management, retries, and journal-based resumption,
 * making it safe to re-run this script if a deployment is interrupted.
 *
 * ── How to deploy ──────────────────────────────────────────────────────────
 *
 * 1. Set the required environment variables in a `.env` file at the repo root:
 *
 *      SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<YOUR_KEY>
 *      SEPOLIA_PRIVATE_KEY=0x<YOUR_WALLET_PRIVATE_KEY>
 *
 *    ⚠  Never commit your private key. `.env` is already in `.gitignore`.
 *
 * 2. Source the env vars so Hardhat can read them:
 *
 *      source .env          # bash / zsh
 *      # or use a tool like `dotenv-cli`:
 *      npx dotenv -e .env -- npx hardhat ignition deploy ignition/modules/NexusToken.js --network sepolia
 *
 * 3. Full deploy command (Sepolia testnet):
 *
 *      npx hardhat ignition deploy ignition/modules/NexusToken.js --network sepolia
 *
 * 4. For a quick local dry-run (no real ETH needed):
 *
 *      npx hardhat ignition deploy ignition/modules/NexusToken.js --network hardhatLocal
 *
 * 5. After deployment, Ignition prints the verified contract address. You can
 *    also re-run the command safely — it will resume from where it left off
 *    using the on-disk journal in `ignition/deployments/`.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * NexusTokenModule deploys the NexusToken contract.
 *
 * NexusToken's constructor takes no arguments — it mints the full 1 Billion
 * NEX genesis supply to msg.sender (the deployer wallet) automatically.
 */
const NexusTokenModule = buildModule("NexusTokenModule", (m) => {
  // Deploy NexusToken. Ignition infers the constructor ABI and sends the
  // deployment transaction from the configured accounts[0] (your PRIVATE_KEY).
  const nexusToken = m.contract("NexusToken");

  // Return the contract future so callers (tests, other modules) can reference it.
  return { nexusToken };
});

export default NexusTokenModule;
