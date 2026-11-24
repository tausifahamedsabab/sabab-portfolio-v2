"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { skillCategories } from "@/data/skills";
import { personalInfo } from "@/data/details";
import { SkillCard } from "@/components/ui/SkillCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

export function Skills() {
  const prefersReduced = useReducedMotion() ?? false;
  const [filter, setFilter] = useState<string>("all");
  const visibleCategories = useMemo(() => {
    if (filter === "all") return skillCategories;
    return skillCategories.filter((c) => c.title === filter);
  }, [filter]);
  const { ref, inView } = useInViewOnce(0.1);

  return (
    <section id="skills" className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading title={personalInfo.skillsHeading} subtitle={personalInfo.skillsSubtitle} />

      <motion.nav
        ref={ref}
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        className="mb-8 mt-10 flex flex-wrap items-center gap-2 md:gap-3"
        role="tablist"
        aria-label="Skill categories"
      >
        {["All Skills", ...skillCategories.map((c) => c.title)].map((label) => {
          const active = filter === label;
          return (
            <motion.button
              key={label}
              data-skill-filter={label}
              role="tab"
              aria-selected={active}
              whileTap={prefersReduced ? undefined : { scale: 0.96 }}
              transition={
                prefersReduced
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 300, damping: 30 }
              }
              onClick={() => setFilter(label)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-150",
                active
                  ? "bg-fg text-[#0A0A0A] shadow-lg shadow-black/20"
                  : "glass text-muted hover:text-fg",
              )}
            >
              {label}
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Skills grid */}
      <div
        className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        role="list"
        aria-label="Technologies"
      >
        {visibleCategories.map((cat) =>
          cat.skills.map((skill) => <SkillCard key={skill.name} skill={skill} />),
        )}
      </div>

      {/* Category subtitles when a single category is selected */}
      {visibleCategories.length === 1 && (
        <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-muted" role="note">
          {visibleCategories[0].subtitle}
        </p>
      )}
    </section>
  );
}
