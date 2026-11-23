import type { Project, ProjectArchitecture } from "@/data/projects";
import { projects } from "@/data/projects";

// ---- Personal info ----------------------------------------------------------

export const personalInfo = {
  name: "Tausif Ahamed Sabab",
  headline: "Building Modern Digital Experiences from Frontend to Backend.",
  title: "Full-Stack Web Developer",
  shortIntro:
    "I'm a passionate Full-Stack Web Developer focused on building modern, responsive, and user-friendly web applications. I enjoy turning ideas into functional digital products using modern web technologies.",
  availability: "Open to Internships & Junior Developer Opportunities.",
  githubUrl: "https://github.com/tausifahamedsabab",
  linkedinUrl: "https://linkedin.com/in/tausif-ahmed-sabab",
  email: "taosifahmed042@gmail.com",
  heroBadge: "AVAILABLE FOR FULL STACK WEB DEVELOPMENT ROLES",
  heroHeadline: "Hi, I'm Tausif Ahamed Sabab.",
  heroAnimatedHeadline: [
    "Full-Stack Web Developer",
    "Next.js Developer",
    "React Developer",
    "Building Digital Experiences",
  ],
  heroDescription:
    "I build modern, scalable, and user-focused web applications. From crafting beautiful frontend interfaces to developing secure backend systems, I enjoy bringing complete digital products to life.",
  heroButtons: ["Explore My Work", "Let's Talk", "Download Resume"],
  aboutHeading: "Beyond The Code.",
  skillsHeading: "My Technical Arsenal.",
  skillsSubtitle: "Code, tools and practices that define my craft.",
  projectsHeading: "Selected Works.",
  projectsSubtitle:
    "Real applications. Practical solutions. Built with modern technologies.",
  journeyHeading: "My Development Journey.",
  servicesHeading: "What I Do.",
  contactHeading: "Have a Project in Mind?",
  contactSubtitle:
    "Let's connect and build something meaningful together.",
  footerIntro:
    "Frontend, backend, database and authentication expertise — building modern web experiences.",
};

// ---- Service cards ----------------------------------------------------------

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export const serviceCards: ServiceCard[] = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, accessible, and visually appealing user interfaces.",
    icon: "AppWindow",
  },
  {
    title: "Backend Development",
    description:
      "Developing APIs, authentication systems, database integrations, and server-side functionality.",
    icon: "Server",
  },
  {
    title: "Full-Stack Development",
    description:
      "Building complete web applications from user interface to backend infrastructure.",
    icon: "Atom",
  },
];

// ---- Architecture diagrams --------------------------------------------------

