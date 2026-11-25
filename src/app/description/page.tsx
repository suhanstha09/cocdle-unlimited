"use client";

import React from "react";
import { UI_STRINGS } from "@/data/i18n";
import { GameShell } from "@/components/layout/GameShell";
import { DescriptionGame } from "@/components/modes/DescriptionGame";

export default function DescriptionPage() {
  return (
    <GameShell
      mode="description"
      ribbonTitle={UI_STRINGS.en.modes.description.ribbon}
    >
      {({ settings, activeModifiers, recordWin, recordLoss }) => (
        <DescriptionGame
          settings={settings}
          activeModifiers={activeModifiers}
          onWin={(tries) => recordWin("description", tries)}
          onLoss={() => recordLoss("description")}
        />
      )}
    </GameShell>
  );
}
