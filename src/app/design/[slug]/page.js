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
  const fallbackHeroImage = "/images/YardCraft Doorhangers.png";
  const beforeSrc = before || after || fallbackHeroImage;
  const afterSrc = after || "";
  const isAdmin = await isAdminRequest();
  const pageUrl = `${getSiteUrl()}/design/${slug}`;

  return (
    <div className="pb-24 sm:pb-32">
      {/* Universal luxury background (not property-specific) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 blur-sm"
          style={{
            backgroundImage: "url(/images/luxury-patio.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.88),rgba(0,0,0,0.82)_40%,rgba(0,0,0,0.9))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-160px,rgba(214,178,94,0.18),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_85%,rgba(31,122,58,0.13),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(0,0,0,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_50%_112%,rgba(0,0,0,0.4),transparent_56%)]" />
      </div>

      <DesignQrHeader />

      <section className="relative z-20 pt-0">
        <PremiumBeforeAfter
          beforeUrl={beforeSrc}
          afterUrl={afterSrc}
          className="relative z-20 h-[80vh] min-h-[72vh] w-full overflow-visible lg:h-[85vh] lg:min-h-[80vh]"
        />
      </section>

      <section className="relative pb-18 pt-14 sm:pb-26 sm:pt-20">
        <Container className="max-w-[680px] text-center">
          <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted/85">
            Private Design Preview
          </div>
          <h1 className="mx-auto mt-6 max-w-[650px] font-serif text-balance text-[2.25rem] font-semibold leading-tight tracking-[-0.016em] text-foreground sm:text-6xl">
            Your outdoors, redesigned with quiet luxury.
          </h1>
          <p className="mx-auto mt-6 max-w-[56ch] text-pretty text-base leading-8 text-muted sm:text-lg sm:leading-9">
            Imagine stepping into an outdoor space that feels effortless, elevated, and unmistakably yours.
          </p>

          <div className="mt-13 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Button
              href="#quote"
              className="w-full justify-center py-[1.2rem] text-[14px] shadow-[0_18px_55px_-30px_rgba(27,138,58,0.75)] transition-all duration-300 hover:scale-[1.018] hover:brightness-105 hover:shadow-[0_26px_80px_-30px_rgba(72,198,104,0.72)] active:scale-[0.995]"
              style={{
                backgroundImage:
                  "linear-gradient(165deg, color-mix(in oklab, var(--green-bright) 38%, var(--green)) 0%, color-mix(in oklab, var(--green) 78%, #103621) 56%, #0f2a1b 100%)",
              }}
            >
              Get Your Custom Design
            </Button>
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/2 px-6 py-[1.2rem] text-[13px] font-medium tracking-[0.04em] text-foreground/80 transition-all duration-300 hover:border-white/24 hover:bg-white/5 hover:text-foreground/92 active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Call Now
            </a>
          </div>
        </Container>
      </section>

      <section id="quote" className="scroll-mt-24 py-22 sm:py-30">
        <Container>
          <div className="relative overflow-hidden rounded-[30px] bg-black/28 p-7 shadow-[0_30px_95px_-62px_rgba(0,0,0,0.96)] sm:p-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/16 blur-3xl" />
              <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/14 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22),transparent_60%)]" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12">
              <div>
                <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted/85">
                  Private consultation
                </div>
                <h2 className="mt-2 font-serif text-pretty text-4xl font-semibold leading-[1.06] tracking-[-0.012em] text-foreground sm:text-5xl">
                  Receive your tailored pricing and plan.
                </h2>
                <p className="mt-3 max-w-[52ch] text-sm leading-7 text-muted sm:text-base sm:leading-8">
                  Share a few details and we’ll follow up with a clear, premium scope for your home.
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

      <footer className="mt-16">
        <Container className="flex flex-col gap-3 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
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

