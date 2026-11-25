"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { TROOPS } from "@/data/troops";
import { GameSettings, ModifierItem, Troop } from "@/types/game";
import { useGameRound } from "@/hooks/useGameRound";
import { EntityArtwork } from "@/components/ui/EntityArtwork";
import { VictoryBanner } from "@/components/ui/VictoryBanner";
import { CheckIcon, CrossIcon } from "@/components/ui/SvgIcons";

interface PixelGameProps {
  settings: GameSettings;
  activeModifiers: ModifierItem["id"][];
  onWin: (triesCount: number) => void;
  onLoss: () => void;
}

const PIXEL_STEPS = [8, 12, 16, 24, 48, 256] as const;

export function PixelGame({
  settings,
  activeModifiers,
  onWin,
  onLoss,
}: PixelGameProps) {
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
    submitGuess,
    startNewRound,
  } = useGameRound({
    mode: "pixel",
    allIds,
    activeModifiers,
    onWin,
    onLoss,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const secretTroop = round
    ? troopMap.get(round.secretId) ?? TROOPS[0]
    : TROOPS[0];

  const wrongPicks = round
    ? round.guesses.filter((id) => id !== secretTroop.id)
    : [];

  const resolutionIndex =
    round?.status !== "playing"
      ? PIXEL_STEPS.length - 1
      : Math.min(wrongPicks.length, PIXEL_STEPS.length - 1);

  const currentResolution = PIXEL_STEPS[resolutionIndex];

  // Draw downscaled -> upscaled pixelated image onto HTML5 Canvas
  useEffect(() => {
    if (!isReady || !round) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.src = secretTroop.artPath;
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = currentResolution;
      offscreen.height = currentResolution;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(img, 0, 0, currentResolution, currentResolution);

      ctx.clearRect(0, 0, size, size);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, size, size);
    };
  }, [isReady, round, secretTroop.artPath, currentResolution]);

  if (!isReady || !round) {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="h-56 w-56 animate-pulse rounded-3xl bg-[#DEC58E]" />
        <div className="h-6 w-64 animate-pulse rounded-xl bg-[#DEC58E]" />
      </div>
    );
  }

  const options = (round.pixelOptions ?? [])
    .map((id) => troopMap.get(id))
    .filter((t): t is Troop => Boolean(t));

  const progressPercent = Math.round(
    ((resolutionIndex + 1) / PIXEL_STEPS.length) * 100
  );

  const matchClasses = settings.colorblindMode
    ? "border-[#1F1209] bg-gradient-to-b from-[#4DABF7] to-[#1864AB] text-white"
    : "border-[#1F1209] bg-gradient-to-b from-[#51CF66] to-[#2B8A3E] text-white";

  const wrongClasses = settings.colorblindMode
    ? "border-[#1F1209] bg-gradient-to-b from-[#FFA94D] to-[#D9480F] text-white"
    : "border-[#1F1209] bg-gradient-to-b from-[#FF6B6B] to-[#C92A2A] text-white";

  return (
    <motion.div
      key={roundCounter}
      initial={settings.reduceMotion ? { opacity: 1 } : { opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col items-center"
    >
      {/* Framed Pixelated Portrait */}
      <div className="relative rounded-3xl border-[4px] border-[#1F1209] bg-[#21252B] p-2 shadow-[0_6px_0_#1F1209]">
        <canvas
          ref={canvasRef}
          aria-label={`Pixelated troop portrait at ${currentResolution} by ${currentResolution} resolution`}
          style={{ imageRendering: "pixelated" }}
          className="h-52 w-52 sm:h-64 sm:w-64 rounded-2xl transition-all duration-300"
        />
      </div>

      {/* Resolution Progress Bar */}
      <div className="mt-4 w-full max-w-xs">
        <div className="mb-1 flex items-center justify-between font-display text-xs tracking-wide text-[#4A2E16]">
          <span>RESOLUTION</span>
          <span>
            {currentResolution}x{currentResolution}
          </span>
        </div>
        <div className="h-5 w-full overflow-hidden rounded-full border-[2.5px] border-[#1F1209] bg-[#362214] p-0.5">
          <div
            style={{ width: `${progressPercent}%` }}
            className={`h-full rounded-full transition-all duration-300 ${
              settings.colorblindMode ? "bg-[#228BE6]" : "bg-[#40C057]"
            }`}
          />
        </div>
      </div>

      {/* 5 Multiple Choice Troop Cards */}
      <div className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-5">
        {options.map((troop) => {
          const isGuessed = round.guesses.includes(troop.id);
          const isSecret = troop.id === secretTroop.id;
          const showCorrect =
            (isGuessed && isSecret) || (round.status === "lost" && isSecret);
          const showWrong = isGuessed && !isSecret;

          return (
            <button
              key={troop.id}
              type="button"
              disabled={isGuessed || round.status !== "playing"}
              onClick={() => submitGuess(troop.id)}
              className={`relative flex sm:flex-col items-center gap-3 sm:gap-2 rounded-2xl border-[3px] p-2.5 text-left sm:text-center shadow-[0_4px_0_#1F1209] transition-all active:translate-y-[3px] active:shadow-[0_1px_0_#1F1209] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coc-gold ${
                showCorrect
                  ? matchClasses
                  : showWrong
                  ? `${wrongClasses} ${settings.reduceMotion ? "" : "animate-shake"}`
                  : "border-[#1F1209] bg-gradient-to-b from-[#FFFDF7] to-[#E9D5A3] text-[#2B1B0E] hover:brightness-105"
              }`}
            >
              <EntityArtwork
                src={troop.iconPath}
                alt={troop.name}
                size="md"
              />
              <span className="flex-1 font-display text-sm sm:text-xs leading-tight">
                {troop.name}
              </span>

              {(showCorrect || showWrong) && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-[#1F1209] bg-[#1F1209] text-white"
                >
                  {showCorrect ? (
                    <CheckIcon className="w-3.5 h-3.5 text-[#69DB7C]" />
                  ) : (
                    <CrossIcon className="w-3.5 h-3.5 text-[#FF8787]" />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

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
