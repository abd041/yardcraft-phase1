"use client";

import { useCallback, useEffect, useState } from "react";
import { BeforeAfterSlider } from "@/components/design/BeforeAfterSlider";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function PremiumBeforeAfter({
  beforeUrl,
  afterUrl,
  className = "",
  initial = 52,
  beforeLabel = "Before",
  afterLabel = "After",
}) {
  const [open, setOpen] = useState(false);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const [value, setValue] = useState(Number(initial) || 52);
  const [showRotateHint, setShowRotateHint] = useState(false);

  const hasAny = Boolean(beforeUrl || afterUrl);

  const onChange = useCallback((pct) => setValue(pct), []);

  useEffect(() => {
    if (!open) return;
    setFullscreenVisible(false);
    const raf = requestAnimationFrame(() => setFullscreenVisible(true));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setShowRotateHint(false);
      return;
    }

    function computeShouldShow() {
      if (typeof window === "undefined") return false;
      const isMobile = window.innerWidth < 768;
      const mql = window.matchMedia?.("(orientation: portrait)");
      const isPortrait = mql?.matches ?? window.innerHeight >= window.innerWidth;
      return isMobile && isPortrait;
    }

    if (!computeShouldShow()) {
      setShowRotateHint(false);
      return;
    }

    setShowRotateHint(true);
    const hideTimer = setTimeout(() => setShowRotateHint(false), 2600);

    const mql = window.matchMedia?.("(orientation: portrait)");
    function handleOrientationChange() {
      if (!computeShouldShow()) {
        setShowRotateHint(false);
      }
    }
    mql?.addEventListener?.("change", handleOrientationChange);
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      clearTimeout(hideTimer);
      mql?.removeEventListener?.("change", handleOrientationChange);
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, [open]);

  return (
    <>
      <div
        className={cx("relative h-full w-full", className)}
      >
        <div className="relative h-full min-h-full w-full">
          <BeforeAfterSlider
            beforeUrl={beforeUrl}
            afterUrl={afterUrl}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
            initial={value}
            aspect="fill"
            onChange={onChange}
            chromeless
            className="h-full min-h-full w-full bg-black/0"
          />
          {hasAny ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white/90 backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              aria-label="Open fullscreen comparison"
            >
              <FullscreenIcon />
            </button>
          ) : null}
        </div>
      </div>

      {open ? (
        <div
          className={cx(
            "fixed inset-0 z-100 bg-black/88 backdrop-blur-md transition-opacity duration-500 ease-in-out",
            fullscreenVisible ? "opacity-100" : "opacity-0",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen before and after comparison"
        >
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div
            className={cx(
              "absolute inset-0 transition duration-500 ease-in-out",
              fullscreenVisible ? "scale-100 opacity-100" : "scale-[0.96] opacity-0",
            )}
          >
            <BeforeAfterSlider
              beforeUrl={beforeUrl}
              afterUrl={afterUrl}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              initial={value}
              aspect="fill"
              onChange={onChange}
              chromeless
              onUserInteract={() => setShowRotateHint(false)}
              className="h-full w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            aria-label="Close fullscreen comparison"
          >
            <CloseIcon />
          </button>
          <RotateHint visible={showRotateHint} />
        </div>
      ) : null}
    </>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M8 4H4v4M16 4h4v4M8 20H4v-4M20 20h-4v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function RotateHint({ visible }) {
  if (!visible) return null;
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/12 bg-black/55 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.16em] text-white/75 opacity-80 backdrop-blur-md shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] transition-opacity duration-250 md:hidden">
      <span className="mr-1.5 inline-flex h-3.5 w-3.5 items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path
            d="M7 4h10a3 3 0 0 1 3 3v3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M17 20H7a3 3 0 0 1-3-3v-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M5 7 3.5 5.5 2 7"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M19 17 20.5 18.5 22 17"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>Rotate for full view</span>
    </div>
  );
}

