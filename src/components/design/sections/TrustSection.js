import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-22 sm:py-30">
      <Container>
        <div className="relative px-0 sm:px-1">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="relative">
              <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Trust</div>
              <Reveal
                as="h2"
                className="mt-1 font-serif text-pretty text-4xl font-semibold leading-[1.06] tracking-[-0.012em] text-foreground sm:text-5xl"
              >
                Trusted by homeowners across Northern Virginia
              </Reveal>
              <Reveal as="p" className="mt-3 text-base leading-8 text-muted" y={12} duration={0.85}>
                Clean reputation, local proof, and real install results.
              </Reveal>
            </div>
            <Reveal className="relative flex items-center gap-3 text-sm text-muted" y={10} duration={0.8}>
              <Stars />
              <span className="text-foreground/85">4.9 average rating</span>
            </Reveal>
          </div>

          <Stagger className="relative mt-16 space-y-14" stagger={0.07}>
            <div data-stagger className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <TrustShell title="Google Reviews" kicker="Social proof">
                <div className="flex items-center gap-3">
                  <Stars />
                  <span className="text-sm text-muted">Live rating and verified review count</span>
                </div>
              </TrustShell>
              <TrustShell title="Client identity" kicker="Name + area">
                <p className="text-sm leading-7 text-muted">
                  Homeowner name, neighborhood/city, and project type displayed with each review.
                </p>
              </TrustShell>
            </div>

            <div data-stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              <ReviewCardPlaceholder />
              <ReviewCardPlaceholder />
              <ReviewCardPlaceholder />
            </div>

            <div data-stagger className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
    <div className="space-y-4 border-t border-white/8 pt-6">
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
    <div className="space-y-4 border-t border-white/8 pt-6">
      <p className="text-sm leading-7 text-muted">
        “Beautiful execution, professional communication, and a result that elevated our entire home.”
      </p>
      <div className="text-xs tracking-[0.08em] uppercase text-muted/85">
        Homeowner Name • Northern Virginia
      </div>
    </div>
  );
}

function PhotoPlaceholder({ label }) {
  return (
    <div className="space-y-3">
      <div className="aspect-4/3 w-full rounded-2xl border border-white/10 bg-white/3" />
      <div className="text-[11px] tracking-widest uppercase text-muted/80">{label}</div>
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

