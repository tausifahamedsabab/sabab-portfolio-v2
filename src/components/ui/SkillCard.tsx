"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { SkillItem } from "@/data/skills";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface SkillCardProps {
  skill: SkillItem;
  delay?: number;
}

export function SkillCard({ skill, delay = 0 }: SkillCardProps) {
  const prefersReduced = useReducedMotion();
  const Icon = getIcon(skill.icon);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReduced) return;
    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = r.width ? (e.clientX - r.left) / r.width - 0.5 : 0;
      const py = r.height ? (e.clientY - r.top) / r.height - 0.5 : 0;
      setTilt({ x: -py * 7, y: px * 7 });
    };
    el.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [prefersReduced]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="skill-card glass rounded-2xl px-5 py-5 flex items-center gap-4 sm:gap-5"
      style={
        {
          "--tilt-x": prefersReduced ? 0 : tilt.x,
          "--tilt-y": prefersReduced ? 0 : tilt.y,
        } as React.CSSProperties
      }
      role="listitem"
    >
      <div className="grid place-items-center glass-strong rounded-xl p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <Icon size={20} className="text-accent" aria-hidden="true" />
      </div>
      <span className="truncate font-display text-[15px] font-semibold tracking-tight text-fg">
        {skill.name}
      </span>
    </motion.div>
  );
}
