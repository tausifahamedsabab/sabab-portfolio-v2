"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * FM 14-style scroll-entry hook: returns a ref + boolean that turns true once
 * the target scrolls into view.
 */
export function useInViewOnce(amount = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}
