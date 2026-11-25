"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TROOPS } from "@/data/troops";
import { GameSettings, ModifierItem, Troop } from "@/types/game";
import { useGameRound } from "@/hooks/useGameRound";
import { buildLetterMask, maskTroopName } from "@/lib/evaluate";
import { AutocompleteSearch } from "@/components/ui/AutocompleteSearch";
import { EntityArtwork } from "@/components/ui/EntityArtwork";
import { VictoryBanner } from "@/components/ui/VictoryBanner";
import { CheckIcon, CrossIcon } from "@/components/ui/SvgIcons";

interface DescriptionGameProps {
  settings: GameSettings;
  activeModifiers: ModifierItem["id"][];
  onWin: (triesCount: number) => void;
  onLoss: () => void;
}

export function DescriptionGame({
  settings,
  activeModifiers,
  onWin,
  onLoss,
}: DescriptionGameProps) {
  const allIds = useMemo(() => TROOPS.map((t) => t.id), []);
  const troopMap = useMemo(() => {
    const map = new Map<string, Troop>();
    TROOPS.forEach((t) => map.set(t.id, t));
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
    mode: "description",
    allIds,
    activeModifiers,
    onWin,
    onLoss,
  });

  const searchItems = useMemo(
    () =>
      TROOPS.map((t) => ({
        id: t.id,
        name: t.name,
        iconPath: t.iconPath,
        subtitle: `${t.village} • ${t.category}`,
      })),
    []
  );

  if (!isReady || !round) {
    return (
      <div className="space-y-4 py-6">
        <div className="h-32 w-full animate-pulse rounded-2xl bg-[#DEC58E]" />
        <div className="mx-auto h-12 w-full max-w-md animate-pulse rounded-2xl bg-[#DEC58E]" />
      </div>
    );
  }

  const secretTroop = troopMap.get(round.secretId) ?? TROOPS[0];
  const maskedDescription = maskTroopName(
    secretTroop.description,
    secretTroop.name
  );

  const wrongGuesses = round.guesses
    .filter((id) => id !== secretTroop.id)
    .map((id) => troopMap.get(id))
    .filter((t): t is Troop => Boolean(t));

  const hintsDisabled = activeModifiers.includes("no_hints");
  const showLetterHint = !hintsDisabled && wrongGuesses.length >= 3;
  const letterHint = buildLetterMask(secretTroop.name);

  return (
    <motion.div
      key={roundCounter}
      initial={settings.reduceMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col items-center"
    >
      {/* Parchment Flavor Quote Panel */}
      <div className="w-full max-w-2xl rounded-3xl border-[3px] border-[#1F1209] bg-gradient-to-b from-[#FFFDF7] to-[#EAD3A1] p-5 sm:p-7 text-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.14),0_4px_0_#1F1209]">
        <blockquote className="font-body text-lg sm:text-xl italic font-extrabold leading-relaxed text-[#2B1B0E]">
          &ldquo;{maskedDescription}&rdquo;
        </blockquote>

        {/* Letter Count Hint after 3 Wrong Guesses */}
        {showLetterHint && (
          <div className="mt-4 inline-block rounded-xl border-[2px] border-[#1F1209] bg-[#FFF3BF] px-4 py-2">
            <div className="font-display text-xs uppercase tracking-wider text-[#7C4A21]">
              Letter Hint ({letterHint.letterCount} characters)
            </div>
            <div className="mt-1 font-mono text-base font-black tracking-widest text-[#1F1209]">
              {letterHint.pattern}
            </div>
          </div>
        )}
      </div>

      {/* Try Limit Pill if Active */}
      {Number.isFinite(maxAllowedTries) && (
        <div className="mt-4">
          <span className="inline-block rounded-full border-[2px] border-[#1F1209] bg-[#362214] px-3.5 py-1 font-display text-xs tracking-wider text-[#FFD43B]">
            TRIES: {round.guesses.length} / {maxAllowedTries}
          </span>
        </div>
      )}

      {/* Search Input */}
      {round.status === "playing" && (
        <div className="mt-5 w-full">
          <AutocompleteSearch
            items={searchItems}
            excludedIds={round.guesses}
            placeholder="Which troop does this describe?"
            onSelect={(item) => submitGuess(item.id)}
          />
        </div>
      )}

      {/* Correct Card on Win */}
      {round.status === "won" && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mt-5 flex items-center gap-3 rounded-2xl border-[3px] border-[#1F1209] px-4 py-2.5 text-white shadow-tile ${
            settings.colorblindMode ? "bg-[#228BE6]" : "bg-[#40C057]"
          }`}
        >
          <EntityArtwork
            src={secretTroop.iconPath}
            alt={secretTroop.name}
            size="sm"
          />
          <span className="font-display text-lg coc-stroke-sm">
            {secretTroop.name}
          </span>
          <CheckIcon className="w-5 h-5" />
        </motion.div>
      )}

      {/* Wrong Guesses Red Chips */}
      {wrongGuesses.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {wrongGuesses.map((troop) => (
            <div
              key={troop.id}
              className={`flex items-center gap-2 rounded-xl border-[2.5px] border-[#1F1209] px-3 py-1.5 text-white shadow-tile ${
                settings.colorblindMode ? "bg-[#D9480F]" : "bg-[#FA5252]"
              }`}
            >
              <EntityArtwork
                src={troop.iconPath}
                alt={troop.name}
                size="sm"
                className="w-7 h-7"
              />
              <span className="font-display text-sm coc-stroke-sm">
                {troop.name}
              </span>
              <CrossIcon className="w-4 h-4" />
            </div>
          ))}
        </div>
      )}

      {/* Win / Loss Banner */}
      {round.status !== "playing" && (
        <div className="w-full">
          <VictoryBanner
            status={round.status}
            entityName={secretTroop.name}
            entitySublabel={secretTroop.village}
            entityIconPath={secretTroop.iconPath}
            triesCount={round.guesses.length}
            reduceMotion={settings.reduceMotion}
            onPlayAgain={startNewRound}
          />
        </div>
      )}
    </motion.div>
  );
}