export const architectureDiagrams: Record<string, ProjectArchitecture> = {
  salonbook: {
    title: "SalonBook — System Architecture",
    description:
      "Browser ↔ Next.js frontend ↔ Express.js REST API ↔ MongoDB. Authentication runs through Better Auth sessions on the backend, enforced by JWT verification middleware and server-side role checks.",
    layers: [
      {
        id: "browser",
        title: "User Browser",
        nodes: [
          {
            id: "browser",
            title: "User Browser",
            subtitle: "Sign up, book, pay — browser only",
            icon: "User",
            color: "external",
          },
        ],
      },
      {
        id: "frontend",
        title: "Next.js Frontend",
        nodes: [
          {
            id: "nextjs",
            title: "Next.js App Router",
            subtitle: "TypeScript + React + Tailwind",
            icon: "AppWindow",
            color: "frontend",
          },
          {
            id: "session-cookie",
            title: "Better Auth session cookie",
            subtitle: "HTTP-only cookie sent by the browser",
            icon: "Lock",
            color: "auth",
          },
        ],
      },
      {
        id: "backend",
        title: "Express.js API",
        nodes: [
          {
            id: "express",
            title: "Express.js REST API",
            subtitle: "auth, services, appointments, payments",
            icon: "Server",
            color: "backend",
          },
          {
            id: "better-auth",
            title: "Better Auth",
            subtitle: "Session management + role checks",
            icon: "Key",
            color: "auth",
          },
          {
            id: "jwt-middleware",
            title: "JWT Verification Middleware",
            subtitle: "requireAuth / requireRole",
            icon: "ShieldCheck",
            color: "auth",
          },
          {
            id: "stripe",
            title: "Stripe",
            subtitle: "Checkout + webhooks",
            icon: "CreditCard",
            color: "external",
          },
          {
            id: "imgbb",
            title: "ImgBB",
            subtitle: "Service image uploads",
            icon: "Image",
            color: "external",
          },
        ],
      },
      {
        id: "database",
        title: "Database",
        nodes: [
          {
            id: "mongo",
            title: "MongoDB",
            subtitle: "Mongoose · user, services, appointments, transactions",
            icon: "Database",
            color: "database",
          },
        ],
      },
    ],
    edges: [
      { from: "browser", to: "nextjs", label: "HTTP requests (session cookie attached)" },
      { from: "browser", to: "better-auth", label: "Session cookie (reads session)" },
      { from: "nextjs", to: "express", label: "API calls via src/lib/serverApi.ts (role checks)" },
      { from: "express", to: "better-auth", label: "Verify session & roles (JWT)" },
      { from: "express", to: "jwt-middleware", label: "requireAuth / requireRole middleware" },
      { from: "express", to: "mongo", label: "CRUD via Mongoose" },
      { from: "stripe", to: "express", label: "Checkout success/cancel + payment webhooks (verified)" },
      { from: "express", to: "stripe", label: "Stripe Checkout redirects, payment intents" },
      { from: "imgbb", to: "express", label: "Service image uploads" },
    ],
    notes: [
      {
        node: "mongo",
        text: "Four collections: user (Better Auth, with role + isBlocked), services, appointments, and transactions.",
      },
      {
        node: "jwt-middleware",
        text: "Stripe transaction records are written only after a verified webhook.",
      },
      {
        node: "better-auth",
        text: "Public registration can never create an admin; ALLOW_ADMIN_REGISTRATION must stay false.",
      },
    ],
  },
  studiospace: {
    title: "StudioSpace — System Architecture",
    description:
      "Browser ↔ Next.js frontend ↔ StudioSpace API layer ↔ MongoDB. In mock mode the API layer is an in-memory store (no backend required); in live mode it calls the Express.js API in studio-space-server through HTTP-only session cookies.",
    layers: [
      {
        id: "browser",
        title: "User Browser",
        nodes: [
          {
            id: "browser",
            title: "User Browser",
            subtitle: "Browse studios, book, manage listings",
            icon: "User",
            color: "external",
          },
        ],
      },
      {
        id: "frontend",
        title: "Next.js Frontend",
        nodes: [
          {
            id: "frontend",
            title: "Next.js App Router",
            subtitle: "React 19 · TypeScript · Swiper · Base UI",
            icon: "AppWindow",
            color: "frontend",
          },
        ],
      },
      {
        id: "api-layer",
        title: "StudioSpace API Layer",
        nodes: [
          {
            id: "api-layer",
            title: "StudioSpace API Layer",
            subtitle: "Mock (in-memory) or live",
            icon: "Layers",
            color: "backend",
          },
        ],
      },
      {
        id: "backend",
        title: "Express.js API",
        nodes: [
          {
            id: "server",
            title: "Express.js + Mongoose",
            subtitle: "auth, studios, bookings routes",
            icon: "Server",
            color: "backend",
          },
        ],
      },
      {
        id: "database",
        title: "Database",
        nodes: [
          {
            id: "mongo",
            title: "MongoDB",
            subtitle: "Mongoose collections: studios, users, bookings",
            icon: "Database",
            color: "database",
          },
        ],
      },
    ],
    edges: [
      { from: "browser", to: "frontend", label: "HTTP requests" },
      { from: "frontend", to: "api-layer", label: "API calls (mock or live)" },
      { from: "api-layer", to: "server", label: "Live mode → REST endpoints (studio-space-server)" },
      { from: "server", to: "mongo", label: "CRUD via Mongoose" },
    ],
    notes: [
      {
        node: "api-layer",
        text: "Two modes: `API_MODE=mock` (default) — in-memory store with seeded studios/users/bookings (`src/lib/api/mock/store.ts`); `API_MODE=live` — calls the Express API server-side from Next.js.",
      },
      {
        node: "server",
        text: "HTTP-only session cookies carry signed JWT sessions (`GET /api/auth/me` resolves the session). Routes: auth, studios (list/detail/categories/cities/availability/reviews), bookings (create/cancel).",
      },
      {
        node: "mongo",
        text: "Bookings start as `pending`; only `confirmed` bookings block studio availability.",
      },
    ],
  },
  bazar-dor: {
    title: "Bazar-Dor — System Architecture",
    description:
      "Browser ↔ Next.js frontend ↔ external Bazaar-Dor API. This repo ships no backend; product data is fetched server-side from `API_BASE_URL` (`/api/bazardor/categories`, `/api/bazardor/products/:id`) with `revalidate: 60`.",
    layers: [
      {
        id: "browser",
        title: "User Browser",
        nodes: [
          {
            id: "browser",
            title: "User Browser",
            subtitle: "Browse Bangla products, view details",
            icon: "User",
            color: "external",
          },
        ],
      },
      {
        id: "frontend",
        title: "Next.js Frontend",
        nodes: [
          {
            id: "frontend",
            title: "Next.js App Router",
            subtitle: "Server components fetch data",
            icon: "AppWindow",
            color: "frontend",
          },
        ],
      },
      {
        id: "api",
        title: "Bazaar-Dor API (external)",
        nodes: [
          {
            id: "api",
            title: "Bazaar-Dor API",
            subtitle: "/api/bazardor/categories · /api/bazardor/products/:id",
            icon: "ExternalLink",
            color: "backend",
          },
        ],
      },
    ],
    edges: [
      { from: "browser", to: "frontend", label: "HTTP requests (SSR)" },
      { from: "frontend", to: "api", label: "Server-side fetch from API_BASE_URL (revalidate: 60)" },
    ],
    notes: [
      {
        node: "api",
        text: "External API serving categories (with icons), products (today/yesterday/lastWeek/lastMonth prices, ▲/▼/• change indicators, multi-market min/max ranges).",
      },
    ],
  },
};

