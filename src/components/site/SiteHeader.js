import Link from "next/link";

import { landingContent } from "@/content/landing";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-card-border/70 bg-background/75 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 md:flex">
            {landingContent.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-foreground transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={`tel:${BRAND.phoneTel}`}
            className="hidden text-sm font-medium tracking-tight text-foreground/90 hover:text-foreground transition sm:inline-flex"
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

