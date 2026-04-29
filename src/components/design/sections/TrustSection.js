import { Container } from "@/components/ui/Container";

export function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-10 sm:py-14">
      <Container>
        <div className="rounded-3xl border border-card-border bg-card p-6 sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-medium tracking-wide text-muted">Trust</div>
              <h2 className="mt-1 text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Trusted By Homeowners Across Northern Virginia
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Swap these placeholders with reviews, testimonials, Google Maps, and completed
                project galleries.
              </p>
            </div>
            <div className="text-sm text-muted">Reviews • Proof • Projects</div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            <PlaceholderCard title="Reviews">
              Add Google rating, review highlights, and badges here.
            </PlaceholderCard>
            <PlaceholderCard title="Testimonials">
              Insert homeowner quotes + photos (with permission).
            </PlaceholderCard>
            <PlaceholderCard title="Google Maps">
              Embed your service area map or location pins.
            </PlaceholderCard>
            <PlaceholderCard title="Completed projects">
              Add a mini gallery grid of real jobs and finishes.
            </PlaceholderCard>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlaceholderCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-card-border bg-black/10 p-6">
      <div className="text-sm font-semibold tracking-tight text-foreground">{title}</div>
      <div className="mt-2 text-sm leading-6 text-muted">{children}</div>
      <div className="mt-5 h-20 w-full rounded-2xl border border-card-border bg-card" />
    </div>
  );
}

