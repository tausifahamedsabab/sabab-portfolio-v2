import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tausif Ahamed Sabab — Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer building modern, scalable and user-friendly web applications from frontend to backend.",
  keywords:
    "full-stack developer, next.js, typescript, react, node.js, express, mongodb, portfolio, web development",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SABAB.DEV",
    title: "Tausif Ahamed Sabab — Full-Stack Web Developer",
    description:
      "Full-Stack Web Developer building modern, scalable and user-friendly web applications from frontend to backend.",
  },
};

export const viewport = {
  themeColor: "#08090D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
