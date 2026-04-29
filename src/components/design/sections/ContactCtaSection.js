import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";

export function ContactCtaSection() {
  return (
    <section id="quote" className="scroll-mt-24 py-10 sm:py-14">
      <Container>
        <div className="rounded-3xl border border-card-border bg-card p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="text-xs font-medium tracking-wide text-muted">
                Contact / Free estimate
              </div>
              <h2 className="mt-2 text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Ready for a premium yard you’ll love coming home to?
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
                Call or text now for a fast consult. We’ll confirm feasibility, timeline, and a
                budget range — then build it clean with premium materials and details.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-medium tracking-tight text-black transition hover:bg-[color-mix(in_oklab,var(--gold)_88%,white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Call / Text Now
                </a>
                <Button href="#quoteiq" className="w-full justify-center">
                  Get Free Estimate
                </Button>
              </div>

              <div className="mt-4 text-sm text-muted">
                Phone: <span className="text-foreground">{BRAND.phoneDisplay}</span>
              </div>
            </div>

            <div
              id="quoteiq"
              className="relative overflow-hidden rounded-3xl border border-card-border bg-black/10 p-6"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
                <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22),transparent_60%)]" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium tracking-wide text-muted">
                      QuoteIQ estimate (placeholder)
                    </div>
                    <div className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                      Get a fast budget range + timeline
                    </div>
                  </div>
                  <span className="rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] text-muted">
                    Embed
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-card-border bg-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm text-muted">
                      Replace this block with your QuoteIQ embed snippet (iframe/script).
                    </div>
                    <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] text-muted">
                      Secure
                    </span>
                  </div>
                  <div className="mt-4 h-28 w-full rounded-xl border border-card-border bg-black/10" />
                  <div className="mt-4 grid gap-2 text-xs text-muted">
                    <div>
                      - We’ll confirm scope, materials, and site constraints.
                    </div>
                    <div>
                      - You’ll get a clear timeline and next steps.
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  <Button href="#before-after" variant="secondary" className="w-full justify-center">
                    Recheck before/after
                  </Button>
                  <a
                    href={`tel:${BRAND.phoneTel}`}
                    className="inline-flex items-center justify-center rounded-full border border-card-border bg-card px-5 py-3 text-sm font-medium tracking-tight text-foreground transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Call {BRAND.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

