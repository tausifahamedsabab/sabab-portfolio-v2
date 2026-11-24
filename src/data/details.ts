import type { Project, ProjectArchitecture } from "@/data/projects";
import { projects } from "@/data/projects";

// ---- Personal info ----------------------------------------------------------

export const personalInfo = {
  name: "Tausif Ahamed Sabab",
  headline: "Building Modern Digital Experiences from Frontend to Backend.",
  title: "Full-Stack Web Developer",
  shortIntro:
    "I'm a passionate Full-Stack Web Developer focused on building modern, responsive, and user-friendly web applications. I enjoy turning ideas into functional digital products using modern web technologies.",
  availability: "Open to Full-Stack Developer Opportunities.",
  githubUrl: "https://github.com/tausifahamedsabab",
  linkedinUrl: "https://www.linkedin.com/in/tausif-ahamed-sabab/",
  email: "taosifahmed042@gmail.com",
  heroBadge: "OPEN TO FULL-STACK DEVELOPER ROLES",
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
  skillsSubtitle:
    "Core technologies: Node.js, Express.js, MongoDB, Mongoose, Better Auth, JWT, REST APIs, React, TypeScript, Next.js — building full-stack web applications.",
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
  "bazar-dor": {
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
  "bazar-dor": [
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

// ---- Navigation sections (shared by Navbar and Footer) ---------------------

export const navSections = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

// ---- Project detail page content (per verified repo facts) -------------------

export interface ProjectChallenge {
  issue: string;
  solution: string;
}

export interface ProjectProblem {
  statement: string;
  objectives: string[];
  solution: string;
  challenges: ProjectChallenge[];
}

export const projectDetails: Record<string, ProjectProblem> = {
  salonbook: {
    statement:
      "Customers discovering a salon, managing appointments, and completing payments were historically spread across disconnected tools (spreadsheets, third-party booking services, Stripe checkouts), and staff had to manually manage slots, status updates and customer communication. salonbook addresses this by providing a unified platform for service discovery, booking and management.",
    objectives: [
      "Provide a simple, smooth public booking flow for customers (discover services, book, pay).",
      "Give customers full visibility of their appointments — view and cancel own requests, view payment history, edit profile.",
      "Let staff manage services, appointments and customers through a dedicated admin dashboard.",
      "Secure the platform: authentication for customers and admins, blocked-user enforcement, public registration can never create an admin.",
    ],
    solution:
      "SalonBook is a full-stack Next.js application. The public Next.js 16 App Router frontend lets customers discover services and book appointments; payment is handled with Stripe Checkout and webhook-verified transaction records. A dedicated admin dashboard (on the same backend) lets staff manage services, appointments, customers and transactions. Sessions are Better Auth; requests are made through a server-side API layer that adds role checks. Data lives in MongoDB (Mongoose), including Better Auth's user collection extended with `role` and `isBlocked`.",
    challenges: [
      {
        issue: "Securing the API boundary between the Next.js app and the Express server",
        solution:
          "API requests go through `src/lib/serverApi.ts` (server-side) with role checks on every protected call; `src/proxy.ts` guards `/admin/*` and `/customer/*` server-side; the Express API uses JWT verification middleware (`requireAuth`/`requireRole`).",
      },
      {
        issue: "Never allowing public registration to create an admin",
        solution:
          "The seeded admin is created at startup; `ALLOW_ADMIN_REGISTRATION=false`; role is never accepted from registration input.",
      },
      {
        issue: "Reliably updating appointment and payment status",
        solution:
          "Payment status changes are written only after a verified Stripe webhook; `src/lib/session.ts` syncs the navbar after login/logout.",
      },
      {
        issue: "Uploading service images efficiently",
        solution:
          "Admin services page uses ImgBB (`src/lib/imgbb.ts`) for direct image uploads during service creation/editing.",
      },
    ],
  },
  studiospace: {
    statement:
      "Locating available creative spaces (photo studios, sound stages, podcast rooms, music suites) for guests and hosts has been fragmented across listing sites and manual communication. Hosts had no way to verify availability automatically, and guests had no booking system. StudioSpace provides a peer-to-peer marketplace where hosts list studios and guests discover and book with calendars.",
    objectives: [
      "Help guests discover and book available studio spaces by city, category, price and rating.",
      "Help hosts list, manage and book their studios (availability, refunds, cancellation, reviews).",
      "Ensure double-booking prevention: bookings start as `pending` and only `confirmed` bookings block availability.",
      "Deliver a unified modern booking flow on a Next.js frontend connected to an Express/MongoDB backend (with a no-backend mock mode for development).",
    ],
    solution:
      "StudioSpace is a peer-to-peer marketplace for booking creative spaces by the hour: photo studios, sound stages, podcast rooms, music suites and art workshops. Guests search studios with filters (category, city, price, rating) and request bookings; hosts manage listings with galleries, house rules, reviews and availability; guests cancel bookings; refunds apply on cancellation. The Next.js App Router frontend (React 19, TS, Swiper, Base UI) talks to the Express.js + MongoDB backend (sibling repo studio-space-server) or to an in-memory mock adapter (`API_MODE=mock`).",
    challenges: [
      {
        issue: "Preventing double bookings",
        solution:
          "Booking requests are validated against availability on the backend (`GET /api/studios/:id/availability`); only `confirmed` bookings block slots.",
      },
      {
        issue: "Securing booking flows with authentication and owner-based authorization",
        solution:
          "HTTP-only signed JWT session cookies via the mock adapter or the live Express API (`register`, `login`, `logout`, `me`, Google); owner checks on `PATCH/DELETE /api/studios/:id`.",
      },
      {
        issue: "Direct image uploads while keeping it lightweight",
        solution: "Hosts can upload cover images from the browser via ImgBB (`NEXT_PUBLIC_IMGBB_API_KEY`).",
      },
    ],
  },
  "bazar-dor": {
    statement:
      "A fast, structured catalog for daily-changing product prices has been hard to browse: prices shift every day by category, and users of local markets want to quickly compare price changes across the day. Bazar-Dor builds a responsive, bilingual (Bengali) marketplace for daily-changing products.",
    objectives: [
      "Give users a fast, structured catalog of daily-changing product prices (today, yesterday, last week, last month).",
      "Help users pick products by comparing price changes and multiple market price ranges.",
      "Provide responsive, bilingual browsing across categories and product details.",
    ],
    solution:
      "Bazar-Dor is a Next.js 16 e-commerce application (TypeScript + Tailwind) with server-side data fetching from the Bazaar-Dor API (`API_BASE_URL`, `revalidate: 60`): categories and products with daily price data (change indicators ▲/▼/• + percentages) and multi-market price ranges. It ships category pages and product detail pages with bangla product names.",
    challenges: [
      {
        issue: "Displaying daily price changes across multiple markets",
        solution:
          "Product detail pages list all market ranges with division, min and max prices, plus per-product change indicators.",
      },
      {
        issue: "Staying fresh with changing data",
        solution:
          "Server-side fetching with `revalidate: 60` keeps product data current without extra infrastructure.",
      },
    ],
  },
};

export interface ProjectLayerNotes {
  frontend: string;
  backend: string;
  database: string;
  auth: string;
}

export const projectLayerNotes: Record<string, ProjectLayerNotes> = {
  salonbook: {
    frontend:
      "The Next.js 16 App Router frontend (TypeScript) renders the public pages; data is fetched through server-side calls (`src/lib/serverApi.ts`, which adds server-side role checks) with a client-side Better Auth session cookie synced by `src/lib/session.ts`.",
    backend:
      "The Express.js REST API (`salonbook-server`) serves public services, booking flows, admin routes, webhooks (`/api/webhooks/stripe`) and `/api/auth/callback/google`; `requireAuth`/`requireRole` JWT verification middleware protects requests, and `src/proxy.ts` guards `/admin/*` and `/customer/*` server-side.",
    database:
      "MongoDB (Mongoose) with four collections: `user` (Better Auth extended with `role` + `isBlocked`), `services`, `appointments`, and `transactions`.",
    auth:
      "Sessions are Better Auth cookies; the frontend reads the HTTP-only session cookie and the backend validates with JWT middleware. Blocked-user enforcement is server-side; public registration can never create an admin (`ALLOW_ADMIN_REGISTRATION=false`).",
  },
  studiospace: {
    frontend:
      "The Next.js App Router frontend (React 19, TypeScript, Tailwind v4, Swiper) renders the marketplace, studio detail pages and dashboards; API calls go through `src/lib/api` (server-side in live mode, mock adapter otherwise).",
    backend:
      "Express.js + MongoDB in `studio-space-server`: auth routes (register/login/logout/me/google), studios (list/detail/categories/cities/availability/reviews) and bookings (create/cancel); live mode proxies these from Next.js (`API_MODE=live`).",
    database:
      "MongoDB stores studios, users and bookings; bookings start as `pending` and only `confirmed` bookings block studio availability.",
    auth:
      "HTTP-only signed JWT session cookies (mock mode) or the API's `Set-Cookie` (live mode); `GET /api/auth/me` resolves the session; owner checks guard studios CUD routes.",
  },
  "bazar-dor": {
    frontend:
      "Next.js App Router server components fetch products/categories from `API_BASE_URL` (`/api/bazardor/categories`, `/api/bazardor/products/:id`, `revalidate: 60`); the client renders product cards, category pages and product detail pages.",
    backend:
      "No backend lives in this repo — data comes from the external Bazaar-Dor API via server-side fetches; the frontend uses better-auth as a declared dependency.",
    database:
      "The data (Bengali product names, categories, price history: today/yesterday/lastWeek/lastMonth, markets) is served by the external API.",
    auth:
      "better-auth is a declared dependency; the frontend is otherwise SSR-based with no user sessions implemented in this repo.",
  },
};
