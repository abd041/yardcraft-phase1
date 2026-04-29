import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/designs", label: "Designs" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ title, children }) {
  return (
    <div className="min-h-full">
      <div className="border-b border-card-border/70 bg-background/70 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <Link className="text-sm text-muted hover:text-foreground transition" href="/">
            Back to site
          </Link>
        </Container>
      </div>

      <Container className="py-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-card-border bg-card p-4">
            <div className="px-2 pb-3 text-xs font-medium tracking-wide text-muted">
              Admin
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-foreground transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <section className="rounded-3xl border border-card-border bg-card p-6 sm:p-8">
            <header className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted">
                Replace this stub with real auth, data, and roles.
              </p>
            </header>
            <div className="mt-6">{children}</div>
          </section>
        </div>
      </Container>
    </div>
  );
}