// ---- Project detail page sections (per verified repo facts) -----------------

export interface ProjectSectionDef {
  title: string;
  subtitle?: string;
}

export interface ProjectProblem {
  statement: string;
  objectives: string[];
  solution: string;
}

export const projectSections: Record<string, ProjectSectionDef[]> = {
  salonbook: [
    { title: "Project Overview", subtitle: "Mature-style online service platform" },
    { title: "The Problem" },
    { title: "Project Objectives" },
    { title: "Solution & Implementation" },
    { title: "Main Features" },
    { title: "Frontend Architecture" },
    { title: "Backend Architecture" },
    { title: "Database Design Overview" },
    { title: "Authentication & Security Approach" },
    { title: "Challenges and Solutions" },
    { title: "Technology Stack" },
    { title: "Screenshots and Visual Previews" },
    { title: "Links" },
  ],
  studiospace: [
    { title: "Project Overview", subtitle: "Peer-to-peer studio marketplace" },
    { title: "The Problem" },
    { title: "Project Objectives" },
    { title: "Solution & Implementation" },
    { title: "Main Features" },
    { title: "Frontend Architecture" },
    { title: "Backend Architecture" },
    { title: "Database Design Overview" },
    { title: "Authentication & Security Approach" },
    { title: "Challenges and Solutions" },
    { title: "Technology Stack" },
    { title: "Screenshots and Visual Previews" },
    { title: "Links" },
  ],
  bazar-dor: [
    { title: "Project Overview", subtitle: "Bengali product catalog" },
    { title: "The Problem" },
    { title: "Project Objectives" },
    { title: "Solution & Implementation" },
    { title: "Main Features" },
    { title: "Frontend Architecture" },
    { title: "Backend Architecture" },
    { title: "Database Design Overview" },
    { title: "Authentication & Security Approach" },
    { title: "Challenges and Solutions" },
    { title: "Technology Stack" },
    { title: "Screenshots and Visual Previews" },
    { title: "Links" },
  ],
};

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
