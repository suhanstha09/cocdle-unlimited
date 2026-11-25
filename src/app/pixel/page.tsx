"use client";

import React from "react";
import { UI_STRINGS } from "@/data/i18n";
import { GameShell } from "@/components/layout/GameShell";
import { PixelGame } from "@/components/modes/PixelGame";

export default function PixelPage() {
  return (
    <GameShell mode="pixel" ribbonTitle={UI_STRINGS.en.modes.pixel.ribbon}>
      {({ settings, activeModifiers, recordWin, recordLoss }) => (
        <PixelGame
          settings={settings}
          activeModifiers={activeModifiers}
          onWin={(tries) => recordWin("pixel", tries)}
          onLoss={() => recordLoss("pixel")}
        />
      )}
    </GameShell>
  );
}
