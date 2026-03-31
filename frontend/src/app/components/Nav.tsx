"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { BrowserProvider } from "ethers";

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

async function connectMetaMask(): Promise<string> {
  if (typeof window === "undefined" || !("ethereum" in window)) {
    throw new Error("MetaMask not detected.");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new BrowserProvider(window.ethereum as any);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return signer.getAddress();
}

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tokenomics", label: "Tokenomics" },
];

export default function Nav() {
  const pathname = usePathname();
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleConnect = useCallback(async () => {
    setConnecting(true);
    try {
      const address = await connectMetaMask();
      setAccount(address);
    } catch {
      // silent — user cancelled or no MetaMask
    } finally {
      setConnecting(false);
    }
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/assets/Coin%20Logo%201.png"
            alt="NEX coin logo"
            width={36}
            height={36}
            className="rounded-full ring-1 ring-cyan-400/30 group-hover:ring-cyan-400/70 transition"
          />
          <span className="font-bold tracking-tight text-slate-100">
            Nexus <span className="text-cyan-400">$NEX</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition ${
                pathname === href
                  ? "text-cyan-300 font-semibold"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Connect Wallet */}
        <button
          type="button"
          onClick={handleConnect}
          disabled={connecting || !!account}
          className="hidden sm:inline-flex h-9 items-center rounded-lg border border-cyan-300/50 bg-cyan-400/10 px-4 text-xs font-semibold tracking-wide text-cyan-100 transition hover:bg-cyan-300/20 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {connecting ? "Connecting…" : account ? (
            <><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />{truncateAddress(account)}</>
          ) : "Connect Wallet"}
        </button>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-slate-400 hover:text-slate-100"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800/60 bg-slate-950/95 px-6 py-4 space-y-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm ${pathname === href ? "text-cyan-300 font-semibold" : "text-slate-300"}`}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleConnect}
            disabled={connecting || !!account}
            className="mt-2 w-full rounded-lg border border-cyan-300/50 bg-cyan-400/10 py-2 text-xs font-semibold text-cyan-100"
          >
            {connecting ? "Connecting…" : account ? truncateAddress(account) : "Connect Wallet"}
          </button>
        </div>
      )}
    </header>
  );
}
