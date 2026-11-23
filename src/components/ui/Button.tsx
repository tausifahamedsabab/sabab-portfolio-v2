"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: ButtonSize;
  className?: string;
  title?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_0_22px_rgba(139,92,246,0.5)] hover:shadow-[0_0_34px_rgba(139,92,246,0.75)]",
  secondary:
    "bg-accent-2 text-[#0A0A0A] font-semibold hover:shadow-[0_0_20px_rgba(34,211,238,0.45)]",
  ghost:
    "bg-transparent text-fg/90 hover:text-fg hover:bg-fg/10",
  outline:
    "bg-transparent border border-[#F8FAFC]/30 text-fg hover:border-accent hover:text-accent",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(
  { children, variant = "primary", href, icon, iconPosition = "left", size = "md", className, title, ...rest },
  ref,
) {
  const prefersReduced = useReducedMotion();
  const classNames = cn(
    "inline-flex items-center gap-2 font-semibold rounded-full transition-all duration-200 text-center backdrop-blur-[4px] font-display",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const inner = (
    <>
      {iconPosition === "left" && icon}
      <span className="tracking-tight">{children}</span>
      {iconPosition === "right" && icon}
    </>
  );

  const hover = prefersReduced ? undefined : { scale: 1.04 };
  const tap = prefersReduced ? undefined : { scale: 0.98 };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className={classNames}
        whileHover={hover}
        whileTap={tap}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      title={title}
      className={classNames}
      whileHover={hover}
      whileTap={tap}
      {...rest}
    >
      {inner}
    </motion.button>
  );
});

Button.displayName = "Button";
