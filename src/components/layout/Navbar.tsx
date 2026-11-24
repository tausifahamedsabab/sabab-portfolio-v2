"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { personalInfo, navSections } from "@/data/details";
import { Button } from "@/components/ui/Button";
import { BrandGitHub, BrandLinkedIn, BrandMail } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

const DOWNLOAD_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const X_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MENU_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const EMAIL_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m3 6 9 6 9-6" />
  </svg>
);

function resumeMailto() {
  return (
    "mailto:" +
    personalInfo.email +
    "?subject=" +
    encodeURIComponent("Resume request") +
    "&body=" +
    encodeURIComponent(
      "Hi Tausif Ahamed Sabab,\n\nI'm interested in your resume — could you please share it?\n\nBest regards,",
    )
  );
}

export function Navbar() {
  const prefersReduced = useReducedMotion();
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const updateIndicator = () => {
    const nav = navRef.current;
    if (!nav) return;
    const current = navSections.reduce((acc, s) => {
      const el = document.getElementById(s.href.slice(1));
      if (el && el.offsetTop <= window.scrollY + 88) return s;
      return acc;
    }, navSections[0]);
    const el = document.getElementById(current.href.slice(1));
    const navRect = nav.getBoundingClientRect();
    const rect = el?.getBoundingClientRect();
    if (rect) {
      setIndicator({
        left: rect.left - navRect.left + 8,
        width: Math.max(rect.width - 16, 24),
      });
    }
    setScrolled(window.scrollY > 16);
  };

  useEffect(() => {
    updateIndicator();
    const onScroll = () => {
      if (!prefersReduced) updateIndicator();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReduced]);

  const goTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobile();
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={prefersReduced ? { opacity: 1 } : { opacity: 1 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 0.5, ease: "easeOut" }}
        className={cn(
          "relative fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#141722]/40 bg-[#070811]/85 px-4 py-3 backdrop-blur-md transition-all duration-300 md:px-8",
          scrolled && "shadow-[0_3px_14px_rgba(0,0,0,0.25)]",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-display text-xl font-black tracking-[0.28em] text-fg transition-colors hover:text-accent"
          aria-label="SABAB.DEV home"
        >
          SABAB.
          <motion.span className="tracking-[0.08em] text-accent" whileHover={prefersReduced ? undefined : { scale: 1.08 }} transition={{ type: "spring", stiffness: 260 }}>
            DEV
          </motion.span>
        </Link>

        <motion.ul className="hidden items-center gap-1 md:flex" role="menubar">
          {navSections.map((link) => (
            <li key={link.href} className="relative">
              <motion.a
                href={link.href}
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  goTo(link.href);
                }}
                whileHover={prefersReduced ? undefined : { color: "#F8FAFC" }}
                className="block px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-150"
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </motion.ul>

        {/* Animated underline pill */}
        <motion.span
          className="pointer-events-none absolute bottom-2 left-0 z-20 h-[2px] rounded-full bg-linear-to-r from-accent to-accent-2 shadow-[0_0_8px_rgba(139,92,246,0.55)]"
          style={{ left: indicator.left, width: indicator.width }}
          animate={prefersReduced ? { opacity: 0.7 } : { opacity: 0.95 }}
          transition={prefersReduced ? { duration: 0.01 } : { type: "spring", stiffness: 180, damping: 26 }}
          initial={{ opacity: 0 }}
        />

        <div className="hidden items-center gap-3 md:flex">
          <Button href={`mailto:${personalInfo.email}`} variant="outline" size="sm" icon={EMAIL_ICON} className="px-4">
            Email
          </Button>
          <Button href={personalInfo.linkedinUrl} variant="outline" size="sm" icon={<BrandLinkedIn />}>
            LinkedIn
          </Button>
          <Button href={resumeMailto()} size="md" icon={DOWNLOAD_ICON} className="whitespace-nowrap">
            Download Resume
          </Button>
        </div>

        <motion.button
          className="rounded-full p-2 md:hidden"
          aria-label="Open main menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          whileTap={prefersReduced ? undefined : { scale: 0.94 }}
        >
          {MENU_ICON}
        </motion.button>
      </motion.nav>

      {/* Animated mobile panel */}
      <motion.div
        className="fixed inset-0 z-40 flex md:hidden flex-col bg-bg-2/98 backdrop-blur-xl"
        initial={prefersReduced ? { x: 0 } : { x: "100%" }}
        animate={mobileOpen ? { x: 0 } : { x: "100%" }}
        transition={prefersReduced ? { duration: 0.01 } : { type: "spring", stiffness: 260, damping: 30 }}
        style={{ visibility: mobileOpen || prefersReduced ? undefined : undefined }}
      >
        <div className="flex justify-end px-6 pt-7">
          <motion.button onClick={closeMobile} aria-label="Close menu" whileTap={prefersReduced ? undefined : { scale: 0.9 }}>
            {X_ICON}
          </motion.button>
        </div>
        <div className="mt-10 flex flex-col gap-2 px-6">
          {navSections.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 + i * 0.08, duration: 0.45, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                onClick={() => goTo(link.href)}
                className="block rounded-2xl px-4 py-4 text-2xl font-display font-black tracking-tight text-fg transition-colors hover:bg-fg/8 hover:text-accent"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 px-6 pb-10">
          <Button href={resumeMailto()} size="md" icon={DOWNLOAD_ICON} className="justify-center">
            Download Resume
          </Button>
          <Button href={`mailto:${personalInfo.email}`} variant="outline" size="md" icon={EMAIL_ICON} className="justify-center">
            Email Me
          </Button>
        </div>
        <div className="absolute bottom-8 flex items-center justify-between px-6 text-[13px] text-muted">
          <a href={personalInfo.githubUrl} aria-label="GitHub" className="transition-colors hover:text-fg"><BrandGitHub /></a>
          <a href={personalInfo.linkedinUrl} aria-label="LinkedIn" className="transition-colors hover:text-fg"><BrandLinkedIn /></a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="transition-colors hover:text-fg"><BrandMail /></a>
        </div>
      </motion.div>

      {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-30 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobile}
        />
      )}
    </>
  );
}
