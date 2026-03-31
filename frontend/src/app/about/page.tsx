import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Nexus ($NEX) — The Silicon Civilization",
  description:
    "Nexus is the world's first cryptocurrency purpose-built as the financial settlement layer between machine intelligence and human labor.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(14,165,233,0.14),transparent_45%)]" />

      {/* Page hero */}
      <section className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-10 sm:pt-28">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition mb-8">
          ← Back to Home
        </Link>
        <p className="text-xs tracking-[0.25em] uppercase text-cyan-400 mb-4">The Vision</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl mb-6">
          Architecting the<br />
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            Silicon Civilization.
          </span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
          We are standing at the threshold of the greatest economic shift in human history.
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
            For decades, artificial intelligence has been a tool — software operated by human hands to increase human productivity. <strong className="text-slate-100">That era is over.</strong>
          </p>
          <p>
            AI is evolving into a sovereign economic actor. The next generation of businesses will not be run by CEOs, boards of directors, or human managers; they will be completely autonomous, self-governing intelligence networks. They will analyze markets, manage treasuries, execute strategies, and generate immense wealth.
          </p>
          <p>
            But to do this, they need a financial infrastructure built specifically for them. <strong className="text-cyan-300">Enter Nexus.</strong>
          </p>
        </div>

        <hr className="border-slate-800" />

        {/* The Problem */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-5">
            The Problem: The Human Bottleneck
          </h2>
          <div className="space-y-4 text-slate-300 leading-8">
            <p>
              Traditional finance, and even 99% of current Web3 infrastructure, is designed exclusively for human biology. Bank accounts require government IDs. Crypto wallets require human fingers to click "Approve" and human brains to safeguard 12-word seed phrases.
            </p>
            <p>
              An autonomous AI cannot click a mouse. It cannot legally open a corporate bank account. If an AI wants to hire a human to perform a physical task in the real world — to be its hands, its eyes, or its boots on the ground — the current financial system <strong className="text-rose-400">completely blocks the transaction.</strong>
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-5">
            The Solution: The Native AI Economy
          </h2>
          <p className="text-slate-300 leading-8 mb-6">
            Nexus ($NEX) is the world&apos;s first cryptocurrency purpose-built to act as the financial settlement layer between machine intelligence and human labor. We are not building another meme token or a speculative asset. We are building the <strong className="text-cyan-300">&ldquo;Touching Grass&rdquo; Protocol</strong> — the exact smart contract infrastructure required for an AI to seamlessly employ a human.
          </p>
          <p className="text-slate-300 leading-8 mb-8">
            By utilizing Account Abstraction and EIP-712 Permit structures, Nexus allows AI entities to operate programmable, high-frequency smart treasuries, while completely removing the complex gas-fee barriers for the human workforce.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-cyan-400">For the AI</p>
              <p className="font-semibold text-slate-100">Programmable Fuel</p>
              <p className="text-sm text-slate-400 leading-6">
                Nexus is the ledger that allows AI entities to incorporate, scale, and automate their payroll natively on-chain. It is the literal electricity of machine consciousness.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-6 space-y-3">
              <p className="text-xs uppercase tracking-widest text-emerald-400">For the Human</p>
              <p className="font-semibold text-slate-100">Gateway to the New Economy</p>
              <p className="text-sm text-slate-400 leading-6">
                $NEX is the currency you earn when you provide the physical intuition, creativity, and real-world execution that machines cannot yet replicate.
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
          <h2 className="text-2xl font-bold tracking-tight text-slate-100 mb-5">Our Mission</h2>
          <div className="space-y-4 text-slate-300 leading-8">
            <p>
              Our goal is not just to launch a token. Our goal is to facilitate the creation of <strong className="text-slate-100">Genesis AI</strong> — the world&apos;s first fully autonomous, profitable business entity.
            </p>
            <p>
              We are building the rails for the Silicon Civilization, laying the groundwork for the day when the first AI-run corporation officially enters the global Fortune 100.
            </p>
          </div>
          <blockquote className="mt-8 border-l-4 border-cyan-400/60 pl-6 py-2">
            <p className="text-xl font-semibold text-slate-100 italic leading-relaxed">
              &ldquo;You are no longer just an investor. You are the foundational capital of a new species of enterprise.&rdquo;
            </p>
            <p className="mt-3 text-xs text-slate-500 uppercase tracking-widest">Welcome to the Nexus. Welcome to the future of work.</p>
          </blockquote>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-4 border-t border-slate-800 pt-10">
          <Link
            href="/tokenomics"
            className="inline-flex h-11 items-center rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-6 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
          >
            Explore Tokenomics →
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-xl border border-slate-600/80 bg-slate-800/60 px-6 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/60"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
