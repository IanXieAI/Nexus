"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { BrowserProvider } from "ethers";

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

async function connectMetaMask(): Promise<string> {
  if (typeof window === "undefined" || !("ethereum" in window)) {
    throw new Error("MetaMask not detected. Please install the MetaMask extension.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new BrowserProvider(window.ethereum as any);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer.getAddress();
}

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      const address = await connectMetaMask();
      setAccount(address);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Connection failed.";
      setError(msg);
    } finally {
      setConnecting(false);
    }
  }, []);

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(16,185,129,0.13),transparent_40%)]" />

      {/* HERO */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pt-24 pb-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:pt-32 lg:pb-28">
        <div className="space-y-7">
          <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-300/10 px-4 py-1 text-xs tracking-[0.25em] text-cyan-200 uppercase">
            Autonomous AI Economy · ERC-20
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Nexus ($NEX):<br />
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Architecting the Silicon Civilization.
            </span>
          </h1>
          <p className="max-w-xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
            The world&apos;s first cryptocurrency purpose-built for autonomous AI entities to hire, pay, and coordinate human workers on-chain — frictionlessly.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleConnect}
              disabled={connecting || !!account}
              className="group inline-flex h-12 items-center rounded-xl border border-cyan-300/60 bg-cyan-400/10 px-6 text-sm font-semibold tracking-wide text-cyan-100 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {connecting ? (
                <>
                  <span className="mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-cyan-300/40 border-t-cyan-300" />
                  Connecting…
                </>
              ) : account ? (
                <>
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  {truncateAddress(account)}
                </>
              ) : (
                <>
                  Connect Wallet
                  <span className="ml-2 opacity-70 transition-transform group-hover:translate-x-0.5 inline-block">→</span>
                </>
              )}
            </button>
            <Link
              href="/tokenomics"
              className="inline-flex h-12 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60"
            >
              View Tokenomics
            </Link>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <div className="flex flex-wrap gap-6 border-t border-slate-800/80 pt-6 text-sm">
            {[
              { label: "Total Supply", value: "1,000,000,000 NEX" },
              { label: "Transfer Tax", value: "0%" },
              { label: "Standard", value: "ERC-20 + EIP-712" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-slate-500 text-xs">{label}</p>
                <p className="mt-0.5 font-semibold text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" />
            <Image
              src="/assets/coin-logo-2.png"
              alt="NEX Coin"
              width={420}
              height={420}
              priority
              className="relative drop-shadow-[0_0_60px_rgba(34,211,238,0.45)]"
            />
          </div>
        </div>
      </section>

      {/* CONCEPT VISUAL STRIP */}
      <section className="relative overflow-hidden border-y border-slate-800/60">
        <Image
          src="/assets/nex-coin-concept.png"
          alt="NEX Coin concept artwork"
          width={1440}
          height={480}
          className="w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-slate-950" />
        <div className="absolute inset-0 flex items-center px-8 sm:px-16">
          <p className="max-w-lg text-2xl font-semibold leading-snug text-slate-100 sm:text-3xl">
            &ldquo;AI is evolving into a sovereign economic actor.&rdquo;
          </p>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Image
              src="/assets/nexai-entrepreneurs.png"
              alt="NexAI Entrepreneurs"
              width={600}
              height={420}
              className="rounded-2xl border border-slate-700/60 shadow-[0_0_60px_-20px_rgba(34,211,238,0.3)] object-cover w-full"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-400">The Vision</p>
            <h2 className="text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              The &ldquo;Touching Grass&rdquo; Protocol
            </h2>
            <p className="text-slate-300 leading-8">
              An autonomous AI cannot click a mouse. It cannot legally open a corporate bank account. If an AI wants to hire a human to perform a physical task — to be its hands, its eyes, or its boots on the ground — the current financial system completely blocks the transaction.
            </p>
            <p className="text-slate-300 leading-8">
              Nexus is purpose-built as the financial settlement layer between machine intelligence and human labor. EIP-712 Permit structures let AI entities run programmable smart treasuries while human workers pay zero gas.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100 transition"
            >
              Read the full vision <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-3">AI-Native Features</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for Machine Commerce</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", title: "Gasless Payments", desc: "EIP-712 Permit lets AI sponsors pay gas on behalf of human workers. Zero friction for the workforce." },
              { icon: "🔥", title: "Deflationary Burns", desc: "ERC20Burnable lets autonomous AI DAOs execute programmatic buy-and-burn to drive verifiable scarcity." },
              { icon: "🤖", title: "AI Treasury Ready", desc: "Designed for Account Abstraction (ERC-4337) enabling batched micro-transaction payroll at scale." },
              { icon: "🔒", title: "Hard-Capped Supply", desc: "Exactly 1 billion NEX minted at genesis. No future minting functions exist. Absolute institutional trust." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 space-y-3 hover:border-cyan-400/40 transition">
                <div className="text-2xl">{icon}</div>
                <h3 className="font-semibold text-slate-100">{title}</h3>
                <p className="text-sm text-slate-400 leading-6">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOKENOMICS PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.2em] uppercase text-emerald-400">Tokenomics</p>
            <h2 className="text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              The GDP of a New Digital Nation
            </h2>
            <p className="text-slate-300 leading-8">
              NEX is the frictionless settlement layer between autonomous AI entities (Machine Capital) and human workers (Physical Execution), built on a dual-sided incentive structure that rewards both sides for holding and utilizing the token.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Supply", val: "1B NEX" },
                { label: "Genesis Mint", val: "100%" },
                { label: "Tax on Transfer", val: "0%" },
                { label: "Burn Mechanism", val: "ERC20Burnable" },
              ].map(({ label, val }) => (
                <div key={label} className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-1 text-lg font-bold text-emerald-300">{val}</p>
                </div>
              ))}
            </div>
            <Link href="/tokenomics" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-100 transition">
              Full economic model <span>→</span>
            </Link>
          </div>
          <div>
            <Image
              src="/assets/nex-coin-launch.png"
              alt="NEX Coin Launch"
              width={600}
              height={420}
              className="rounded-2xl border border-slate-700/60 shadow-[0_0_60px_-20px_rgba(16,185,129,0.3)] object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-3">Roadmap</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The March to Mainnet</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { phase: "Phase 1", name: "Genesis", desc: "Deployment of NEX smart contracts to Ethereum testnet. Audit and verification.", active: true },
              { phase: "Phase 2", name: "The First Hire", desc: "An autonomous AI business hires and pays a human worker in NEX for a real-world task.", active: false },
              { phase: "Phase 3", name: "Market Entry", desc: "Third-party audits, Mainnet deployment, and DEX liquidity pool initialization.", active: false },
              { phase: "Phase 4", name: "Ecosystem", desc: "NEX staking and governance, allowing humans to provide compute capital to AI startups.", active: false },
            ].map(({ phase, name, desc, active }, i) => (
              <div key={phase} className="flex flex-col items-center text-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold mb-4 ${active ? "border-cyan-400 bg-cyan-400/20 text-cyan-300" : "border-slate-600 bg-slate-800 text-slate-400"}`}>
                  {i + 1}
                </div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${active ? "text-cyan-400" : "text-slate-500"}`}>{phase}</p>
                <p className="font-semibold text-slate-100 mb-2">{name}</p>
                <p className="text-xs text-slate-400 leading-5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-slate-800/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(14,165,233,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-10">
          <Image src="/assets/coin-logo-1.png" alt="NEX" width={64} height={64} className="mx-auto mb-6 rounded-full ring-2 ring-cyan-400/40" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Welcome to the Nexus.</h2>
          <p className="text-slate-300 leading-8 mb-8">
            You are no longer just an investor. You are the foundational capital of a new species of enterprise. Welcome to the future of work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="inline-flex h-12 items-center rounded-xl border border-cyan-300/50 bg-cyan-400/10 px-8 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20">
              Read Our Vision
            </Link>
            <Link href="/tokenomics" className="inline-flex h-12 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-8 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60">
              Explore Tokenomics
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
        © 2026 Nexus (NEX) · The Silicon Civilization · ERC-20 on Ethereum
      </footer>
    </main>
  );
}
