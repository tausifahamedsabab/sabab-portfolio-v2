"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface ProjectMediaViewProps {
  media: { src: string; alt: string; width?: number; height?: number };
  className?: string;
}

export function ProjectMediaView({ media, className }: ProjectMediaViewProps) {
  const isRemote = media.src.startsWith("http");
  const alt = media.alt;

  if (isRemote) {
    return (
      <Image
        src={media.src}
        alt={alt}
        width={media.width ?? 900}
        height={media.height ?? 480}
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
      />
    );
  }

  // Local static assets (like /salonbook-mockup.svg) are rendered with a native <img>.
  return (
    <img
      src={media.src}
      alt={alt}
      width={media.width ?? 640}
      height={media.height ?? 360}
      className={cn("h-full w-full object-cover", className)}
      loading="lazy"
    />
  );
}

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReduced = useReducedMotion();
  const preview = project.media[0];
  const VisibleIcons = project.features.slice(0, 3);

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, threshold: 0.1 }}
      whileHover={{ y: -8 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 34,
        delay: 0,
      }}
      className="group overflow-hidden rounded-3xl border border-[#141722] glass"
      role="listitem"
      data-testid={`project-card-${project.slug}`}
    >
      {preview && (
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[330px]">
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 z-10 grid place-items-center backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {project.category}
              </span>
            </div>
          </div>
          <ProjectMediaView media={preview} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-bg to-transparent" />
        </div>
      )}
      <div className="glass px-6 py-7 sm:px-8 sm:py-9">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/35 bg-accent/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {project.category}
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                {project.title}
              </h3>
            </div>
            <p className="mt-3 max-w-prose text-[13.5px] leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <Link
              href={project.caseStudyHref}
              className="glass-strong rounded-xl border border-[#141722] px-4 py-2 text-xs font-semibold text-fg transition-all hover:border-accent/60 hover:text-accent"
            >
              View Case Study
            </Link>
            {project.liveUrl && (
              <Button href={project.liveUrl} size="sm" icon={<OpenInNewTabIcon />}>
                Live Demo
              </Button>
            )}
            <Button
              href={project.githubUrl}
              variant="outline"
              size="sm"
              icon={<GitHubIcon />}
            >
              GitHub
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {VisibleIcons.slice(0, 2).map((feature) => (
            <span
              key={feature.title}
              className="rounded-lg border border-[#141722] bg-fg/5 px-2.5 py-1 text-[12px] text-muted"
            >
              {feature.title}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#141722] pt-5">
          {project.stack.slice(0, 6).map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <span
                key={item.name}
                className="inline-flex items-center gap-2 text-[13px] text-muted"
              >
                <Icon size={15} className="text-accent" aria-hidden="true" />
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function OpenInNewTabIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14.5" x2="21" y2="3.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.45-5-2.425-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.4c3.14-.35 6.44-1.54 6.44-6.75 0-1.33-.28-2.47-.94-3.34 3.02-.33 6.03-1.42 6.03-3.3 0-.33-.05-.67-.02-1 1.56-.78 2.75-.53 3.27-.26a6.06 6.06 0 0 1 .43 0c1.94-.46 3.67.43 4.06 1.82.06.16.12.33.12.5 0 .14-.04.27-.16.39 1.03.93 1.9 2.1 1.9 4.71 0 1.01-.21 1.97-.27 2.99-.08 1.75.03 3.33.4 4.5a3.37 3.37 0 0 1-.94 2.4c-1.56 1.64-3.12 2.83-4.94 3.3a4.12 4.12 0 0 1-.79.06c-1.32 0-2.65-.8-2.65-2 0-.79.24-1.56.52-2.13-.55-.45-1.48-1.16-1.48-1.84v-.04a5.74 5.74 0 0 0-.88 0 1.9 1.9 0 0 1 .52-1.27c.26-.39.26-.9.26-1.46 0-.57-.1-1.1-.26-1.5a1.74 1.74 0 0 0-.88-1.22 3.3 3.3 0 0 0-.88-1.4 9.3 9.3 0 0 0-.26-1.3C3.06 7.48 2 6.85 2 6 2 4.8 3.06 4.05 4.3 3.54c.26-.07.58-.12.88-.12.3 0 .58.05.88.12C7.94 4.05 9 4.8 9 6c0 .45-.06.88-.26 1.3-.26.4-.58.77-.88 1.04a2.34 2.34 0 0 0-.88 1.08c-.1.38-.14.77-.14 1.17 0 .37.04.72.14 1.03.1.28.3.53.52.78.2.24.45.45.75.64-.06.24-.27.48-.52.75-.08-.1-.16-.2-.24-.3a8.2 8.2 0 0 0-.43-.46c-.24-.26-.53-.5-.88-.64a2.24 2.24 0 0 1-.52-1.25c.03-.5.25-.98.52-1.37.26-.42.62-.78 1.04-1.04.42-.26.87-.46 1.34-.62a3.5 3.5 0 0 1 1.34-.12c.47.11.94.35 1.34.62a4.9 4.9 0 0 1 1.34 1.72c.1.38.14.77.14 1.15 0 .38-.04.72-.14 1.05-.1.32-.28.6-.52.85-.22.26-.46.47-.75.64a2.75 2.75 0 0 1-.75.13c-.37 0-.72-.1-1.04-.3.02-.16.04-.3.04-.45 0-.57.1-1.1.26-1.6.16-.5.44-.95.88-1.3.44-.35.94-.58 1.48-.6 1.02-.02 2 0 2.92.14 1.07.12 2.2.42 3.24.9 0-.42.02-.82.06-1.2.04-.5.22-.98.48-1.43.26-.44.62-.86 1.04-1.22.42-.35.88-.62 1.4-.8a3.2 3.2 0 0 1 1.42-.12c.52.14 1.02.5 1.34.98.32.48.4 1.02.4 1.56 0 .52.5.86 1.08.86.55 0 1.08-.37 1.34-.88a8.9 8.9 0 0 0 .4-1.74c.14-.95.06-1.94.06-3 0-2.25 1.08-4.3 2.65-5.45.16-.1.32-.15.52-.12a1.5 1.5 0 0 1 .5.1 7.5 7.5 0 0 0 .8.1c.85 0 1.7-.17 2.4-.47 2.36-.9 4.32-1.96 5.9-3.16a2.6 2.6 0 0 1 1.48-.35 1.5 1.5 0 0 1 .9.35c.32.18.4.6.4.9v1c.06 1 .1 2.06.1 3.13 0 .48.02.95.08 1.4.06.42.16.8.32 1.15.16.3.34.56.54.8.2.23.4.43.66.6.26.15.52.26.84.32.3.05.6.05.9 0 .3-.04.6-.18.86-.4a.95.95 0 0 1 .3-.2c.46-.2.86-.58 1.04-1.16a.7.7 0 0 0-.18-.66 2 2 0 0 0-.78-.34c-.72-.2-1.5-.5-1.42-1.18.08-.47.64-.82 1.32-.94a2.97 2.97 0 0 1 .86.02c.66.1 1.18.56 1.18 1.18 0 .55-.3 1.02-.78 1.28-.46.24-1.03.22-1.5.02-.46-.18-.88-.47-1.26-.87A7.5 7.5 0 0 0 21 9" />
    </svg>
  );
}
