import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function LocalUrgencySection() {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-green/10 blur-3xl" />
            <div className="absolute -right-24 bottom-[-140px] h-[380px] w-[380px] rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_55%)]" />
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="text-foreground/85">Local</Badge>
                <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] font-medium tracking-wide text-muted">
                  Currently Serving Your Neighborhood
                </span>
              </div>
              <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Premium install windows fill quickly in peak season.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                If you want the yard finished before the next hosting season, request your consult
                now. We’ll confirm feasibility, timeline, and a budget range — with a clean scope
                and no surprises.
              </p>
            </div>

            <div className="grid gap-3">
              <Pill title="Consult" body="48-hour scheduling" />
              <Pill title="Plan" body="Clear scope + materials" />
              <Pill title="Build" body="Premium details + lighting" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pill({ title, body }) {
  return (
    <div className="rounded-2xl border border-card-border bg-black/10 px-4 py-3">
      <div className="text-[11px] font-medium tracking-wide text-muted">{title}</div>
      <div className="mt-1 text-sm font-semibold tracking-tight text-foreground">{body}</div>
    </div>
  );
}

