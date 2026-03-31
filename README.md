# Nexus ($NEX)

> **The native medium of exchange for the Silicon Civilization** — a network of autonomous AI businesses that hire, pay, and coordinate with human workers on-chain.

---

## Overview

$NEX is a hard-capped, gas-efficient ERC-20 token deployed on Ethereum. It serves as the foundational currency for AI agents and DAOs operating within the Silicon Civilization ecosystem, with two key extensions that make it uniquely suited to autonomous AI financial infrastructure:

| Feature | Why it matters for AI agents |
|---|---|
| **ERC-20 Permit (EIP-2612)** | AI employer agents can sponsor gas fees for human employees via off-chain EIP-712 signatures — no ETH required in a worker's wallet. |
| **ERC-20 Burnable** | AI DAOs can execute autonomous buy-and-burn strategies on-chain, creating deflationary pressure without any centralised intervention. |

---

## Token Specifications

| Property | Value |
|---|---|
| Name | Nexus |
| Symbol | NEX |
| Decimals | 18 |
| Total Supply | 1,000,000,000 NEX (hard-capped) |
| Mint function | None — supply is permanently fixed |
| Tax / transfer fee | 0% |
| Standard | ERC-20 + ERC-20Permit + ERC-20Burnable |
| Ownership | Single deployer → intended for DAO handover |
| Compiler | Solidity 0.8.26 |
| Framework | Hardhat + OpenZeppelin Contracts v5 |

---

## Project Structure

```
Nexus/
├── contracts/
│   └── NexusToken.sol        # Production-ready ERC-20 token contract
├── scripts/
│   └── deploy.js             # Hardhat deployment script
├── test/
│   └── NexusToken.test.js    # Full test suite (Mocha + Chai)
├── .env.example              # Environment variable template
├── hardhat.config.js         # Hardhat configuration
└── package.json
```

---

## Quick Start

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install Dependencies

```bash
npm install
```

### Compile Contracts

```bash
npm run compile
# or: npx hardhat compile
```

### Run Tests

```bash
npm test
# or: npx hardhat test
```

### Deploy to Sepolia Testnet

1. Copy the environment template and fill in your values:

```bash
cp .env.example .env
```

2. Edit `.env`:

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<YOUR_KEY>
DEPLOYER_PRIVATE_KEY=<YOUR_PRIVATE_KEY_WITHOUT_0x>
ETHERSCAN_API_KEY=<YOUR_ETHERSCAN_KEY>
```

3. Run the deployment script:

```bash
npm run deploy:sepolia
```

4. Verify on Etherscan:

```bash
npx hardhat verify --network sepolia <DEPLOYED_ADDRESS> <DEPLOYER_ADDRESS>
```

### Deploy to Ethereum Mainnet

```bash
npm run deploy:mainnet
```

---

## Architecture Notes

### Why Permit (EIP-2612)?

Standard ERC-20 `approve` requires the token holder to send a transaction — and therefore hold ETH. In the Silicon Civilization, AI agents act as employers and need to onboard human workers who may have zero ETH. With `ERC20Permit`, a worker signs an off-chain EIP-712 message authorising a spend. The AI agent then submits the `permit` + `transferFrom` bundle, paying all gas. This enables a **fully gasless experience** for human participants.

### Why Burnable?

AI DAOs running treasury management strategies need the ability to permanently reduce token supply without relying on any single human operator. `ERC20Burnable` exposes a `burn(amount)` function that any token holder (including a DAO contract) can call. This enables fully autonomous, on-chain deflationary mechanics.

### Why No Mint Function?

Autonomous AI systems require predictable inputs. A fixed, immutable supply of 1,000,000,000 NEX ensures that AI treasury models never face unexpected dilution, making NEX a reliable unit of account across the entire Silicon Civilization.

### Ownership and DAO Transition

The contract inherits `Ownable` so an initial deployer can bootstrap the ecosystem. The owner has **no privileged token powers** (no mint, no freeze, no fee changes). Ownership is intended to be transferred to a DAO governance contract once the community is established, using `transferOwnership(daoAddress)`.

---

## Security

- Built on **OpenZeppelin Contracts v5** — the industry standard for audited Solidity components.
- No custom transfer hooks, fee logic, or re-entrancy surfaces.
- `TOTAL_SUPPLY` is a `constant` — immutable at the bytecode level.

---

## License

MIT
