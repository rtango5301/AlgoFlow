import Link from "next/link";
import { notFound } from "next/navigation";
import { AlgorithmPlayer } from "@/components/AlgorithmPlayer";
import { TagPill } from "@/components/TagPill";
import { algorithms, getAlgorithm } from "@/lib/algorithms";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return algorithms.map((algo) => ({ slug: algo.slug }));
}

export default async function AlgorithmPage({ params }: PageProps) {
  const { slug } = await params;
  const algorithm = getAlgorithm(slug);

  if (!algorithm) return notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-10 md:px-8 lg:py-12">
      <Link
        href="/"
        className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10"
      >
        ← Back to library
      </Link>

      <header className="relative overflow-hidden flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur sm:p-8">
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10 opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-40" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
              {algorithm.category}
            </p>
            <h1 className="text-3xl font-bold text-white">{algorithm.name}</h1>
            <p className="mt-2 max-w-2xl text-slate-200">{algorithm.shortDescription}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            {algorithm.difficulty}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {algorithm.tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-200 sm:grid-cols-4">
          <Metric label="Best" value={algorithm.complexities.best} />
          <Metric label="Average" value={algorithm.complexities.average} />
          <Metric label="Worst" value={algorithm.complexities.worst} />
          <Metric label="Space" value={algorithm.complexities.space} />
        </div>
      </header>

      <AlgorithmPlayer algorithm={algorithm} />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="text-base font-semibold text-white">{value}</p>
    </div>
  );
}
