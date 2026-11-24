import { Suspense } from "react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/data/details";
import { ProjectDetailPage } from "@/components/sections/ProjectDetailPage";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ProjectDetailPageSkeleton />}>
      <ProjectSlugPageInner params={params} />
    </Suspense>
  );
}

async function ProjectSlugPageInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();
  return <ProjectDetailPage project={project} />;
}

function ProjectDetailPageSkeleton() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-6xl animate-pulse items-center justify-center px-6 md:px-10">
      <div className="h-8 w-40 rounded-full bg-fg/10" />
    </div>
  );
}
