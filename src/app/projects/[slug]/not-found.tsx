"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function ProjectNotFound() {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#08090D] px-6">
      <div className="glow-orb pointer-events-none -z-10 h-[400px] w-[400px] opacity-40" />
      <motion.div
        className="glass-strong rounded-3xl border border-[#141722] p-10 text-center"
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
      >
        <SectionHeading
          title="404 — Project Not Found"
          subtitle="This case study page could not be found."
          align="center"
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/projects" className="whitespace-nowrap">
            Back to Projects
          </Button>
          <Link href="/projects" className="text-[13px] text-accent transition-colors hover:text-fg">
            View all projects
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
