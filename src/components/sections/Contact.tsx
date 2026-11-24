"use client";

/* eslint-disable react-hooks/static-components -- getIcon resolves a stable per-name Lucide component; rendering it is intentional */

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { personalInfo } from "@/data/details";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { BrandGitHub, BrandLinkedIn, BrandMail } from "@/components/ui/BrandIcons";
import { getIcon } from "@/lib/icons";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cn } from "@/lib/utils";

function ClipboardCheckIcon({ size = 16, ...props }: { size?: number }) {
  const Icon = getIcon("ClipboardCheck");
  return <Icon size={size} {...props} />;
}

const FORM_FIELDS = [
  { key: "name", label: "Name", type: "text", placeholder: "Your name" },
  { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { key: "subject", label: "Subject", type: "text", placeholder: "Subject" },
  { key: "message", label: "Message", type: "textarea", placeholder: "Your message" },
] as const;

export function Contact() {
  const prefersReduced = useReducedMotion() ?? false;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [toast, setToast] = useState<string | null>(null);
  const { ref } = useInViewOnce(0.1);

  const showToast = (message: string, ms = 3800) => {
    setToast(message);
    setTimeout(() => setToast(null), ms);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) {
      showToast("Please write a message first.");
      return;
    }
    const subject = form.subject.trim() || "Contact request — Tausif Ahamed Sabab";
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      "",
      form.message.trim(),
    ].join("\n");
    window.location.href =
      "mailto:" +
      personalInfo.email +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  };

  const onCopyEmail = () => {
    navigator.clipboard
      .writeText(personalInfo.email)
      .then(() => showToast("Email copied to clipboard!"))
      .catch(() => showToast(`Couldn't copy — use mailto: ${personalInfo.email}`));
  };

  const stagger = (i: number) =>
    prefersReduced
      ? { duration: 0.01 }
      : { type: "tween" as const, duration: 0.6, delay: 0.1 + i * 0.09, ease: "easeOut" as const };

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <SectionHeading title={personalInfo.contactHeading} subtitle={personalInfo.contactSubtitle} />

      <motion.div
        ref={ref}
        className="mt-12 flex flex-col gap-6 md:flex-row"
        role="region"
        aria-label="Contact options"
      >
        {/* Left: contact card */}
        <motion.div
          transition={stagger(0)}
          initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          className="glass-strong rounded-3xl border border-[#141722] p-8 md:w-1/2"
        >
          <motion.div
            transition={stagger(1)}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            className="rounded-2xl border border-[#141722] bg-fg/5 p-6"
          >
            <motion.p
              transition={stagger(2)}
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className="font-mono text-[13px] tracking-wide text-accent"
            >
              {personalInfo.email}
            </motion.p>
            <Button
              onClick={onCopyEmail}
              variant="outline"
              size="sm"
              icon={<ClipboardCheckIcon size={14} aria-hidden="true" />}
              className="mt-4"
              whileTap={prefersReduced ? undefined : { scale: 0.95 }}
            >
              Copy Email
            </Button>
            <div className="mt-5 flex flex-wrap gap-4">
              <Button href={personalInfo.githubUrl} variant="outline" size="sm" icon={<BrandGitHub />}>GitHub</Button>
              <Button href={personalInfo.linkedinUrl} variant="outline" size="sm" icon={<BrandLinkedIn />}>LinkedIn</Button>
              <Button href={`mailto:${personalInfo.email}`} variant="outline" size="sm" icon={<BrandMail />}>Email</Button>
            </div>
          </motion.div>
          <p className="mt-4 text-[12px] text-muted">
            Email opens in your mail client. Your messages go directly to Tausif Ahamed Sabab.
          </p>
        </motion.div>

        {/* Right: form */}
        <form
          onSubmit={onSubmit}
          className="glass-strong relative rounded-3xl border border-[#141722] p-8 md:w-1/2"
          aria-label="Contact form"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {FORM_FIELDS.map((field, i) => {
              const value = form[field.key];
              const update = (v: string) => setForm((f) => ({ ...f, [field.key]: v }));
              const isTextarea = field.type === "textarea";
              return (
                <motion.div
                  key={field.key}
                  transition={stagger(3 + i)}
                  initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  className={cn("flex flex-col gap-1.5", field.key === "message" && "sm:col-span-2")}
                >
                  <label
                    htmlFor={`contact-${field.key}`}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted"
                  >
                    {field.label}
                  </label>
                  {isTextarea ? (
                    <motion.textarea
                      id={`contact-${field.key}`}
                      rows={4}
                      required
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) => update(e.target.value)}
                      whileFocus={prefersReduced ? undefined : { borderColor: "#8B5CF6" }}
                      className="glass-strong rounded-2xl border border-[#141722] px-4 py-3 text-fg placeholder:text-[#475569] focus:border-accent/70 focus-visible:outline-none"
                    />
                  ) : (
                    <motion.input
                      id={`contact-${field.key}`}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={value}
                      onChange={(e) => update(e.target.value)}
                      whileFocus={prefersReduced ? undefined : { borderColor: "#8B5CF6" }}
                      className="glass-strong rounded-2xl border border-[#141722] px-4 py-3 text-fg placeholder:text-[#475569] focus:border-accent/70 focus-visible:outline-none"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
          <motion.div
            transition={stagger(8)}
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-between gap-4"
          >
            <Button type="submit" size="lg" icon={<MessageCircleIcon />}>
              Send Message
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </section>
  );
}

function MessageCircleIcon({ size = 16, ...props }: { size?: number }) {
  const Icon = getIcon("MessageCircle");
  return <Icon size={size} {...props} />;
}
