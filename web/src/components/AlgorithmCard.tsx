import Link from "next/link";
import { Algorithm } from "@/lib/algorithms";
import { TagPill } from "./TagPill";

type AlgorithmCardProps = {
  algorithm: Algorithm;
};

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const tagLimit = 3;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/5 bg-gradient-to-tr from-white/8 via-white/0 to-white/12 opacity-70 mix-blend-screen" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">
            {algorithm.category}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">{algorithm.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-200">
            {algorithm.shortDescription}
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100">
          {algorithm.difficulty}
        </span>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {algorithm.tags.slice(0, tagLimit).map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="rounded-full bg-white/5 px-3 py-1">Best {algorithm.complexities.best}</span>
          <span className="rounded-full bg-white/5 px-3 py-1">Avg {algorithm.complexities.average}</span>
        </div>
        <Link
          href={`/algorithms/${algorithm.slug}`}
          className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
        >
          Open flow →
        </Link>
      </div>
    </article>
  );
}
