import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ title, children }) {
  return (
    <div className="min-h-full">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-20 left-[-220px] h-[520px] w-[520px] rounded-full bg-green/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-160px,rgba(214,178,94,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.62),transparent_45%,rgba(0,0,0,0.7))]" />
      </div>

      <div className="relative border-b border-card-border/70 bg-background/75 backdrop-blur">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--green)_40%,transparent),color-mix(in_oklab,var(--gold)_40%,transparent),transparent)]" />

        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Link className="text-sm text-muted hover:text-foreground transition" href="/">
              Back to site
            </Link>
            <AdminLogoutButton />
          </div>
        </Container>
      </div>

      <Container className="relative py-8 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <AdminSidebar />

          <section className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_26px_70px_-55px_rgba(0,0,0,0.95)] sm:p-8">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
              <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_60%)]" />
            </div>

            <header className="relative flex flex-col gap-1">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
              <p className="text-sm text-muted">Invite-only. Admin access required.</p>
            </header>
            <div className="relative mt-6">{children}</div>
          </section>
        </div>
      </Container>
    </div>
  );
}

