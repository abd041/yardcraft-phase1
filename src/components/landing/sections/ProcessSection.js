import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

const PROCESS_ICONS = [ChatIcon, ClipboardIcon, ToolsIcon];

export function ProcessSection({ id, label, title, items }) {
  return (
    <section id={id} className="relative scroll-mt-20 py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,178,94,0.05)_0%,transparent_65%)]" />
      </div>

      <Container>
        {/* Header */}
        <div className="mb-14 text-center sm:mb-16">
          <Reveal>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold/80">
              {label}
            </p>
          </Reveal>
          <Reveal
            as="h2"
            className="font-serif text-pretty text-3xl font-semibold leading-[1.1] tracking-[-0.01em] text-foreground sm:text-[2.5rem]"
          >
            {title.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </Reveal>
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-6">
          {/* Connector line between circles — desktop only */}
          <div
            aria-hidden="true"
            className="absolute top-8 hidden h-px sm:block"
            style={{
              left: "calc(16.67% + 2.5rem)",
              right: "calc(16.67% + 2.5rem)",
              background: "linear-gradient(to right, rgba(214,178,94,0.25), rgba(214,178,94,0.12), rgba(214,178,94,0.25))",
            }}
          />

          <Stagger className="contents">
            {items.map((item, i) => {
              const Icon = PROCESS_ICONS[i];
              return (
                <div
                  key={item.title}
                  data-stagger
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle icon */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-card-border bg-card text-foreground/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_24px_-8px_rgba(0,0,0,0.6)]">
                    <Icon />
                  </div>

                  {/* Step number */}
                  <p className="mt-4 text-[11px] font-medium tracking-[0.12em] text-gold/60">
                    0{i + 1}
                  </p>

                  {/* Title */}
                  <h3 className="mt-1.5 text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 max-w-[26ch] text-sm leading-[1.7] text-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
