"use client";

/* eslint-disable react-hooks/static-components -- getIcon resolves a stable per-name Lucide component; rendering it is intentional */
/* eslint-disable react-hooks/refs -- Framer Motion useInViewOnce requires attaching refs */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/data/details";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { getIcon } from "@/lib/icons";

const AVATAR_URL = "https://avatars.githubusercontent.com/u/297996648?v=4";

const TECH_BADGES: { name: string; icon: string }[] = [
  { name: "Next.js", icon: "AppWindow" },
  { name: "React", icon: "Atom" },
  { name: "Node.js", icon: "Cpu" },
  { name: "MongoDB", icon: "Database" },
  { name: "TypeScript", icon: "Brackets" },
  { name: "Tailwind CSS", icon: "Box" },
  { name: "Express.js", icon: "Server" },
  { name: "Better Auth", icon: "Key" },
];

function scrollToSection(href: string) {
  const el = document.getElementById(href.slice(1));
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Icon({ name, size = 15, className }: { name: string; size?: number; className?: string }) {
  const C = getIcon(name);
  return <C size={size} className={className} aria-hidden="true" />;
}

export function Hero() {
  const prefersReduced = useReducedMotion() ?? false;
  const mouseRef = useRef({ x: -2000, y: -2000, t: 0 });
  const [mouse, setMouse] = useState({ x: -2000, y: -2000 });

  useEffect(() => {
    if (prefersReduced) return;
    const onMouseMove = (e: MouseEvent) => {
      if (performance.now() - mouseRef.current.t < 24) return;
      mouseRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
      setMouse(mouseRef.current);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [prefersReduced]);

  const leftRef = useInViewOnce(0.08).ref;
  const rightRef = useInViewOnce(0.08).ref;
  const scrollRef = useInViewOnce(0.3).ref;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08090D] pt-16 md:pt-24"
      aria-labelledby="hero-title"
    >
      {/* Ambient glows */}
      <div className="glow-orb pointer-events-none top-0 left-[55%] h-[560px] w-[560px] opacity-50 md:left-[80%] md:top-[8%] 2xl:top-[-10%]" />
      <div className="glow-orb pointer-events-none top-[55%] left-[15%] h-[420px] w-[420px] opacity-30" />
      <Particles />

      {/* Mouse-following glow behind the avatar */}
      <div
        className="pointer-events-none absolute z-0 h-[560px] w-[560px] rounded-full bg-accent/25 blur-[140px]"
        style={{
          left: prefersReduced ? -280 : mouse.x - 280,
          top: prefersReduced ? -280 : mouse.y - 280,
          opacity: prefersReduced ? 0.15 : 0.6,
          transition: prefersReduced
            ? "none"
            : "left 0.14s cubic-bezier(0.22, 1, 0.36, 1), top 0.14s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 md:grid-cols-5 md:gap-16 md:px-10 md:py-40 lg:items-center">
        {/* Left column */}
        <motion.div
          ref={leftRef}
          className="flex flex-col gap-8 md:col-span-3 md:order-1 md:pr-6 lg:pr-10"
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0.01 } : { type: "tween", duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {personalInfo.heroBadge}
            </span>
            <span className="text-[12px] text-muted">{personalInfo.availability}</span>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="font-display text-5xl font-black tracking-tight text-fg md:text-6xl lg:text-7xl"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.8, delay: 0.18, ease: "easeOut" }}
          >
            {personalInfo.heroHeadline}
          </motion.h1>

          <div className="min-h-[3.5rem] md:min-h-[4.25rem]">
            <AnimatedText
              words={personalInfo.heroAnimatedHeadline}
              className="text-5xl font-black tracking-tight text-accent md:text-6xl md:leading-none lg:text-7xl"
              interval={3200}
              cycleDuration={1}
            />
          </div>

          <motion.p
            className="max-w-lg text-base leading-relaxed text-muted md:text-lg"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            {personalInfo.heroDescription}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.7, delay: 0.65, ease: "easeOut" }}
          >
            <Button
              href={`mailto:${personalInfo.email}?subject=Resume%20Request&body=Hi%20Tausif%2C%0A%0AI%27m%20interested%20in%20your%20resume.%20Could%20you%20please%20share%20it%3F%0A%0ABest%20regards`}
              title="Resume is requested via your email client — no file is hosted on this site"
              aria-label="Download Resume (via email)"
            >
              Download Resume
            </Button>
            <Button onClick={() => scrollToSection("#projects")} icon={<Icon name="ChevronsRight" size={16} />} title="Browse my projects">
              Explore My Work
            </Button>
            <Button variant="outline" href={`mailto:${personalInfo.email}`} title="Get in touch">
              Let&apos;s Talk
            </Button>
          </motion.div>
        </motion.div>

        {/* Right column — animated profile image */}
        <motion.div
          ref={rightRef}
          className="relative flex items-center justify-center md:col-span-2 md:order-2"
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* gradient glow behind the image */}
          <div className="absolute inset-0 z-0 grid place-items-center -translate-y-[5%]">
            <div className="h-[460px] w-[460px] rounded-full bg-linear-to-br from-accent/32 via-accent-2/22 to-transparent blur-[130px]" />
          </div>

          {/* floating tech badges */}
          <div className="absolute inset-0 z-10 -translate-y-[3%]">
            {TECH_BADGES.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.5 }}
                className="absolute glass-strong rounded-xl border border-[#141722] px-3 py-2 text-[12px] font-semibold text-fg shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-[12px]"
                style={badgePositions[i]}
              >
                <Icon name={badge.icon} className="text-accent" />
                <span className="ml-1.5 whitespace-nowrap">{badge.name}</span>
              </motion.div>
            ))}
          </div>

          {/* avatar */}
          <motion.div
            className="group relative"
            whileHover={prefersReduced ? undefined : { scale: 1.04 }}
            whileTap={prefersReduced ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <Image
              src={AVATAR_URL}
              alt="Tausif Ahamed Sabab"
              width={160}
              height={160}
              priority
              className="rounded-full object-cover ring-8 ring-accent/35 shadow-[0_0_70px_rgba(139,92,246,0.4)]"
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          ref={scrollRef}
          className="col-span-5 mt-6 flex flex-col items-center gap-3"
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ type: "tween", duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <span className="text-[12px] tracking-[0.3em] uppercase text-muted">Scroll to explore</span>
          <motion.div
            className="grid place-items-center rounded-full border border-accent/25 bg-accent/8 p-3"
            animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
            transition={
              prefersReduced
                ? { duration: 0.01 }
                : { type: "tween", duration: 0.9, ease: [0.3, 0, 0.7, 1], repeat: Infinity, repeatDelay: 0.2 }
            }
          >
            <Icon name="ChevronDown" size={18} className="text-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const badgePositions: Record<number, React.CSSProperties> = [
  { top: "-12px", left: "-12px" },
  { top: "-12px", right: "-16px" },
  { bottom: "-8px", right: "-8px" },
  { bottom: "-16px", left: "-16px" },
  { top: "50%", left: "-24px", transform: "translateX(-50%) translateY(-50%)" },
  { bottom: "-16px", left: "50%", transform: "translateX(-50%)" },
  { top: "-24px", right: "50%", transform: "translateX(50%)" },
  { top: "-24px", left: "50%", transform: "translateX(-50%)" },
];
