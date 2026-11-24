"use client";

import { motion, useReducedMotion } from "framer-motion";
import { journeySteps } from "@/data/journey";
import { personalInfo } from "@/data/details";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

export function Journey() {
  const prefersReduced = useReducedMotion() ?? false;
  const { ref, inView } = useInViewOnce(0.08);

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading title={personalInfo.journeyHeading} align="left" />

      <motion.div
        ref={ref}
        className="relative mt-16"
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
      >
        {/* Vertical timeline line */}
        <div className="absolute left-[12px] top-0 -z-10 h-full w-[2px] rounded-full bg-accent/35" />

        <div className="flex flex-col gap-10">
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={inView || prefersReduced ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 18, filter: "blur(6px)" }}
              transition={{ type: "tween", duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" }}
              className={cn(
                "group -mt-1 flex gap-6 border-l-2 border-[#141722] pl-8 transition-all hover:border-accent/70 hover:pl-10",
              )}
            >
              <div className="relative">
                <span className="block h-4 w-4 rounded-full border-2 border-accent bg-[#08090D]" />
                <span className="absolute -inset-2.5 rounded-full bg-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute -top-6 left-1 font-mono text-[10px] uppercase tracking-wider text-muted">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-col gap-1 py-2">
                <motion.h3
                  className="font-display text-base font-black text-fg transition-colors group-hover:text-accent"
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.4, ease: "easeOut" }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-muted"
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ delay: 0.45 + i * 0.12, duration: 0.4, ease: "easeOut" }}
                >
                  {step.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
