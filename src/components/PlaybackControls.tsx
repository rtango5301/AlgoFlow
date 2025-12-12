"use client";

type PlaybackControlsProps = {
  current: number;
  total: number;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  onSpeedChange: (value: number) => void;
};

const speedOptions = [
  { label: "0.5x", value: 1600 },
  { label: "1x", value: 1200 },
  { label: "2x", value: 700 },
];

export function PlaybackControls({
  current,
  total,
  isPlaying,
  speed,
  onPlayPause,
  onPrev,
  onNext,
  onReset,
  onSpeedChange,
}: PlaybackControlsProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
        <span className="rounded-full bg-white/5 px-2 py-1 text-white">
          Step {current + 1} / {total}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className={buttonStyles} onClick={onPrev}>
          ◀︎ Prev
        </button>
        <button className={buttonStyles} onClick={onPlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className={buttonStyles} onClick={onNext}>
          Next ▶︎
        </button>
        <button className={buttonStyles} onClick={onReset}>
          Reset
        </button>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200">
          {speedOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSpeedChange(option.value)}
              className={`rounded-full px-2 py-1 transition ${
                speed === option.value
                  ? "bg-cyan-500/20 text-cyan-100"
                  : "hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const buttonStyles =
  "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10";
