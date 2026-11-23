"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = "left",
  className,
}: SectionHeadingProps) {
  const prefersReduced = useReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.1, once: true });
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-left";

  const transition = prefersReduced
    ? { duration: 0.01 }
    : { duration: 0.7, ease: "easeOut" as const };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={null}
      transition={transition}
      className={cn("flex flex-col gap-3 md:gap-4", className)}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/45 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {badge}
        </span>
      )}
      <div className={cn("flex flex-col gap-3", alignClasses)}>
        <h2 className="font-display font-black text-fg text-2xl tracking-tight md:text-3xl lg:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-muted text-base leading-relaxed md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
