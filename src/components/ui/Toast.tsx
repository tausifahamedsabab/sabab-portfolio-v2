"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string;
  onDismiss: () => void;
  durationMs?: number;
  icon?: React.ReactNode;
}

export function Toast({
  message,
  onDismiss,
  durationMs = 3600,
  icon,
}: ToastProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(id);
  }, [message, durationMs, onDismiss]);

  const motionTransition = prefersReduced
    ? { duration: 0.01 }
    : { type: "spring" as const, stiffness: 260, damping: 26 };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.97 }}
        transition={motionTransition}
        className={cn(
          "fixed right-5 bottom-6 z-[60] glass-strong rounded-xl px-4 py-3 text-sm font-medium shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-[24px]",
          "flex max-w-[calc(100%-2rem)] items-center gap-2 text-fg"
        )}
        role="status"
      >
        {icon ?? null}
        <span className="whitespace-nowrap font-display tracking-tight">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}
