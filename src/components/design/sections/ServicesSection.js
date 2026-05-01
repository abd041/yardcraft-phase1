import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

const services = [
  { title: "Landscaping", icon: LeafIcon },
  { title: "Hardscaping", icon: BlocksIcon },
  { title: "Outdoor living", icon: PathIcon },
  { title: "Landscape lighting", icon: SparkleIcon },
  { title: "Premium installs", icon: LayersIcon },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 py-10 sm:py-14">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
              Services
            </div>
            <Reveal
              as="h2"
              className="mt-1 font-serif text-pretty text-3xl font-semibold leading-[1.08] tracking-[-0.01em] text-foreground sm:text-4xl"
            >
              Premium outdoor work, done clean.
            </Reveal>
            <Reveal
              as="p"
              className="mt-2 max-w-[62ch] text-sm leading-6 text-muted sm:text-base sm:leading-7"
              y={12}
              duration={0.85}
            >
              Landscaping • Hardscaping • Outdoor living • Lighting
            </Reveal>
          </div>
          <div />
        </div>

        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} Icon={s.icon} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function ServiceCard({ title, Icon }) {
  return (
    <div
      data-stagger
      className="group rounded-3xl border border-card-border bg-card p-6 transition hover:border-[color-mix(in_oklab,var(--gold)_35%,var(--card-border))] hover:-translate-y-0.5 hover:shadow-[0_22px_65px_-35px_rgba(214,178,94,0.35)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-base font-semibold tracking-tight text-foreground">{title}</div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl border border-card-border bg-black/10 text-[color-mix(in_oklab,var(--green-bright)_65%,white)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 text-xs text-muted">Premium scope • Clean execution</div>
    </div>
  );
}

function LeafIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M19 5c-7 0-12 5-12 12 0 1.6.3 2.9.8 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 5c0 8-6 14-14 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BlocksIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M4 15.5 12 11l8 4.5-8 4.5-8-4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LayersIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 4 3 9l9 5 9-5-9-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M3 14l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 3l1.2 3.6L17 8l-3.8 1.4L12 13l-1.2-3.6L7 8l3.8-1.4L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 13l.7 2.1L8 16l-2.3.9L5 19l-.7-2.1L2 16l2.3-.9L5 13Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

function SproutIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 21v-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 14c-5 0-7-3-7-7 4 0 7 2 7 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 14c5 0 7-3 7-7-4 0-7 2-7 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompassIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M14.5 9.5 9 11l-1.5 5.5L13 15l1.5-5.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PathIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M5 20c5-6 9-6 14 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 6c2.5 0 3.5 1 5 4s2.5 4 5 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

