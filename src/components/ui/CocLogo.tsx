"use client";

import React from "react";
import Link from "next/link";

interface CocLogoProps {
  compact?: boolean;
  asLink?: boolean;
}

export function CocLogo({ compact = false, asLink = false }: CocLogoProps) {
  const content = (
    <div
      className={`group relative inline-flex items-center select-none ${
        compact ? "gap-2.5 scale-90 sm:scale-95" : "gap-3 sm:gap-4"
      }`}
    >
      {/* Red & Gold Crest Shield with Crossed Arrows */}
      <div className="relative flex-shrink-0">
        <svg
          viewBox="0 0 64 68"
          className={compact ? "w-12 h-12" : "w-14 h-16 sm:w-16 sm:h-18"}
          aria-hidden="true"
        >
          {/* Crossed Arrows behind shield */}
          <path
            d="M8 10L56 58M56 10L8 58"
            stroke="#1F1209"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M8 10L56 58M56 10L8 58"
            stroke="#E9ECEF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Arrowheads */}
          <path d="M6 8L16 9L9 16L6 8Z" fill="#FFD43B" stroke="#1F1209" strokeWidth="2" />
          <path d="M58 8L48 9L55 16L58 8Z" fill="#FFD43B" stroke="#1F1209" strokeWidth="2" />
          {/* Shield Body */}
          <path
            d="M32 6L52 14V33C52 46.5 43.2 56.5 32 61C20.8 56.5 12 46.5 12 33V14L32 6Z"
            fill="#C92A2A"
            stroke="#1F1209"
            strokeWidth="3.5"
          />
          {/* Gold Shield Trim */}
          <path
            d="M32 10L48 16.5V32.5C48 43.5 40.8 52 32 56C23.2 52 16 43.5 16 32.5V16.5L32 10Z"
            fill="none"
            stroke="#FFD43B"
            strokeWidth="3"
          />
          {/* Center Star Emblem */}
          <path
            d="M32 21L35.2 27.6L42.5 28.6L37.2 33.7L38.5 40.9L32 37.5L25.5 40.9L26.8 33.7L21.5 28.6L28.8 27.6L32 21Z"
            fill="#FFD43B"
            stroke="#1F1209"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* 3D Gold Wordmark with Shine Sweep */}
      <div className="relative overflow-hidden rounded-lg px-1 py-0.5">
        <div className="flex flex-col leading-none">
          <span
            className={`font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFF3BF] via-[#FFD43B] to-[#F08C00] coc-stroke-lg ${
              compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-6xl"
            }`}
          >
            COCDLE
          </span>
          <span
            className={`font-display tracking-[0.22em] text-center text-[#FFE066] coc-stroke-sm ${
              compact ? "text-xs -mt-0.5" : "text-sm sm:text-base -mt-0.5"
            }`}
          >
            UNLIMITED
          </span>
        </div>

        {/* Glossy Shine Sweep */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shineSweep"
        />
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        aria-label="Back to COCDLE UNLIMITED Main Menu"
        className="inline-flex items-center justify-center rounded-xl transition-transform hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coc-gold"
      >
        {content}
      </Link>
    );
  }

  return content;
}
