import { AlgorithmList } from "@/components/AlgorithmList";
import { algorithms } from "@/lib/algorithms";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 md:px-10 lg:py-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur sm:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            AlgoFlow · Visualgo-inspired playground
          </h1>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
            Dark/Glass UI
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
            Neon states
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-lg text-slate-200">
          Step through sorting, searching, and basic data structures with clear visual states,
          keyboard controls, and code/pseudocode sync.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Algorithm Library
            </p>
            <h2 className="text-2xl font-semibold text-white">Choose an algorithm</h2>
          </div>
        </div>
        <AlgorithmList algorithms={algorithms} />
      </section>
    </main>
  );
}
