"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
}

/**
 * Ambient canvas particles with a cursor-following soft glow.
 * Decorative — pointer-events: none; animates behind the hero.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
    };
    resize();

    const particles: Particle[] = [];
    const count = 46;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1.2 + Math.random() * 2.4,
        alpha: 0.25 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX * (window.devicePixelRatio || 1);
      mouse.y = e.clientY * (window.devicePixelRatio || 1);
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let raf = 0;
    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.x > -100) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 700);
        grad.addColorStop(0, "rgba(139, 92, 246, 0.16)");
        grad.addColorStop(0.45, "rgba(139, 92, 246, 0.06)");
        grad.addColorStop(0.85, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalCompositeOperation = "lighter";
      particles.forEach((p, i) => {
        const speed = 0.85 + 0.5 * Math.sin(t / 5200 + p.phase + i * 0.3);
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < -20 || p.x > canvas.width + 20 || p.y < -20 || p.y > canvas.height + 20) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        const color = (t + i * 7 + p.phase) % 3 < 1 ? "#22D3EE" : "#8B5CF6";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = prefersReduced ? 0.4 : p.alpha;
        ctx.fill();

        // connect to nearest neighbor
        let nearest: Particle | null = null;
        let nearestDist = 99999;
        for (const q of particles) {
          if (q === p) continue;
          const d = Math.hypot(q.x - p.x, q.y - p.y);
          if (d < nearestDist) {
            nearestDist = d;
            nearest = q;
          }
        }
        const target = nearest as Particle | null;
        if (target && nearestDist < 170) {
          const alpha = prefersReduced ? 0.06 : ((170 - nearestDist) / 170) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = "#22D3EE";
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
    />
  );
}
