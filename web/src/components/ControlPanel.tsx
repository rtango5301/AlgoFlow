type ControlPanelProps = {
  onGo?: () => void;
  onReset?: () => void;
  onRandom?: () => void;
};

export function ControlPanel({ onGo, onReset, onRandom }: ControlPanelProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex-1">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
            placeholder="Array Elements (comma-separated)"
          />
        </div>
        <div className="w-full md:w-60">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500"
            placeholder="Target Element"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onGo}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(56,189,248,0.4)]"
          >
            Go
          </button>
          <button
            onClick={onReset}
            className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 border border-white/10"
          >
            Reset
          </button>
          <button
            onClick={onRandom}
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(168,85,247,0.4)]"
          >
            Random
          </button>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200">
        Element found! (Status banner placeholder)
      </div>
    </div>
  );
}
