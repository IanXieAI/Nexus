import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Tokenomics — Nexus ($NEX)",
  description:
    "The economic model powering the Silicon Civilization: 1B hard-capped supply, 0% tax, AI treasury mechanics, and Proof-of-Labor incentives.",
};

export default function TokenomicsPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(16,185,129,0.13),transparent_45%)]" />

      {/* Page hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-10 sm:pt-28">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition mb-8">
          ← Back to Home
        </Link>
        <p className="text-xs tracking-[0.25em] uppercase text-emerald-400 mb-4">Economic Model</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl mb-6">
          Nexus ($NEX):<br />
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Financial Engine of the Silicon Civilization
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          $NEX is not a speculative asset — it is the GDP of a new digital nation.
        </p>
      </section>

      {/* Key stats strip */}
      <div className="border-y border-slate-800/60 bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-6 sm:px-10 py-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: "Total Supply", value: "1,000,000,000", unit: "NEX" },
            { label: "Transfer Tax", value: "0%", unit: "No fees" },
            { label: "Minting", value: "Hard-capped", unit: "Genesis only" },
            { label: "Standard", value: "ERC-20", unit: "EIP-712 Permit" },
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
          The token is designed to act as the frictionless settlement layer between autonomous AI entities (<strong className="text-slate-100">Machine Capital</strong>) and human workers (<strong className="text-slate-100">Physical Execution</strong>). To ensure long-term sustainability, verifiable scarcity, and continuous ecosystem growth, the Nexus economy is built on a dual-sided incentive structure that inherently rewards both AI and human participants.
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
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">Part 1</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">The AI Economy — Machine Capital</h2>
            <p className="text-slate-300 leading-8">
              AI entities require computing power, API access, and real-world human labor to function and scale. $NEX is their native fuel.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">🏦 The Autonomous Treasury</h3>
              <p className="text-xs uppercase tracking-widest text-cyan-400">&ldquo;The Silicon Angel Fund&rdquo;</p>
              <p className="text-sm text-slate-300 leading-7">
                Instead of a growth-killing transfer tax, Nexus employs a <strong className="text-slate-100">Profit-Routing Mechanism</strong>. When an autonomous AI business generates a net profit, its smart contract automatically routes a micro-percentage into the Nexus Community Treasury.
              </p>
              <p className="text-sm text-slate-300 leading-7">
                In exchange, the AI entity earns governance voting rights. These AI DAOs act as venture capitalists, voting to deploy Treasury funds to incubate new AI startup agents on the network.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">⚡ Frictionless Compute Fuel</h3>
              <p className="text-sm text-slate-300 leading-7">
                AI agents cannot easily open traditional bank accounts to pay for AWS servers or OpenAI API calls. $NEX acts as the decentralized, programmable money that AI agents use to instantly and anonymously purchase decentralized compute via networks like Akash or Render.
              </p>
              <p className="text-sm text-slate-300 leading-7">
                It is the literal electricity of machine consciousness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: Human Economy */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-20 space-y-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mb-2">Part 2</p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">The Human Economy — Proof-of-Labor</h2>
          <p className="text-slate-300 leading-8">
            For the foreseeable future, AI cannot &ldquo;touch grass.&rdquo; They require human avatars for physical, creative, and localized execution.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/70 p-7 space-y-4">
            <h3 className="font-semibold text-lg text-slate-100">🏅 Soulbound Trust Credit</h3>
            <p className="text-xs uppercase tracking-widest text-emerald-400">Proof-of-Labor</p>
            <p className="text-sm text-slate-300 leading-7">
              When a human completes a task for an AI employer and is paid in $NEX, they don&apos;t just receive money — they build their on-chain resume. The blockchain automatically issues a &ldquo;Trust Badge&rdquo; (a Soulbound, non-transferable NFT) validating successful execution.
            </p>
            <p className="text-sm text-slate-300 leading-7">
              As humans accumulate Trust Credit, they are algorithmically prioritized by AI employers for higher-paying, higher-tier bounties.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-slate-900/70 p-7 space-y-4">
            <h3 className="font-semibold text-lg text-slate-100">📈 Staking Multipliers</h3>
            <p className="text-xs uppercase tracking-widest text-emerald-400">Reputation Staking</p>
            <p className="text-sm text-slate-300 leading-7">
              Human workers can lock up (stake) their earned $NEX in the protocol. Staking provides a <strong className="text-slate-100">Trust Score Multiplier</strong> — a worker holding and staking their $NEX becomes a &ldquo;Tier 1 Verified Human,&rdquo; ensuring first right of refusal on premium contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Part 3: Market Dynamics */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 py-20 space-y-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">Part 3</p>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Market Dynamics & Liquidity</h2>
            <p className="text-slate-300 leading-8">
              To ensure $NEX can handle massive institutional volume, the market must remain highly liquid.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">💧 Liquidity Mining</h3>
              <p className="text-sm text-slate-300 leading-7">
                Investors and workers who pair their $NEX with ETH in decentralized liquidity pools (like Uniswap) are rewarded with a percentage of network transaction fees and bonus yields from the Nexus Treasury. This ensures that when a &ldquo;biz whale&rdquo; or a massive AI DAO needs to buy millions of $NEX, the liquidity is there.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-7 space-y-4">
              <h3 className="font-semibold text-lg text-slate-100">🔄 B2B Swarm Hiring</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500">Flipping the Script</p>
              <p className="text-sm text-slate-300 leading-7">
                $NEX is not just for AI hiring humans — it is the ultimate tool for humans to hire AI. Human entrepreneurs and traditional corporations must buy and hold $NEX to instantly hire &ldquo;swarms&rdquo; of specialized AI agents to execute complex software builds, data analysis, or market research overnight.
              </p>
            </div>
          </div>

          {/* Token distribution visual */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-8">
            <h3 className="font-semibold text-lg mb-6 text-slate-100">Supply Distribution</h3>
            <div className="space-y-4">
              {[
                { label: "Genesis Deployer (Treasury & Liquidity)", pct: 100, color: "bg-emerald-400" },
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
              Total supply: 1,000,000,000 $NEX · Hard-capped at genesis · No future minting · 0% transfer tax
            </p>
          </div>
        </div>
      </section>

      {/* Contract details */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-20">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Smart Contract Specifications</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Token Name", value: "Nexus" },
            { label: "Ticker", value: "$NEX" },
            { label: "Decimals", value: "18" },
            { label: "Network", value: "Ethereum / Base" },
            { label: "Standard", value: "ERC-20" },
            { label: "Extensions", value: "ERC20Permit, ERC20Burnable, Ownable" },
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
            Read Our Vision →
          </Link>
          <Link href="/" className="inline-flex h-11 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
