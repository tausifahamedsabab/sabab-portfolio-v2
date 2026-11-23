export interface ProjectFeature {
  title: string;
  description?: string;
}

export interface ProjectStackItem {
  name: string;
  icon?: string;
  url?: string;
}

export interface ProjectMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  remote?: boolean;
  priority?: boolean;
}

export type ProjectArchitectureNodeColor =
  | "frontend"
  | "backend"
  | "database"
  | "auth"
  | "external";

export interface ProjectArchitectureNode {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: ProjectArchitectureNodeColor;
}

export interface ProjectArchitectureLayer {
  id: string;
  title: string;
  nodes: ProjectArchitectureNode[];
}

export interface ProjectArchitectureEdge {
  from: string;
  to: string;
  label: string;
}

export interface ProjectArchitectureNote {
  node: string;
  text: string;
}

export interface ProjectArchitecture {
  title: string;
  description: string;
  layers: ProjectArchitectureLayer[];
  edges: ProjectArchitectureEdge[];
  notes: ProjectArchitectureNote[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  features: ProjectFeature[];
  stack: ProjectStackItem[];
  media: ProjectMedia[];
  githubUrl: string;
  serverUrl?: string;
  liveUrl?: string;
  caseStudyHref: string;
}

export const projects: Project[] = [
  {
    slug: "salonbook",
    title: "SalonBook",
    category: "Salon Booking & Management Platform",
    description:
      "SalonBook is a modern salon booking and management platform designed to simplify the process of discovering salons, managing appointments, and organizing salon operations. The platform focuses on providing a smooth booking experience while supporting secure backend operations.",
    features: [
      {
        title: "Service discovery & search",
        description:
          "Public home page with featured services and categories; the /services page offers search, category filter and price sorting.",
      },
      {
        title: "Appointment booking",
        description:
          "Customers book appointments on protected service pages and view or cancel their own requests.",
      },
      {
        title: "Stripe payments",
        description:
          "Pay for confirmed appointments with Stripe Checkout; transaction records are written only after a verified webhook; customers view payment history.",
      },
      {
        title: "Customer profile editing",
        description: "Customers edit their own profile (ProfileForm).",
      },
      {
        title: "Admin dashboard",
        description:
          "Manage services (create/update/delete, ImgBB image uploads, activate/deactivate), confirm/cancel appointments, block/unblock customers, and read transaction records plus dashboard statistics.",
      },
      {
        title: "Auth & security",
        description:
          "Better Auth sessions, server-side role checks, JWT verification middleware, blocked-user enforcement, and public registration that can never create an admin.",
      },
    ],
    stack: [
      { name: "Next.js 16", icon: "AppWindow", url: "https://nextjs.org/" },
      { name: "TypeScript", icon: "Brackets", url: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS", icon: "Box", url: "https://tailwindcss.com/" },
      { name: "Node.js", icon: "Cpu", url: "https://nodejs.org/" },
      { name: "Express.js", icon: "Server", url: "https://expressjs.com/" },
      { name: "MongoDB", icon: "Database", url: "https://www.mongodb.com/" },
      { name: "Mongoose", icon: "Layers", url: "https://mongoosejs.com/" },
      { name: "Better Auth", icon: "Key", url: "https://better-auth.com/" },
      { name: "JWT", icon: "ShieldCheck", url: "https://jwt.io/" },
      { name: "Stripe", icon: "CreditCard", url: "https://stripe.com/" },
      { name: "ImgBB", icon: "Image", url: "https://imgbb.com/" },
      { name: "MongoDB Atlas", icon: "ServerCog", url: "https://cloud.mongodb.com/" },
      { name: "Git", icon: "GitBranch", url: "https://git-scm.com/" },
      { name: "GitHub", icon: "Triangle", url: "https://github.com/" },
      { name: "VS Code", icon: "Monitor", url: "https://code.visualstudio.com/" },
      { name: "Vercel", icon: "Rocket", url: "https://vercel.com/" },
      { name: "Postman", icon: "Repeat", url: "https://www.postman.com/" },
    ],
    media: [
      {
        src: "/salonbook-mockup.svg",
        alt: "SalonBook — device mockup of the booking dashboard",
      },
    ],
    githubUrl: "https://github.com/tausifahamedsabab/salonbook",
    liveUrl: "https://salonbook-gamma.vercel.app",
    caseStudyHref: "/projects/salonbook",
  },
  {
    slug: "studiospace",
    title: "StudioSpace",
    category: "Studio Booking & Listing Platform",
    description:
      "StudioSpace is a full-stack platform designed to connect users with available studios. It provides a structured experience for discovering studio listings, managing reservations, and handling studio-related operations.",
    features: [
      {
        title: "Studio discovery & filters",
        description:
          "Browse and filter studios by category, city, price, and rating.",
      },
      {
        title: "Studio detail pages",
        description:
          "Galleries, house rules, reviews, and booking calendars.",
      },
      {
        title: "Booking requests & security deposits",
        description:
          "Booking requests with availability checks, service fees, and refundable security deposits.",
      },
      {
        title: "Authentication",
        description:
          "Email/password registration and login, plus Google OAuth entry points when the API is live.",
      },
      {
        title: "Host dashboard",
        description: "Overview, my listings, add/edit/delete studios.",
      },
      {
        title: "Guest dashboard",
        description:
          "My bookings with pending, confirmed, completed, and cancelled states.",
      },
      {
        title: "Browser image uploads",
        description: "Direct uploads to ImgBB.",
      },
    ],
    stack: [
      { name: "Next.js 16 App Router", icon: "AppWindow", url: "https://nextjs.org/" },
      { name: "React 19", icon: "Atom", url: "https://react.dev/" },
      { name: "TypeScript", icon: "Brackets", url: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS v4", icon: "Box", url: "https://tailwindcss.com/" },
      { name: "Swiper", icon: "ArrowRightLeft", url: "https://swiperjs.com/" },
      { name: "Express.js + MongoDB", icon: "Server", url: "https://expressjs.com/" },
      { name: "Signed JWT sessions", icon: "ShieldCheck", url: "https://jwt.io/" },
    ],
    media: [
      {
        src: "https://raw.githubusercontent.com/tausifahamedsabab/studio-space/main/public/background.jpg",
        alt: "StudioSpace — studio marketplace dashboard mockup",
        width: 1200,
        height: 712,
        remote: true,
      },
    ],
    githubUrl: "https://github.com/tausifahamedsabab/studio-space",
    serverUrl: "https://github.com/tausifahamedsabab/studio-space-server",
    liveUrl: "https://studio-space-zeta.vercel.app",
    caseStudyHref: "/projects/studiospace",
  },
  {
    slug: "bazar-dor",
    title: "Bazar-Dor",
    category: "E-commerce Platform",
    description:
      "Bazar-Dor is an e-commerce application built to provide a modern online shopping experience. The platform focuses on product discovery, structured product information, and a responsive shopping interface.",
    features: [
      {
        title: "Bangla product catalog",
        description:
          "Products and categories are displayed in Bengali with names, categories, and units.",
      },
      {
        title: "Category pages",
        description:
          "Category-based navigation with icons and product sections (today up, today down, all products).",
      },
      {
        title: "Product detail pages",
        description:
          "Today, yesterday, lastWeek, and lastMonth prices with ▲/▼/• change indicators and percentages.",
      },
      {
        title: "Multi-market price ranges",
        description:
          "Market, division, min, and max price ranges per product.",
      },
    ],
    stack: [
      { name: "Next.js 16", icon: "AppWindow", url: "https://nextjs.org/" },
      { name: "TypeScript", icon: "Brackets", url: "https://www.typescriptlang.org/" },
      { name: "Tailwind CSS v4", icon: "Box", url: "https://tailwindcss.com/" },
      { name: "better-auth", icon: "Key", url: "https://better-auth.com/" },
    ],
    media: [
      {
        src: "https://raw.githubusercontent.com/tausifahamedsabab/bazar-dor/main/public/bazar-hero.png",
        alt: "Bazar-Dor — online store hero mockup",
        width: 1200,
        height: 675,
        remote: true,
      },
    ],
    githubUrl: "https://github.com/tausifahamedsabab/bazar-dor",
    liveUrl: "https://bazar-dor-dun-nine.vercel.app",
    caseStudyHref: "/projects/bazar-dor",
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
