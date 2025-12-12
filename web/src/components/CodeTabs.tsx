"use client";

import { useState } from "react";
import type { CodeSample } from "@/lib/algorithms";

type CodeTabsProps = {
  samples: CodeSample[];
};

export function CodeTabs({ samples }: CodeTabsProps) {
  const [index, setIndex] = useState(0);
  const active = samples[index] ?? samples[0];

  const handleCopy = async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.snippet);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!active) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {samples.map((sample, i) => {
            const isActive = i === index;
            return (
              <button
                key={`${sample.language}-${i}`}
                onClick={() => setIndex(i)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-100"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {sample.language}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleCopy}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10"
        >
          Copy
        </button>
      </div>
      <pre className="overflow-x-auto rounded-xl bg-slate-950/60 p-4 text-sm text-slate-100">
        <code>{active.snippet}</code>
      </pre>
    </div>
  );
}
