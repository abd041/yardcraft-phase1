import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

const services = [
  {
    title: "Premium Yard Refresh",
    body: "Spring cleanups, weeding, trimming, edging, and curb appeal upgrades.",
    icon: LeafIcon,
  },
  {
    title: "Mulch & Planting",
    body: "Fresh mulch, clean bed edges, seasonal planting, and front yard upgrades.",
    icon: SproutIcon,
  },
  {
    title: "Garage & Basement Cleanouts",
    body: "Cleanouts, junk removal, hauling, and dump runs handled cleanly.",
    icon: BlocksIcon,
  },
  {
    title: "Lawn Care & Maintenance",
    body: "Mowing, trimming, blowing, and recurring property care.",
    icon: PathIcon,
  },
  {
    title: "Outdoor Upgrades",
    body: "Patios, walkways, decks, fences, pergolas, lighting, drainage, and irrigation — reviewed by project.",
    icon: SparkleIcon,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 py-28 sm:py-36">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-black/40 p-6 sm:rounded-[22px] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">Services</div>
              <Reveal
                as="h2"
                className="mt-3 max-w-[20ch] font-sans text-[1.625rem] font-medium leading-[1.18] tracking-[-0.04em] text-foreground sm:mt-3.5 sm:max-w-[24ch] sm:text-[1.875rem] sm:leading-[1.14] lg:text-[2rem] lg:leading-[1.12]"
              >
                Complete outdoor care.
              </Reveal>
              <Reveal
                as="p"
                className="mt-4 max-w-[64ch] text-sm font-medium leading-[1.72] text-muted sm:mt-5 sm:text-base sm:leading-[1.7] lg:text-[1.125rem] lg:leading-[1.72] xl:text-[1.14rem]"
                y={12}
                duration={0.85}
              >
                Tailored scope for every property — quick turnarounds when it fits, elevated planning when the project demands it.
              </Reveal>
            </div>
            <div />
          </div>

          <Stagger className="mt-24 grid gap-20 sm:grid-cols-2 sm:gap-x-24 sm:gap-y-20 lg:grid-cols-3 lg:gap-x-32 xl:gap-x-40">
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} body={s.body} Icon={s.icon} />
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ title, body, Icon }) {
  return (
    <div data-stagger className="group border-l border-white/8 pl-5 pt-1 sm:pl-7">
      <div className="flex items-start justify-between gap-5">
        <div className="text-[1.04rem] font-semibold tracking-[-0.01em] text-foreground">{title}</div>
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[color-mix(in_oklab,var(--green-bright)_58%,white)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm font-medium leading-7 text-muted sm:text-base sm:leading-8 lg:text-[1.0625rem] lg:leading-8 xl:text-[1.09rem] xl:leading-[1.75]">
        {body}
      </p>
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
