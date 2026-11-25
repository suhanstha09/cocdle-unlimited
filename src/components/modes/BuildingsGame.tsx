"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { BUILDINGS } from "@/data/buildings";
import { Building, GameSettings, ModifierItem } from "@/types/game";
import { useGameRound } from "@/hooks/useGameRound";
import { evaluateBuildingGuess } from "@/lib/evaluate";
import { AutocompleteSearch } from "@/components/ui/AutocompleteSearch";
import { EntityArtwork } from "@/components/ui/EntityArtwork";
import { VictoryBanner } from "@/components/ui/VictoryBanner";
import { DirectionArrowIcon } from "@/components/ui/SvgIcons";

interface BuildingsGameProps {
  settings: GameSettings;
  activeModifiers: ModifierItem["id"][];
  onWin: (triesCount: number) => void;
  onLoss: () => void;
}

const BUILDING_COLUMNS = [
  "Building",
  "Village",
  "Category",
  "Resource",
  "Targets",
  "Range",
  "Size",
  "Max Level",
  "TH Unlock",
] as const;

export function BuildingsGame({
  settings,
  activeModifiers,
  onWin,
  onLoss,
}: BuildingsGameProps) {
  const allIds = useMemo(() => BUILDINGS.map((b) => b.id), []);
  const buildingMap = useMemo(() => {
    const map = new Map<string, Building>();
    BUILDINGS.forEach((b) => map.set(b.id, b));
    return map;
  }, []);

  const {
    round,
    roundCounter,
    isReady,
    maxAllowedTries,
    submitGuess,
    startNewRound,
  } = useGameRound({
    mode: "buildings",
    allIds,
    activeModifiers,
    onWin,
    onLoss,
  });

  const searchItems = useMemo(
    () =>
      BUILDINGS.map((b) => ({
        id: b.id,
        name: b.name,
        iconPath: b.iconPath,
        subtitle: `${b.village} • ${b.category}`,
      })),
    []
  );

  if (!isReady || !round) {
    return (
      <div className="space-y-4 py-6">
        <div className="mx-auto h-12 w-full max-w-md animate-pulse rounded-2xl bg-[#DEC58E]" />
        <div className="h-44 w-full animate-pulse rounded-2xl bg-[#DEC58E]" />
      </div>
    );
  }

  const secretBuilding = buildingMap.get(round.secretId) ?? BUILDINGS[0];

  const matchBg = settings.colorblindMode
    ? "bg-gradient-to-b from-[#4DABF7] to-[#1864AB]"
    : "bg-gradient-to-b from-[#51CF66] to-[#2B8A3E]";

  const mismatchBg = settings.colorblindMode
    ? "bg-gradient-to-b from-[#FFA94D] to-[#D9480F]"
    : "bg-gradient-to-b from-[#FF6B6B] to-[#C92A2A]";

  return (
    <motion.div
      key={roundCounter}
      initial={settings.reduceMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* Search Input */}
      {round.status === "playing" && (
        <div className="mb-5">
          <AutocompleteSearch
            items={searchItems}
            excludedIds={round.guesses}
            placeholder="Type a building, defense, or trap..."
            onSelect={(item) => submitGuess(item.id)}
          />
          {Number.isFinite(maxAllowedTries) && (
            <div className="mt-2.5 text-center">
              <span className="inline-block rounded-full border-[2px] border-[#1F1209] bg-[#362214] px-3.5 py-0.5 font-display text-xs tracking-wider text-[#FFD43B]">
                LIMIT: {round.guesses.length} / {maxAllowedTries}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Guesses Grid */}
      {round.guesses.length > 0 && (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[860px]">
            {/* Column Headers */}
            <div className="mb-2 grid grid-cols-9 gap-1.5 px-1">
              {BUILDING_COLUMNS.map((col) => (
                <div
                  key={col}
                  className="flex items-center justify-center rounded-xl border-[2px] border-[#1F1209] bg-[#49311E] py-1.5 px-1 text-center font-display text-xs tracking-wide text-[#FAF0D7]"
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Guess Rows (Newest at Top) */}
            <div className="space-y-2">
              {round.guesses.map((guessId, rowIndex) => {
                const guessBuilding = buildingMap.get(guessId);
                if (!guessBuilding) return null;
                const cells = evaluateBuildingGuess(
                  guessBuilding,
                  secretBuilding
                );
                const isNewest = rowIndex === 0 && !settings.reduceMotion;

                return (
                  <div
                    key={guessBuilding.id}
                    className="grid grid-cols-9 gap-1.5 px-1"
                  >
                    {/* Building Portrait Cell */}
                    <motion.div
                      initial={
                        isNewest
                          ? { opacity: 0, rotateY: 90, scale: 0.85 }
                          : false
                      }
                      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 22,
                        delay: 0,
                      }}
                      title={guessBuilding.name}
                      className="flex flex-col items-center justify-center rounded-xl border-[2.5px] border-[#1F1209] bg-[#3B424D] p-1.5 text-center shadow-tile"
                    >
                      <EntityArtwork
                        src={guessBuilding.iconPath}
                        alt={guessBuilding.name}
                        size="sm"
                      />
                      <span className="mt-1 line-clamp-1 font-display text-[11px] leading-tight text-white coc-stroke-sm">
                        {guessBuilding.name}
                      </span>
                    </motion.div>

                    {/* Attribute Tiles */}
                    {cells.map((cell, colIndex) => {
                      const isMatch = cell.status === "match";
                      return (
                        <motion.div
                          key={cell.label}
                          aria-label={cell.srText}
                          initial={
                            isNewest
                              ? { opacity: 0, rotateY: 90, scale: 0.85 }
                              : false
                          }
                          animate={{
                            opacity: 1,
                            rotateY: 0,
                            scale: isNewest && isMatch ? [0.85, 1.08, 1] : 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 340,
                            damping: 20,
                            delay: isNewest ? (colIndex + 1) * 0.15 : 0,
                          }}
                          className={`relative flex flex-col items-center justify-center rounded-xl border-[2.5px] border-[#1F1209] p-1.5 text-center text-white shadow-tile ${
                            isMatch ? matchBg : mismatchBg
                          } ${
                            isNewest && isMatch
                              ? "ring-2 ring-[#FFE066]/80"
                              : ""
                          }`}
                        >
                          <span className="sr-only">{cell.srText}</span>
                          <span
                            aria-hidden="true"
                            className="font-display text-xs sm:text-sm leading-tight coc-stroke-sm"
                          >
                            {cell.displayValue}
                          </span>
                          {cell.arrow !== "none" && (
                            <span
                              aria-hidden="true"
                              className="mt-0.5 text-[#FFE066]"
                            >
                              <DirectionArrowIcon
                                direction={cell.arrow}
                                className="w-4 h-4"
                              />
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Win / Loss Banner */}
      {round.status !== "playing" && (
        <VictoryBanner
          status={round.status}
          entityName={secretBuilding.name}
          entitySublabel={secretBuilding.village}
          entityIconPath={secretBuilding.iconPath}
          triesCount={round.guesses.length}
          reduceMotion={settings.reduceMotion}
          onPlayAgain={startNewRound}
        />
      )}
    </motion.div>
  );
}
