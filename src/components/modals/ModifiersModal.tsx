"use client";

import React, { useEffect } from "react";
import { ModifierItem } from "@/types/game";
import { QUICK_MODIFIERS } from "@/data/modifiers";
import { Modal } from "@/components/ui/Modal";
import { CheckIcon } from "@/components/ui/SvgIcons";

interface ModifiersModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeModifiers: ModifierItem["id"][];
  onToggleModifier: (id: ModifierItem["id"]) => void;
  onMarkSeen: () => void;
}

export function ModifiersModal({
  isOpen,
  onClose,
  activeModifiers,
  onToggleModifier,
  onMarkSeen,
}: ModifiersModalProps) {
  useEffect(() => {
    if (isOpen) {
      onMarkSeen();
    }
  }, [isOpen, onMarkSeen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Modifiers">
      <p className="mb-3 font-body text-sm font-bold text-[#5C3A1B]">
        Toggle optional challenge rules for your unlimited rounds. Changes apply
        immediately.
      </p>

      <div className="space-y-3">
        {QUICK_MODIFIERS.map((mod) => {
          const active = activeModifiers.includes(mod.id);
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onToggleModifier(mod.id)}
              aria-pressed={active}
              className={`flex w-full items-start justify-between gap-3 rounded-2xl border-[2.5px] border-[#1F1209] p-3.5 text-left transition-all ${
                active
                  ? "bg-[#D3F9D8] shadow-[0_3px_0_#1F1209]"
                  : "bg-[#FAF0D7] hover:bg-[#F2E1B9]"
              }`}
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-base text-[#1F1209]">
                    {mod.title}
                  </span>
                  <span className="rounded-md border border-[#1F1209] bg-[#FFD43B] px-1.5 py-0.5 font-body text-[10px] font-black text-[#1F1209]">
                    {mod.badgeText}
                  </span>
                </div>
                <p className="mt-1 font-body text-xs font-semibold text-[#5C3A1B]">
                  {mod.description}
                </p>
              </div>

              <div
                className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border-[2px] border-[#1F1209] ${
                  active ? "bg-[#40C057] text-white" : "bg-[#E9ECEF]"
                }`}
              >
                {active && <CheckIcon className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
