"use client";

import { useEffect, useMemo, useState } from "react";

function getEmbedUrlWithTracking(embedUrl, { slug, pageUrl, timestamp }) {
  if (!embedUrl) return "";

  let url;
  try {
    url = new URL(embedUrl);
  } catch {
    // If QuoteIQ ever gives a relative URL, fall back to returning it as-is.
    return embedUrl;
  }

  // YardCraft attribution (redundant keys to maximize compatibility).
  url.searchParams.set("yc_source_property", slug || "");
  url.searchParams.set("yc_source_slug", slug || "");
  url.searchParams.set("yc_source_url", pageUrl || "");
  url.searchParams.set("yc_source_ts", timestamp || "");

  // Useful generic attribution for dashboards that parse UTM fields.
  url.searchParams.set("utm_source", "yardcraft");
  url.searchParams.set("utm_medium", "qr");
  url.searchParams.set("utm_campaign", "property");
  if (slug) url.searchParams.set("utm_content", slug);

  return url.toString();
}

export function QuoteIqEmbed({ slug, pageUrl }) {
  // IMPORTANT: avoid hydration mismatch. This component is server-rendered and hydrated on the
  // client; generating a timestamp during render would differ between server/client.
  const [timestamp, setTimestamp] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);

  const embedSrc = useMemo(() => {
    const embedUrl = process.env.NEXT_PUBLIC_QUOTEIQ_EMBED_URL?.trim();
    return getEmbedUrlWithTracking(embedUrl, { slug, pageUrl, timestamp });
  }, [pageUrl, slug, timestamp]);

  useEffect(() => {
    setLoaded(false);
    setTimedOut(false);

    if (!embedSrc) return;
    const t = setTimeout(() => setTimedOut(true), 12000);
    return () => clearTimeout(t);
  }, [embedSrc]);

  if (!embedSrc) {
    return (
      <div className="rounded-3xl border border-card-border bg-black/10 p-4 sm:p-5">
        <div className="rounded-2xl border border-card-border bg-background/40 px-4 py-4">
          <div className="font-serif text-lg font-semibold leading-[1.12] tracking-[-0.01em] text-foreground">
            Estimate form temporarily unavailable
          </div>
          <div className="mt-2 text-sm leading-6 text-muted">
            Please call/text and we’ll take care of your quote right away.
          </div>
        </div>
      </div>
    );
  }

  if (timedOut && !loaded) {
    return (
      <div className="rounded-3xl border border-card-border bg-black/10 p-4 sm:p-5">
        <div className="rounded-2xl border border-card-border bg-background/40 px-4 py-4">
          <div className="font-serif text-lg font-semibold leading-[1.12] tracking-[-0.01em] text-foreground">
            Estimate form is taking longer to load
          </div>
          <div className="mt-2 text-sm leading-6 text-muted">
            Please call/text and we’ll take care of your quote right away.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl border border-card-border bg-black/10 p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_22px_70px_-50px_rgba(0,0,0,0.85)] sm:p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -right-24 -top-24 h-[280px] w-[280px] rounded-full bg-green/10 blur-3xl" />
        <div className="absolute -left-24 bottom-[-140px] h-[340px] w-[340px] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_55%)]" />
      </div>
      {!loaded ? (
        <div className="absolute inset-0 z-10 grid place-items-center rounded-3xl">
          <div className="w-full max-w-xl px-6 py-10">
            <div className="mx-auto h-3 w-36 rounded-full bg-white/10" />
            <div className="mt-5 h-11 w-full rounded-2xl border border-card-border bg-black/10" />
            <div className="mt-3 h-11 w-full rounded-2xl border border-card-border bg-black/10" />
            <div className="mt-3 h-11 w-2/3 rounded-2xl border border-card-border bg-black/10" />
            <div className="mt-6 h-12 w-full rounded-full bg-gold/25" />
            <div className="mt-4 text-center text-xs font-medium tracking-[0.14em] uppercase text-muted">
              Loading estimate
            </div>
          </div>
        </div>
      ) : null}
      <iframe
        title="QuoteIQ estimate form"
        src={embedSrc}
        onLoad={() => setLoaded(true)}
        className={[
          "relative h-[560px] w-full rounded-3xl border border-card-border bg-background/60 backdrop-blur",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]",
          loaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
        ].join(" ")}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="clipboard-write; payment; geolocation"
        sandbox={[
          "allow-forms",
          "allow-scripts",
          "allow-same-origin",
          "allow-popups",
          "allow-popups-to-escape-sandbox",
          "allow-top-navigation-by-user-activation",
        ].join(" ")}
      />
      <noscript>
        <div className="mt-3 rounded-2xl border border-card-border bg-background/40 p-4 text-sm text-muted">
          JavaScript is required to load the estimate form.
        </div>
      </noscript>
    </div>
  );
}

