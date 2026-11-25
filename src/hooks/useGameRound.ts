"use client";

import { useCallback, useEffect, useState } from "react";
import { GameMode, ModifierItem, RoundState } from "@/types/game";
import { useLocalStorage } from "./useLocalStorage";

function pickRandomId(allIds: string[], recentIds: string[]): string {
  const recentSet = new Set(recentIds.slice(-5));
  const pool = allIds.filter((id) => !recentSet.has(id));
  const source = pool.length > 0 ? pool : allIds;
  return source[Math.floor(Math.random() * source.length)];
}

function buildPixelOptions(allIds: string[], secretId: string): string[] {
  const distractors = allIds.filter((id) => id !== secretId);
  const shuffled = [...distractors].sort(() => Math.random() - 0.5).slice(0, 4);
  return [...shuffled, secretId].sort(() => Math.random() - 0.5);
}

interface UseGameRoundProps {
  mode: GameMode;
  allIds: string[];
  activeModifiers: ModifierItem["id"][];
  onWin: (triesCount: number) => void;
  onLoss: () => void;
  onSetOpenModal?: (modal: "victory" | "defeat") => void;
}

export function useGameRound({
  mode,
  allIds,
  activeModifiers,
  onWin,
  onLoss,
  onSetOpenModal,
}: UseGameRoundProps) {
  const [recentSecrets, setRecentSecrets, recentHydrated] = useLocalStorage<
    Record<GameMode, string[]>
  >("cocdle_recent_secrets_v1", {
    troops: [],
    pixel: [],
    description: [],
    buildings: [],
  });

  const [round, setRound, roundHydrated] = useLocalStorage<RoundState | null>(
    `cocdle_round_${mode}_v1`,
    null
  );

  const [roundCounter, setRoundCounter] = useState(0);

  const startNewRound = useCallback(() => {
    const nextSecret = pickRandomId(allIds, recentSecrets[mode] ?? []);
    const nextRecent = [...(recentSecrets[mode] ?? []), nextSecret].slice(-5);

    setRecentSecrets((prev) => ({
      ...prev,
      [mode]: nextRecent,
    }));

    const nextRound: RoundState = {
      mode,
      secretId: nextSecret,
      guesses: [],
      status: "playing",
      unlockedHints: [],
      pixelOptions:
        mode === "pixel" ? buildPixelOptions(allIds, nextSecret) : undefined,
      startedAt: Date.now(),
    };

    setRound(nextRound);
    setRoundCounter((c) => c + 1);
  }, [allIds, mode, recentSecrets, setRecentSecrets, setRound]);

  useEffect(() => {
    if (!roundHydrated || !recentHydrated) return;
    if (!round || !allIds.includes(round.secretId)) {
      startNewRound();
    }
  }, [roundHydrated, recentHydrated, round, allIds, startNewRound]);

  const maxAllowedTries = activeModifiers.includes("sudden_death")
    ? 3
    : activeModifiers.includes("limited_tries")
    ? 6
    : mode === "pixel"
    ? 4
    : Infinity;

  const submitGuess = useCallback(
    (guessId: string) => {
      if (!round || round.status !== "playing") return;
      if (round.guesses.includes(guessId)) return;

      const updatedGuesses = [guessId, ...round.guesses];
      const isCorrect = guessId === round.secretId;

      if (isCorrect) {
        setRound({
          ...round,
          guesses: updatedGuesses,
          status: "won",
        });
        onWin(updatedGuesses.length);
        onSetOpenModal?.("victory");
        return;
      }

      if (updatedGuesses.length >= maxAllowedTries) {
        setRound({
          ...round,
          guesses: updatedGuesses,
          status: "lost",
        });
        onLoss();
        onSetOpenModal?.("defeat");
        return;
      }

      setRound({
        ...round,
        guesses: updatedGuesses,
      });
    },
    [round, setRound, maxAllowedTries, onWin, onLoss]
  );

  const unlockHint = useCallback(
    (hintKey: string) => {
      if (!round || round.unlockedHints.includes(hintKey)) return;
      setRound({
        ...round,
        unlockedHints: [...round.unlockedHints, hintKey],
      });
    },
    [round, setRound]
  );

  return {
    round,
    roundCounter,
    isReady: roundHydrated && recentHydrated && round !== null,
    maxAllowedTries,
    submitGuess,
    unlockHint,
    startNewRound,
  };
}
