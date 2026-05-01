import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { getDesignBySlug } from "@/lib/designs";
import { DesignQrHeader } from "@/components/design/sections/DesignQrHeader";
import { ServicesSection } from "@/components/design/sections/ServicesSection";
import { TrustSection } from "@/components/design/sections/TrustSection";
import { isAdminRequest } from "@/lib/adminOptional";
import { AdminQuickEditFab } from "@/components/design/AdminQuickEditFab";
import { getSiteUrl } from "@/lib/site";
import { PremiumBeforeAfter } from "@/components/design/PremiumBeforeAfter";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { QuoteIqEmbed } from "@/components/quoteiq/QuoteIqEmbed";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) return { title: "Design not found" };
  return {
    title: `YardCraft • ${design.slug}`,
    description:
      "Luxury outdoor living preview. Before/after comparison and a fast estimate.",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) notFound();

  const before = design.before_image || "";
  const after = design.after_image || "";
  const isAdmin = await isAdminRequest();
  const pageUrl = `${getSiteUrl()}/design/${slug}`;

  return (
    <div className="pb-10">
      {/* Universal luxury background (not property-specific) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25 blur-2xl"
          style={{
            backgroundImage: "url(/images/YardCraft Doorhangers.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.86),rgba(0,0,0,0.72)_40%,rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-160px,rgba(214,178,94,0.14),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_85%,rgba(31,122,58,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.68)_100%)]" />
      </div>

      <DesignQrHeader />

      {/* 1) BEFORE / AFTER COMPARISON HERO (FIRST SCREEN) */}
      <section className="relative pt-4 sm:pt-6">
        <Container className="max-w-368 px-3 sm:px-6 lg:px-10">
          <PremiumBeforeAfter
            beforeUrl={before || after}
            afterUrl={after || before}
            className="rounded-[32px]"
          />
        </Container>
      </section>

      {/* 2) SHORT PREMIUM HEADLINE + CTA SECTION */}
      <section className="relative border-b border-card-border/70 pb-10 pt-8 sm:pb-12 sm:pt-10">
        <Container className="max-w-3xl text-center">
          <div className="text-xs font-medium tracking-[0.18em] uppercase text-muted">
            YardCraft Preview • Ref {slug}
          </div>
          <h1 className="mt-4 font-serif text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl">
            A premium yard—clean lines, confident curb appeal.
          </h1>
          <p className="mx-auto mt-3 max-w-[56ch] text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
            This is a concept preview. Get your custom design and a fast budget range.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4">
            <Button href="#quote" className="w-full justify-center">
              Get Your Custom Design
            </Button>
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="inline-flex items-center justify-center rounded-full border border-card-border bg-card px-6 py-3.5 text-[13px] font-medium tracking-[0.04em] text-foreground transition hover:border-[color-mix(in_oklab,var(--gold)_40%,var(--card-border))] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Call Now
            </a>
          </div>
        </Container>
      </section>

      {/* 3) QUOTEIQ FORM SECTION (LEAD CAPTURE) */}
      <section id="quote" className="scroll-mt-24 py-10 sm:py-14">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
              <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22),transparent_60%)]" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
                  Fast estimate
                </div>
                <h2 className="mt-2 font-serif text-pretty text-3xl font-semibold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl">
                  Get pricing & timeline today.
                </h2>
                <p className="mt-2 max-w-[52ch] text-sm leading-6 text-muted sm:text-base sm:leading-7">
                  Answer a few questions for a budget range. We’ll follow up with a clean scope.
                </p>
              </div>

              <div className="relative">
                <QuoteIqEmbed slug={slug} pageUrl={pageUrl} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4) Trust */}
      <TrustSection />

      {/* 5) Services */}
      <ServicesSection />

      {/* 6) OPTIONAL MINIMAL CLOSING REASSURANCE */}
      <section className="py-10 sm:py-14">
        <Container>
          <div className="rounded-3xl border border-card-border bg-black/10 px-6 py-7 sm:px-10 sm:py-9">
            <div className="grid gap-3 sm:grid-cols-3">
              <ReassurancePill title="Clean install" body="Respectful crews, tidy jobsite" />
              <ReassurancePill title="Transparent scope" body="Clear inclusions + timeline" />
              <ReassurancePill title="Premium materials" body="Details that age well" />
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-card-border/70">
        <Container className="flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YardCraft. All rights reserved.</p>
          <a className="hover:text-foreground transition" href={`tel:${BRAND.phoneTel}`}>
            {BRAND.phoneDisplay}
          </a>
        </Container>
      </footer>
      {isAdmin ? <AdminQuickEditFab slug={design.slug} /> : null}
    </div>
  );
}

function ReassurancePill({ title, body }) {
  return (
    <div className="rounded-2xl border border-card-border bg-background/40 px-5 py-4">
      <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">{title}</div>
      <div className="mt-2 text-sm font-semibold tracking-tight text-foreground">{body}</div>
    </div>
  );
}

