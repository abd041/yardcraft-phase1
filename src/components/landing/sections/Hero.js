import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { QuoteIqEmbed } from "@/components/quoteiq/QuoteIqEmbed";

export function Hero({ content }) {
  return (
    <section className="relative">
      <Container className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="text-foreground/85">{content.eyebrow}</Badge>
              <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] font-medium tracking-wide text-muted">
                Licensed • Insured • Local
              </span>
              <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] font-medium tracking-wide text-muted">
                Premium finish • Clean install
              </span>
            </div>

            <h1 className="font-serif text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-6xl">
              <span className="block">See your yard</span>
              <span className="block">
                transformed{" "}
                <span className="bg-[linear-gradient(90deg,color-mix(in_oklab,var(--green-bright)_75%,white),var(--green))] bg-clip-text text-transparent">
                  instantly
                </span>
                .
              </span>
            </h1>
            <p className="max-w-[62ch] text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Luxury landscaping + outdoor living, designed for dark premium curb appeal: crisp
              borders, premium stone, and lighting that makes your home look expensive after
              sunset.
            </p>

            <div className="grid w-full gap-3 sm:grid-cols-[1fr_1fr] sm:gap-4">
              <Button href={content.primaryCta.href} className="w-full justify-center">
                {content.primaryCta.label}
              </Button>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="inline-flex items-center justify-center rounded-full border border-card-border bg-card px-6 py-3.5 text-[13px] font-medium tracking-[0.04em] text-foreground transition hover:border-[color-mix(in_oklab,var(--gold)_40%,var(--card-border))] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Call {BRAND.phoneDisplay}
              </a>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Button
                variant="secondary"
                href="#services"
                className="w-full justify-center sm:w-auto"
              >
                Explore services
              </Button>
              <div className="text-xs text-muted sm:text-sm">
                No-pressure consult. Clear scope. Premium finish.
              </div>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3">
              <Kpi title="On-site consult" value="Fast" body="Book in 48 hours" />
              <Kpi title="Premium finish" value="Clean" body="Lighting + borders" />
              <Kpi title="Project clarity" value="Clear" body="Scope + timeline" />
            </div>
          </div>

          <div
            id="quote"
            className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
              <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22),transparent_58%)]" />
            </div>

            <div className="relative text-xs font-medium tracking-[0.14em] uppercase text-muted">
              Instant estimate
            </div>
            <h2 className="mt-2 font-serif text-xl font-semibold leading-[1.05] tracking-[-0.01em] text-foreground sm:text-2xl">
              Get pricing & timeline today.
            </h2>
            <p className="mt-2 max-w-[62ch] text-sm leading-6 text-muted">
              Answer a few quick questions to get a fast budget range.
            </p>

            <div className="mt-4">
              <QuoteIqEmbed slug="home" pageUrl="" />
            </div>

            <div className="mt-4 grid gap-2">
              <Button href={content.primaryCta.href} className="w-full justify-center">
                Get instant estimate
              </Button>
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3.5 text-[13px] font-medium tracking-[0.04em] text-black transition hover:bg-[color-mix(in_oklab,var(--gold)_88%,white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Call {BRAND.phoneDisplay}
              </a>
              <div className="text-center text-xs text-muted">
                Prefer text? Add SMS link here when ready.
              </div>
            </div>

            <div className="relative mt-4 rounded-2xl border border-card-border bg-black/10 px-4 py-3 text-xs text-muted">
              Typical turnaround: <span className="text-foreground">48-hour consult</span> •{" "}
              <span className="text-foreground">clear scope</span> •{" "}
              <span className="text-foreground">premium finish</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Kpi({ title, value, body }) {
  return (
    <div className="rounded-2xl border border-card-border bg-black/10 p-4">
      <div className="text-[11px] font-medium tracking-wide text-muted">{title}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{body}</div>
    </div>
  );
}

