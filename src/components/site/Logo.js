import Link from "next/link";

import { BRAND } from "@/lib/brand";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-card-border bg-card">
        <YardCraftMark className="h-6 w-6" />
      </span>
      <span className="text-sm font-semibold tracking-tight text-foreground">
        <span className="bg-[linear-gradient(90deg,color-mix(in_oklab,var(--green-bright)_70%,white),var(--green),var(--gold))] bg-clip-text text-transparent">
          {BRAND.name}
        </span>
      </span>
    </Link>
  );
}

function YardCraftMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="ycGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--green-bright)" />
          <stop offset="0.55" stopColor="var(--green)" />
          <stop offset="1" stopColor="color-mix(in oklab, var(--green) 55%, black)" />
        </linearGradient>
        <linearGradient id="ycGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="color-mix(in oklab, var(--gold) 85%, white)" />
          <stop offset="0.6" stopColor="var(--gold)" />
          <stop offset="1" stopColor="color-mix(in oklab, var(--gold) 55%, black)" />
        </linearGradient>
      </defs>

      {/* Left green wing */}
      <path
        d="M6 10c11 0 16 5 23 16l-7 7C16 25 13 21 6 21V10Z"
        fill="url(#ycGreen)"
      />
      {/* Right green wing */}
      <path
        d="M58 10c-11 0-16 5-23 16l7 7c6-8 9-12 16-12V10Z"
        fill="url(#ycGreen)"
      />
      {/* Gold path */}
      <path
        d="M30 26h4c3 0 6 2 6 5v22c0 3-3 5-6 5h-4c-3 0-6-2-6-5V31c0-3 3-5 6-5Z"
        fill="url(#ycGold)"
      />
      {/* Subtle base shadow */}
      <path
        d="M10 54h44"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

