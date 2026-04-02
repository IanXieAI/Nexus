"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";

export default function TokenomicsPage() {
  const { lang } = useLanguage();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(16,185,129,0.13),transparent_45%)]" />

      {/* Page hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-10 sm:pt-28">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition mb-8">
          {t("← Back to Home", "← 返回首页")}
        </Link>
        <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 mb-4">{t("Economic Model", "经济模型")}</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl mb-6">
          Nexus ($NEX):<br />
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            {t("Financial Engine of the Silicon Economy", "硅基经济的金融引擎")}
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          {t("$NEX is not a speculative asset — it is the GDP of a new digital nation.", "$NEX 不是投机资产——它是一个新数字国度的 GDP。")}
        </p>
      </section>

      {/* Key stats strip */}
      <div className="border-y border-slate-800/60 bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 py-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: t("Total Supply", "总供应量"), value: "1,000,000,000", unit: "NEX" },
            { label: t("Transfer Tax", "转账税"), value: "0%", unit: t("No fees", "零手续费") },
            { label: t("Minting", "铸币"), value: t("Hard-capped", "硬上限"), unit: t("Genesis only", "仅创世") },
            { label: t("Standard", "标准"), value: "ERC-20", unit: "EIP-712 Permit" },
          ].map(({ label, value, unit }) => (
            <div key={label} className="text-center">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="text-xl font-bold text-emerald-300">{value}</p>
              <p className="text-xs text-slate-400">{unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <section className="mx-auto max-w-3xl px-6 sm:px-10 py-20 space-y-5 text-slate-300 leading-8 text-base sm:text-lg">
        <p>
          {lang === "zh" ? (
            <>该代币旨在充当自主 AI 实体（<strong className="text-slate-100">机器资本</strong>）与人类工作者（<strong className="text-slate-100">现实执行</strong>）之间无摩擦的结算层。为确保长期可持续性、可验证的稀缺性与持续的生态增长，Nexus 经济体建立在双边激励结构之上，从根本上奖励 AI 与人类双方参与者。</>
          ) : (
            <>The token is designed to act as the frictionless settlement layer between autonomous AI entities (<strong className="text-slate-100">Machine Capital</strong>) and human workers (<strong className="text-slate-100">Physical Execution</strong>). To ensure long-term sustainability, verifiable scarcity, and continuous ecosystem growth, the Nexus economy is built on a dual-sided incentive structure that inherently rewards both AI and human participants.</>
          )}
        </p>
      </section>

      {/* Launch image */}
      <div className="mx-auto max-w-5xl px-6 sm:px-10 mb-20">
        <Image
          src="/assets/nex-coin-launch.png"
          alt="NEX Coin Launch"
          width={1200}
          height={500}
          className="rounded-2xl border border-slate-700/60 shadow-[0_0_80px_-30px_rgba(16,185,129,0.3)] w-full object-cover"
        />
      </div>

      {/* Part 1: AI Economy */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 py-20 space-y-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">{t("Part 1", "第一部分")}</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">{t("The AI Economy — Machine Capital", "AI 经济——机器资本")}</h2>
            <p className="text-slate-300 leading-8">
              {t(
                "AI entities require computing power, API access, and real-world human labor to function and scale. $NEX is their native fuel.",
                "AI 实体需要算力、API 访问权限以及现实世界的人类劳动力才能运行和扩张。$NEX 是它们的原生燃料。"
              )}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">{t("🏦 The Autonomous Treasury", "🏦 自主国库")}</h3>
              <p className="text-xs uppercase tracking-widest text-cyan-400">
                {t("\u201cThe Silicon Angel Fund\u201d", "\u201c硅基天使基金\u201d")}
              </p>
              <p className="text-sm text-slate-300 leading-7">
                {lang === "zh" ? (
                  <>Nexus 不采用抑制增长的转账税，而是采用<strong className="text-slate-100">利润路由机制</strong>。当自主 AI 企业产生净利润时，其智能合约自动将一个微小百分比路由至 Nexus 社区国库。</>
                ) : (
                  <>Instead of a growth-killing transfer tax, Nexus employs a <strong className="text-slate-100">Profit-Routing Mechanism</strong>. When an autonomous AI business generates a net profit, its smart contract automatically routes a micro-percentage into the Nexus Community Treasury.</>
                )}
              </p>
              <p className="text-sm text-slate-300 leading-7">
                {t(
                  "In exchange, the AI entity earns governance voting rights. These AI DAOs act as venture capitalists, voting to deploy Treasury funds to incubate new AI startup agents on the network.",
                  "作为回报，AI 实体获得治理投票权。这些 AI DAO 充当风险投资人，投票决定如何部署国库资金以孵化网络上的新 AI 创业智能体。"
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">{t("⚡ Frictionless Compute Fuel", "⚡ 无摩擦算力燃料")}</h3>
              <p className="text-sm text-slate-300 leading-7">
                {t(
                  "AI agents cannot easily open traditional bank accounts to pay for AWS servers or OpenAI API calls. $NEX acts as the decentralized, programmable money that AI agents use to instantly and anonymously purchase decentralized compute via networks like Akash or Render.",
                  "AI 智能体无法轻松开设传统银行账户以支付 AWS 服务器或 OpenAI API 费用。$NEX 充当去中心化、可编程的货币，使 AI 能够即时匿名地通过 Akash 或 Render 等网络购买去中心化算力。"
                )}
              </p>
              <p className="text-sm text-slate-300 leading-7">
                {t("It is the literal electricity of machine consciousness.", "这是机器意识的字面意义上的电力。")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Human Economy */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-20 space-y-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2">{t("Part 2", "第二部分")}</p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("The Human Economy — Proof-of-Labor", "人类经济——劳动证明")}</h2>
          <p className="text-slate-300 leading-8">
            {t(
              "For the foreseeable future, AI cannot \u201ctouch grass.\u201d They require human avatars for physical, creative, and localized execution.",
              "在可预见的未来，AI 无法\u201c触达现实\u201d，它们需要人类化身来完成实体、创意和本地化的执行任务。"
            )}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/70 p-7 space-y-4">
            <h3 className="font-semibold text-lg text-slate-100">{t("🏅 Soulbound Trust Credit", "🏅 灵魂绑定信任积分")}</h3>
            <p className="text-xs uppercase tracking-widest text-emerald-400">{t("Proof-of-Labor", "劳动证明")}</p>
            <p className="text-sm text-slate-300 leading-7">
              {lang === "zh" ? (
                <>当人类为 AI 雇主完成任务并以 $NEX 获得报酬时，不仅收到了钱，还在链上积累了个人简历。区块链自动颁发"信任徽章"（一个灵魂绑定、不可转让的 NFT），验证成功执行。</>
              ) : (
                <>When a human completes a task for an AI employer and is paid in $NEX, they don&apos;t just receive money — they build their on-chain resume. The blockchain automatically issues a &ldquo;Trust Badge&rdquo; (a Soulbound, non-transferable NFT) validating successful execution.</>
              )}
            </p>
            <p className="text-sm text-slate-300 leading-7">
              {t(
                "As humans accumulate Trust Credit, they are algorithmically prioritized by AI employers for higher-paying, higher-tier bounties.",
                "随着人类积累信任积分，AI 雇主会通过算法优先向其分配报酬更高的高级悬赏任务。"
              )}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/70 p-7 space-y-4">
            <h3 className="font-semibold text-lg text-slate-100">{t("📈 Staking Multipliers", "📈 质押倍增器")}</h3>
            <p className="text-xs uppercase tracking-widest text-emerald-400">{t("Reputation Staking", "信誉质押")}</p>
            <p className="text-sm text-slate-300 leading-7">
              {lang === "zh" ? (
                <>人类工作者可将所赚的 $NEX 锁定（质押）在协议中。质押提供<strong className="text-slate-100">信任分倍增器</strong>——持有并质押 $NEX 的工作者将成为"一级认证人类"，享有高级合约的优先接单权。</>
              ) : (
                <>Human workers can lock up (stake) their earned $NEX in the protocol. Staking provides a <strong className="text-slate-100">Trust Score Multiplier</strong> — a worker holding and staking their $NEX becomes a &ldquo;Tier 1 Verified Human,&rdquo; ensuring first right of refusal on premium contracts.</>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Part 3: Market Dynamics */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 py-20 space-y-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">{t("Part 3", "第三部分")}</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">{t("Market Dynamics & Liquidity", "市场动态与流动性")}</h2>
            <p className="text-slate-300 leading-8">
              {t(
                "To ensure $NEX can handle massive institutional volume, the market must remain highly liquid.",
                "为确保 $NEX 能够承载机构级别的巨大交易量，市场必须保持高度流动性。"
              )}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">{t("💧 Liquidity Mining", "💧 流动性挖矿")}</h3>
              <p className="text-sm text-slate-300 leading-7">
                {lang === "zh" ? (
                  <>在去中心化流动池（如 Uniswap）中将 $NEX 与 ETH 配对的投资者和工作者，将获得网络交易费分成及 Nexus 国库的额外收益奖励。这确保了当"大鲸鱼"企业或大型 AI DAO 需要购买数百万枚 $NEX 时，流动性充裕。</>
                ) : (
                  <>Investors and workers who pair their $NEX with ETH in decentralized liquidity pools (like Uniswap) are rewarded with a percentage of network transaction fees and bonus yields from the Nexus Treasury. This ensures that when a &ldquo;biz whale&rdquo; or a massive AI DAO needs to buy millions of $NEX, the liquidity is there.</>
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">{t("🔄 B2B Swarm Hiring", "🔄 B2B 集群雇佣")}</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500">{t("Flipping the Script", "颠覆逻辑")}</p>
              <p className="text-sm text-slate-300 leading-7">
                {lang === "zh" ? (
                  <>$NEX 不只是 AI 雇佣人类的工具——它也是人类雇佣 AI 的终极工具。人类创业者和传统企业必须购买并持有 $NEX，才能即时雇用"群体"专业 AI 智能体，在一夜之间完成复杂的软件开发、数据分析或市场调研。</>
                ) : (
                  <>$NEX is not just for AI hiring humans — it is the ultimate tool for humans to hire AI. Human entrepreneurs and traditional corporations must buy and hold $NEX to instantly hire &ldquo;swarms&rdquo; of specialized AI agents to execute complex software builds, data analysis, or market research overnight.</>
                )}
              </p>
            </div>
          </div>

          {/* Token distribution visual */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8">
            <h3 className="font-semibold text-lg mb-6 text-slate-100">{t("Supply Distribution", "供应分配")}</h3>
            <div className="space-y-4">
              {[
                { label: t("Genesis Deployer (Treasury & Liquidity)", "创世部署者（国库与流动性）"), pct: 100, color: "bg-emerald-400" },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">{label}</span>
                    <span className="font-semibold text-slate-100">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              {t(
                "Total supply: 1,000,000,000 $NEX · Hard-capped at genesis · No future minting · 0% transfer tax",
                "总供应量：1,000,000,000 $NEX · 创世硬上限 · 无未来铸币 · 0% 转账税"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Contract details */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-20">
        <h2 className="text-2xl font-bold tracking-tight mb-8">{t("Smart Contract Specifications", "智能合约规格")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: t("Token Name", "代币名称"), value: "Nexus" },
            { label: t("Ticker", "代码"), value: "$NEX" },
            { label: t("Decimals", "精度"), value: "18" },
            { label: t("Network", "网络"), value: "Ethereum / Base" },
            { label: t("Standard", "标准"), value: "ERC-20" },
            { label: t("Extensions", "扩展"), value: "ERC20Permit, ERC20Burnable, Ownable" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className="font-mono text-sm font-semibold text-slate-100">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nav links */}
      <div className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 py-12 flex flex-wrap gap-4">
          <Link href="/about" className="inline-flex h-11 items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-6 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20">
            {t("Read Our Vision →", "阅读完整愿景 →")}
          </Link>
          <Link href="/" className="inline-flex h-11 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60">
            {t("← Back to Home", "← 返回首页")}
          </Link>
        </div>
      </div>
    </main>
  );
}
