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
import { BRAND } from "@/lib/brand";
import { QuoteIqEmbed } from "@/components/quoteiq/QuoteIqEmbed";

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M3.65 1.5a.5.5 0 0 0-.36.15L2 2.94c-.74.74-.93 1.85-.52 2.85.82 1.98 2.35 4.08 4.28 6.01s4.03 3.46 6.01 4.28c1 .41 2.11.22 2.85-.52l1.29-1.29a.5.5 0 0 0 0-.7l-2.5-2.5a.5.5 0 0 0-.7 0l-1.5 1.5a.25.25 0 0 1-.33.02 16.9 16.9 0 0 1-3.54-3.54.25.25 0 0 1 .02-.33l1.5-1.5a.5.5 0 0 0 0-.7L4 1.65a.5.5 0 0 0-.35-.15z"
        fill="currentColor"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) return { title: "Design not found" };
  return {
    title: `YardCraft • ${design.slug}`,
    description: `${BRAND.tagline}. Luxury outdoor living preview with before/after comparison and a fast estimate.`,
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
            backgroundImage: "url(/images/luxury-patio.jpg)",
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

      <section className="touch-pan-y-safe relative z-20 -mt-1 pt-0 lg:-mt-3">
        <PremiumBeforeAfter
          beforeUrl={beforeSrc}
          afterUrl={afterSrc}
          className="relative z-20 h-[80dvh] min-h-[72dvh] w-full overflow-visible lg:h-[85vh] lg:min-h-[80vh]"
        />

        {/* Tailored Property Preview label — sits directly below the slider */}
        <div className="relative z-20 py-6 text-center sm:py-8">
          <h2 className="font-serif text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[2.5rem] lg:text-[3rem]">
            Tailored Property Preview
          </h2>
        </div>

        {/* CTA — What's your vision? */}
        <Container className="relative z-20 max-w-[560px] px-4 pb-6 pt-1 sm:px-6 sm:pb-8 sm:pt-2 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-black/35 px-6 py-7 text-center shadow-[0_20px_56px_-44px_rgba(0,0,0,0.78)] sm:rounded-[22px] sm:px-8 sm:py-9">
            <h2 className="font-serif text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground sm:text-[1.75rem]">
              What&apos;s your vision? Let&apos;s talk.
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:justify-center sm:gap-4">
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/14 px-7 py-3.5 text-[13px] font-semibold tracking-[0.04em] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_12px_40px_-24px_rgba(0,0,0,0.5)] transition duration-300 ease-out hover:border-white/58 hover:bg-white/20 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/55 sm:py-4"
              >
                <PhoneIcon />
                Call Us
              </a>
              <a
                href={`sms:${BRAND.phoneTel}?body=${encodeURIComponent("Hi YardCraft, I just viewed the before & after concept for my property and wanted to explore possibilities for my outdoor space.")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-green/70 bg-green px-7 py-3.5 text-[13px] font-semibold tracking-[0.04em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_40px_-24px_rgba(31,122,58,0.55)] transition duration-300 ease-out hover:bg-green/90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/60 sm:py-4"
              >
                <MessageIcon />
                Text Us
              </a>
            </div>
          </div>
        </Container>

        <div id="quote" className="touch-pan-y-safe scroll-mt-20">
          <Container className="relative z-20 mx-auto max-w-6xl px-4 pb-20 pt-2 sm:px-6 sm:pb-24 sm:pt-3 lg:px-8">
            <div className="relative overflow-x-clip overflow-y-visible rounded-none border border-white/[0.07] bg-black/22 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.82)] sm:rounded-[28px]">
              <div className="pointer-events-none absolute inset-0 sm:rounded-[28px]">
                <div className="absolute -right-20 -top-20 h-[220px] w-[220px] rounded-full bg-green/8 blur-3xl sm:-right-24 sm:-top-24 sm:h-[260px] sm:w-[260px]" />
                <div className="absolute -bottom-16 -left-16 h-[240px] w-[240px] rounded-full bg-gold/6 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),transparent_55%)] sm:rounded-[28px]" />
              </div>
              <div className="relative px-4 pb-4 pt-10 text-center sm:px-10 sm:pb-6 sm:pt-12 lg:px-12 lg:pt-14">
                <h2 className="mx-auto max-w-[26ch] font-serif text-[1.625rem] font-semibold leading-[1.18] tracking-[-0.03em] text-foreground sm:text-3xl sm:leading-[1.12]">
                  Come home to that deep &ldquo;ahhh&rdquo; while your neighbors can&apos;t help but say &ldquo;wow.&rdquo;
                </h2>
                <p className="mx-auto mt-3 max-w-[34ch] text-[13px] font-medium leading-relaxed text-muted sm:mt-4 sm:text-sm">
                  Tell us what you have in mind.
                </p>
              </div>
              <div className="relative border-t border-white/[0.06] px-4 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-4 lg:px-10 lg:pb-10">
                <QuoteIqEmbed slug={slug} pageUrl={pageUrl} />
              </div>
            </div>
          </Container>
        </div>
      </section>

      <TrustSection />

      <ServicesSection />

      <footer className="mt-24 sm:mt-32">
        <Container className="pb-16 sm:pb-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 px-6 py-10 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.75)] sm:rounded-[22px] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(214,178,94,0.04),transparent_42%,rgba(31,122,58,0.03)_88%)]" />
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10 lg:gap-12">
                <Image
                  src="/images/YardCraftLogo.png"
                  alt={BRAND.name}
                  width={220}
                  height={220}
                  className="h-28 w-28 shrink-0 object-contain opacity-95 drop-shadow-[0_10px_36px_rgba(0,0,0,0.35)] sm:h-32 sm:w-32 lg:h-[8.75rem] lg:w-[8.75rem]"
                />
                <div className="min-w-0">
                  <div className="font-serif text-[1.75rem] font-semibold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-[2rem] lg:text-[2.125rem]">
                    {BRAND.name}
                  </div>
                  <p className="mt-3 max-w-[38ch] text-pretty text-[0.9375rem] font-medium leading-snug text-muted sm:mt-3.5 sm:text-base sm:leading-relaxed lg:mt-4 lg:max-w-[40ch] lg:text-[1.0625rem]">
                    {BRAND.tagline}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="inline-flex w-full shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/[0.07] px-6 py-3 text-sm font-semibold tracking-wide text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition hover:border-white/24 hover:bg-white/12 sm:w-auto sm:justify-center sm:py-3.5 lg:self-end"
              >
                {BRAND.phoneDisplay}
              </a>
            </div>
            <div className="relative mt-10 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
              <p className="text-[12px] font-medium leading-relaxed tracking-[0.02em] text-muted sm:text-[13px]">
                © {new Date().getFullYear()} {BRAND.legalEntity}. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </footer>
      {isAdmin ? <AdminQuickEditFab slug={design.slug} /> : null}
    </div>
  );
}
