import { BRAND } from "@/lib/brand";

export const landingContent = {
  nav: [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#reviews", label: "Reviews" },
  ],
  hero: {
    eyebrow: "Elevated Outdoor Living",
    title: "Premium Outdoor\nTransformations",
    subtitle:
      "Landscaping, pavers, planting, lighting, outdoor living, and property upgrades designed to elevate premium homes across Northern Virginia.",
    primaryCta: { href: "#quote", label: "Request Your Custom Plan" },
    secondaryCta: { href: `tel:${BRAND.phoneTel}`, label: "Contact Us" },
  },
  sections: {
    services: {
      id: "services",
      label: "OUR SERVICES",
      title: "Complete outdoor care. Crafted to perfection.",
      items: [
        {
          title: "Premium Yard Refresh",
          description:
            "Seasonal cleanouts, trimming, edging, and curb appeal upgrades.",
          gradient:
            "radial-gradient(ellipse at 50% 120%, rgba(31,122,58,0.55) 0%, rgba(10,20,12,0) 65%), linear-gradient(170deg, #0d1f12 0%, #081509 100%)",
        },
        {
          title: "Mulch & Planting",
          description:
            "Fresh mulch, seasonal planting, and clean landscape beds.",
          gradient:
            "radial-gradient(ellipse at 50% 120%, rgba(120,80,20,0.55) 0%, rgba(15,10,5,0) 65%), linear-gradient(170deg, #1a1208 0%, #100c05 100%)",
        },
        {
          title: "Garage & Basement Cleanouts",
          description:
            "Cleanouts, hauling, junk removal, and organized finishes.",
          gradient:
            "radial-gradient(ellipse at 50% 120%, rgba(50,55,70,0.6) 0%, rgba(8,8,12,0) 65%), linear-gradient(170deg, #121218 0%, #0a0a0f 100%)",
        },
        {
          title: "Lawn Care & Maintenance",
          description:
            "Mowing, trimming, blowing, and recurring property care.",
          gradient:
            "radial-gradient(ellipse at 50% 120%, rgba(24,100,40,0.55) 0%, rgba(8,16,8,0) 65%), linear-gradient(170deg, #0a1f0d 0%, #081208 100%)",
        },
        {
          title: "Paver Patios & Walkways",
          description:
            "Custom pavers, concrete walkways, and retaining walls.",
          gradient:
            "radial-gradient(ellipse at 50% 120%, rgba(180,140,80,0.4) 0%, rgba(15,12,8,0) 65%), linear-gradient(170deg, #1a1410 0%, #100e0a 100%)",
        },
        {
          title: "Outdoor Upgrades",
          description:
            "Decks, pergolas, lighting, drainage, irrigation, and more.",
          gradient:
            "radial-gradient(ellipse at 50% 120%, rgba(200,140,40,0.45) 0%, rgba(15,10,3,0) 65%), linear-gradient(170deg, #1f1508 0%, #150f05 100%)",
        },
      ],
    },
    process: {
      id: "process",
      label: "OUR PROCESS",
      title: "A straightforward process.\nExceptional results.",
      items: [
        {
          title: "Quick Consult",
          description:
            "Tell us about your goals, your space, and what you want to improve.",
        },
        {
          title: "Clear Scope",
          description:
            "You'll receive a detailed plan, transparent pricing, and a clear project timeline.",
        },
        {
          title: "Clean Install",
          description:
            "Our team builds with precision, respect, and premium attention to detail.",
        },
      ],
    },
    reviews: {
      id: "reviews",
      label: "REVIEWS",
      title: "Trusted by homeowners\nacross Northern Virginia.",
      items: [
        {
          name: "Michael R.",
          stars: 5,
          body: "YardCraft completely transformed our front and backyard. The lighting at night makes the whole house look stunning. Super professional team.",
        },
        {
          name: "Jessica L.",
          stars: 5,
          body: "Clean install, on time, and exactly what they promised. The new paver patio is our favorite part of the house now.",
        },
        {
          name: "David K.",
          stars: 5,
          body: "Highly recommend YardCraft. Great communication, attention to detail, and the results speak for themselves.",
        },
      ],
    },
  },
};
