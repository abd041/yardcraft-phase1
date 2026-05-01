import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-10 sm:py-14">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
            <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),transparent_60%)]" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="relative">
              <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
                Trust
              </div>
              <Reveal
                as="h2"
                className="mt-1 font-serif text-pretty text-3xl font-semibold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl"
              >
                Trusted By Homeowners Across Northern Virginia
              </Reveal>
              <Reveal as="p" className="mt-2 text-sm leading-6 text-muted" y={12} duration={0.85}>
                Google reviews • Local proof • Real installs
              </Reveal>
            </div>
            <Reveal className="relative flex items-center gap-2 text-sm text-muted" y={10} duration={0.8}>
              <Stars />
              <span>Reviews • Proof • Projects</span>
            </Reveal>
          </div>

          <Stagger className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
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
    <div
      data-stagger
      className="rounded-3xl border border-card-border bg-black/10 p-6 transition hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--gold)_35%,var(--card-border))] hover:shadow-[0_22px_65px_-35px_rgba(214,178,94,0.35)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm font-semibold tracking-tight text-foreground">{title}</div>
        <span className="rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] text-muted">
          {kicker}
        </span>
      </div>
      <div className="mt-2 text-sm leading-6 text-muted">{children}</div>
      <div className="mt-5 h-20 w-full rounded-2xl border border-card-border bg-card" />
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

