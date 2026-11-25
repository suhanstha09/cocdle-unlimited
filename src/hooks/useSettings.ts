"use client";

import { useEffect } from "react";
import { GameSettings, ModifierItem } from "@/types/game";
import { QUICK_MODIFIERS } from "@/data/modifiers";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_SETTINGS: GameSettings = {
  reduceMotion: false,
  colorblindMode: false,
  particlesEnabled: true,
  language: "en",
};

export function useSettings() {
  const [settings, setSettings, hydrated] = useLocalStorage<GameSettings>(
    "cocdle_settings_v1",
    DEFAULT_SETTINGS
  );

  const [activeModifiers, setActiveModifiers] = useLocalStorage<
    ModifierItem["id"][]
  >("cocdle_active_modifiers_v1", []);

  const [seenModifiers, setSeenModifiers] = useLocalStorage<
    ModifierItem["id"][]
  >("cocdle_seen_modifiers_v1", []);

  useEffect(() => {
    if (!hydrated) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches && !window.localStorage.getItem("cocdle_settings_v1")) {
      setSettings((prev) => ({ ...prev, reduceMotion: true }));
    }
  }, [hydrated, setSettings]);

  const toggleModifier = (id: ModifierItem["id"]) => {
    setActiveModifiers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      // Make limited_tries and sudden_death mutually exclusive
      let next = [...prev, id];
      if (id === "sudden_death") {
        next = next.filter((m) => m !== "limited_tries");
      } else if (id === "limited_tries") {
        next = next.filter((m) => m !== "sudden_death");
      }
      return next;
    });
  };

  const markAllModifiersSeen = () => {
    setSeenModifiers(QUICK_MODIFIERS.map((m) => m.id));
  };

  const unseenModifierCount = hydrated
    ? QUICK_MODIFIERS.filter((m) => !seenModifiers.includes(m.id)).length
    : 0;

  return {
    settings,
    setSettings,
    activeModifiers,
    toggleModifier,
    unseenModifierCount,
    markAllModifiersSeen,
    hydrated,
  };
}
