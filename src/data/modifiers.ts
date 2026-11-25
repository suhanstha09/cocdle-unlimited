import { ModifierItem } from "@/types/game";

export const QUICK_MODIFIERS: ModifierItem[] = [
  {
    id: "limited_tries",
    title: "Limited Tries (6 Max)",
    description:
      "Classic Wordle pressure: solve the secret troop or building within 6 guesses or lose the round.",
    badgeText: "6 TRIES",
  },
  {
    id: "no_hints",
    title: "Hard Mode: No Hints",
    description:
      "Disables Lvl 1 Stats, Description, and letter-count clues across all modes.",
    badgeText: "HARD",
  },
  {
    id: "no_year",
    title: "Blindfold: Hide Release Year",
    description:
      "Masks the Release Year column in Troops mode so you must rely on combat stats alone.",
    badgeText: "NO YEAR",
  },
  {
    id: "sudden_death",
    title: "Sudden Death (3 Tries)",
    description:
      "For veteran Chiefs only: only 3 guesses allowed before the round ends.",
    badgeText: "3 TRIES",
  },
];
