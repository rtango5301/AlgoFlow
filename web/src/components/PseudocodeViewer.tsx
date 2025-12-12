type PseudocodeViewerProps = {
  lines: string[];
  activeLine?: number;
};

export function PseudocodeViewer({ lines, activeLine }: PseudocodeViewerProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
        <span>Pseudocode</span>
      </div>
      <ol className="space-y-1 font-mono text-sm text-slate-200">
        {lines.map((line, idx) => {
          const isActive = activeLine && activeLine - 1 === idx;
          return (
            <li
              key={idx}
              className={`flex items-start gap-3 rounded-lg px-2 py-1 transition ${
                isActive ? "bg-cyan-500/10 text-cyan-100" : ""
              }`}
            >
              <span className="w-6 text-right text-xs text-slate-500">
                {idx + 1}
              </span>
              <span className="flex-1">{line}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
