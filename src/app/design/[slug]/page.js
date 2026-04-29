import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { getDesignBySlug } from "@/lib/designs";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TransformationSection } from "@/components/design/TransformationSection";
import { DesignQrHeader } from "@/components/design/sections/DesignQrHeader";
import { DesignHeroSection } from "@/components/design/sections/DesignHeroSection";
import { PersuasiveSection } from "@/components/design/sections/PersuasiveSection";
import { ServicesSection } from "@/components/design/sections/ServicesSection";
import { TrustSection } from "@/components/design/sections/TrustSection";
import { LocalUrgencySection } from "@/components/design/sections/LocalUrgencySection";
import { ContactCtaSection } from "@/components/design/sections/ContactCtaSection";
import { StickyMobileCta } from "@/components/design/sections/StickyMobileCta";
import { isAdminRequest } from "@/lib/adminOptional";
import { AdminQuickEditFab } from "@/components/design/AdminQuickEditFab";

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
  const isAdmin = await isAdminRequest();

  return (
    <div className="pb-24 sm:pb-10">
      <DesignQrHeader />
      <DesignHeroSection
        slug={design.slug}
        beforeUrl={before || after}
        afterUrl={after || before}
      />

      {/* Primary focus reinforcement: dedicated section + anchor for deep links */}
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

      {/* Trust + local urgency earlier for homeowner confidence */}
      <TrustSection />
      <LocalUrgencySection />
      <ServicesSection />
      <PersuasiveSection />
      <ContactCtaSection />

      <StickyMobileCta />
      <SiteFooter />
      {isAdmin ? <AdminQuickEditFab slug={design.slug} /> : null}
    </div>
  );
}

