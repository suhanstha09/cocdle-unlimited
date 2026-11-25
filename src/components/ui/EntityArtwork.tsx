"use client";

import React, { useState } from "react";

interface EntityArtworkProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "w-10 h-10",
  md: "w-14 h-14",
  lg: "w-20 h-20",
};

export function EntityArtwork({
  src,
  alt,
  size = "md",
  className = "",
}: EntityArtworkProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden rounded-xl border-[2.5px] border-[#1F1209] bg-gradient-to-b from-[#3B424D] to-[#21252B] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] ${SIZE_MAP[size]} ${className}`}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-sm text-[#FFD43B] coc-stroke-sm">
          {alt.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}
