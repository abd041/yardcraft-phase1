import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { getDesignBySlug } from "@/lib/designs";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TransformationSection } from "@/components/design/TransformationSection";
import { DesignHeroSection } from "@/components/design/sections/DesignHeroSection";
import { PersuasiveSection } from "@/components/design/sections/PersuasiveSection";
import { ServicesSection } from "@/components/design/sections/ServicesSection";
import { TrustSection } from "@/components/design/sections/TrustSection";
import { LocalUrgencySection } from "@/components/design/sections/LocalUrgencySection";
import { ContactCtaSection } from "@/components/design/sections/ContactCtaSection";
import { StickyMobileCta } from "@/components/design/sections/StickyMobileCta";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) return { title: "Design not found" };
  return {
    title: `YardCraft • ${design.slug}`,
    description:
      "Luxury outdoor living transformation. Before/after results, premium services, and a fast estimate.",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) notFound();

  const before = design.before_image || "";
  const after = design.after_image || "";

  return (
    <div className="pb-24 sm:pb-10">
      <SiteHeader />
      <DesignHeroSection slug={design.slug} afterUrl={after || ""} />

      <Container className="py-10 sm:py-14">
        <TransformationSection
          beforeUrl={before || after}
          afterUrl={after || before}
          missingHint={
            !before || !after ? (
              <>
                Heads up: this design is missing a{" "}
                <span className="text-foreground">
                  {!before ? "before" : "after"}
                </span>{" "}
                image URL in Supabase. Upload it in{" "}
                <span className="text-foreground">/admin/designs</span>.
              </>
            ) : null
          }
        />
      </Container>

      <PersuasiveSection />
      <ServicesSection />
      <TrustSection />
      <LocalUrgencySection />
      <ContactCtaSection />

      <StickyMobileCta />
      <SiteFooter />
    </div>
  );
}

