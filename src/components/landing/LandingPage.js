import { Hero } from "@/components/landing/sections/Hero";
import { FeatureGridSection } from "@/components/landing/sections/FeatureGridSection";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function LandingPage({ content }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-20 left-[-220px] h-[520px] w-[520px] rounded-full bg-green/10 blur-3xl" />
        <div className="absolute top-32 right-[-180px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-160px,rgba(214,178,94,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.58),transparent_45%,rgba(0,0,0,0.62))]" />
        <div className="absolute inset-x-0 top-[520px] h-px bg-card-border/70" />
      </div>

      <SiteHeader />
      <Hero content={content.hero} />

      <div className="mx-auto h-px w-full max-w-6xl bg-card-border/70 opacity-70" />
      <FeatureGridSection
        id={content.sections.collections.id}
        title={content.sections.collections.title}
        items={content.sections.collections.items}
      />
      <div className="mx-auto h-px w-full max-w-6xl bg-card-border/70 opacity-70" />
      <FeatureGridSection
        id={content.sections.craft.id}
        title={content.sections.craft.title}
        items={content.sections.craft.items}
      />
      <div className="mx-auto h-px w-full max-w-6xl bg-card-border/70 opacity-70" />
      <FeatureGridSection
        id={content.sections.concierge.id}
        title={content.sections.concierge.title}
        items={content.sections.concierge.items}
      />

      <SiteFooter />
    </div>
  );
}

