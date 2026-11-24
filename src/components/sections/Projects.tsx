"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { personalInfo } from "@/data/details";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export function Projects() {
  const prefersReduced = useReducedMotion() ?? false;
  const { ref, inView } = useInViewOnce(0.1);

  return (
    <section id="projects" className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading title={personalInfo.projectsHeading} subtitle={personalInfo.projectsSubtitle} />
      <motion.div
        ref={ref}
        className="mt-14 grid gap-6 md:grid-cols-2"
        role="list"
        aria-label="Featured projects"
        initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={inView || prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
