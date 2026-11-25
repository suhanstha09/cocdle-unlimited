"use client";

import React from "react";
import { UI_STRINGS } from "@/data/i18n";
import { GameShell } from "@/components/layout/GameShell";
import { TroopsGame } from "@/components/modes/TroopsGame";

export default function TroopsPage() {
  return (
    <GameShell mode="troops" ribbonTitle={UI_STRINGS.en.modes.troops.ribbon}>
      {({ settings, activeModifiers, recordWin, recordLoss }) => (
        <TroopsGame
          settings={settings}
          activeModifiers={activeModifiers}
          onWin={(tries) => recordWin("troops", tries)}
          onLoss={() => recordLoss("troops")}
        />
      )}
    </GameShell>
  );
}
