"use client";

import React, { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { EntityArtwork } from "./EntityArtwork";
import { StarIcon } from "./SvgIcons";
import { TactileButton } from "./TactileButton";

interface VictoryBannerProps {
  status: "won" | "lost";
  entityName: string;
  entitySublabel?: string;
  entityIconPath: string;
  triesCount: number;
  reduceMotion: boolean;
  onPlayAgain: () => void;
}

const CONFETTI_COLORS = ["#FFD43B", "#40C057", "#FA5252", "#4DABF7", "#FFA94D"];

export function VictoryBanner({
  status,
  entityName,
  entitySublabel,
  entityIconPath,
  triesCount,
  reduceMotion,
  onPlayAgain,
}: VictoryBannerProps) {
const router = useRouter();
  const isWon = status === "won";
  const bannerRef = useRef(null);

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: (i % 7) * 0.06,
      xDrift: ((i % 5) - 2) * 26,
      rotate: (i % 2 === 0 ? 1 : -1) * (140 + i * 15),
    }));
  }, []);

  return (
    <div
      ref={bannerRef}
      className="relative mt-6 overflow-hidden rounded-3xl border-[4px] border-[#1F1209] bg-gradient-to-b from-[#49311E] via-[#332113] to-[#23160C] p-5 text-center shadow-[0_8px_0_#1F1209,0_16px_30px_rgba(0,0,0,0.6)]"
      style={{ 
        transform: "translateY(0)", 
        opacity: 1 
      }}
    >
      {/* Confetti Burst on Win */}
      {isWon && !reduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {confettiPieces.map((piece) => (
            <motion.span
              key={piece.id}
              initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: 280,
                x: piece.xDrift,
                opacity: [1, 1, 0],
                rotate: piece.rotate,
              }}
              transition={{
                duration: 1.8,
                delay: piece.delay,
                ease: "easeOut",
              }}
              style={{ left: piece.left, backgroundColor: piece.color }}
              className="absolute top-0 h-3 w-2 rounded-sm border border-black/40"
            />
          ))}
        </div>
      )}

      {/* 3 Pop-in Stars */}
      {isWon && (
        <div className="mb-2 flex items-center justify-center gap-2">
          {[0, 1, 2].map((starIdx) => (
            <motion.div
              key={starIdx}
              initial={
                reduceMotion ? { opacity: 1 } : { scale: 0, rotate: -35 }
              }
              animate={{ scale: starIdx === 1 ? 1.18 : 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 18,
                delay: reduceMotion ? 0 : 0.15 + starIdx * 0.16,
              }}
              className={starIdx === 1 ? "-mt-3" : ""}
            >
              <StarIcon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_3px_0_#1F1209]" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Gold Ribbon Banner */}
      <div
        className={`mx-auto inline-block rounded-2xl border-[3px] border-[#1F1209] px-6 py-1.5 shadow-[0_4px_0_#1F1209] ${
          isWon
            ? "bg-gradient-to-b from-[#FFE066] via-[#FCC419] to-[#E67700]"
            : "bg-gradient-to-b from-[#FF8787] via-[#FA5252] to-[#C92A2A]"
        }`}
      >
        <span className="font-display text-2xl sm:text-3xl tracking-wider text-white coc-stroke-md">
          {isWon ? "GG!!" : "OUT OF TRIES!"}
        </span>
      </div>

      {/* Result Card */}
      <div className="mx-auto mt-4 flex max-w-md flex-col items-center gap-3 rounded-2xl border-[3px] border-[#1F1209] bg-[#F5E6C4] p-4 text-[#2B1B0E]">
        <EntityArtwork src={entityIconPath} alt={entityName} size="lg" />
        <div>
          <p className="font-display text-xl sm:text-2xl text-[#2B1B0E]">
            {isWon ? `You found ${entityName}` : `It was ${entityName}`}
            {entitySublabel ? ` (${entitySublabel})` : ""}
          </p>
          <p className="mt-1 font-body text-sm font-extrabold text-[#6E4420]">
            {isWon
              ? `Solved in ${triesCount} ${triesCount === 1 ? "try" : "tries"}`
              : `Used all ${triesCount} tries`}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <TactileButton variant="green" size="md" onClick={onPlayAgain}>
            Play Again
          </TactileButton>
          <TactileButton
            variant="wood"
            size="md"
            onClick={() => router.push("/")}
          >
            Menu
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
