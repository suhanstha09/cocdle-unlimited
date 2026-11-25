export type Village = "Home Village" | "Builder Base" | "Clan Capital";

export type GameMode = "troops" | "pixel" | "description" | "buildings";

export type DamageType =
  | "Single Target"
  | "Area Splash"
  | "Chain"
  | "Heal"
  | "None";

export type TargetType = "Ground" | "Air" | "Both" | "N/A";

export interface Level1Stats {
  hp: number;
  dps: number | "N/A";
  damage: number | "N/A";
}

export interface Troop {
  id: string;
  name: string;
  village: Village;
  category:
    | "Elixir Troop"
    | "Dark Elixir Troop"
    | "Super Troop"
    | "Siege Machine"
    | "Hero"
    | "Hero Pet"
    | "Builder Base Troop"
    | "Builder Base Hero"
    | "Clan Capital Troop";
  damageType: DamageType;
  target: TargetType;
  range: number | "N/A";
  speed: number;
  housing: number | "N/A";
  releaseYear: number;
  description: string;
  iconPath: string;
  artPath: string;
  level1: Level1Stats;
}

export type BuildingCategory =
  | "Resource"
  | "Army"
  | "Defense"
  | "Trap"
  | "Wall"
  | "Hero"
  | "Utility";

export type ResourceType =
  | "Gold"
  | "Elixir"
  | "Dark Elixir"
  | "Gems"
  | "Capital Gold"
  | "None";

export interface Building {
  id: string;
  name: string;
  village: Village;
  category: BuildingCategory;
  resource: ResourceType;
  targets: TargetType;
  range: number | "N/A";
  size: string; // e.g. "3x3", "4x4", "1x1", "N/A"
  maxLevel: number | "N/A";
  thUnlock: number | "N/A"; // TH, BH, or Capital Hall unlock level
  iconPath: string;
}

export type CellMatch = "match" | "mismatch";
export type ArrowDirection = "up" | "down" | "none";

export interface AttributeEvaluation {
  label: string;
  displayValue: string;
  status: CellMatch;
  arrow: ArrowDirection;
  srText: string;
}

export interface RoundState {
  mode: GameMode;
  secretId: string;
  guesses: string[];
  status: "playing" | "won" | "lost";
  unlockedHints: string[];
  pixelOptions?: string[];
  startedAt: number;
}

export interface ModeStats {
  plays: number;
  wins: number;
  streak: number;
  bestStreak: number;
  totalTriesOnWins: number;
}

export type StatsMap = Record<GameMode, ModeStats>;

export interface GameSettings {
  reduceMotion: boolean;
  colorblindMode: boolean;
  particlesEnabled: boolean;
  language: "en";
}

export interface ModifierItem {
  id: "limited_tries" | "no_hints" | "sudden_death" | "no_year";
  title: string;
  description: string;
  badgeText: string;
}
