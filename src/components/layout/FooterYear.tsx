import { connection } from "next/server";

/**
 * Server component — reads the current year at request time (Next 16
 * `connection()` + Suspense), avoiding unstable values during prerender.
 */
export async function FooterYear() {
  await connection();
  const year = new Date().getFullYear();
  return (
    <span className="font-display text-sm font-black tracking-[0.2em] text-fg">
      © <span className="text-xs">{year}</span>
    </span>
  );
}
