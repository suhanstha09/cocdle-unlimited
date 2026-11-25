"use client";

import React, { useState } from "react";
import { GameSettings } from "@/types/game";
import { Modal } from "@/components/ui/Modal";
import { TactileButton } from "@/components/ui/TactileButton";
import { CheckIcon } from "@/components/ui/SvgIcons";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (updater: (prev: GameSettings) => GameSettings) => void;
  onResetStats: () => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetStats,
}: SettingsModalProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleClose = () => {
    setConfirmReset(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Settings">
      <div className="space-y-3">
        <ToggleRow
          label="Reduce Motion"
          description="Disables tile flip cascades, confetti bursts, and parallax drift."
          checked={settings.reduceMotion}
          onToggle={() =>
            onUpdateSettings((prev) => ({
              ...prev,
              reduceMotion: !prev.reduceMotion,
            }))
          }
        />

        <ToggleRow
          label="Colorblind-Friendly Colors"
          description="Switches green/red tiles to high-contrast blue and orange."
          checked={settings.colorblindMode}
          onToggle={() =>
            onUpdateSettings((prev) => ({
              ...prev,
              colorblindMode: !prev.colorblindMode,
            }))
          }
        />

        <ToggleRow
          label="Ambient Embers & Sparkles"
          description="Shows subtle floating particles behind the game panels."
          checked={settings.particlesEnabled}
          onToggle={() =>
            onUpdateSettings((prev) => ({
              ...prev,
              particlesEnabled: !prev.particlesEnabled,
            }))
          }
        />
      </div>

      {/* Reset Stats Section with Confirm Dialog */}
      <div className="mt-5 rounded-2xl border-[2.5px] border-[#1F1209] bg-[#EAD3A1] p-3.5">
        <div className="font-display text-base text-[#2B1B0E]">
          Reset Local Progress
        </div>
        <p className="mt-0.5 font-body text-xs font-semibold text-[#5C3A1B]">
          Clears all saved win counts, streaks, and average tries across all
          modes.
        </p>

        {!confirmReset ? (
          <div className="mt-3">
            <TactileButton
              variant="red"
              size="sm"
              onClick={() => setConfirmReset(true)}
            >
              Reset Stats
            </TactileButton>
          </div>
        ) : (
          <div className="mt-3 rounded-xl border-[2px] border-[#C92A2A] bg-[#FFF5F5] p-3">
            <p className="font-body text-xs font-extrabold text-[#C92A2A]">
              Are you sure? This permanently erases all local statistics.
            </p>
            <div className="mt-2.5 flex gap-2">
              <TactileButton
                variant="red"
                size="sm"
                onClick={() => {
                  onResetStats();
                  setConfirmReset(false);
                }}
              >
                Confirm Reset
              </TactileButton>
              <TactileButton
                variant="wood"
                size="sm"
                onClick={() => setConfirmReset(false)}
              >
                Cancel
              </TactileButton>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 rounded-2xl border-[2.5px] border-[#1F1209] bg-[#FAF0D7] p-3.5 text-left transition-colors hover:bg-[#F2E1B9]"
    >
      <div>
        <div className="font-display text-base text-[#1F1209]">{label}</div>
        <div className="font-body text-xs font-semibold text-[#5C3A1B]">
          {description}
        </div>
      </div>

      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border-[2.5px] border-[#1F1209] ${
          checked ? "bg-[#40C057] text-white" : "bg-[#DEE2E6]"
        }`}
      >
        {checked && <CheckIcon className="w-4 h-4" />}
      </div>
    </button>
  );
}
