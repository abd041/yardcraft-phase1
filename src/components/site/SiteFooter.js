import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-card-border/70">
      <Container className="flex flex-col gap-3 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-foreground transition" href={`tel:${BRAND.phoneTel}`}>
            {BRAND.phoneDisplay}
          </a>
          <Link className="hover:text-foreground transition" href="/api/health">
            Status
          </Link>
          <Link className="hover:text-foreground transition" href="/design">
            Homeowner previews
          </Link>
        </div>
      </Container>
    </footer>
  );
}

