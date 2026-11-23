"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedTextProps {
  words: string[];
  className?: string;
  /** ms between word changes (cycle); the last word waits a bit longer. */
  interval?: number;
  cycleDuration?: number;
}

/**
 * Renders one of `words` and cycles through them with a cross-fade,
 * used for the cycling animated headline in the Hero section.
 */
export function AnimatedText({
  words,
  className,
  interval = 2800,
  cycleDuration = 0.95,
}: AnimatedTextProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, prefersReduced]);

  const current = words[index];

  return (
    <h1
      className={cn("inline-flex items-center leading-none font-display", className)}
      aria-live="polite"
    >
      <motion.span
        key={current}
        initial={
          prefersReduced
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 6, filter: "blur(8px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={
          prefersReduced
            ? { duration: 0.01 }
            : { type: "tween", duration: cycleDuration, ease: "easeInOut" }
        }
        className="inline-block whitespace-nowrap"
      >
        {current}
      </motion.span>
    </h1>
  );
}
