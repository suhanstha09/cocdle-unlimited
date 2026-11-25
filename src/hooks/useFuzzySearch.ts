"use client";

import { useMemo } from "react";

export interface SearchableItem {
  id: string;
  name: string;
  iconPath: string;
  subtitle?: string;
}

function fuzzyScore(query: string, target: string): number {
  const q = query.trim().toLowerCase();
  const t = target.toLowerCase();
  if (!q) return 1;
  if (t === q) return 100;
  if (t.startsWith(q)) return 85;
  if (t.includes(q)) return 70;

  // Subsequence fuzzy check
  let qIdx = 0;
  let consecutive = 0;
  let score = 0;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      qIdx++;
      consecutive++;
      score += 10 + consecutive * 4;
    } else {
      consecutive = 0;
    }
  }
  return qIdx === q.length ? score : -1;
}

export function useFuzzySearch<T extends SearchableItem>(
  items: T[],
  query: string,
  excludedIds: string[]
) {
  return useMemo(() => {
    const excludedSet = new Set(excludedIds);
    const available = items.filter((item) => !excludedSet.has(item.id));
    if (!query.trim()) {
      return available.slice(0, 14);
    }

    return available
      .map((item) => ({ item, score: fuzzyScore(query, item.name) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
      .slice(0, 14)
      .map((entry) => entry.item);
  }, [items, query, excludedIds]);
}
