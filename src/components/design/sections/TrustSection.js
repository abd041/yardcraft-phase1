import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-18 sm:py-24">
      <Container>
        <div className="relative px-0 sm:px-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

          <Stagger className="relative mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            <PlaceholderCard title="Google rating" kicker="Placeholder">
              Drop your Google rating widget here (stars + count).
            </PlaceholderCard>
            <PlaceholderCard title="Testimonials" kicker="Placeholder">
              Add 2–3 short homeowner quotes with names/areas.
            </PlaceholderCard>
            <PlaceholderCard title="Service area map" kicker="Placeholder">
              Embed a map showing Northern Virginia neighborhoods served.
            </PlaceholderCard>
            <PlaceholderCard title="Completed projects" kicker="Placeholder">
              Add a mini gallery of real installs (before/after + detail shots).
            </PlaceholderCard>
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function PlaceholderCard({ title, kicker, children }) {
  return (
    <div data-stagger className="border-t border-white/8 pt-6">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold tracking-tight text-foreground/95">{title}</div>
        <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] tracking-[0.08em] uppercase text-muted">
          {kicker}
        </span>
      </div>
      <div className="mt-3 text-sm leading-7 text-muted">{children}</div>
      <div className="mt-6 h-px w-full bg-white/8" />
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

