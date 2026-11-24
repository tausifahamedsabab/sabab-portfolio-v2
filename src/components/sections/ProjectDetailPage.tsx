"use client";

/* eslint-disable react-hooks/static-components -- getIcon resolves a stable per-name Lucide component; rendering it is intentional */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import {
  architectureDiagrams,
  personalInfo,
  projectDetails,
  projectLayerNotes,
} from "@/data/details";
import { projects } from "@/data/projects";
import { SystemArchitectureDiagram } from "@/components/ui/SystemArchitectureDiagram";
import { ProjectMediaView } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { BrandGitHub } from "@/components/ui/BrandIcons";

function Section({
  title,
  children,
  i,
  prefersReduced,
}: {
  title: string;
  children: React.ReactNode;
  i: number;
  prefersReduced: boolean;
}) {
  return (
    <motion.section
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ type: "tween", duration: 0.7, delay: 0.08 * i, ease: "easeOut" }}
      className="mb-12 md:mb-14"
    >
      <SectionHeading title={title} />
      <div className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-muted md:text-[15.5px]">
        {children}
      </div>
    </motion.section>
  );
}

function LiveIcon() {
  const Icon = getIcon("ArrowUpRight");
  return <Icon size={15} aria-hidden="true" />;
}

export function ProjectDetailPage({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion() ?? false;
  const details = projectDetails[project.slug];
  const layerNotes = projectLayerNotes[project.slug];
  const arch = architectureDiagrams[project.slug];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <motion.header
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
      >
        <div className="glass-strong rounded-3xl border border-[#141722] px-6 py-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {project.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-fg sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 max-w-xl text-muted">{project.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Button href={project.liveUrl} icon={<LiveIcon />}>
                Live Demo
              </Button>
            )}
            <Button href={project.githubUrl} variant="outline" icon={<BrandGitHub />}>
              GitHub Repo
            </Button>
            {project.serverUrl && (
              <Button href={project.serverUrl} variant="outline" icon={<BrandGitHub />}>
                Server Repo
              </Button>
            )}
            <Link href="/projects" className="text-[13px] text-muted transition-colors hover:text-accent">
              ← All Projects
            </Link>
          </div>
          {project.media[0] && (
            <div className="mt-6">
              <ProjectMediaView media={project.media[0]} className="h-[220px] rounded-2xl object-cover" />
            </div>
          )}
        </div>
      </motion.header>

      <Section title="Project Overview" i={1} prefersReduced={prefersReduced}>
        <p>{project.description}</p>
      </Section>

      <Section title="The Problem" i={2} prefersReduced={prefersReduced}>
        <p>{details.statement}</p>
      </Section>

      <Section title="Project Objectives" i={3} prefersReduced={prefersReduced}>
        <ul className="flex flex-col gap-2">
          {details.objectives.map((o) => (
            <motion.li key={o} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-semibold text-fg">{o}</span>
            </motion.li>
          ))}
        </ul>
      </Section>

      <Section title="Solution & Implementation" i={4} prefersReduced={prefersReduced}>
        <p>{details.solution}</p>
      </Section>

      <Section title="Main Features" i={5} prefersReduced={prefersReduced}>
        <ul className="flex flex-col gap-3">
          {project.features.map((f) => (
            <motion.li key={f.title} className="glass rounded-xl border border-[#141722] p-4">
              <p className="font-semibold text-fg">{f.title}</p>
              {f.description && <p className="mt-1 text-muted">{f.description}</p>}
            </motion.li>
          ))}
        </ul>
      </Section>

      <Section title="Frontend Architecture" i={6} prefersReduced={prefersReduced}>
        <p>{layerNotes.frontend}</p>
      </Section>

      <Section title="Backend Architecture" i={7} prefersReduced={prefersReduced}>
        <p>{layerNotes.backend}</p>
      </Section>

      <Section title="Database Design Overview" i={8} prefersReduced={prefersReduced}>
        <p>{layerNotes.database}</p>
      </Section>

      <Section title="Authentication & Security Approach" i={9} prefersReduced={prefersReduced}>
        <p>{layerNotes.auth}</p>
      </Section>

      <Section title="Challenges and Solutions" i={10} prefersReduced={prefersReduced}>
        <ul className="flex flex-col gap-3">
          {details.challenges.map((c) => (
            <li key={c.issue} className="glass rounded-xl border border-[#141722] p-4">
              <p className="font-semibold text-fg">{c.issue}</p>
              <p className="mt-1 text-muted">{c.solution}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Technology Stack" i={11} prefersReduced={prefersReduced}>
        <div className="flex flex-wrap items-center gap-4">
          {project.stack.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <span key={s.name} className="inline-flex items-center gap-2 text-muted">
                <Icon size={15} className="text-accent" aria-hidden="true" />
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg transition-colors hover:text-accent"
                >
                  {s.name}
                </a>
              </span>
            );
          })}
        </div>
      </Section>

      <Section title="System Architecture" i={12} prefersReduced={prefersReduced}>
        <SystemArchitectureDiagram diagram={arch} />
      </Section>

      <Section title="Screenshots and Visual Previews" i={13} prefersReduced={prefersReduced}>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.media.map((m, j) => (
            <motion.div key={j} className="glass-strong rounded-2xl border border-[#141722] p-3">
              <ProjectMediaView media={m} className="h-[260px] w-full rounded-xl object-cover" />
              <p className="mt-2 text-[12px] text-muted">{m.alt}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Links" i={14} prefersReduced={prefersReduced}>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && <Button href={project.liveUrl}>Live Demo</Button>}
          {project.serverUrl && <Button href={project.serverUrl}>Server Repo</Button>}
          <Button href={project.githubUrl} icon={<BrandGitHub />}>
            GitHub Repo
          </Button>
          <Button href={`mailto:${personalInfo.email}`}>Email Tausif</Button>
        </div>
      </Section>

      {/* Navigation */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-between gap-4 border-t border-[#141722] pt-8"
      >
        {prev && (
          <Link
            href={prev.caseStudyHref}
            className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-accent"
          >
            ← Previous: {prev.title}
          </Link>
        )}
        {next && (
          <Link
            href={next.caseStudyHref}
            className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-accent"
          >
            Next: {next.title} →
          </Link>
        )}
      </motion.div>
    </div>
  );
}
