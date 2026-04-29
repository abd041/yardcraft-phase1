"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Overview", Icon: GridIcon },
  { href: "/admin/designs", label: "Designs", Icon: PhotoIcon },
  { href: "/admin/users", label: "Users", Icon: UsersIcon },
  { href: "/admin/settings", label: "Settings", Icon: GearIcon },
];

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function AdminSidebar() {
  const pathname = usePathname() || "";

  return (
    <aside className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_24px_60px_-50px_rgba(0,0,0,0.9)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 -top-20 h-[220px] w-[220px] rounded-full bg-green/10 blur-3xl" />
        <div className="absolute -right-16 bottom-[-90px] h-[260px] w-[260px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_60%)]" />
      </div>

      <div className="relative px-2 pb-3 text-xs font-semibold tracking-wide text-muted">
        Admin
      </div>

      <nav className="relative flex flex-col gap-1">
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition",
                active
                  ? "bg-white/10 text-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_25%,transparent)]"
                  : "text-muted hover:bg-white/5 hover:text-foreground",
              )}
            >
              <span
                className={cx(
                  "grid h-9 w-9 place-items-center rounded-2xl border border-card-border bg-black/10 transition",
                  active
                    ? "text-[color-mix(in_oklab,var(--green-bright)_55%,white)]"
                    : "text-muted group-hover:text-foreground",
                )}
              >
                <item.Icon className="h-4.5 w-4.5" />
              </span>
              <span className="font-semibold tracking-tight">{item.label}</span>
              {active ? (
                <span className="ml-auto h-2 w-2 rounded-full bg-[color-mix(in_oklab,var(--green)_70%,var(--gold))]" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function GridIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhotoIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M5 6h14v12H5V6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11.5 11 14l2-2 3.5 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.2h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 12a3.2 3.2 0 1 0 0-6.4A3.2 3.2 0 0 0 12 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19.2 19c0-1.7-1.1-3.1-2.6-3.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function GearIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19 12a7 7 0 0 0-.1-1l2-1.2-2-3.5-2.3.8a7.7 7.7 0 0 0-1.7-1L14.6 3h-5.2L9 6.1a7.7 7.7 0 0 0-1.7 1L5 6.3 3 9.8 5 11a7 7 0 0 0 0 2l-2 1.2 2 3.5 2.3-.8a7.7 7.7 0 0 0 1.7 1l.4 3.1h5.2l.4-3.1a7.7 7.7 0 0 0 1.7-1l2.3.8 2-3.5-2-1.2c.1-.3.1-.7.1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

