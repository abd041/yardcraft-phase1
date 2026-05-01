import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";

export function DesignQrHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-card-border/70 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <div className="text-xs font-medium tracking-[0.18em] uppercase text-muted">
          Instant preview
        </div>
      </Container>
    </header>
  );
}

