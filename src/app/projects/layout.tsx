"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-full flex-1 bg-[#08090D]">
      <div className="mx-auto mt-10 mb-8 max-w-3xl px-6 text-center md:px-10">
        <motion.p
          className="text-[12px] font-semibold uppercase tracking-[0.25em] text-accent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Selected Works
        </motion.p>
        <motion.p
          className="mt-3 font-display text-lg font-bold text-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Real applications. Practical solutions. Built with modern technologies.
        </motion.p>
        <div className="mt-6 flex justify-center">
          <motion.div
            className="group rounded-full border border-[#141722] bg-fg px-4 py-2 font-semibold text-[#0A0A0A]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.04 }}
          >
            <Link href="/" className="inline-flex items-center gap-2">
              ← Back to Portfolio
            </Link>
          </motion.div>
        </div>
      </div>
      {children}
    </main>
  );
}
