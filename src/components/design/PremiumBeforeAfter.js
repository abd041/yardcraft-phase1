"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { BeforeAfterSlider } from "@/components/design/BeforeAfterSlider";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function subscribePortraitMobileHint(onStoreChange) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(orientation: portrait)");
  mql.addEventListener("change", onStoreChange);
  window.addEventListener("resize", onStoreChange);
  return () => {
    mql.removeEventListener("change", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function getPortraitMobileHintSnapshot() {
  if (typeof window === "undefined") return false;
  const isMobile = window.innerWidth < 768;
  const mql = window.matchMedia?.("(orientation: portrait)");
  const isPortrait = mql?.matches ?? window.innerHeight >= window.innerWidth;
  return isMobile && isPortrait;
}

function getPortraitMobileHintServerSnapshot() {
  return false;
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
  const portraitMobileHint = useSyncExternalStore(
    subscribePortraitMobileHint,
    getPortraitMobileHintSnapshot,
    getPortraitMobileHintServerSnapshot,
  );
  const showRotateHint = open && portraitMobileHint;

  const hasAny = Boolean(beforeUrl || afterUrl);

  const onChange = useCallback((pct) => setValue(pct), []);

  useEffect(() => {
    if (!open) {
      queueMicrotask(() => setFullscreenVisible(false));
      return;
    }
    let raf = 0;
    queueMicrotask(() => {
      setFullscreenVisible(false);
      raf = requestAnimationFrame(() => setFullscreenVisible(true));
    });
    return () => {
      cancelAnimationFrame(raf);
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

  return (
    <>
      {/* Height must come from `className` (e.g. min-h + h in dvh). Do not add h-full here — it fights explicit vh/dvh and can collapse on mobile. */}
      <div className={cx("touch-pan-y-safe relative w-full", className)}>
        <div className="relative h-full min-h-0 w-full">
          <BeforeAfterSlider
            beforeUrl={beforeUrl}
            afterUrl={afterUrl}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
            initial={value}
            aspect="fill"
            onChange={onChange}
            chromeless
            handleOnlyDrag
            eagerImages
            className="h-full min-h-0 w-full bg-black/0"
          />
          {hasAny ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute bottom-4 right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/60 text-white shadow-[0_10px_36px_-14px_rgba(0,0,0,0.88),0_0_0_1px_rgba(255,255,255,0.12)_inset] backdrop-blur-sm transition hover:border-white/48 hover:bg-black/72 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 lg:bottom-6 lg:right-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              aria-label="Open fullscreen comparison"
            >
              <FullscreenIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          ) : null}
        </div>
      </div>

      {open ? (
        <div
          className={cx(
            "fixed inset-0 z-100 overscroll-y-auto bg-black/[0.91] backdrop-blur-[2px] transition-opacity duration-500 ease-in-out",
            fullscreenVisible ? "opacity-100" : "opacity-0",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen before and after comparison"
        >
          <div className="absolute inset-0 z-0" onClick={() => setOpen(false)} />
          <div
            className={cx(
              "absolute inset-0 z-10 transition duration-500 ease-in-out",
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
              handleOnlyDrag
              allowPinchZoom
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

function FullscreenIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {/* Four matching corner brackets (outward “expand”) — stroke order avoids a flipped corner. */}
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    <div className="lux-rotate-hint pointer-events-none absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 items-center rounded-full border border-white/22 bg-black/65 px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] text-white shadow-[0_20px_50px_-28px_rgba(0,0,0,0.92),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm sm:bottom-28 sm:px-6 sm:text-[13px] md:hidden">
      <span className="mr-2.5 inline-flex h-5 w-5 shrink-0 items-center justify-center sm:h-6 sm:w-6">
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden="true">
          <path
            d="M7 4h10a3 3 0 0 1 3 3v3"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
          <path
            d="M17 20H7a3 3 0 0 1-3-3v-3"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
          />
          <path
            d="M5 7 3.5 5.5 2 7"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinecap="round"
          />
          <path
            d="M19 17 20.5 18.5 22 17"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-white/95">Rotate for full view</span>
    </div>
  );
}

