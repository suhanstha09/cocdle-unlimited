"use client";

import React, { useEffect, useState } from "react";
import { UI_STRINGS } from "@/data/i18n";
import { GameShell } from "@/components/layout/GameShell";
import { BuildingsGame } from "@/components/modes/BuildingsGame";
import { SearchIcon } from "@/components/ui/SvgIcons";

export default function BuildingsPage() {
  const [triesCount, setTriesCount] = useState(0);

  // Sync try counter badge from active round storage
  useEffect(() => {
    const syncTries = () => {
      try {
        const raw = window.localStorage.getItem("cocdle_round_buildings_v1");
        if (raw) {
          const parsed = JSON.parse(raw);
          setTriesCount(Array.isArray(parsed?.guesses) ? parsed.guesses.length : 0);
        }
      } catch {
        // Ignore
      }
    };
    syncTries();
    const interval = window.setInterval(syncTries, 300);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <GameShell
      mode="buildings"
      ribbonTitle={UI_STRINGS.en.modes.buildings.ribbon}
      subHeader={
        <div className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-[#1F1209] bg-[#362214] px-4 py-1 text-white shadow-[0_3px_0_#1F1209]">
          <SearchIcon className="w-4 h-4" />
          <span className="font-display text-xs sm:text-sm tracking-wide text-[#FFE066]">
            Number of tries: {triesCount}
          </span>
        </div>
      }
    >
      {({ settings, activeModifiers, recordWin, recordLoss }) => (
        <BuildingsGame
          settings={settings}
          activeModifiers={activeModifiers}
          onWin={(tries) => recordWin("buildings", tries)}
          onLoss={() => recordLoss("buildings")}
        />
      )}
    </GameShell>
  );
}
