"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { personalInfo } from "@/data/details";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface AboutBlock {
  title?: string;
  text: string;
  emphasis?: boolean;
}

const blocks: AboutBlock[] = [
  {
    text:
      "I'm a Full-Stack Web Developer focused on building complete web applications, combining modern frontend experiences with backend systems, database integration, and authentication. My projects include a salon booking platform, a studio rental marketplace, and a product price comparison application.",
    emphasis: true,
  },
  {
    title: "Development philosophy",
    text:
      "Beyond the code, I think in terms of problems the user faces: every line should earn its place. My philosophy — build simple, robust systems that feel fast and transparent to the people who use them — drives my choices from architecture to polish.",
  },
  {
    title: "What I enjoy building",
    text:
      "I love building end-to-end web applications: booking platforms, catalogs and marketplaces where users discover something and trust the flow. Working across the whole stack — data models, APIs, polished UI — is where I find my flow.",
  },
  {
    title: "My current learning focus",
    text:
      "My recent focus has been Next.js 16 App Router patterns (typed routes, Cache Components, React Compiler, as used in StudioSpace), performance optimization, and production-grade API integrations.",
  },
  {
    title: "Professional goals",
    text:
      "To ship high-quality, maintainable full-stack applications that hiring managers and recruiters take notice of, while continuously improving my craft.",
  },
];

export function About() {
  const prefersReduced = useReducedMotion() ?? false;
  const { ref, inView } = useInViewOnce(0.1);

  return (
    <section id="about" className="mx-auto w-full max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading title={personalInfo.aboutHeading} align="left" />
      <motion.div
        ref={ref}
        className="mt-10 flex flex-col gap-8"
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={inView || prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.01 }}
      >
        {blocks.map((block, i) => (
          <motion.div
            key={block.title ?? i}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.06 * i, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            {block.title && (
              <h3 className="font-display text-xl font-black text-fg sm:text-2xl">
                {block.title}
              </h3>
            )}
            <p
              className={cn(
                "text-muted leading-relaxed",
                block.emphasis && "text-lg text-fg sm:text-xl",
              )}
            >
              {block.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
