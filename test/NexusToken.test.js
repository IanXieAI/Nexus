const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NexusToken", function () {
  let nexusToken;
  let owner;
  let addr1;
  let addr2;

  const TOTAL_SUPPLY = ethers.parseEther("1000000000"); // 1 billion NEX

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const NexusToken = await ethers.getContractFactory("NexusToken");
    nexusToken = await NexusToken.deploy(owner.address);
  });

  // ────────────────────────────────────────────────────────────────────
  // Deployment
  // ────────────────────────────────────────────────────────────────────
  describe("Deployment", function () {
    it("should set the correct token name and symbol", async function () {
      expect(await nexusToken.name()).to.equal("Nexus");
      expect(await nexusToken.symbol()).to.equal("NEX");
    });

    it("should have 18 decimals", async function () {
      expect(await nexusToken.decimals()).to.equal(18);
    });

    it("should mint the entire supply to the initial owner", async function () {
      expect(await nexusToken.totalSupply()).to.equal(TOTAL_SUPPLY);
      expect(await nexusToken.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("should expose TOTAL_SUPPLY constant matching the minted amount", async function () {
      expect(await nexusToken.TOTAL_SUPPLY()).to.equal(TOTAL_SUPPLY);
    });

    it("should set the deployer as the owner", async function () {
      expect(await nexusToken.owner()).to.equal(owner.address);
    });
  });

  // ────────────────────────────────────────────────────────────────────
  // Transfers (0% tax)
  // ────────────────────────────────────────────────────────────────────
  describe("Transfers", function () {
    it("should transfer tokens between accounts with no fee", async function () {
      const amount = ethers.parseEther("1000");
      await nexusToken.transfer(addr1.address, amount);

      expect(await nexusToken.balanceOf(addr1.address)).to.equal(amount);
      expect(await nexusToken.balanceOf(owner.address)).to.equal(
        TOTAL_SUPPLY - amount
      );
    });

    it("should fail if sender does not have enough balance", async function () {
      await expect(
        nexusToken.connect(addr1).transfer(addr2.address, 1)
      ).to.be.revertedWithCustomError(nexusToken, "ERC20InsufficientBalance");
    });
  });

  // ────────────────────────────────────────────────────────────────────
  // Burnable (AI DAO buy-and-burn)
  // ────────────────────────────────────────────────────────────────────
  describe("Burnable", function () {
    it("should allow a token holder to burn their own tokens", async function () {
      const burnAmount = ethers.parseEther("500000000"); // 500 million
      await nexusToken.burn(burnAmount);

      expect(await nexusToken.totalSupply()).to.equal(
        TOTAL_SUPPLY - burnAmount
      );
      expect(await nexusToken.balanceOf(owner.address)).to.equal(
        TOTAL_SUPPLY - burnAmount
      );
    });

    it("should allow burnFrom with prior approval", async function () {
      const burnAmount = ethers.parseEther("1000");
      await nexusToken.transfer(addr1.address, burnAmount);
      await nexusToken.connect(addr1).approve(addr2.address, burnAmount);
      await nexusToken.connect(addr2).burnFrom(addr1.address, burnAmount);

      expect(await nexusToken.totalSupply()).to.equal(
        TOTAL_SUPPLY - burnAmount
      );
    });

    it("should not allow burning more than balance", async function () {
      await expect(
        nexusToken.connect(addr1).burn(1)
      ).to.be.revertedWithCustomError(nexusToken, "ERC20InsufficientBalance");
    });
  });

  // ────────────────────────────────────────────────────────────────────
  // Permit (EIP-2612 — gasless approvals for AI agent meta-transactions)
  // ────────────────────────────────────────────────────────────────────
  describe("Permit (EIP-2612)", function () {
    it("should allow a permit-based approval without the holder paying gas", async function () {
      const spender = addr2;
      const value = ethers.parseEther("100");
      const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const nonce = await nexusToken.nonces(owner.address);

      // Build EIP-712 domain
      const domain = {
        name: "Nexus",
        version: "1",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: await nexusToken.getAddress(),
      };

      // EIP-2612 Permit type
      const types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      };

      const message = {
        owner: owner.address,
        spender: spender.address,
        value,
        nonce,
        deadline,
      };

      // Sign off-chain (no gas paid by the token holder)
      const signature = await owner.signTypedData(domain, types, message);
      const { v, r, s } = ethers.Signature.from(signature);

      // Anyone (e.g. an AI agent) can submit this permit on-chain
      await nexusToken
        .connect(addr1)
        .permit(owner.address, spender.address, value, deadline, v, r, s);

      expect(await nexusToken.allowance(owner.address, spender.address)).to.equal(
        value
      );
    });

    it("should reject a permit with an expired deadline", async function () {
      const spender = addr2;
      const value = ethers.parseEther("100");
      const deadline = Math.floor(Date.now() / 1000) - 1; // already expired
      const nonce = await nexusToken.nonces(owner.address);

      const domain = {
        name: "Nexus",
        version: "1",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: await nexusToken.getAddress(),
      };

      const types = {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      };

      const signature = await owner.signTypedData(domain, types, {
        owner: owner.address,
        spender: spender.address,
        value,
        nonce,
        deadline,
      });
      const { v, r, s } = ethers.Signature.from(signature);

      await expect(
        nexusToken
          .connect(addr1)
          .permit(owner.address, spender.address, value, deadline, v, r, s)
      ).to.be.revertedWithCustomError(nexusToken, "ERC2612ExpiredSignature");
    });
  });

  // ────────────────────────────────────────────────────────────────────
  // Ownership
  // ────────────────────────────────────────────────────────────────────
  describe("Ownership", function () {
    it("should allow owner to transfer ownership", async function () {
      await nexusToken.transferOwnership(addr1.address);
      expect(await nexusToken.owner()).to.equal(addr1.address);
    });

    it("should prevent non-owners from transferring ownership", async function () {
      await expect(
        nexusToken.connect(addr1).transferOwnership(addr2.address)
      ).to.be.revertedWithCustomError(nexusToken, "OwnableUnauthorizedAccount");
    });

    it("should allow owner to renounce ownership", async function () {
      await nexusToken.renounceOwnership();
      expect(await nexusToken.owner()).to.equal(ethers.ZeroAddress);
    });
  });

  // ────────────────────────────────────────────────────────────────────
  // Hard cap — no minting after deployment
  // ────────────────────────────────────────────────────────────────────
  describe("Hard cap (no mint)", function () {
    it("should not expose a mint function", async function () {
      expect(typeof nexusToken.mint).to.equal("undefined");
    });
  });
});
