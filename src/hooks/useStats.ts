"use client";

import { GameMode, ModeStats, StatsMap } from "@/types/game";
import { useLocalStorage } from "./useLocalStorage";

const EMPTY_MODE_STATS: ModeStats = {
  plays: 0,
  wins: 0,
  streak: 0,
  bestStreak: 0,
  totalTriesOnWins: 0,
};

const DEFAULT_STATS: StatsMap = {
  troops: { ...EMPTY_MODE_STATS },
  pixel: { ...EMPTY_MODE_STATS },
  description: { ...EMPTY_MODE_STATS },
  buildings: { ...EMPTY_MODE_STATS },
};

export function useStats() {
  const [stats, setStats, hydrated] = useLocalStorage<StatsMap>(
    "cocdle_stats_v1",
    DEFAULT_STATS
  );

  const recordWin = (mode: GameMode, triesCount: number) => {
    setStats((prev) => {
      const current = prev[mode] ?? EMPTY_MODE_STATS;
      const nextStreak = current.streak + 1;
      return {
        ...prev,
        [mode]: {
          plays: current.plays + 1,
          wins: current.wins + 1,
          streak: nextStreak,
          bestStreak: Math.max(current.bestStreak, nextStreak),
          totalTriesOnWins: current.totalTriesOnWins + triesCount,
        },
      };
    });
  };

  const recordLoss = (mode: GameMode) => {
    setStats((prev) => {
      const current = prev[mode] ?? EMPTY_MODE_STATS;
      return {
        ...prev,
        [mode]: {
          ...current,
          plays: current.plays + 1,
          streak: 0,
        },
      };
    });
  };

  const resetAllStats = () => {
    setStats(DEFAULT_STATS);
  };

  return {
    stats,
    recordWin,
    recordLoss,
    resetAllStats,
    hydrated,
  };
}
