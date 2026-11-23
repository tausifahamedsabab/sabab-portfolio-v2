import type { SVGProps } from "react";

export function BrandGitHub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0 -1 -3.5c3 -1.2 5.4 -4.5 5.4 -8.5c0 -2.1 -.7 -4.1 -1.9 -5.7c-.1 -.1 -.4 -.2 -.6 -.1c-.3 0 -.7.1 -1 .3a12 12 0 0 0 -8.9 0c-.1 -.1 -.5 -.2 -.7 -.1c-.2.1 -.5.1 -.6.1c-1.2 1.6 -1.9 3.6 -1.9 5.7c0 4 2.4 7.4 5.4 8.5a4.8 4.8 0 0 0 -1 3.4v4" />
      <path d="M9 12c-4.5 2 -4.5 6 0 8" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function BrandLinkedIn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 8 6v5h-6v-3a4 4 0 0 0 -4 -4a2 2 0 0 0 -2 2v3h-6v-5c0 -4 3.2 -5.3 6 -5.3a5.2 5.2 0 0 1 5 5v3" />
      <circle cx="6" cy="6" r="2.5" />
      <rect x="2" y="11" width="4" height="4" rx="1" />
    </svg>
  );
}

export function BrandMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 6c0 -1 -1 -2 -2 -2H4c-1 0 -2 1 -2 2v12c0 1 1 2 2 2h16c1 0 2 -1 2 -2V6z" />
      <path d="M22 6l-10 7l-10 -7" />
    </svg>
  );
}
