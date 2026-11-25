export type Locale = "en";

export const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
];

export const UI_STRINGS = {
  en: {
    heroSubtitle: "TEST YOUR CLASH OF CLANS KNOWLEDGE",
    fanDisclaimer:
      "Unofficial fan-made guessing game. Not affiliated with or endorsed by Supercell.",
    modes: {
      troops: {
        title: "TROOPS",
        subtitle: "Guess the troop with clues on each try",
        ribbon: "GUESS THE CLASH OF CLANS TROOP",
      },
      pixel: {
        title: "PIXEL",
        subtitle: "Guess the troop from a pixelated image",
        ribbon: "WHICH TROOP IS THIS PIXELATED IMAGE?",
      },
      description: {
        title: "DESCRIPTION",
        subtitle: "Guess the troop from its description",
        ribbon: "WHICH TROOP DOES THIS DESCRIPTION REFER TO?",
      },
      buildings: {
        title: "BUILDINGS",
        subtitle: "Guess the building with clues on each try",
        ribbon: "GUESS THE CLASH OF CLANS BUILDING",
      },
    },
    playAgain: "Play Again",
    menu: "Menu",
    languageLabel: "Language",
  },
} as const;
