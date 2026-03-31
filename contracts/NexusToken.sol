// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title Nexus Token ($NEX)
/// @author Nexus
/// @notice Foundational currency for an autonomous AI economy where AI entities can hire humans.
/// @dev A fixed-supply ERC-20 with permit signatures for gasless approvals and burn support for treasury deflation.
contract NexusToken is ERC20, ERC20Permit, ERC20Burnable, Ownable {
    /// @notice Hard cap and genesis supply of NEX (18 decimals).
    uint256 public constant MAX_SUPPLY = 1_000_000_000 ether;

    /// @notice Deploys NEX, assigns ownership, and mints the full fixed supply to the deployer.
    /// @dev No additional mint function exists, so total supply is permanently capped at MAX_SUPPLY.
    constructor()
        ERC20("Nexus", "NEX")
        ERC20Permit("Nexus")
        Ownable(msg.sender)
    {
        _mint(msg.sender, MAX_SUPPLY);
    }
}
