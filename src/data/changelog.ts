export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.3.0",
    date: "November 2026",
    title: "All Three Villages & Quick Modifiers",
    items: [
      "Added full Home Village, Builder Base, and Clan Capital rosters across Troops and Buildings modes.",
      "Added Quick Modifiers panel with Limited Tries, Hard Mode (No Hints), and Sudden Death toggles.",
      "Added Colorblind-friendly high-contrast palette in Settings.",
    ],
  },
  {
    version: "v1.2.0",
    date: "October 2026",
    title: "Pixel & Description Modes",
    items: [
      "Added HTML5 Canvas pixelation engine in Pixel mode with progressive sharpening from 8x8 up to 256x256.",
      "Added automatic name masking and progressive letter-count hints in Description mode.",
    ],
  },
  {
    version: "v1.0.0",
    date: "September 2026",
    title: "COCDLE UNLIMITED Launch",
    items: [
      "Unlimited random rounds with zero daily wait times and 5-round anti-repeat protection.",
      "Persistent local stats, win streaks, and mid-round state recovery.",
    ],
  },
];
