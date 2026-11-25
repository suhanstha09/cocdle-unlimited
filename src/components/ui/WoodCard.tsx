import React from "react";

interface WoodCardProps {
  children: React.ReactNode;
  className?: string;
}

export function WoodCard({ children, className = "" }: WoodCardProps) {
  return (
    <div
      className={`relative rounded-2xl border-[3px] border-[#1F1209] bg-gradient-to-b from-[#965C2B] via-[#7C4A21] to-[#593314] shadow-plank wood-grain ${className}`}
    >
      {/* Top inner bevel highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1 top-0.5 h-2 rounded-t-xl bg-white/20"
      />
      {children}
    </div>
  );
}
