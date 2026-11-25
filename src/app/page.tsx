"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GameMode } from "@/types/game";
import { LANGUAGES, Locale, UI_STRINGS } from "@/data/i18n";
import { useSettings } from "@/hooks/useSettings";
import { useStats } from "@/hooks/useStats";
import { BackgroundCanvas } from "@/components/layout/BackgroundCanvas";
import { CocLogo } from "@/components/ui/CocLogo";
import {
  CheckIcon,
  ChevronRightIcon,
  PixelModeIcon,
  ScrollModeIcon,
  SwordModeIcon,
  TowerModeIcon,
} from "@/components/ui/SvgIcons";

const MODE_CARDS: {
  mode: GameMode;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    mode: "troops",
    href: "/troops",
    icon: <SwordModeIcon className="w-8 h-8" />,
  },
  {
    mode: "pixel",
    href: "/pixel",
    icon: <PixelModeIcon className="w-8 h-8" />,
  },
  {
    mode: "description",
    href: "/description",
    icon: <ScrollModeIcon className="w-8 h-8" />,
  },
  {
    mode: "buildings",
    href: "/buildings",
    icon: <TowerModeIcon className="w-8 h-8" />,
  },
];

export default function MainMenuPage() {
  const { settings, setSettings } = useSettings();
  const { stats, hydrated } = useStats();
  const strings = UI_STRINGS[settings.language];

  return (
    <div className="min-h-screen w-full px-4 py-8 sm:py-12 flex flex-col items-center justify-between">
      <BackgroundCanvas
        reduceMotion={settings.reduceMotion}
        particlesEnabled={settings.particlesEnabled}
      />

      <main className="mx-auto flex w-full max-w-xl flex-col items-center">
        {/* Centered Logo */}
        <motion.div
          initial={settings.reduceMotion ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        >
          <CocLogo />
        </motion.div>

        {/* Heading Below Logo */}
        <motion.h1
          initial={settings.reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 mb-7 text-center font-display text-lg sm:text-xl tracking-wider text-[#FFE066] coc-stroke-sm"
        >
          {strings.heroSubtitle}
        </motion.h1>

        {/* Vertical Stack of 4 Wide Wooden-Plank Cards */}
        <div className="w-full space-y-4">
          {MODE_CARDS.map((card, index) => {
            const modeText = strings.modes[card.mode];
            const wins = hydrated ? stats[card.mode]?.wins ?? 0 : 0;

            return (
              <motion.div
                key={card.mode}
                initial={
                  settings.reduceMotion ? false : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 24,
                  delay: settings.reduceMotion ? 0 : 0.08 * index,
                }}
                whileHover={
                  settings.reduceMotion
                    ? undefined
                    : { y: -3, rotate: index % 2 === 0 ? -0.5 : 0.5 }
                }
                whileTap={settings.reduceMotion ? undefined : { y: 3 }}
              >
                <Link
                  href={card.href}
                  className="group relative flex items-center gap-3.5 sm:gap-4 rounded-2xl border-[3px] border-[#1F1209] p-3.5 sm:p-4 shadow-plank transition-shadow hover:shadow-[0_7px_0_#1F1209,0_12px_24px_rgba(255,212,59,0.22)] active:shadow-plankPressed wood-grain focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coc-gold"
                >
                  {/* Top Plank Bevel */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-1.5 top-0.5 h-2 rounded-t-xl bg-white/20"
                  />

                  {/* Green Win Counter Badge (hidden at 0) */}
                  {wins > 0 && (
                    <span
                      aria-label={`${wins} rounds won in ${modeText.title}`}
                      className="absolute -right-2 -top-2.5 z-20 inline-flex items-center gap-1 rounded-full border-[2.5px] border-[#1F1209] bg-gradient-to-b from-[#69DB7C] to-[#2B8A3E] px-2.5 py-0.5 font-display text-xs text-white shadow-[0_3px_0_#1F1209] coc-stroke-sm"
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                      <span>{wins}</span>
                    </span>
                  )}

                  {/* Framed Mode Icon on Left */}
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#1F1209] bg-gradient-to-b from-[#49311E] to-[#26180D] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
                    {card.icon}
                  </div>

                  {/* Mode Title & One-Line Subtitle */}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl sm:text-2xl tracking-wide text-[#FFD43B] coc-stroke-sm">
                      {modeText.title}
                    </h2>
                    <p className="mt-0.5 truncate font-body text-xs sm:text-sm font-extrabold text-[#FAF0D7]">
                      {modeText.subtitle}
                    </p>
                  </div>

                  {/* Orange Chevron Button on Right */}
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl border-[3px] border-[#1F1209] bg-gradient-to-b from-[#FFA94D] via-[#FD7E14] to-[#D9480F] text-white shadow-[0_4px_0_#1F1209] transition-transform group-hover:translate-x-0.5"
                  >
                    <ChevronRightIcon className="w-6 h-6" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Bottom Language Dropdown & Fan Disclaimer */}
      <footer className="mt-10 flex flex-col items-center gap-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-2xl border-[2.5px] border-[#1F1209] bg-[#362214]/90 px-3.5 py-2 shadow-[0_4px_0_#1F1209]">
          <label
            htmlFor="language-select"
            className="font-display text-xs uppercase tracking-wider text-[#FFE066]"
          >
            {strings.languageLabel}:
          </label>
          <select
            id="language-select"
            value={settings.language}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                language: e.target.value as Locale,
              }))
            }
            className="rounded-xl border-[2px] border-[#1F1209] bg-[#FAF0D7] px-2.5 py-1 font-body text-xs font-extrabold text-[#1F1209] focus:outline-none focus:ring-2 focus:ring-coc-gold"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <p className="max-w-md font-body text-[11px] font-semibold text-[#C8B08A]/75">
          {strings.fanDisclaimer}
        </p>
      </footer>
    </div>
  );
}
