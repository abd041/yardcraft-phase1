import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";

export function DesignQrHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-card-border/70 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="hidden text-sm font-semibold tracking-tight text-foreground/90 hover:text-foreground transition sm:inline-flex"
          >
            {BRAND.phoneDisplay}
          </a>
          <Button href="#quote" className="px-4 py-2">
            Get estimate
          </Button>
        </div>
      </Container>
    </header>
  );
}

