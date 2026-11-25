import { GameMode } from "@/types/game";

export interface HowToPlaySection {
  mode: GameMode;
  title: string;
  summary: string;
  bullets: string[];
}

export const HOW_TO_PLAY: Record<GameMode, HowToPlaySection> = {
  troops: {
    mode: "troops",
    title: "Troops Mode",
    summary:
      "Guess the secret Clash of Clans troop from Home Village, Builder Base, or Clan Capital.",
    bullets: [
      "Type a troop name in the search bar and press Enter or click to submit.",
      "Green tiles mean an exact match with the secret troop.",
      "Red tiles mean no match. On numeric columns (Range, Speed, Housing, Release Year), arrows show whether the secret value is higher or lower.",
      "Wrong guesses unlock Level 1 Stats and Description hints above the grid.",
    ],
  },
  pixel: {
    mode: "pixel",
    title: "Pixel Mode",
    summary:
      "Identify the troop from an ultra-low-resolution 8x8 pixelated portrait.",
    bullets: [
      "Pick one of the 5 troop cards below the frame.",
      "Each wrong pick increases the resolution (8x8 → 12x12 → 16x16 → 24x24 → 48x48 → 256x256).",
      "Find the right troop before running out of choices to keep your streak alive!",
    ],
  },
  description: {
    mode: "description",
    title: "Description Mode",
    summary:
      "Read the in-game troop flavor text and deduce who it describes.",
    bullets: [
      "Any mention of the troop's own name inside the quote is masked with ???.",
      "After 3 wrong guesses, a letter-count structure clue unlocks automatically.",
    ],
  },
  buildings: {
    mode: "buildings",
    title: "Buildings Mode",
    summary:
      "Guess the secret building, defense, trap, or utility structure across all three villages.",
    bullets: [
      "Compare Village, Category, Resource, Targets, Range, Size, Max Level, and Town/Builder/Capital Hall Unlock.",
      "Size compares total tile area (for example, 3x3 = 9 tiles vs 4x4 = 16 tiles) with higher/lower arrows.",
      "N/A matches only with N/A.",
    ],
  },
};
