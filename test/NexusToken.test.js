import { expect } from "chai";
import { network } from "hardhat";

// Hardhat 3: connect to the local EDR network and get the ethers object.
const { ethers } = await network.connect();

// ─────────────────────────────────────────────────────────────────────────────
// Helper: deploy a fresh NexusToken before each test that needs one.
// ─────────────────────────────────────────────────────────────────────────────
async function deployNexus() {
  const [deployer, alice, bob] = await ethers.getSigners();
  const NexusToken = await ethers.getContractFactory("NexusToken", deployer);
  const token = await NexusToken.deploy();
  await token.waitForDeployment();
  return { token, deployer, alice, bob };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Supply & allocation
// ─────────────────────────────────────────────────────────────────────────────
describe("NexusToken – Supply", function () {
  it("should have a hard-capped total supply of exactly 1,000,000,000 NEX", async function () {
    const { token } = await deployNexus();
    const EXPECTED_SUPPLY = ethers.parseUnits("1000000000", 18); // 1 Billion × 10^18
    expect(await token.totalSupply()).to.equal(EXPECTED_SUPPLY);
    expect(await token.MAX_SUPPLY()).to.equal(EXPECTED_SUPPLY);
  });

  it("should assign the entire genesis supply to the deployer", async function () {
    const { token, deployer } = await deployNexus();
    const deployerBalance = await token.balanceOf(deployer.address);
    const totalSupply = await token.totalSupply();
    expect(deployerBalance).to.equal(totalSupply);
  });

  it("should set the correct token name and symbol", async function () {
    const { token } = await deployNexus();
    expect(await token.name()).to.equal("Nexus");
    expect(await token.symbol()).to.equal("NEX");
  });

  it("should have 18 decimals", async function () {
    const { token } = await deployNexus();
    expect(await token.decimals()).to.equal(18n);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Burn (AI treasury deflation)
// ─────────────────────────────────────────────────────────────────────────────
describe("NexusToken – Burn", function () {
  it("should reduce totalSupply when tokens are burned", async function () {
    const { token, deployer } = await deployNexus();

    const burnAmount = ethers.parseUnits("1000", 18); // burn 1,000 NEX
    const supplyBefore = await token.totalSupply();

    await token.connect(deployer).burn(burnAmount);

    const supplyAfter = await token.totalSupply();
    expect(supplyAfter).to.equal(supplyBefore - burnAmount);
  });

  it("should reduce the burner's balance by the burned amount", async function () {
    const { token, deployer } = await deployNexus();

    const burnAmount = ethers.parseUnits("500000", 18); // burn 500,000 NEX
    const balanceBefore = await token.balanceOf(deployer.address);

    await token.connect(deployer).burn(burnAmount);

    const balanceAfter = await token.balanceOf(deployer.address);
    expect(balanceAfter).to.equal(balanceBefore - burnAmount);
  });

  it("should allow burnFrom when the burner has sufficient allowance", async function () {
    const { token, deployer, alice } = await deployNexus();

    const burnAmount = ethers.parseUnits("100", 18);

    // Transfer some NEX to Alice so she holds tokens
    await token.connect(deployer).transfer(alice.address, burnAmount);

    // Alice approves Bob (deployer acting as spender) to burn on her behalf
    await token.connect(alice).approve(deployer.address, burnAmount);

    const supplyBefore = await token.totalSupply();
    await token.connect(deployer).burnFrom(alice.address, burnAmount);

    expect(await token.totalSupply()).to.equal(supplyBefore - burnAmount);
    expect(await token.balanceOf(alice.address)).to.equal(0n);
  });

  it("should revert when burning more than balance", async function () {
    const { token, alice } = await deployNexus();
    // Alice has no tokens; any burn should revert
    await expect(
      token.connect(alice).burn(ethers.parseUnits("1", 18))
    ).to.be.revertedWithCustomError(token, "ERC20InsufficientBalance");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. ERC-20 Permit (gasless human payments via EIP-2612)
//
//    Scenario:
//    - Alice holds NEX but has no ETH to pay gas.
//    - Alice signs an off-chain EIP-712 message authorising Bob to spend
//      her tokens (the "permit").
//    - Bob (or a relayer) calls permit() on-chain – paying gas himself –
//      and then immediately transferFrom to move the tokens.
//    - Alice never paid a single wei of gas.
// ─────────────────────────────────────────────────────────────────────────────
describe("NexusToken – ERC20Permit (gasless approvals)", function () {
  it("should set the allowance via an off-chain signature without the owner paying gas", async function () {
    const { token, deployer, alice, bob } = await deployNexus();

    // 1. Fund Alice with some NEX.
    const transferAmount = ethers.parseUnits("10000", 18);
    await token.connect(deployer).transfer(alice.address, transferAmount);

    // 2. Build the EIP-712 permit payload.
    const permitAmount = ethers.parseUnits("5000", 18); // Alice permits Bob 5,000 NEX
    const nonce = await token.nonces(alice.address);     // Alice's current nonce (0)
    const deadline = Math.floor(Date.now() / 1000) + 3600; // valid for 1 hour

    const network_ = await ethers.provider.getNetwork();

    const domain = {
      name: await token.name(),        // "Nexus"
      version: "1",
      chainId: network_.chainId,
      verifyingContract: await token.getAddress(),
    };

    const types = {
      Permit: [
        { name: "owner",    type: "address" },
        { name: "spender",  type: "address" },
        { name: "value",    type: "uint256" },
        { name: "nonce",    type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const permitValue = {
      owner:    alice.address,
      spender:  bob.address,
      value:    permitAmount,
      nonce,
      deadline,
    };

    // 3. Alice signs the typed-data message OFF-CHAIN (no gas required).
    const signature = await alice.signTypedData(domain, types, permitValue);
    const { v, r, s } = ethers.Signature.from(signature);

    // 4. Bob (or a relayer) calls permit() ON-CHAIN, paying the gas himself.
    await token.connect(bob).permit(
      alice.address,
      bob.address,
      permitAmount,
      deadline,
      v,
      r,
      s
    );

    // 5. Verify the allowance was set correctly.
    expect(await token.allowance(alice.address, bob.address)).to.equal(permitAmount);

    // 6. Bob can now transferFrom Alice without any further approval from Alice.
    await token.connect(bob).transferFrom(alice.address, bob.address, permitAmount);
    expect(await token.balanceOf(bob.address)).to.equal(permitAmount);
  });

  it("should revert if the permit deadline has expired", async function () {
    const { token, deployer, alice, bob } = await deployNexus();

    const permitAmount = ethers.parseUnits("100", 18);
    const expiredDeadline = 1; // timestamp already in the past
    const nonce = await token.nonces(alice.address);
    const network_ = await ethers.provider.getNetwork();

    const domain = {
      name: await token.name(),
      version: "1",
      chainId: network_.chainId,
      verifyingContract: await token.getAddress(),
    };

    const types = {
      Permit: [
        { name: "owner",    type: "address" },
        { name: "spender",  type: "address" },
        { name: "value",    type: "uint256" },
        { name: "nonce",    type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const permitValue = {
      owner:    alice.address,
      spender:  bob.address,
      value:    permitAmount,
      nonce,
      deadline: expiredDeadline,
    };

    const signature = await alice.signTypedData(domain, types, permitValue);
    const { v, r, s } = ethers.Signature.from(signature);

    await expect(
      token.connect(bob).permit(alice.address, bob.address, permitAmount, expiredDeadline, v, r, s)
    ).to.be.revertedWithCustomError(token, "ERC2612ExpiredSignature");
  });

  it("should increment the nonce after a successful permit, invalidating a replayed signature", async function () {
    const { token, deployer, alice, bob } = await deployNexus();

    const permitAmount = ethers.parseUnits("1", 18);
    const nonce = await token.nonces(alice.address); // 0
    const deadline = Math.floor(Date.now() / 1000) + 3600;
    const network_ = await ethers.provider.getNetwork();

    const domain = {
      name: await token.name(),
      version: "1",
      chainId: network_.chainId,
      verifyingContract: await token.getAddress(),
    };

    const types = {
      Permit: [
        { name: "owner",    type: "address" },
        { name: "spender",  type: "address" },
        { name: "value",    type: "uint256" },
        { name: "nonce",    type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };

    const permitValue = {
      owner:    alice.address,
      spender:  bob.address,
      value:    permitAmount,
      nonce,
      deadline,
    };

    const signature = await alice.signTypedData(domain, types, permitValue);
    const { v, r, s } = ethers.Signature.from(signature);

    // First use succeeds
    await token.connect(bob).permit(alice.address, bob.address, permitAmount, deadline, v, r, s);
    expect(await token.nonces(alice.address)).to.equal(1n);

    // Replaying the same signature must revert
    await expect(
      token.connect(bob).permit(alice.address, bob.address, permitAmount, deadline, v, r, s)
    ).to.be.revertedWithCustomError(token, "ERC2612InvalidSigner");
  });
});
