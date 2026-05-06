import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-28 sm:py-36">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-black/40 p-6 sm:rounded-[22px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:gap-8">
            <div className="relative">
              <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Trust</div>
              <Reveal
                as="h2"
                className="mt-1 font-serif text-pretty text-4xl font-semibold leading-[1.06] tracking-[-0.012em] text-foreground sm:text-5xl"
              >
                Trusted by homeowners across Northern Virginia
              </Reveal>
              <Reveal as="p" className="mt-4 max-w-[52ch] text-base font-medium leading-[1.75] text-muted lg:text-[1.125rem] lg:leading-[1.72]" y={12} duration={0.85}>
                Clean reputation, local proof, and real install results.
              </Reveal>
            </div>
            <Reveal className="relative flex items-center gap-3 text-sm font-medium leading-relaxed text-muted lg:text-base" y={10} duration={0.8}>
              <Stars />
              <span className="text-foreground">4.9 average rating</span>
            </Reveal>
          </div>

          <Stagger className="relative mt-24 space-y-20" stagger={0.07}>
            <div data-stagger className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-x-16 lg:gap-y-6">
              <TrustShell title="Google Reviews" kicker="Social proof">
                <div className="flex items-center gap-3">
                  <Stars />
                  <span className="text-sm font-medium text-muted lg:text-[0.9375rem]">Live rating and verified review count</span>
                </div>
              </TrustShell>
              <TrustShell title="Client identity" kicker="Name + area">
                <p className="text-sm font-medium leading-7 text-muted lg:text-[0.9375rem] lg:leading-[1.65]">
                  Homeowner name, neighborhood/city, and project type displayed with each review.
                </p>
              </TrustShell>
            </div>

            <div data-stagger className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-x-12">
              <ReviewCardPlaceholder />
              <ReviewCardPlaceholder />
              <ReviewCardPlaceholder />
            </div>

            <div data-stagger className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-x-12">
              <PhotoPlaceholder label="Project highlight" />
              <PhotoPlaceholder label="Project highlight" />
              <PhotoPlaceholder label="Project highlight" />
            </div>
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function TrustShell({ title, kicker, children }) {
  return (
    <div className="space-y-5 border-t border-white/[0.09] pt-7">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold tracking-tight text-foreground/95">{title}</div>
        <span className="rounded-full bg-black/20 px-3 py-1 text-[10px] tracking-[0.08em] uppercase text-muted/90">
          {kicker}
        </span>
      </div>
      {children}
    </div>
  );
}

function ReviewCardPlaceholder() {
  return (
    <div className="space-y-4 border-t border-white/[0.09] pt-7">
      <p className="text-sm font-medium leading-[1.72] text-muted lg:text-[1.0625rem] lg:leading-[1.72]">
        “Beautiful execution, professional communication, and a result that elevated our entire home.”
      </p>
      <div className="text-xs font-medium tracking-[0.08em] uppercase text-muted/90 lg:text-[13px]">
        Homeowner Name • Northern Virginia
      </div>
    </div>
  );
}

function PhotoPlaceholder({ label }) {
  return (
    <div className="space-y-3.5">
      <div className="aspect-4/3 w-full rounded-2xl border border-white/[0.11] bg-white/[0.035]" />
      <div className="text-[11px] tracking-[0.14em] uppercase text-muted/85">{label}</div>
    </div>
  );
}

function Stars() {
  return (
    <span className="inline-flex items-center gap-1 text-[color-mix(in_oklab,var(--gold)_75%,white)]">
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span className="sr-only">5 star rating</span>
    </span>
  );
}

