// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexusToken
 * @author Silicon Civilization Contributors
 * @notice $NEX is the native medium of exchange for the Silicon Civilization —
 *         a network of autonomous AI businesses that hire, pay, and coordinate
 *         with human workers on-chain.
 *
 * @dev Technical design rationale:
 *
 *  ┌──────────────────────────────────────────────────────────────────────┐
 *  │  ERC-20 CORE                                                         │
 *  │  Standard fungible token with a hard-capped 1,000,000,000 NEX supply │
 *  │  minted once to the deployer.  No mint() function exists, making the │
 *  │  supply permanently fixed — a property required by AI DAOs that need │
 *  │  deterministic treasury accounting.                                   │
 *  ├──────────────────────────────────────────────────────────────────────┤
 *  │  ERC-20 PERMIT (EIP-2612 / EIP-712)                                  │
 *  │  Enables gasless, off-chain approvals signed via ECDSA.  An AI       │
 *  │  employer agent can sponsor gas fees on behalf of a human employee   │
 *  │  by collecting the worker's EIP-712 signature and submitting the     │
 *  │  permit + transferFrom bundle itself.  This removes the requirement  │
 *  │  for human workers to hold ETH for gas, lowering the barrier to      │
 *  │  participation in the Silicon Civilization economy.                  │
 *  ├──────────────────────────────────────────────────────────────────────┤
 *  │  ERC-20 BURNABLE                                                      │
 *  │  AI DAOs can execute autonomous buy-and-burn strategies: purchase     │
 *  │  NEX on-chain with protocol revenues and call burn() to permanently  │
 *  │  reduce supply, creating deflationary pressure without any           │
 *  │  centralised party having to act.                                    │
 *  ├──────────────────────────────────────────────────────────────────────┤
 *  │  OWNABLE (Single-owner → DAO transition)                             │
 *  │  Ownership starts with the deployer for bootstrapping, but is        │
 *  │  designed to be transferred to a DAO contract once governance is     │
 *  │  established.  The owner has NO privileged token functions (no mint, │
 *  │  no freeze, no fee changes) — ownership is held solely for future    │
 *  │  administrative upgrades such as setting a DAO treasury address.     │
 *  └──────────────────────────────────────────────────────────────────────┘
 */
contract NexusToken is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    /// @notice The hard-capped total supply: 1,000,000,000 NEX (18 decimals).
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    /**
     * @notice Deploys the NexusToken contract.
     * @dev Mints the entire fixed supply to `initialOwner`.  After this
     *      constructor executes, no additional tokens can ever be created.
     *      The ERC20Permit constructor records the token name into the
     *      EIP-712 domain separator, enabling gasless approvals from block 1.
     * @param initialOwner The address that receives all tokens and is granted
     *                     initial contract ownership (should be a multisig or
     *                     deployer EOA that will later transfer to a DAO).
     */
    constructor(address initialOwner)
        ERC20("Nexus", "NEX")
        ERC20Permit("Nexus")
        Ownable(initialOwner)
    {
        _mint(initialOwner, TOTAL_SUPPLY);
    }
}
