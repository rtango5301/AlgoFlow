import { motion } from "framer-motion";
import type { Step } from "@/lib/algorithms";
import { TagPill } from "./TagPill";

type VisualizerProps = {
  step: Step;
  totalSteps: number;
  index: number;
};

export function Visualizer({ step, totalSteps, index }: VisualizerProps) {
  const { state } = step;
  const hasVisualization = Boolean(
    state.array || state.lowHighMid || state.stack || state.queue || state.list,
  );
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0.85, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Step {index + 1} / {totalSteps}
          </p>
          <h4 className="text-lg font-semibold text-white">{step.title}</h4>
          {step.description ? (
            <p className="text-sm text-slate-300">{step.description}</p>
          ) : null}
        </div>
        {state.note ? <TagPill label={state.note} /> : null}
      </div>

      <div className="space-y-4">
        {state.array ? renderArray(state.array, state.highlight, state.pointers) : null}
        {state.lowHighMid ? renderBounds(state.lowHighMid) : null}
        {state.stack ? renderStack(state.stack, state.highlight) : null}
        {state.queue ? renderQueue(state.queue, state.highlight) : null}
        {state.list ? renderList(state.list, state.highlight) : null}
        {!hasVisualization ? (
          <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-slate-300">
            Visualization placeholder
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function renderArray(
  values: number[],
  highlight?: number[],
  pointers?: Record<string, number>,
) {
  return (
    <motion.div
      className="rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-white/0 p-4"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-8">
        {values.map((value, idx) => {
          const isActive = highlight?.includes(idx);
          return (
            <motion.div
              layout
              key={idx}
              animate={{
                scale: isActive ? 1.08 : 1,
                boxShadow: isActive
                  ? "0 0 0 1px rgba(34,211,238,0.35), 0 15px 40px rgba(34,211,238,0.15)"
                  : "0 0 0 1px rgba(255,255,255,0.05)",
                backgroundColor: isActive ? "rgba(15,23,42,0.9)" : "rgba(15,23,42,0.6)",
              }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className={`relative flex h-16 items-center justify-center rounded-xl border bg-slate-950/60 text-lg font-semibold ${
                isActive ? "border-cyan-400/60 text-cyan-100" : "border-white/5 text-slate-100"
              }`}
            >
              {value}
              {pointers &&
                Object.entries(pointers)
                  .filter(([, position]) => position === idx)
                  .map(([name]) => (
                    <motion.span
                      key={name}
                      initial={{ y: -6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute -top-4 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100"
                    >
                      {name}
                    </motion.span>
                  ))}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function renderBounds(bounds: { low: number; high: number; mid?: number }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-slate-200">
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
        low = {bounds.low}
      </span>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
        high = {bounds.high}
      </span>
      {typeof bounds.mid === "number" ? (
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-100">
          mid = {bounds.mid}
        </span>
      ) : null}
    </div>
  );
}

function renderStack(values: string[], highlight?: number[]) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Stack (top at right)</p>
      <div className="flex items-end gap-2">
        {values.map((value, idx) => {
          const isActive = highlight?.includes(idx);
          return (
            <motion.div
              layout
              key={idx}
              animate={{ y: isActive ? -4 : 0, scale: isActive ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className={`flex h-14 w-14 items-center justify-center rounded-xl border text-base font-semibold ${
                isActive
                  ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-100"
              }`}
            >
              {value}
            </motion.div>
          );
        })}
        {values.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            empty
          </div>
        ) : null}
      </div>
    </div>
  );
}

function renderQueue(values: string[], highlight?: number[]) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Queue (head → tail)</p>
      <div className="flex flex-wrap items-center gap-2">
        {values.map((value, idx) => {
          const isActive = highlight?.includes(idx);
          return (
            <motion.div
              layout
              key={idx}
              animate={{ y: isActive ? -3 : 0, scale: isActive ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                isActive
                  ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-100"
              }`}
            >
              {value}
            </motion.div>
          );
        })}
        {values.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
            empty
          </div>
        ) : null}
      </div>
    </div>
  );
}

function renderList(values: string[], highlight?: number[]) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Linked list</p>
      <div className="flex flex-wrap items-center gap-2">
        {values.map((value, idx) => {
          const isActive = highlight?.includes(idx);
          return (
            <div key={idx} className="flex items-center gap-2">
              <motion.div
                layout
                animate={{ scale: isActive ? 1.04 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                  isActive
                    ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-100"
                }`}
              >
                {value}
              </motion.div>
              {idx < values.length - 1 ? (
                <span className="text-xs text-slate-400">→</span>
              ) : (
                <span className="text-xs text-slate-500">null</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
