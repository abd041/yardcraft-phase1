import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BRAND } from "@/lib/brand";
import { Logo } from "@/components/site/Logo";

export function DesignHeroSection({ slug, afterUrl }) {
  return (
    <section className="relative overflow-hidden border-b border-card-border/70">
      <div className="absolute inset-0">
        {afterUrl ? (
          <div
            className="absolute inset-0 scale-[1.04] opacity-25 blur-2xl"
            style={{
              backgroundImage: `url(${afterUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : null}
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-20 left-[-220px] h-[520px] w-[520px] rounded-full bg-green/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-160px,rgba(214,178,94,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.68),transparent_42%,rgba(0,0,0,0.72))]" />
      </div>

      <Container className="relative py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="text-foreground/85">Design • {slug}</Badge>
              <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] font-medium tracking-wide text-muted">
                Northern Virginia
              </span>
              <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] font-medium tracking-wide text-muted">
                Licensed • Insured • Local
              </span>
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              <span className="block">One Possibility…</span>
              <span className="block">
                Build Your{" "}
                <span className="bg-[linear-gradient(90deg,color-mix(in_oklab,var(--green-bright)_75%,white),var(--green),var(--gold))] bg-clip-text text-transparent">
                  Dream
                </span>
                .
              </span>
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
              This AI-generated transformation is just one idea. Our team can custom-design and
              build the perfect outdoor space for your home.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <a
                href={`tel:${BRAND.phoneTel}`}
                className="inline-flex items-center justify-center rounded-full border border-card-border bg-card px-5 py-3 text-sm font-medium tracking-tight text-foreground transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Call Now
              </a>
              <Button href="#quote" className="w-full justify-center">
                Get Estimate
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="rounded-full border border-card-border bg-black/10 px-3 py-2 text-xs">
                {BRAND.phoneDisplay}
              </span>
              <span className="text-xs">
                Smooth, premium installs — clean borders, stone, lighting, outdoor living.
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-card-border bg-card p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-medium tracking-wide text-muted">YardCraft</div>
                <div className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  Outdoor Living
                </div>
              </div>
              <div className="hidden sm:block">
                <Logo />
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <InfoRow title="Consult" value="48-hour scheduling" />
              <InfoRow title="Scope" value="Clear plan + materials" />
              <InfoRow title="Finish" value="Premium details + lighting" />
            </div>

            <div className="mt-5 rounded-2xl border border-card-border bg-black/10 px-4 py-3 text-xs text-muted">
              Tap “Get Estimate” to see a budget range and timeline for your home.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoRow({ title, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-card-border bg-black/10 px-4 py-3">
      <div className="text-xs font-medium tracking-wide text-muted">{title}</div>
      <div className="text-sm font-semibold tracking-tight text-foreground">{value}</div>
    </div>
  );
}

