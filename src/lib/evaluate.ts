import {
  ArrowDirection,
  AttributeEvaluation,
  Building,
  Troop,
} from "@/types/game";

function compareNumeric(
  label: string,
  guessVal: number | "N/A",
  secretVal: number | "N/A",
  unitSuffix = ""
): AttributeEvaluation {
  const displayValue =
    guessVal === "N/A" ? "N/A" : `${guessVal}${unitSuffix}`;

  if (guessVal === secretVal) {
    return {
      label,
      displayValue,
      status: "match",
      arrow: "none",
      srText: `${label} ${displayValue}, exact match`,
    };
  }

  if (guessVal === "N/A" || secretVal === "N/A") {
    return {
      label,
      displayValue,
      status: "mismatch",
      arrow: "none",
      srText: `${label} ${displayValue}, does not match`,
    };
  }

  const arrow: ArrowDirection = secretVal > guessVal ? "up" : "down";
  const directionWord = arrow === "up" ? "higher" : "lower";

  return {
    label,
    displayValue,
    status: "mismatch",
    arrow,
    srText: `${label} ${displayValue}, answer is ${directionWord}`,
  };
}

function compareExact(
  label: string,
  guessVal: string,
  secretVal: string
): AttributeEvaluation {
  const isMatch = guessVal === secretVal;
  return {
    label,
    displayValue: guessVal,
    status: isMatch ? "match" : "mismatch",
    arrow: "none",
    srText: isMatch
      ? `${label} ${guessVal}, exact match`
      : `${label} ${guessVal}, does not match`,
  };
}

export function evaluateTroopGuess(
  guess: Troop,
  secret: Troop,
  hideYear = false
): AttributeEvaluation[] {
  return [
    compareExact("Village", guess.village, secret.village),
    compareExact("Damage Type", guess.damageType, secret.damageType),
    compareExact("Target", guess.target, secret.target),
    compareNumeric("Range", guess.range, secret.range),
    compareNumeric("Speed", guess.speed, secret.speed),
    compareNumeric("Housing", guess.housing, secret.housing),
    hideYear
      ? {
          label: "Release Year",
          displayValue: "???",
          status: "mismatch",
          arrow: "none",
          srText: "Release Year hidden by modifier",
        }
      : compareNumeric("Release Year", guess.releaseYear, secret.releaseYear),
  ];
}

export function parseTileArea(size: string): number | null {
  const parts = size.toLowerCase().split("x").map(Number);
  if (parts.length !== 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) {
    return null;
  }
  return parts[0] * parts[1];
}

export function evaluateBuildingGuess(
  guess: Building,
  secret: Building
): AttributeEvaluation[] {
  const guessArea = parseTileArea(guess.size);
  const secretArea = parseTileArea(secret.size);

  let sizeEval: AttributeEvaluation;
  if (guess.size === secret.size) {
    sizeEval = {
      label: "Size",
      displayValue: guess.size,
      status: "match",
      arrow: "none",
      srText: `Size ${guess.size}, exact match`,
    };
  } else if (
    guessArea !== null &&
    secretArea !== null &&
    guessArea !== secretArea
  ) {
    const arrow: ArrowDirection = secretArea > guessArea ? "up" : "down";
    sizeEval = {
      label: "Size",
      displayValue: guess.size,
      status: "mismatch",
      arrow,
      srText: `Size ${guess.size}, answer area is ${
        arrow === "up" ? "larger" : "smaller"
      }`,
    };
  } else {
    sizeEval = {
      label: "Size",
      displayValue: guess.size,
      status: "mismatch",
      arrow: "none",
      srText: `Size ${guess.size}, same area but different dimensions`,
    };
  }

  return [
    compareExact("Village", guess.village, secret.village),
    compareExact("Category", guess.category, secret.category),
    compareExact("Resource", guess.resource, secret.resource),
    compareExact("Targets", guess.targets, secret.targets),
    compareNumeric("Range", guess.range, secret.range),
    sizeEval,
    compareNumeric("Max Level", guess.maxLevel, secret.maxLevel),
    compareNumeric("TH Unlock", guess.thUnlock, secret.thUnlock),
  ];
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function maskTroopName(description: string, troopName: string): string {
  const escaped = escapeRegex(troopName);
  const pattern = new RegExp(`\\b${escaped}(?:es|s)?\\b`, "gi");
  let masked = description.replace(pattern, "???");

  const words = troopName.split(" ").filter((w) => w.length > 3);
  for (const word of words) {
    const wEsc = escapeRegex(word);
    const wPattern = new RegExp(`\\b${wEsc}(?:es|s)?\\b`, "gi");
    masked = masked.replace(wPattern, "???");
  }
  return masked;
}

export function buildLetterMask(name: string): {
  letterCount: number;
  pattern: string;
} {
  const lettersOnly = name.replace(/[^a-zA-Z0-9]/g, "");
  const pattern = name
    .split("")
    .map((ch) => {
      if (ch === " ") return "   ";
      if (/[a-zA-Z0-9]/.test(ch)) return "_";
      return ch;
    })
    .join(" ");
  return {
    letterCount: lettersOnly.length,
    pattern,
  };
}