"use client";

/* eslint-disable react-hooks/static-components -- getIcon resolves a stable per-name Lucide component; rendering it is intentional */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { SkillItem } from "@/data/skills";
import { getIcon } from "@/lib/icons";
export interface SkillCardProps {
  skill: SkillItem;
  delay?: number;
}

function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const C = getIcon(name);
  return <C size={size} className={className} aria-hidden="true" />;
}

export function SkillCard({ skill, delay = 0 }: SkillCardProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: string; y: string }>({ x: "0deg", y: "0deg" });

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReduced) return;
    const onMouseMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = r.width ? (e.clientX - r.left) / r.width - 0.5 : 0;
      const py = r.height ? (e.clientY - r.top) / r.height - 0.5 : 0;
      setTilt({ x: `${-py * 7}deg`, y: `${px * 7}deg` });
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
          "--tilt-x": prefersReduced ? "0deg" : tilt.x,
          "--tilt-y": prefersReduced ? "0deg" : tilt.y,
        } as React.CSSProperties
      }
      role="listitem"
    >
      <div className="grid place-items-center glass-strong rounded-xl p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <Icon name={skill.icon} size={20} className="text-accent" aria-hidden="true" />
      </div>
      <span className="truncate font-display text-[15px] font-semibold tracking-tight text-fg">
        {skill.name}
      </span>
    </motion.div>
  );
}
