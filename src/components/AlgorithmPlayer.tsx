"use client";

import { useEffect, useState } from "react";
import type { Algorithm } from "@/lib/algorithms";
import { Visualizer } from "./Visualizer";
import { PlaybackControls } from "./PlaybackControls";
import { PseudocodeViewer } from "./PseudocodeViewer";
import { CodeTabs } from "./CodeTabs";

type AlgorithmPlayerProps = {
  algorithm: Algorithm;
};

export function AlgorithmPlayer({ algorithm }: AlgorithmPlayerProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1200);

  const step = algorithm.steps[index];
  const total = algorithm.steps.length;

  useEffect(() => {
    if (!isPlaying) return;
    if (index >= total - 1) return;
    const id = setTimeout(() => {
      setIndex((prev) => Math.min(prev + 1, total - 1));
    }, speed);
    return () => clearTimeout(id);
  }, [isPlaying, speed, index, total]);

  const handleNext = () => setIndex((prev) => Math.min(prev + 1, total - 1));
  const handlePrev = () => setIndex((prev) => Math.max(prev - 1, 0));
  const handleReset = () => {
    setIndex(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.getAttribute("contenteditable")) {
        return;
      }
      if (event.code === "Space") {
        event.preventDefault();
        setIndex((prev) => (prev >= total - 1 ? 0 : prev));
        setIsPlaying((prev) => !prev);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIsPlaying(false);
        setIndex((prev) => Math.min(prev + 1, total - 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIsPlaying(false);
        setIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Visualizer step={step} totalSteps={total} index={index} />
        <PlaybackControls
          current={index}
          total={total}
          isPlaying={isPlaying}
          speed={speed}
          onPlayPause={() => {
            setIndex((prev) => (prev >= total - 1 ? 0 : prev));
            setIsPlaying((prev) => !prev);
          }}
          onPrev={handlePrev}
          onNext={handleNext}
          onReset={handleReset}
          onSpeedChange={setSpeed}
        />
      </div>
      <div className="space-y-4">
        <PseudocodeViewer lines={algorithm.pseudocode} activeLine={step.pseudocodeLine} />
        <CodeTabs samples={algorithm.code} />
      </div>
    </div>
  );
}
