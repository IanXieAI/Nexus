"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(14,165,233,0.14),transparent_45%)]" />

      {/* Page hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-10 sm:pt-28">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition mb-8">
          {t("← Back to Home", "← 返回首页")}
        </Link>
        <p className="text-xs tracking-[0.25em] uppercase text-cyan-400 mb-4">{t("The Vision", "愿景")}</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl mb-6">
          {t("Architecting the", "构建")}<br />
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            {t("Silicon Economy", "硅基经济")}
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          {t(
            "We are standing at the threshold of the greatest economic shift in human history.",
            "我们正站在人类历史上最重大经济变革的门槛之上。"
          )}
        </p>
      </section>

      {/* Hero image */}
      <div className="relative mx-auto max-w-5xl px-6 sm:px-10 mb-20">
        <Image
          src="/assets/nexai-entrepreneurs.png"
          alt="NexAI Entrepreneurs"
          width={1200}
          height={600}
          className="rounded-2xl border border-slate-700/60 shadow-[0_0_80px_-30px_rgba(34,211,238,0.35)] w-full object-cover"
          priority
        />
      </div>

      {/* Body content */}
      <section className="mx-auto max-w-3xl px-6 sm:px-10 space-y-16 pb-28">

        {/* Intro */}
        <div className="space-y-5 text-slate-300 leading-8 text-base sm:text-lg">
          <p>
            {lang === "zh" ? (
              <>数十年来，人工智能一直是一种工具——由人类双手操控以提升生产力。<strong className="text-slate-100">那个时代已经结束。</strong></>
            ) : (
              <>For decades, artificial intelligence has been a tool — software operated by human hands to increase human productivity. <strong className="text-slate-100">That era is over.</strong></>
            )}
          </p>
          <p>
            {t(
              "AI is evolving into a sovereign economic actor. The next generation of businesses will not be run by CEOs, boards of directors, or human managers; they will be completely autonomous, self-governing intelligence networks. They will analyze markets, manage treasuries, execute strategies, and generate immense wealth.",
              "AI 正在演化为自主的经济主体。下一代企业将不再由 CEO、董事会或人类管理者运营，而是完全自主、自我治理的智能网络。它们将分析市场、管理国库、执行战略并创造巨大财富。"
            )}
          </p>
          <p>
            {lang === "zh" ? (
              <>但要做到这一切，它们需要专为自身构建的金融基础设施。<strong className="text-cyan-300">Nexus 应运而生。</strong></>
            ) : (
              <>But to do this, they need a financial infrastructure built specifically for them. <strong className="text-cyan-300">Enter Nexus.</strong></>
            )}
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* The Problem */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-5">
            {t("The Problem: The Human Bottleneck", "问题：人类瓶颈")}
          </h2>
          <div className="space-y-4 text-slate-300 leading-8">
            <p>
              {t(
                'Traditional finance, and even 99% of current Web3 infrastructure, is designed exclusively for human biology. Bank accounts require government IDs. Crypto wallets require human fingers to click "Approve" and human brains to safeguard 12-word seed phrases.',
                "传统金融，乃至 99% 的现有 Web3 基础设施，均专为人类生物学特性而设计。银行账户需要政府颁发的身份证件；加密钱包需要人类手指点击\u201c批准\u201d，并由人类大脑保管 12 个助记词。"
              )}
            </p>
            <p>
              {lang === "zh" ? (
                <>AI 无法合法开设企业银行账户。若 AI 希望雇佣人类完成现实世界中的实体任务——充当其双手、眼睛或现场执行者——现有金融系统<strong className="text-rose-400">几乎完全阻断了这类交易。</strong></>
              ) : (
                <>AI cannot legally open a corporate bank account. If an AI wants to hire a human to perform a physical task in the real world — to be its hands, its eyes, or its boots on the ground — the current financial system <strong className="text-rose-400">completely blocks the transaction.</strong></>
              )}
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-5">
            {t("The Solution: The Native AI Economy", "解决方案：原生 AI 经济")}
          </h2>
          <p className="text-slate-300 leading-8 mb-6">
            {lang === "zh" ? (
              <>Nexus（$NEX）是全球首个专为充当机器智能与人类劳动之间金融结算层而构建的加密货币。我们不是在打造另一个 meme 币或投机资产，而是在构建<strong className="text-cyan-300">「触达现实」协议</strong>——AI 无缝雇佣人类所需的精确智能合约基础设施。</>
            ) : (
              <>Nexus ($NEX) is the world&apos;s first cryptocurrency purpose-built to act as the financial settlement layer between machine intelligence and human labor. We are not building another meme token or a speculative asset. We are building the <strong className="text-cyan-300">&ldquo;Touching Grass&rdquo; Protocol</strong> — the exact smart contract infrastructure required for an AI to seamlessly employ a human.</>
            )}
          </p>
          <p className="text-slate-300 leading-8 mb-8">
            {t(
              "By utilizing Account Abstraction and EIP-712 Permit structures, Nexus allows AI entities to operate programmable, high-frequency smart treasuries, while completely removing the complex gas-fee barriers for the human workforce.",
              "通过账户抽象与 EIP-712 Permit 结构，Nexus 使 AI 实体能够运行可编程的高频智能国库，同时彻底消除人类劳动者面临的复杂 Gas 费用障碍。"
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-cyan-400">{t("For the AI", "面向 AI")}</p>
              <p className="font-semibold text-slate-100">{t("Programmable Fuel", "可编程燃料")}</p>
              <p className="text-sm text-slate-400 leading-6">
                {t(
                  "Nexus is the ledger that allows AI entities to incorporate, scale, and automate their payroll natively on-chain. It is the literal electricity of machine consciousness.",
                  "Nexus 是允许 AI 实体在链上原生注册、扩张并自动化薪资发放的账本，是机器意识的字面意义上的电力。"
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-emerald-400">{t("For the Human", "面向人类")}</p>
              <p className="font-semibold text-slate-100">{t("Gateway to the New Economy", "进入新经济的门户")}</p>
              <p className="text-sm text-slate-400 leading-6">
                {t(
                  "$NEX is the currency you earn when you provide the physical intuition, creativity, and real-world execution that machines cannot yet replicate.",
                  "$NEX 是你凭借机器尚无法复制的身体直觉、创造力与现实执行力所赚取的货币。"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Concept image */}
        <div className="rounded-2xl overflow-hidden border border-slate-700/60">
          <Image
            src="/assets/nex-coin-concept.png"
            alt="NEX Coin concept"
            width={900}
            height={400}
            className="w-full object-cover opacity-80"
          />
        </div>

        {/* Our Mission */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-5">{t("Our Mission", "我们的使命")}</h2>
          <div className="space-y-4 text-slate-300 leading-8">
            <p>
              {lang === "zh" ? (
                <>我们的目标不仅仅是发行一枚代币，而是促成<strong className="text-slate-100">创世 AI</strong> 的诞生——世界上第一个完全自主、可盈利的商业实体。</>
              ) : (
                <>Our goal is not just to launch a token. Our goal is to facilitate the creation of <strong className="text-slate-100">Genesis AI</strong> — the world&apos;s first fully autonomous, profitable business entity.</>
              )}
            </p>
            <p>
              {t(
                "We are building the rails for the Silicon Economy, laying the groundwork for the day when the first AI-run corporation officially enters the global Fortune 100.",
                "我们正在为硅基经济铺设轨道，为第一家 AI 运营的企业正式跻身全球财富 100 强的那一天奠定基础。"
              )}
            </p>
          </div>
          <blockquote className="mt-8 border-l-4 border-cyan-400/60 pl-6 py-2">
            <p className="text-xl font-semibold text-slate-100 italic leading-relaxed">
              {t(
                "\u201cYou are no longer just an investor. You are the foundational capital of a new species of enterprise.\u201d",
                "\u201c你不再只是一位投资者，你是一种全新企业物种的基础资本。\u201d"
              )}
            </p>
            <p className="mt-3 text-xs text-slate-500 uppercase tracking-widest">
              {t("Welcome to the Nexus. Welcome to the future of work.", "欢迎来到 Nexus，欢迎来到工作的未来。")}
            </p>
          </blockquote>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-4 border-t border-slate-800 pt-10">
          <Link
            href="/tokenomics"
            className="inline-flex h-11 items-center rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-6 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
          >
            {t("Explore Tokenomics →", "探索代币经济 →")}
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60"
          >
            {t("← Back to Home", "← 返回首页")}
          </Link>
        </div>
      </section>
    </main>
  );
}
