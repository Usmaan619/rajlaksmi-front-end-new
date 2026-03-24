import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeight(weight: string | undefined | null): string {
  if (!weight) return "";

  // Remove common labels and extra whitespace
  let cleaned = weight
    .replace(/Size|KG|weight|Select/gi, "")
    .replace(/[\n\s]+/g, " ")
    .trim();

  // If it's a JSON array stringified, take the first element
  if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return String(parsed[0]);
      }
    } catch (e) {
      // Not valid JSON, continue with cleaned string
    }
  }

  // If it contains multiple weights separated by space, take the first one
  // but only if it was a "dump" of all weights.
  const weights = cleaned.match(/\d+(kg|g|gm|ml|l)/gi);
  if (weights && weights.length > 1 && weight.includes("Size")) {
    return weights[0];
  }

  return cleaned || weight;
}

/**
 * Converts any weight/volume string to a base unit number (grams or ml)
 * for consistent numeric comparison/sorting.
 *
 * Supported units:
 *   kg  → grams (×1000)
 *   g   → grams (×1)
 *   gm  → grams (×1)
 *   mg  → grams (÷1000)
 *   l   → ml (×1000)
 *   ltr → ml (×1000)
 *   lt  → ml (×1000)
 *   ml  → ml (×1)
 *   piece / pcs / pack → their numeric value (raw)
 */
export function getWeightValue(weight: any | undefined | null): number {
  if (!weight) return 0;

  const str = (
    typeof weight === "object" ? String(weight.weight) : String(weight)
  )
    .trim()
    .toLowerCase();

  // Extract numeric part (supports decimals like 1.5kg, 500ml)
  const numMatch = str.match(/^([\d.]+)/);
  if (!numMatch) return 0;

  const num = parseFloat(numMatch[1]);

  // Detect unit
  if (/kg/.test(str)) return num * 1000; // kg → g
  if (/mg/.test(str)) return num / 1000; // mg → g
  if (/gm/.test(str) || /g/.test(str)) return num; // g / gm → g
  if (/ltr/.test(str) || /lt\b/.test(str) || /\bl\b/.test(str))
    return num * 1000; // l/ltr/lt → ml
  if (/ml/.test(str)) return num; // ml → ml
  // pieces, packs: just numeric
  return num;
}

/**
 * Sorts an array of weight strings (or objects) in ascending numeric order.
 * e.g. ["10kg","1kg","500g","5kg"] → ["500g","1kg","5kg","10kg"]
 */
export function sortWeights<T = any>(weights: T[]): T[] {
  return [...weights].sort((a, b) => getWeightValue(a) - getWeightValue(b));
}

/**
 * Extracts the numeric value and unit from a weight/volume string for rate calculation.
 */
export function getUnitInfo(weightStr: string | undefined | null) {
  if (!weightStr || weightStr === "N/A") return { unit: "unit", value: 1 };
  
  const str = String(weightStr).toLowerCase().trim();
  const match = str.match(/(\d+(?:\.\d+)?)\s*(kg|g|gm|pcs|pc|packet|pkt|ml|ltr|l)/i);
  
  if (match) {
    return { value: parseFloat(match[1]), unit: match[2].toLowerCase() };
  }
  
  return { unit: weightStr, value: 1 };
}
