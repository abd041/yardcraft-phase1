import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { BRAND } from "@/lib/brand";

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M3.65 1.5a.5.5 0 0 0-.36.15L2 2.94c-.74.74-.93 1.85-.52 2.85.82 1.98 2.35 4.08 4.28 6.01s4.03 3.46 6.01 4.28c1 .41 2.11.22 2.85-.52l1.29-1.29a.5.5 0 0 0 0-.7l-2.5-2.5a.5.5 0 0 0-.7 0l-1.5 1.5a.25.25 0 0 1-.33.02 16.9 16.9 0 0 1-3.54-3.54.25.25 0 0 1 .02-.33l1.5-1.5a.5.5 0 0 0 0-.7L4 1.65a.5.5 0 0 0-.35-.15z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-card-border/50 bg-black/25">
      <Container className="py-9 sm:py-10">
        {/* Three-column layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-center sm:gap-4">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Phone + location — centered */}
          <div className="flex flex-col items-start gap-1.5 sm:items-center">
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
            >
              <PhoneIcon />
              {BRAND.phoneDisplay}
            </a>
            <p className="text-xs text-muted">Serving Northern Virginia</p>
          </div>

          {/* Copyright — right aligned */}
          <p className="text-xs text-muted sm:text-right">
            © {new Date().getFullYear()} YardCraft. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
