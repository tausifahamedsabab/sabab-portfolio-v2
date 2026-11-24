export interface SkillItem {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend Development",
    subtitle: "Developing secure APIs, servers and integrations.",
    skills: [
      { name: "Node.js", icon: "Cpu" },
      { name: "Express.js", icon: "Server" },
      { name: "REST APIs", icon: "Send" },
      { name: "MongoDB", icon: "Database" },
      { name: "Mongoose", icon: "Layers" },
    ],
  },
  {
    title: "Frontend Development",
    subtitle: "Building responsive, user-friendly interfaces.",
    skills: [
      { name: "HTML5", icon: "Globe" },
      { name: "CSS3", icon: "Palette" },
      { name: "JavaScript", icon: "Code" },
      { name: "TypeScript", icon: "Brackets" },
      { name: "React.js", icon: "Atom" },
      { name: "Next.js", icon: "AppWindow" },
      { name: "Tailwind CSS", icon: "Box" },
    ],
  },
  {
    title: "Database & Authentication",
    subtitle: "Secure data storage and user access control.",
    skills: [
      { name: "Better Auth", icon: "Key" },
      { name: "JWT", icon: "ShieldCheck" },
      { name: "HTTP-only Cookies", icon: "Lock" },
      { name: "Role-Based Authorization", icon: "Users" },
    ],
  },
  {
    title: "Development Tools",
    subtitle: "Tooling I use to build and ship products.",
    skills: [
      { name: "Git", icon: "GitBranch" },
      { name: "GitHub", icon: "Triangle" },
      { name: "VS Code", icon: "Monitor" },
      { name: "Vercel", icon: "Rocket" },
      { name: "MongoDB Atlas", icon: "ServerCog" },
      { name: "Postman", icon: "Repeat" },
    ],
  },
];
