"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { BrowserProvider } from "ethers";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import { useLanguage } from "./LanguageProvider";

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
  { href: "/", en: "Home", zh: "首页" },
  { href: "/about", en: "About", zh: "关于" },
  { href: "/tokenomics", en: "Tokenomics", zh: "代币经济" },
];

export default function Nav() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const { isSignedIn } = useAuth();
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
          {links.map(({ href, en, zh }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition ${
                pathname === href
                  ? "text-cyan-300 font-semibold"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {lang === "zh" ? zh : en}
            </Link>
          ))}
        </nav>

        {/* Language toggle */}
        <div className="hidden sm:flex items-center rounded-lg border border-slate-700 bg-slate-900/70 p-1">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
              lang === "en" ? "bg-cyan-400/20 text-cyan-200" : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="Switch language to English"
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("zh")}
            className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
              lang === "zh" ? "bg-cyan-400/20 text-cyan-200" : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="切换到中文"
          >
            中文
          </button>
        </div>

        {/* Connect Wallet */}
        <div className="hidden sm:flex items-center gap-2">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button
                type="button"
                className="inline-flex h-9 items-center rounded-lg border border-slate-600 bg-slate-900 px-3 text-xs font-semibold tracking-wide text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-100"
              >
                {lang === "zh" ? "登录" : "Sign In"}
              </button>
            </SignInButton>
          ) : (
            <div className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1">
              <UserButton />
            </div>
          )}
          <button
            type="button"
            onClick={handleConnect}
            disabled={connecting || !!account}
            className="inline-flex h-9 items-center rounded-lg border border-cyan-300/50 bg-cyan-400/10 px-4 text-xs font-semibold tracking-wide text-cyan-100 transition hover:bg-cyan-300/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {connecting ? "Connecting…" : account ? (
              <><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />{truncateAddress(account)}</>
            ) : (lang === "zh" ? "连接钱包" : "Connect Wallet")}
          </button>
        </div>

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
          {links.map(({ href, en, zh }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm ${pathname === href ? "text-cyan-300 font-semibold" : "text-slate-300"}`}
            >
              {lang === "zh" ? zh : en}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold ${lang === "en" ? "border-cyan-300/60 bg-cyan-400/20 text-cyan-100" : "border-slate-700 bg-slate-900 text-slate-300"}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold ${lang === "zh" ? "border-cyan-300/60 bg-cyan-400/20 text-cyan-100" : "border-slate-700 bg-slate-900 text-slate-300"}`}
            >
              中文
            </button>
          </div>
          <button
            type="button"
            onClick={handleConnect}
            disabled={connecting || !!account}
            className="mt-2 w-full rounded-lg border border-cyan-300/50 bg-cyan-400/10 py-2 text-xs font-semibold text-cyan-100"
          >
            {connecting ? "Connecting…" : account ? truncateAddress(account) : (lang === "zh" ? "连接钱包" : "Connect Wallet")}
          </button>
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button
                type="button"
                className="w-full rounded-lg border border-slate-600 bg-slate-900 py-2 text-xs font-semibold text-slate-100"
              >
                {lang === "zh" ? "登录" : "Sign In"}
              </button>
            </SignInButton>
          ) : (
            <div className="pt-1">
              <UserButton />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
