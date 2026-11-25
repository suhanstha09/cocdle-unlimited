"use client";

import React from "react";
import { GameMode } from "@/types/game";
import { HOW_TO_PLAY } from "@/data/howToPlay";
import { Modal } from "@/components/ui/Modal";
import { DirectionArrowIcon } from "@/components/ui/SvgIcons";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: GameMode;
  colorblindMode: boolean;
}

export function HowToPlayModal({
  isOpen,
  onClose,
  mode,
  colorblindMode,
}: HowToPlayModalProps) {
  const guide = HOW_TO_PLAY[mode];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`How to Play: ${guide.title}`}>
      <p className="font-body text-sm font-bold text-[#3B2310]">
        {guide.summary}
      </p>

      <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-sm font-semibold text-[#4A2E16]">
        {guide.bullets.map((bullet, idx) => (
          <li key={idx}>{bullet}</li>
        ))}
      </ul>

      {/* Tile Color Legend */}
      <div className="mt-4 rounded-2xl border-[2.5px] border-[#1F1209] bg-[#EAD3A1] p-3">
        <div className="mb-2 font-display text-sm uppercase tracking-wide text-[#2B1B0E]">
          Tile Legend
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-display text-xs text-white">
          <div
            className={`rounded-xl border-[2px] border-[#1F1209] py-2 coc-stroke-sm ${
              colorblindMode ? "bg-[#228BE6]" : "bg-[#40C057]"
            }`}
          >
            EXACT MATCH
          </div>
          <div
            className={`rounded-xl border-[2px] border-[#1F1209] py-2 coc-stroke-sm ${
              colorblindMode ? "bg-[#FD7E14]" : "bg-[#FA5252]"
            }`}
          >
            NO MATCH
          </div>
          <div
            className={`flex items-center justify-center gap-1 rounded-xl border-[2px] border-[#1F1209] py-2 coc-stroke-sm ${
              colorblindMode ? "bg-[#FD7E14]" : "bg-[#FA5252]"
            }`}
          >
            <DirectionArrowIcon direction="up" className="w-3.5 h-3.5" />
            <span>HIGHER / LOWER</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
