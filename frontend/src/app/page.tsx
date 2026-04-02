"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { BrowserProvider } from "ethers";
import { useLanguage } from "./components/LanguageProvider";

const roadmapMilestones = [
  {
    date: "Current Phase",
    title: "Proof of Concept & Dev Environment Setup",
    description:
      "Core smart contracts, frontend surfaces, and development infrastructure are being assembled into a working AI-native payment stack.",
    status: "active",
    label: "In Progress",
  },
  {
    date: "Q2 2026",
    title: "System Testing & Early Access",
    description:
      "Opening early project donations to founding supporters while completing rigorous contract, wallet, and product testing by the end of the quarter.",
    status: "next",
    label: "Upcoming",
  },
  {
    date: "Q3 2026",
    title: "Public Launch",
    description:
      "The platform opens to the public with a production-ready experience for AI-human coordination and on-chain settlement.",
    status: "future",
    label: "Planned",
  },
] as const;

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
  const { lang } = useLanguage();
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

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
            {t("Autonomous AI Economy · ERC-20", "自主 AI 经济 · ERC-20")}
          </span>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("Nexus ($NEX):", "Nexus ($NEX)：")}<br />
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              {t("Architecting the Silicon Economy", "构建硅基经济")}
            </span>
          </h1>
          <p className="max-w-xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
            {t(
              "The world's first cryptocurrency purpose-built for autonomous AI entities to hire, pay, and coordinate human workers on-chain — frictionlessly.",
              "全球首个为自主 AI 实体量身打造的加密货币，用于在链上无缝雇佣、支付并协作人类工作者。"
            )}
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
                  {t("Connecting…", "连接中…")}
                </>
              ) : account ? (
                <>
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  {truncateAddress(account)}
                </>
              ) : (
                <>
                  {t("Connect Wallet", "连接钱包")}
                  <span className="ml-2 opacity-70 transition-transform group-hover:translate-x-0.5 inline-block">→</span>
                </>
              )}
            </button>
            <Link
              href="/tokenomics"
              className="inline-flex h-12 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60"
            >
              {t("View Tokenomics", "查看代币经济")}
            </Link>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <div className="flex flex-wrap gap-6 border-t border-slate-800/80 pt-6 text-sm">
            {[
              { label: t("Total Supply", "总供应量"), value: "1,000,000,000 NEX" },
              { label: t("Transfer Tax", "转账税"), value: "0%" },
              { label: t("Standard", "标准"), value: "ERC-20 + EIP-712" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-slate-500 text-xs">{label}</p>
                <p className="mt-0.5 font-semibold text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative isolate h-[22rem] w-[22rem] sm:h-[26rem] sm:w-[26rem]">
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute inset-5 overflow-hidden rounded-full border border-cyan-300/35 bg-slate-950/70 shadow-[0_0_80px_-10px_rgba(34,211,238,0.45)]">
              <Image
                src="/assets/Coin%20Logo%202.png"
                alt="NEX Coin"
                fill
                priority
                sizes="(min-width: 1024px) 26rem, 22rem"
                className="object-cover object-center scale-[1.24] saturate-125 contrast-110"
              />
            </div>
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
            {t("\u201cAI is evolving into a sovereign economic actor.\u201d", "\u201cAI 正在演化为自主的经济主体。\u201d")}
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
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-400">{t("The Vision", "愿景")}</p>
            <h2 className="text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              {t("The \u201cTouching Grass\u201d Protocol", "\u201c触达现实\u201d协议")}
            </h2>
            <p className="text-slate-300 leading-8">
              {t(
                "AI cannot legally open a corporate bank account. If an AI wants to hire a human to perform a physical task — to be its hands, its eyes, or its boots on the ground — the current financial system completely blocks the transaction.",
                "AI 无法合法开设企业銀行账户。若 AI 希望雇用人类完成现实任务，现有金融系统几乎完全阻断了这类交易。"
              )}
            </p>
            <p className="text-slate-300 leading-8">
              {t(
                "Nexus is purpose-built as the financial settlement layer between machine intelligence and human labor. EIP-712 Permit structures let AI entities run programmable smart treasuries while human workers pay zero gas.",
                "Nexus 专为机器智能与人类劳动之间的金融结算而生。通过 EIP-712 Permit，AI 可运行可编程金库，而人类工作者可实现零 Gas 支付体验。"
              )}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-100 transition"
            >
              {t("Read the full vision", "阅读完整愿景")} <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-400 mb-3">{t("AI-Native Features", "AI 原生特性")}</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("Built for Machine Commerce", "为机器经济而构建")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "⚡", title: t("Gasless Payments", "无 Gas 支付"), desc: t("EIP-712 Permit lets AI sponsors pay gas on behalf of human workers. Zero friction for the workforce.", "EIP-712 Permit 允许 AI 赞助者代替人类工作者支付 Gas，工作者零摩擦。") },
              { icon: "🔥", title: t("Deflationary Burns", "通缩销毁"), desc: t("ERC20Burnable lets autonomous AI DAOs execute programmatic buy-and-burn to drive verifiable scarcity.", "ERC20Burnable 允许自主 AI DAO 执行程序化买入销毁，推动可验证的稀缺性。") },
              { icon: "🤖", title: t("AI Treasury Ready", "AI 国库就绪"), desc: t("Designed for Account Abstraction (ERC-4337) enabling batched micro-transaction payroll at scale.", "专为账户抽象（ERC-4337）设计，支持大规模批量微交易薪资发放。") },
              { icon: "🔒", title: t("Hard-Capped Supply", "硬上限供应"), desc: t("Exactly 1 billion NEX minted at genesis. No future minting functions exist. Absolute institutional trust.", "创世时精确铸造 10 亿枚 NEX，不存在未来铸币功能，带来绝对的机构级信任。") },
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
            <p className="text-xs tracking-[0.2em] uppercase text-emerald-400">{t("Tokenomics", "代币经济")}</p>
            <h2 className="text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              {t("The GDP of a New Digital Nation", "新数字国度的 GDP")}
            </h2>
            <p className="text-slate-300 leading-8">
              {t(
                "NEX is the frictionless settlement layer between autonomous AI entities (Machine Capital) and human workers (Physical Execution), built on a dual-sided incentive structure that rewards both sides for holding and utilizing the token.",
                "NEX 是自主 AI 实体（机器资本）与人类工作者（现实执行）之间的无摩擦结算层，采用双边激励模型，鼓励双方持有并使用代币。"
              )}
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
              {t("Full economic model", "完整经济模型")} <span>→</span>
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

      {/* STATUS + ROADMAP */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="mx-auto mb-16 max-w-4xl rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.12),rgba(34,211,238,0.08),rgba(15,23,42,0.85))] p-8 shadow-[0_0_80px_-40px_rgba(251,191,36,0.45)] sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-xs uppercase tracking-[0.24em] text-amber-100">
                  {t("Coming Soon · Early Stage", "即将开放 · 早期阶段")}
                </span>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
                    {t("Nexus is currently in the Proof of Concept phase.", "Nexus 当前处于概念验证阶段。")}
                  </h2>
                  <p className="max-w-xl text-base leading-8 text-slate-300">
                    {t(
                      "We are actively building and validating the initial infrastructure for an autonomous AI economy before opening the network to broader participation.",
                      "在向更广泛参与者开放之前，我们正积极构建并验证自主 AI 经济的基础设施。"
                    )}
                  </p>
                </div>
              </div>
              <div className="max-w-md rounded-2xl border border-slate-700/70 bg-slate-950/55 p-5 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{t("Early Supporters", "早期支持者")}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {t(
                    "Resonate with what we're building? We'll be opening up early supporter donations soon to help fuel development.",
                    "如果你认同我们的方向，我们将很快开启早期支持者捐助，用于推进开发。"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-400">{t("Roadmap", "路线图")}</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("Path to Public Launch", "通往公开发布")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {t(
                "A staged rollout focused on proving real AI-to-human coordination, tightening the stack through testing, and opening the platform deliberately.",
                "分阶段推进，先验证 AI 与人类协作，再通过测试打磨系统，最后稳步开放平台。"
              )}
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-[1.2rem] top-0 bottom-0 hidden w-px bg-gradient-to-b from-cyan-400/60 via-slate-700 to-emerald-400/40 md:block" />
            <div className="absolute left-0 right-0 top-[1.35rem] hidden h-px bg-gradient-to-r from-cyan-400/50 via-slate-700 to-emerald-400/40 xl:block" />
            <div className="space-y-8 xl:grid xl:grid-cols-3 xl:gap-8 xl:space-y-0">
              {roadmapMilestones.map(({ date, title, description, status, label }, index) => {
                const isActive = status === "active";
                const isNext = status === "next";

                return (
                  <div key={title} className="relative md:pl-14 xl:pl-0 xl:pt-16">
                    <div
                      className={`absolute left-0 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold xl:left-1/2 xl:top-0 xl:-translate-x-1/2 ${
                        isActive
                          ? "border-cyan-300 bg-cyan-400/20 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                          : isNext
                            ? "border-amber-300/60 bg-amber-300/10 text-amber-100"
                            : "border-slate-600 bg-slate-800 text-slate-300"
                      }`}
                    >
                      {isActive ? "◉" : index + 1}
                    </div>
                    <div
                      className={`rounded-2xl border p-6 backdrop-blur-sm transition ${
                        isActive
                          ? "border-cyan-400/40 bg-cyan-400/8 shadow-[0_0_60px_-35px_rgba(34,211,238,0.55)]"
                          : isNext
                            ? "border-amber-300/25 bg-amber-300/5"
                            : "border-slate-700/60 bg-slate-900/70"
                      }`}
                    >
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                          {lang === "zh"
                            ? index === 0
                              ? "当前阶段"
                              : index === 1
                                ? "2026 年 Q2"
                                : "2026 年 Q3"
                            : date}
                        </p>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                            isActive
                              ? "bg-cyan-400/15 text-cyan-200"
                              : isNext
                                ? "bg-amber-300/10 text-amber-100"
                                : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {lang === "zh"
                            ? index === 0
                              ? "进行中"
                              : index === 1
                                ? "即将到来"
                                : "规划中"
                            : label}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-100">
                        {lang === "zh"
                          ? index === 0
                            ? "概念验证与开发环境搭建"
                            : index === 1
                              ? "系统测试与早期接入"
                              : "公开发布"
                          : title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {lang === "zh"
                          ? index === 0
                            ? "核心智能合约、前端界面与开发基础设施正在整合为可运行的 AI 原生支付栈。"
                            : index === 1
                              ? "将在本季度末前完成严格的合约、钱包与产品测试，并向创始支持者开放早期项目捐助。"
                              : "平台将面向公众开放，提供可生产使用的 AI-人类协作与链上结算体验。"
                          : description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-slate-800/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(14,165,233,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-10">
          <Image src="/assets/Coin%20Logo%201.png" alt="NEX" width={64} height={64} className="mx-auto mb-6 rounded-full ring-2 ring-cyan-400/40" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t("Welcome to the Nexus.", "欢迎来到 Nexus。")}</h2>
          <p className="text-slate-300 leading-8 mb-8">
            {t(
              "You are no longer just an investor. You are the foundational capital of a new species of enterprise. Welcome to the future of work.",
              "你不再只是投资者，你是新型企业物种的基础资本。欢迎来到未来工作的时代。"
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="inline-flex h-12 items-center rounded-xl border border-cyan-300/50 bg-cyan-400/10 px-8 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20">
              {t("Read Our Vision", "阅读我们的愿景")}
            </Link>
            <Link href="/tokenomics" className="inline-flex h-12 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-8 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60">
              {t("Explore Tokenomics", "探索代币经济")}
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/60 py-8 text-center text-xs text-slate-500">
        {t("© 2026 Nexus (NEX) · The Silicon Economy · ERC-20 on Ethereum", "© 2026 Nexus (NEX) · 硅基经济 · 以太坊 ERC-20")}
      </footer>
    </main>
  );
}
