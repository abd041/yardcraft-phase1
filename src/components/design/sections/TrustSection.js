import { Container } from "@/components/ui/Container";

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
              <div className="text-xs font-medium tracking-wide text-muted">Trust</div>
              <h2 className="mt-1 text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Trusted By Homeowners Across Northern Virginia
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Replace these placeholders with your Google rating, review screenshots,
                neighborhood map, and finished project photos.
              </p>
            </div>
            <div className="relative flex items-center gap-2 text-sm text-muted">
              <Stars />
              <span>Reviews • Proof • Projects</span>
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 lg:grid-cols-4">
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
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlaceholderCard({ title, kicker, children }) {
  return (
    <div className="rounded-3xl border border-card-border bg-black/10 p-6">
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

