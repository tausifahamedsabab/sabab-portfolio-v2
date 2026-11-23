"use client";

import { useEffect, useState } from "react";

/**
 * Tracks a min-width media query, safe for SSR (defaults to false).
 */
export function useIsDesktop(query = "(min-width: 1024px)") {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
