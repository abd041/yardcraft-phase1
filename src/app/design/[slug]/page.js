import { notFound } from "next/navigation";
import Image from "next/image";

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
  function absoluteImageUrl(url) {
    if (!url || typeof url !== "string") return url;
    const t = url.trim();
    if (t.startsWith("//")) return `https:${t}`;
    return t;
  }

  const beforeSrc = absoluteImageUrl(before) || absoluteImageUrl(after) || fallbackHeroImage;
  const afterSrc = absoluteImageUrl(after) || "";
  const isAdmin = await isAdminRequest();
  const pageUrl = `${getSiteUrl()}/design/${slug}`;

  return (
    <div className="design-landing pb-32 text-[15px] font-normal leading-[1.68] text-foreground sm:pb-40 sm:text-base sm:leading-[1.66] lg:text-[1.125rem] lg:leading-[1.72] xl:text-[1.14rem] xl:leading-[1.73]">
      {/* Architectural outdoor backdrop — single sharp plate + depth (no heavy duplicate blur) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 scale-[1.03] opacity-[0.92]"
          style={{
            backgroundImage: "url(/images/luxury-patio.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.58),rgba(0,0,0,0.48)_44%,rgba(0,0,0,0.64))]" />
        <div className="absolute inset-0 bg-[radial-gradient(880px_500px_at_50%_-120px,rgba(214,178,94,0.07),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(820px_480px_at_50%_92%,rgba(31,122,58,0.05),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.48)_100%)]" />
      </div>

      <DesignQrHeader />

      <section className="relative z-20 min-h-[72dvh] -mt-1 pt-0 lg:-mt-3">
        <PremiumBeforeAfter
          beforeUrl={beforeSrc}
          afterUrl={afterSrc}
          className="relative z-20 h-[80dvh] min-h-[72dvh] w-full overflow-visible lg:h-[85vh] lg:min-h-[80vh]"
        />
      </section>

      <section className="relative pb-24 pt-20 sm:pb-32 sm:pt-24">
        <Container className="max-w-[720px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-black/40 p-8 text-center sm:rounded-[22px] sm:p-10 lg:p-12">
            <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted">
              Private Design Preview
            </div>
            <h1 className="mx-auto mt-7 max-w-[680px] font-serif text-balance text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.012em] text-foreground sm:mt-8 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              From premium yard refreshes to high-end outdoor transformations. We help bring your vision to life.
            </h1>

            <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
              <Button
                href="#quote"
                className="w-full justify-center py-[1.2rem] text-[14px] font-semibold shadow-[0_14px_48px_-28px_rgba(27,138,58,0.55)] transition-all duration-300 ease-out hover:scale-[1.012] hover:brightness-[1.04] hover:shadow-[0_20px_56px_-28px_rgba(45,160,78,0.45)] active:scale-[0.995]"
                style={{
                  backgroundImage:
                    "linear-gradient(165deg, color-mix(in oklab, var(--green-bright) 38%, var(--green)) 0%, color-mix(in oklab, var(--green) 78%, #103621) 56%, #0f2a1b 100%)",
                }}
              >
                Request Your Custom Plan
              </Button>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/14 px-6 py-[1.2rem] text-[13px] font-semibold tracking-[0.04em] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_14px_44px_-28px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out hover:border-white/60 hover:bg-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_48px_-28px_rgba(0,0,0,0.5)] active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Call Now
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="quote" className="scroll-mt-24 py-28 sm:py-36">
        <div className="mx-auto w-full max-w-6xl px-0 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-none border border-white/[0.07] bg-black/[0.22] p-8 shadow-[0_32px_90px_-50px_rgba(0,0,0,0.85)] sm:rounded-[32px] sm:p-14">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
              <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/8 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),transparent_58%)]" />
            </div>

            <div className="relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
              <div className="rounded-2xl border border-white/6 bg-black/40 p-6 sm:rounded-[22px] sm:p-8 lg:p-10">
                <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Consultation</div>
                <h2 className="mt-4 font-serif text-pretty text-4xl font-semibold leading-[1.06] tracking-[-0.01em] text-foreground sm:text-5xl">
                  Tell us about your project. We’ll follow up with the right next step.
                </h2>
                <p className="mt-6 max-w-[52ch] text-[0.9375rem] font-medium leading-[1.75] text-muted sm:text-base sm:leading-[1.72] lg:text-[1.125rem] lg:leading-[1.73]">
                  Share a few details about your property and project. We’ll review your request and follow up with the best next step — whether that’s a quick estimate, a site visit, or a tailored project plan.
                </p>
                <p className="mt-7 text-[11px] font-medium leading-relaxed tracking-[0.06em] text-muted">
                  Quick response <span className="mx-1.5 text-muted/55">·</span> Clear scope{" "}
                  <span className="mx-1.5 text-muted/55">·</span> No-pressure consultation
                </p>
                <p className="mt-5 max-w-[54ch] text-sm font-medium leading-[1.72] text-muted sm:text-[0.9375rem] sm:leading-[1.75] lg:text-[1.0625rem] lg:leading-[1.74]">
                  Smaller projects — mulch, cleanups, lawn care, garage or basement cleanouts — often need only a quick estimate. Larger work — patios, walkways, decks, fences, lighting, irrigation, and full outdoor transformations — may call for a site visit or more detailed planning. We match the process to your project.
                </p>
              </div>

              <div className="relative">
                <QuoteIqEmbed slug={slug} pageUrl={pageUrl} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />

      <ServicesSection />

      <footer className="mt-24 sm:mt-32">
        <Container className="pb-16 sm:pb-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-black/40 p-6 sm:rounded-[22px] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-14 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
              <div className="flex max-w-md flex-col gap-5">
                <Image
                  src="/images/YardCraftLogo.png"
                  alt="YardCraft"
                  width={120}
                  height={120}
                  className="h-12 w-12 object-contain opacity-90 sm:h-13 sm:w-13"
                />
                <p className="max-w-[28ch] text-[11px] font-medium leading-relaxed tracking-[0.18em] text-muted">
                  Outdoor living, crafted with precision
                </p>
              </div>
              <div className="flex items-center gap-6 sm:pt-1">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 p-2.5 text-muted transition duration-300 hover:border-white/20 hover:text-foreground"
                  aria-label="YardCraft on Instagram"
                >
                  <SocialInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 p-2.5 text-muted transition duration-300 hover:border-white/20 hover:text-foreground"
                  aria-label="YardCraft on Facebook"
                >
                  <SocialFacebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="mt-14 flex flex-col gap-4 border-t border-white/9 pt-12 text-sm leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between lg:text-[0.9375rem] lg:leading-relaxed">
              <p>© {new Date().getFullYear()} YardCraft. All rights reserved.</p>
              <a className="text-foreground transition hover:text-foreground" href={`tel:${BRAND.phoneTel}`}>
                {BRAND.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </footer>
      {isAdmin ? <AdminQuickEditFab slug={design.slug} /> : null}
    </div>
  );
}

function SocialInstagram({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function SocialFacebook({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M13.5 9.5H16V7h-2.6c-2.3 0-3.9 1.4-3.9 3.9V12H7v2.6h2.5V22h3v-7.4h2.7l.5-2.6H12.5v-1.8c0-.8.4-1.2 1.3-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
