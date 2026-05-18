import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

/* ── per-service SVG icons ─────────────────────────────────────── */
function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function ShovelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <line x1="12" y1="22" x2="12" y2="12"/>
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

const SERVICE_ICONS = [LeafIcon, ShovelIcon, BoxIcon, ScissorsIcon, GridIcon, ZapIcon];

export function ServicesSection({ id, label, title, items }) {
  return (
    <section id={id} className="relative scroll-mt-20 py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold">
              {label}
            </p>
          </Reveal>
          <Reveal
            as="h2"
            className="font-serif text-pretty text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-foreground sm:text-[2.5rem]"
          >
            {title}
          </Reveal>
        </div>

        {/* 6-column grid — scrollable on mobile */}
        <div className="overflow-x-auto pb-2">
          <Stagger className="grid min-w-225 grid-cols-6 gap-3 sm:min-w-0 lg:gap-4">
            {items.map((item, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <article
                  key={item.title}
                  data-stagger
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-white/8 transition hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.8)]"
                  style={{ background: item.gradient }}
                >
                  {/* inner glow on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(214,178,94,0.12),transparent_70%)]" />

                  {/* Icon */}
                  <div className="absolute left-4 top-5 text-foreground/50 transition group-hover:text-gold/70">
                    <Icon />
                  </div>

                  {/* Content */}
                  <div className="relative p-4">
                    <h3 className="text-[13px] font-semibold leading-snug tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-[1.55] text-foreground/55">
                      {item.description}
                    </p>
                    {/* Arrow */}
                    <div className="mt-3 text-foreground/35 transition group-hover:text-gold/60">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </article>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
