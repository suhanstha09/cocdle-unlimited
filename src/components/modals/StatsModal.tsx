"use client";

import React from "react";
import { GameMode, StatsMap } from "@/types/game";
import { Modal } from "@/components/ui/Modal";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: StatsMap;
  activeMode: GameMode;
}

const MODE_LABELS: { mode: GameMode; label: string }[] = [
  { mode: "troops", label: "Troops" },
  { mode: "pixel", label: "Pixel" },
  { mode: "description", label: "Description" },
  { mode: "buildings", label: "Buildings" },
];

export function StatsModal({
  isOpen,
  onClose,
  stats,
  activeMode,
}: StatsModalProps) {
  const totalWins = Object.values(stats).reduce((sum, s) => sum + s.wins, 0);
  const totalPlays = Object.values(stats).reduce((sum, s) => sum + s.plays, 0);
  const overallWinRate =
    totalPlays > 0 ? Math.round((totalWins / totalPlays) * 100) : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chief Statistics">
      {/* Overall Summary */}
      <div className="mb-4 grid grid-cols-3 gap-2.5 rounded-2xl border-[2.5px] border-[#1F1209] bg-[#EAD3A1] p-3 text-center">
        <div>
          <div className="font-display text-2xl text-[#2B1B0E]">
            {totalPlays}
          </div>
          <div className="font-body text-xs font-extrabold uppercase text-[#6E4420]">
            Played
          </div>
        </div>
        <div>
          <div className="font-display text-2xl text-[#2B8A3E]">
            {totalWins}
          </div>
          <div className="font-body text-xs font-extrabold uppercase text-[#6E4420]">
            Total Wins
          </div>
        </div>
        <div>
          <div className="font-display text-2xl text-[#D9480F]">
            {overallWinRate}%
          </div>
          <div className="font-body text-xs font-extrabold uppercase text-[#6E4420]">
            Win Rate
          </div>
        </div>
      </div>

      {/* Per-Mode Breakdown */}
      <div className="space-y-3">
        {MODE_LABELS.map(({ mode, label }) => {
          const item = stats[mode];
          const winRate =
            item.plays > 0 ? Math.round((item.wins / item.plays) * 100) : 0;
          const avgTries =
            item.wins > 0
              ? (item.totalTriesOnWins / item.wins).toFixed(1)
              : "-";
          const isCurrent = mode === activeMode;

          return (
            <div
              key={mode}
              className={`rounded-2xl border-[2.5px] border-[#1F1209] p-3 ${
                isCurrent ? "bg-[#FFF3BF]" : "bg-[#FAF0D7]"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-lg text-[#2B1B0E]">
                  {label}
                </span>
                {isCurrent && (
                  <span className="rounded-lg border border-[#1F1209] bg-[#FFD43B] px-2 py-0.5 font-body text-xs font-extrabold text-[#1F1209]">
                    CURRENT
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-1.5 text-center">
                <StatCell label="Played" value={item.plays} />
                <StatCell label="Win %" value={`${winRate}%`} />
                <StatCell label="Streak" value={item.streak} />
                <StatCell label="Best" value={item.bestStreak} />
                <StatCell label="Avg Tries" value={avgTries} />
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-[#C8AC76] bg-[#F2E1B9] px-1 py-1.5">
      <div className="font-display text-base text-[#1F1209]">{value}</div>
      <div className="font-body text-[10px] font-extrabold uppercase text-[#6E4420]">
        {label}
      </div>
    </div>
  );
}
