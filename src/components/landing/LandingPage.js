import { Hero } from "@/components/landing/sections/Hero";
import { ServicesSection } from "@/components/landing/sections/ServicesSection";
import { ProcessSection } from "@/components/landing/sections/ProcessSection";
import { ReviewsSection } from "@/components/landing/sections/ReviewsSection";
import { FinalCtaSection } from "@/components/landing/sections/FinalCtaSection";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export function LandingPage({ content }) {
  return (
    <div className="relative">
      <SiteHeader />
      <Hero content={content.hero} />

      <div className="mx-auto h-px w-full max-w-6xl bg-card-border/70 opacity-70" />
      <ServicesSection
        id={content.sections.services.id}
        label={content.sections.services.label}
        title={content.sections.services.title}
        items={content.sections.services.items}
      />

      <div className="mx-auto h-px w-full max-w-6xl bg-card-border/70 opacity-70" />
      <ProcessSection
        id={content.sections.process.id}
        label={content.sections.process.label}
        title={content.sections.process.title}
        items={content.sections.process.items}
      />

      <div className="mx-auto h-px w-full max-w-6xl bg-card-border/70 opacity-70" />
      <ReviewsSection
        id={content.sections.reviews.id}
        label={content.sections.reviews.label}
        title={content.sections.reviews.title}
        items={content.sections.reviews.items}
        googleMapsUrl={content.sections.reviews.googleMapsUrl}
      />

      <FinalCtaSection />
      <SiteFooter />
    </div>
  );
}
