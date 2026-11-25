import React from "react";

interface StonePanelProps {
  title: string;
  children: React.ReactNode;
  subHeader?: React.ReactNode;
}

export function StonePanel({ title, children, subHeader }: StonePanelProps) {
  return (
    <section className="relative w-full rounded-3xl border-[4px] border-[#1F1209] bg-gradient-to-b from-[#5A6270] via-[#434954] to-[#2F343D] p-2.5 sm:p-4 shadow-stone">
      {/* Stone inner rim */}
      <div className="rounded-2xl border-[3px] border-[#23272E] bg-gradient-to-b from-[#F8ECD1] via-[#F2E1B9] to-[#E4CE9B] shadow-[inset_0_3px_8px_rgba(0,0,0,0.22)]">
        {/* Dark Title Ribbon */}
        <div className="relative -mt-5 mx-auto w-[94%] sm:w-[86%] rounded-2xl border-[3px] border-[#1F1209] bg-gradient-to-b from-[#4A321F] via-[#362214] to-[#24160C] px-4 py-2.5 text-center shadow-[0_4px_0_#1F1209]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-2 top-0.5 h-1.5 rounded-t-xl bg-white/15"
          />
          <h1 className="font-display text-lg sm:text-2xl tracking-wide text-[#FFD43B] coc-stroke-sm">
            {title}
          </h1>
        </div>

        {subHeader && (
          <div className="mt-3 flex justify-center px-3">{subHeader}</div>
        )}

        {/* Light Parchment Content Area */}
        <div className="p-3 sm:p-5 text-[#2B1B0E]">{children}</div>
      </div>
    </section>
  );
}
