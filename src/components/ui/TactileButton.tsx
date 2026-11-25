"use client";

import React from "react";

type ButtonVariant = "gold" | "green" | "red" | "wood" | "stone" | "orange";

interface TactileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: "bg-gradient-to-b from-[#FFE066] via-[#FCC419] to-[#E67700] text-white hover:brightness-105 hover:shadow-[0_5px_0_#1F1209,0_0_18px_rgba(255,212,59,0.5)]",
  orange:
    "bg-gradient-to-b from-[#FFA94D] via-[#FD7E14] to-[#D9480F] text-white hover:brightness-105 hover:shadow-[0_5px_0_#1F1209,0_0_16px_rgba(253,126,20,0.5)]",
  green:
    "bg-gradient-to-b from-[#69DB7C] via-[#40C057] to-[#2B8A3E] text-white hover:brightness-105 hover:shadow-[0_5px_0_#1F1209,0_0_18px_rgba(64,192,87,0.5)]",
  red: "bg-gradient-to-b from-[#FF8787] via-[#FA5252] to-[#C92A2A] text-white hover:brightness-105 hover:shadow-[0_5px_0_#1F1209,0_0_18px_rgba(250,82,82,0.5)]",
  wood: "bg-gradient-to-b from-[#9C6230] via-[#7C4A21] to-[#522E12] text-[#FAF0D7] hover:brightness-110",
  stone:
    "bg-gradient-to-b from-[#68707D] via-[#49505B] to-[#2D323A] text-[#F1F3F5] hover:brightness-110",
};

const SIZE_CLASSES: Record<NonNullable<TactileButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 text-base sm:text-lg rounded-xl",
  lg: "px-7 py-3.5 text-lg sm:text-xl rounded-2xl",
  icon: "w-11 h-11 sm:w-12 sm:h-12 p-0 rounded-xl flex items-center justify-center",
};

export function TactileButton({
  variant = "gold",
  size = "md",
  className = "",
  children,
  disabled,
  ...props
}: TactileButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`relative select-none font-display tracking-wide border-[3px] border-[#1F1209] shadow-[0_5px_0_#1F1209,0_8px_14px_rgba(0,0,0,0.45)] transition-all duration-100 active:translate-y-[4px] active:shadow-[0_1px_0_#1F1209,0_2px_6px_rgba(0,0,0,0.4)] disabled:opacity-55 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coc-gold ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {/* Glossy Top Highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 top-0.5 h-[36%] rounded-t-lg bg-gradient-to-b from-white/40 to-transparent"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2 coc-stroke-sm">
        {children}
      </span>
    </button>
  );
}
