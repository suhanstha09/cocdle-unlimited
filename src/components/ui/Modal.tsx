"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CrossIcon } from "./SvgIcons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
            className="relative z-10 w-full max-w-lg rounded-3xl border-[4px] border-[#1F1209] bg-gradient-to-b from-[#8A5427] to-[#593314] p-2.5 shadow-stone"
          >
            <div className="rounded-2xl border-[3px] border-[#1F1209] bg-[#F5E6C4] text-[#2B1B0E] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b-[3px] border-[#1F1209] bg-gradient-to-b from-[#49301D] to-[#2C1B0F] px-4 py-3">
                <h2
                  id="modal-title"
                  className="font-display text-xl tracking-wide text-[#FFD43B] coc-stroke-sm"
                >
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border-[2.5px] border-[#1F1209] bg-gradient-to-b from-[#FF8787] to-[#C92A2A] text-white shadow-[0_3px_0_#1F1209] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coc-gold"
                >
                  <CrossIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="max-h-[75vh] overflow-y-auto p-4 sm:p-5">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
