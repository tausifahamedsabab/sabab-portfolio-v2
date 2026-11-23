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
    title: "Frontend Development",
    subtitle:
      "Building responsive, accessible, and visually appealing user interfaces.",
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
    title: "Backend Development",
    subtitle:
      "Developing APIs, authentication systems, database integrations, and server-side functionality.",
    skills: [
      { name: "Node.js", icon: "Cpu" },
      { name: "Express.js", icon: "Server" },
      { name: "REST APIs", icon: "Send" },
      { name: "MongoDB", icon: "Database" },
      { name: "Mongoose", icon: "Layers" },
    ],
  },
  {
    title: "Database & Authentication",
    subtitle: "Secure data storage with modern authentication patterns.",
    skills: [
      { name: "Better Auth", icon: "Key" },
      { name: "JWT", icon: "ShieldCheck" },
      { name: "HTTP-only Cookies", icon: "Lock" },
      { name: "Role-Based Authorization", icon: "Users" },
    ],
  },
  {
    title: "Development Tools",
    subtitle: "Tooling I use every day to ship fast and clean.",
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
