"use client";

/* eslint-disable react-hooks/static-components -- getIcon resolves a stable per-name Lucide component; rendering it is intentional */

import { motion, useReducedMotion } from "framer-motion";
import { personalInfo, serviceCards } from "@/data/details";
import { getIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export function Services() {
  const prefersReduced = useReducedMotion() ?? false;
  const { ref, inView } = useInViewOnce(0.1);

  return (
    <section id="services" className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading title={personalInfo.servicesHeading} />
      <motion.div
        ref={ref}
        className="mt-14 grid gap-6 sm:grid-cols-3"
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
      >
        {serviceCards.map((card, i) => (
          <motion.div
            key={card.title}
            whileHover={prefersReduced ? undefined : { y: -6 }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            className="glass-strong rounded-3xl border border-[#141722] p-8 transition-all hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(139,92,246,0.1)]"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="mb-5 grid place-items-center rounded-2xl border border-[#141722] bg-fg/5 p-5">
              <ServiceIcon name={card.icon} />
            </div>
            <h3 className="font-display text-xl font-bold text-fg">{card.title}</h3>
            <p className="mt-3 text-muted leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ServiceIcon({ name, size = 26 }: { name: string; size?: number }) {
  const Icon = getIcon(name);
  return <Icon size={size} className="text-accent" aria-hidden="true" />;
}
