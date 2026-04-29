import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-card-border/70 bg-background/80 backdrop-blur sm:hidden">
      <Container className="flex items-center gap-3 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold tracking-tight text-foreground">
            Your YardCraft preview is ready
          </div>
          <div className="truncate text-xs text-muted">Call now or request a free estimate</div>
        </div>
        <div className="ml-auto flex shrink-0 gap-2">
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="inline-flex items-center justify-center rounded-full border border-card-border bg-card px-4 py-3 text-sm font-medium tracking-tight text-foreground transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Call Now
          </a>
          <a
            href="#quote"
            className="inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-semibold tracking-tight text-white transition hover:bg-[color-mix(in_oklab,var(--green)_88%,white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Free Estimate
          </a>
        </div>
      </Container>
    </div>
  );
}

