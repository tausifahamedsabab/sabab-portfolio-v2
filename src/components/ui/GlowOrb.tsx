"use client";

import { cn } from "@/lib/utils";

export interface GlowOrbProps {
  className?: string;
}

/** Decorative animated radial glow (CSS-only, ~zero cost). */
export function GlowOrb({ className }: GlowOrbProps) {
  return <div className={cn("glow-orb", className)} aria-hidden="true" />;
}
