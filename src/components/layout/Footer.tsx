"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { personalInfo, navSections } from "@/data/details";
import { Button } from "@/components/ui/Button";
import { BrandGitHub, BrandLinkedIn, BrandMail } from "@/components/ui/BrandIcons";
import { FooterYear } from "@/components/layout/FooterYear";
import { cn } from "@/lib/utils";

function FooterYearFallback() {
  return (
    <span className="font-display text-sm font-black tracking-[0.2em] text-fg">
      © 2026
    </span>
  );
}

export function Footer() {
  const prefersReduced = useReducedMotion() ?? false;

  const stagger = (i: number) => ({
    initial: prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 },
    animate: prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: prefersReduced ? { duration: 0.01 } : { duration: 0.7, delay: 0.06 * i, ease: "easeOut" as const },
  });

  return (
    <footer className="border-t border-[#141722] bg-bg-2 px-6 py-12 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-12">
          <motion.div {...stagger(0)} className="flex flex-col gap-3 md:col-span-4">
            <motion.span className="font-display text-2xl font-black tracking-[0.28em] text-fg">SABAB.DEV</motion.span>
            <p className="max-w-xs text-[13.5px] leading-relaxed text-muted">{personalInfo.footerIntro}</p>
            <div className="flex items-center gap-4 text-[13px] text-muted">
              <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-accent">
                <BrandMail className="text-accent" />
                {personalInfo.email}
              </a>
              <Button href={personalInfo.githubUrl} variant="outline" size="sm" icon={<BrandGitHub />} className="px-3">
                GitHub
              </Button>
              <Button href={personalInfo.linkedinUrl} variant="outline" size="sm" icon={<BrandLinkedIn />} className="px-3">
                LinkedIn
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4">
            <motion.div {...stagger(1)}>
              <h4 className="mb-4 font-display text-xs font-black uppercase tracking-[0.22em] text-fg">
                Navigation
              </h4>
              <ul className="flex flex-col gap-2">
                {navSections.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-[13px] text-muted transition-colors hover:text-accent">
                      {s.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/projects/salonbook" className="text-[13px] text-muted transition-colors hover:text-accent">
                    SalonBook
                  </Link>
                </li>
                <li>
                  <Link href="/projects/studiospace" className="text-[13px] text-muted transition-colors hover:text-accent">
                    StudioSpace
                  </Link>
                </li>
                <li>
                  <Link href="/projects/bazar-dor" className="text-[13px] text-muted transition-colors hover:text-accent">
                    Bazar-Dor
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div {...stagger(2)}>
              <h4 className="mb-4 font-display text-xs font-black uppercase tracking-[0.22em] text-fg">
                Connect
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] text-muted transition-colors hover:text-accent">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[13px] text-muted transition-colors hover:text-accent">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={`mailto:${personalInfo.email}`} className="text-[13px] text-muted transition-colors hover:text-accent">
                    Email
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div {...stagger(3)} className="flex flex-col items-center gap-3 text-center md:col-span-4 md:items-end">
            <Suspense fallback={<FooterYearFallback />}>
              <FooterYear />
            </Suspense>
            <p className="text-[13px] text-muted">Tausif Ahamed Sabab</p>
            <p className="text-[11px] text-[#475569]">Built with Next.js, TypeScript, Tailwind CSS and Framer Motion</p>
          </motion.div>
        </div>
      </div>
      <div className={cn("pointer-events-none relative z-10 mt-10 border-t border-[#141722] pt-6 text-center")}>
        <motion.p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted" {...stagger(4)}>
          All external links verified — live deployment links are listed per project.
        </motion.p>
      </div>
    </footer>
  );
}
