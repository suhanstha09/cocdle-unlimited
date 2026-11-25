"use client";

import React, { useState } from "react";
import { GameMode } from "@/types/game";
import { useSettings } from "@/hooks/useSettings";
import { useStats } from "@/hooks/useStats";
import { BackgroundCanvas } from "./BackgroundCanvas";
import { CocLogo } from "@/components/ui/CocLogo";
import { StonePanel } from "@/components/ui/StonePanel";
import {
  BookIcon,
  CalendarAlertIcon,
  GearIcon,
  LightningIcon,
  TrophyIcon,
} from "@/components/ui/SvgIcons";
import { StatsModal } from "@/components/modals/StatsModal";
import { ModifiersModal } from "@/components/modals/ModifiersModal";
import { ChangelogModal } from "@/components/modals/ChangelogModal";
import { HowToPlayModal } from "@/components/modals/HowToPlayModal";
import { SettingsModal } from "@/components/modals/SettingsModal";

type ActiveModal =
  | null
  | "stats"
  | "modifiers"
  | "changelog"
  | "howtoplay"
  | "settings"
  | "victory"
  | "defeat";

interface GameShellProps {
  mode: GameMode;
  ribbonTitle: string;
  subHeader?: React.ReactNode;
  children: (ctx: {
    settings: ReturnType<typeof useSettings>["settings"];
    activeModifiers: ReturnType<typeof useSettings>["activeModifiers"];
    recordWin: ReturnType<typeof useStats>["recordWin"];
    recordLoss: ReturnType<typeof useStats>["recordLoss"];
  }) => React.ReactNode;
}

export function GameShell({
  mode,
  ribbonTitle,
  subHeader,
  children,
}: GameShellProps) {
  const [openModal, setOpenModal] = useState<ActiveModal>(null);
  const {
    settings,
    setSettings,
    activeModifiers,
    toggleModifier,
    unseenModifierCount,
    markAllModifiersSeen,
  } = useSettings();

  const { stats, recordWin, recordLoss, resetAllStats } = useStats();

  return (
    <div className="min-h-screen w-full px-3 py-5 sm:px-6 sm:py-7">
      <BackgroundCanvas
        reduceMotion={settings.reduceMotion}
        particlesEnabled={settings.particlesEnabled}
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Top Logo (acts as back-to-menu link) */}
        <header className="mb-3">
          <CocLogo compact asLink />
        </header>

        {/* Rounded Wooden Toolbar with 5 Square Icon Buttons */}
        <nav
          aria-label="Game tools"
          className="mb-7 inline-flex items-center gap-2 sm:gap-2.5 rounded-2xl border-[3px] border-[#1F1209] bg-gradient-to-b from-[#965C2B] via-[#7C4A21] to-[#522E12] p-2 shadow-plank wood-grain"
        >
          <ToolbarButton
            label="Statistics"
            onClick={() => setOpenModal("stats")}
          >
            <TrophyIcon className="w-6 h-6" />
          </ToolbarButton>

          <ToolbarButton
            label="Quick Modifiers"
            badgeCount={unseenModifierCount}
            activeDot={activeModifiers.length > 0}
            onClick={() => setOpenModal("modifiers")}
          >
            <LightningIcon className="w-6 h-6" />
          </ToolbarButton>

          <ToolbarButton
            label="Changelog and News"
            onClick={() => setOpenModal("changelog")}
          >
            <CalendarAlertIcon className="w-6 h-6" />
          </ToolbarButton>

          <ToolbarButton
            label="How to Play"
            onClick={() => setOpenModal("howtoplay")}
          >
            <BookIcon className="w-6 h-6" />
          </ToolbarButton>

          <ToolbarButton
            label="Settings"
            onClick={() => setOpenModal("settings")}
          >
            <GearIcon className="w-6 h-6" />
          </ToolbarButton>
        </nav>

        {/* Main Game Stone & Parchment Panel */}
        <main className="w-full">
          <StonePanel title={ribbonTitle} subHeader={subHeader}>
            {children({
              settings,
              activeModifiers,
              recordWin,
              recordLoss,
            })}
          </StonePanel>
        </main>
      </div>

      {/* Modals */}
      <StatsModal
        isOpen={openModal === "stats"}
        onClose={() => setOpenModal(null)}
        stats={stats}
        activeMode={mode}
      />

      <ModifiersModal
        isOpen={openModal === "modifiers"}
        onClose={() => setOpenModal(null)}
        activeModifiers={activeModifiers}
        onToggleModifier={toggleModifier}
        onMarkSeen={markAllModifiersSeen}
      />

      <ChangelogModal
        isOpen={openModal === "changelog"}
        onClose={() => setOpenModal(null)}
      />

      <HowToPlayModal
        isOpen={openModal === "howtoplay"}
        onClose={() => setOpenModal(null)}
        mode={mode}
        colorblindMode={settings.colorblindMode}
      />

      <SettingsModal
        isOpen={openModal === "settings"}
        onClose={() => setOpenModal(null)}
        settings={settings}
        onUpdateSettings={setSettings}
        onResetStats={resetAllStats}
      />
    </div>
  );
}

function ToolbarButton({
  label,
  badgeCount = 0,
  activeDot = false,
  onClick,
  children,
}: {
  label: string;
  badgeCount?: number;
  activeDot?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border-[2.5px] border-[#1F1209] bg-gradient-to-b from-[#B3753E] via-[#8C5426] to-[#633816] shadow-[0_3px_0_#1F1209] transition-all hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#1F1209] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coc-gold"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1 top-0.5 h-[32%] rounded-t-lg bg-white/25"
      />
      {children}

      {badgeCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border-[2px] border-[#1F1209] bg-[#FA5252] px-1 font-display text-[11px] leading-none text-white">
          {badgeCount}
        </span>
      )}

      {badgeCount === 0 && activeDot && (
        <span
          aria-hidden="true"
          className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-[2px] border-[#1F1209] bg-[#40C057]"
        />
      )}
    </button>
  );
}
