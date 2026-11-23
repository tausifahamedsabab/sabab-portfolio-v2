/**
 * Tiny class-name helper (the portfolio intentionally avoids extra deps).
 */
export function cn(...inputs: (string | undefined | false | null | 0)[]): string {
  return inputs.filter((x): x is string => typeof x === "string").join(" ");
}
