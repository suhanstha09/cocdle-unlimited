"use client";

import React from "react";
import { CHANGELOG } from "@/data/changelog";
import { Modal } from "@/components/ui/Modal";

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangelogModal({ isOpen, onClose }: ChangelogModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Village News & Changelog">
      <div className="space-y-4">
        {CHANGELOG.map((entry) => (
          <article
            key={entry.version}
            className="rounded-2xl border-[2.5px] border-[#1F1209] bg-[#FAF0D7] p-3.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-lg border border-[#1F1209] bg-[#FFD43B] px-2 py-0.5 font-display text-sm text-[#1F1209]">
                {entry.version}
              </span>
              <span className="font-body text-xs font-extrabold text-[#7C4A21]">
                {entry.date}
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg text-[#2B1B0E]">
              {entry.title}
            </h3>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 font-body text-sm font-semibold text-[#4A2E16]">
              {entry.items.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Modal>
  );
}
