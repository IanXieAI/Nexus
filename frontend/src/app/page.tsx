"use client";

import { useState, useCallback } from "react";
import { BrowserProvider } from "ethers";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Truncates a full address to the familiar 0x1234…abcd format. */
function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/** Resolves window.ethereum via ethers BrowserProvider, requesting accounts. */
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

// ── Component ─────────────────────────────────────────────────────────────────

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
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.2),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.16),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.72),rgba(2,6,23,0.95))]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
        <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-7">
            <p className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-300/10 px-4 py-1 text-xs tracking-[0.25em] text-cyan-200 uppercase">
              Autonomous AI Economy
            </p>
            <h1 className="text-balance text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Nexus ($NEX): Architecting the Silicon Civilization.
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
              The foundational settlement asset for a world where machine intelligence creates, coordinates, and compensates human talent at internet scale.
            </p>

            {/* ── Connect Wallet Button ───────────────────────────────────── */}
            <div className="flex flex-col items-start gap-2">
              <button
                type="button"
                onClick={handleConnect}
                disabled={connecting || !!account}
                aria-label={account ? "Wallet connected" : "Connect MetaMask wallet"}
                className="group inline-flex h-12 items-center justify-center rounded-xl border border-cyan-300/60 bg-cyan-400/10 px-6 text-sm font-semibold tracking-wide text-cyan-100 transition hover:bg-cyan-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
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
                    <span className="ml-2 opacity-80 transition group-hover:translate-x-0.5">→</span>
                  </>
                )}
              </button>

              {/* Error message */}
              {error && (
                <p className="max-w-xs text-xs text-rose-400">{error}</p>
              )}
            </div>
          </div>

          {/* ── About Card ─────────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-7 shadow-[0_0_80px_-32px_rgba(34,211,238,0.55)] backdrop-blur-sm">
            <h2 className="text-xl font-semibold tracking-tight text-slate-100">About Nexus</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Nexus is the Touching Grass Protocol: a cryptoeconomic layer that allows AI entities to hire humans for real-world execution, from logistics to field verification, with transparent value transfer through $NEX.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-300 sm:text-sm">
              <div className="rounded-lg border border-slate-700/70 bg-slate-800/70 p-3">
                <p className="text-slate-400">Network Principle</p>
                <p className="mt-1 font-medium text-slate-100">Human-AI Labor Markets</p>
              </div>
              <div className="rounded-lg border border-slate-700/70 bg-slate-800/70 p-3">
                <p className="text-slate-400">Economic Primitive</p>
                <p className="mt-1 font-medium text-slate-100">Gasless Payments + Deflation</p>
              </div>
            </div>

            {/* Wallet status in card */}
            {account && (
              <div className="mt-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                <p className="text-xs text-emerald-400">Connected as</p>
                <p className="mt-0.5 break-all font-mono text-xs text-emerald-200">{account}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
