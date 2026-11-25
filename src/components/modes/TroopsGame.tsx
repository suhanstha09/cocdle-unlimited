"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TROOPS } from "@/data/troops";
import { GameSettings, ModifierItem, Troop } from "@/types/game";
import { useGameRound } from "@/hooks/useGameRound";
import { evaluateTroopGuess, maskTroopName } from "@/lib/evaluate";
import { AutocompleteSearch } from "@/components/ui/AutocompleteSearch";
import { EntityArtwork } from "@/components/ui/EntityArtwork";
import { Modal } from "@/components/ui/Modal";
import { TactileButton } from "@/components/ui/TactileButton";
import { VictoryBanner } from "@/components/ui/VictoryBanner";
import {
  DirectionArrowIcon,
  HeartIcon,
  LockIcon,
  SearchIcon,
} from "@/components/ui/SvgIcons";

interface TroopsGameProps {
  settings: GameSettings;
  activeModifiers: ModifierItem["id"][];
  onWin: (triesCount: number) => void;
  onLoss: () => void;
}

const COLUMNS = [
  "Troop",
  "Village",
  "Damage Type",
  "Target",
  "Range",
  "Speed",
  "Housing",
  "Release Year",
] as const;

export function TroopsGame({
  settings,
  activeModifiers,
  onWin,
  onLoss,
}: TroopsGameProps) {
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
    unlockHint,
    startNewRound,
  } = useGameRound({
    mode: "troops",
    allIds,
    activeModifiers,
    onWin,
    onLoss,
  });

  const [openHintModal, setOpenHintModal] = useState<
    null | "stats" | "description"
  >(null);

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
        <div className="mx-auto h-12 w-full max-w-md animate-pulse rounded-2xl bg-[#DEC58E]" />
        <div className="h-44 w-full animate-pulse rounded-2xl bg-[#DEC58E]" />
      </div>
    );
  }

  const secretTroop = troopMap.get(round.secretId) ?? TROOPS[0];
  const wrongGuessesCount = round.guesses.filter(
    (id) => id !== secretTroop.id
  ).length;
  const hintsDisabled = activeModifiers.includes("no_hints");
  const hideYear = activeModifiers.includes("no_year");

  const statsUnlocked = !hintsDisabled && wrongGuessesCount >= 3;
  const descUnlocked = !hintsDisabled && wrongGuessesCount >= 5;

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
      {/* Hint Buttons Row */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <HintTriggerButton
          label="Lvl 1 Stats"
          unlocked={statsUnlocked}
          disabledByModifier={hintsDisabled}
          remaining={Math.max(0, 3 - wrongGuessesCount)}
          icon={<HeartIcon className="w-5 h-5" />}
          reduceMotion={settings.reduceMotion}
          onClick={() => {
            unlockHint("stats");
            setOpenHintModal("stats");
          }}
        />

        <HintTriggerButton
          label="Description"
          unlocked={descUnlocked}
          disabledByModifier={hintsDisabled}
          remaining={Math.max(0, 5 - wrongGuessesCount)}
          icon={<SearchIcon className="w-5 h-5" />}
          reduceMotion={settings.reduceMotion}
          onClick={() => {
            unlockHint("description");
            setOpenHintModal("description");
          }}
        />
      </div>

      {/* Try Limit Pill if Active */}
      {Number.isFinite(maxAllowedTries) && (
        <div className="mb-3 text-center">
          <span className="inline-block rounded-full border-[2px] border-[#1F1209] bg-[#362214] px-3.5 py-1 font-display text-xs tracking-wider text-[#FFD43B]">
            TRIES: {round.guesses.length} / {maxAllowedTries}
          </span>
        </div>
      )}

      {/* Search Input */}
      {round.status === "playing" && (
        <div className="mb-5">
          <AutocompleteSearch
            items={searchItems}
            excludedIds={round.guesses}
            placeholder="Type a troop name..."
            onSelect={(item) => submitGuess(item.id)}
          />
        </div>
      )}

      {/* Guesses Grid */}
      {round.guesses.length > 0 && (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            {/* Column Headers */}
            <div className="mb-2 grid grid-cols-8 gap-1.5 px-1">
              {COLUMNS.map((col) => (
                <div
                  key={col}
                  className="flex flex-col items-center justify-center rounded-xl border-[2px] border-[#1F1209] bg-[#49311E] py-1.5 px-1 text-center font-display text-xs tracking-wide text-[#FAF0D7]"
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Guess Rows (Newest at Top) */}
            <div className="space-y-2">
              {round.guesses.map((guessId, rowIndex) => {
                const guessTroop = troopMap.get(guessId);
                if (!guessTroop) return null;
                const cells = evaluateTroopGuess(
                  guessTroop,
                  secretTroop,
                  hideYear
                );
                const isNewest = rowIndex === 0 && !settings.reduceMotion;

                return (
                  <div
                    key={guessTroop.id}
                    className="grid grid-cols-8 gap-1.5 px-1"
                  >
                    {/* Troop Portrait Cell */}
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
                      title={guessTroop.name}
                      className="flex flex-col items-center justify-center rounded-xl border-[2.5px] border-[#1F1209] bg-[#3B424D] p-1.5 text-center shadow-tile"
                    >
                      <EntityArtwork
                        src={guessTroop.iconPath}
                        alt={guessTroop.name}
                        size="sm"
                      />
                      <span className="mt-1 line-clamp-1 font-display text-[11px] leading-tight text-white coc-stroke-sm">
                        {guessTroop.name}
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

      {/* Victory / Loss Banner */}
      {round.status !== "playing" && (
        <VictoryBanner
          status={round.status}
          entityName={secretTroop.name}
          entitySublabel={secretTroop.village}
          entityIconPath={secretTroop.iconPath}
          triesCount={round.guesses.length}
          reduceMotion={settings.reduceMotion}
          onPlayAgain={startNewRound}
        />
      )}

      {/* Lvl 1 Stats Hint Modal */}
      <Modal
        isOpen={openHintModal === "stats"}
        onClose={() => setOpenHintModal(null)}
        title="Hint: Level 1 Stats"
      >
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl border-[2.5px] border-[#1F1209] bg-[#FAF0D7] p-3">
            <div className="font-body text-xs font-extrabold uppercase text-[#7C4A21]">
              Hitpoints
            </div>
            <div className="mt-1 font-display text-2xl text-[#2B8A3E]">
              {secretTroop.level1.hp}
            </div>
          </div>
          <div className="rounded-2xl border-[2.5px] border-[#1F1209] bg-[#FAF0D7] p-3">
            <div className="font-body text-xs font-extrabold uppercase text-[#7C4A21]">
              DPS
            </div>
            <div className="mt-1 font-display text-2xl text-[#C92A2A]">
              {secretTroop.level1.dps}
            </div>
          </div>
          <div className="rounded-2xl border-[2.5px] border-[#1F1209] bg-[#FAF0D7] p-3">
            <div className="font-body text-xs font-extrabold uppercase text-[#7C4A21]">
              Damage / Hit
            </div>
            <div className="mt-1 font-display text-2xl text-[#D9480F]">
              {secretTroop.level1.damage}
            </div>
          </div>
        </div>
      </Modal>

      {/* Description Hint Modal */}
      <Modal
        isOpen={openHintModal === "description"}
        onClose={() => setOpenHintModal(null)}
        title="Hint: Troop Description"
      >
        <blockquote className="rounded-2xl border-[2.5px] border-[#1F1209] bg-[#FAF0D7] p-4 text-center font-body text-base italic font-bold text-[#2B1B0E]">
          &ldquo;{maskTroopName(secretTroop.description, secretTroop.name)}&rdquo;
        </blockquote>
      </Modal>
    </motion.div>
  );
}

function HintTriggerButton({
  label,
  unlocked,
  disabledByModifier,
  remaining,
  icon,
  reduceMotion,
  onClick,
}: {
  label: string;
  unlocked: boolean;
  disabledByModifier: boolean;
  remaining: number;
  icon: React.ReactNode;
  reduceMotion: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      animate={
        unlocked && !reduceMotion ? { scale: [1, 1.07, 1] } : { scale: 1 }
      }
      transition={{ duration: 0.4 }}
    >
      <TactileButton
        variant={unlocked ? "gold" : "stone"}
        size="sm"
        disabled={!unlocked}
        onClick={onClick}
      >
        {unlocked ? icon : <LockIcon className="w-4 h-4" />}
        <span>{label}</span>
        {!unlocked && (
          <span className="ml-1 rounded-md bg-black/35 px-1.5 py-0.5 font-body text-[11px] font-extrabold">
            {disabledByModifier ? "OFF" : `in ${remaining}`}
          </span>
        )}
      </TactileButton>
    </motion.div>
  );
}
