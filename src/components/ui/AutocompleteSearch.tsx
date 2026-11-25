"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchableItem, useFuzzySearch } from "@/hooks/useFuzzySearch";
import { EntityArtwork } from "./EntityArtwork";
import { SearchIcon } from "./SvgIcons";

interface AutocompleteSearchProps<T extends SearchableItem> {
  items: T[];
  excludedIds: string[];
  placeholder: string;
  disabled?: boolean;
  onSelect: (item: T) => void;
}

export function AutocompleteSearch<T extends SearchableItem>({
  items,
  excludedIds,
  placeholder,
  disabled = false,
  onSelect,
}: AutocompleteSearchProps<T>) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const matches = useFuzzySearch(items, query, excludedIds);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query, matches.length]);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChoose = (item: T) => {
    onSelect(item);
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) =>
        matches.length > 0 ? (prev + 1) % matches.length : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) =>
        matches.length > 0 ? (prev - 1 + matches.length) % matches.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches.length > 0) {
        handleChoose(matches[highlightedIndex] ?? matches[0]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-md">
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 text-[#522E12]">
          <SearchIcon className="w-5 h-5" />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-expanded={isOpen}
          autoComplete="off"
          className="w-full rounded-2xl border-[3px] border-[#1F1209] bg-[#FFFDF7] py-3 pl-11 pr-4 font-body text-base font-bold text-[#1F1209] placeholder:text-[#8C7355] shadow-[inset_0_3px_5px_rgba(0,0,0,0.18),0_4px_0_#1F1209] focus:outline-none focus:ring-4 focus:ring-coc-gold disabled:opacity-60"
        />
      </div>

      {isOpen && !disabled && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border-[3px] border-[#1F1209] bg-[#FFF9EB] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
        >
          {matches.length === 0 ? (
            <li className="px-3 py-2.5 text-center font-body text-sm font-bold text-[#7C4A21]">
              No matching entries found
            </li>
          ) : (
            matches.map((item, idx) => {
              const active = idx === highlightedIndex;
              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={active}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleChoose(item);
                  }}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-1.5 transition-colors ${
                    active
                      ? "bg-[#FFD43B] text-[#1F1209]"
                      : "text-[#2B1B0E] hover:bg-[#F2E1B9]"
                  }`}
                >
                  <EntityArtwork
                    src={item.iconPath}
                    alt={item.name}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display text-base tracking-wide">
                      {item.name}
                    </div>
                    {item.subtitle && (
                      <div className="truncate font-body text-xs font-semibold opacity-75">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
