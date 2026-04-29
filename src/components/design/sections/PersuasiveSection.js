import { Container } from "@/components/ui/Container";

export function PersuasiveSection() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-3xl border border-card-border bg-card p-6 sm:p-8">
            <div className="text-xs font-medium tracking-wide text-muted">
              Beauty • Comfort • Home value
            </div>
            <h2 className="mt-2 text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              The yard should feel like a luxury extension of the home.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base sm:leading-7">
              A premium exterior isn’t about “more stuff.” It’s about restraint, contrast, and
              clean lines — the kind of finish that makes the entire property look higher-end.
              We design outdoor spaces that are beautiful to live in and strong for resale.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Point title="Expensive-looking contrast">
                Dark mulch + premium stone + crisp borders that read luxury instantly.
              </Point>
              <Point title="Comfortable outdoor living">
                Patios, walkways, and gathering spaces designed for real use.
              </Point>
              <Point title="Low-maintenance clarity">
                Intentional plantings and clean edges — less chaos, fewer weekends lost.
              </Point>
              <Point title="Night-ready lighting">
                Warm layers that perform after sunset and elevate the entire facade.
              </Point>
            </div>
          </div>

          <div className="rounded-3xl border border-card-border bg-black/10 p-6 sm:p-8">
            <div className="text-xs font-medium tracking-wide text-muted">Premium promise</div>
            <div className="mt-4 grid gap-3">
              <Card title="Clear scope">
                You’ll know what’s included, what’s not, and what it costs — upfront.
              </Card>
              <Card title="Clean execution">
                Respectful crews, tidy job sites, and a finish you can feel proud of.
              </Card>
              <Card title="Materials that age well">
                We spec products that stay premium after weather and seasons.
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Point({ title, children }) {
  return (
    <div className="rounded-2xl border border-card-border bg-black/10 p-4">
      <div className="text-sm font-semibold tracking-tight text-foreground">{title}</div>
      <div className="mt-2 text-sm leading-6 text-muted">{children}</div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-5">
      <div className="text-sm font-semibold tracking-tight text-foreground">{title}</div>
      <div className="mt-2 text-sm leading-6 text-muted">{children}</div>
    </div>
  );
}

