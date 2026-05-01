"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
  const [value, setValue] = useState(Number(initial) || 52);
  const pressRef = useRef({ x: 0, y: 0, moved: false });

  const hasAny = Boolean(beforeUrl || afterUrl);

  const onChange = useCallback((pct) => setValue(pct), []);

  const slider = useMemo(() => {
    return (
      <BeforeAfterSlider
        beforeUrl={beforeUrl}
        afterUrl={afterUrl}
        beforeLabel={beforeLabel}
        afterLabel={afterLabel}
        initial={value}
        aspect="16/9"
        onChange={onChange}
        className="bg-black/0 border-0 p-0"
      />
    );
  }, [afterLabel, afterUrl, beforeLabel, beforeUrl, onChange, value]);

  return (
    <>
      <div
        className={cx(
          "relative overflow-hidden rounded-[28px] border border-card-border bg-card",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_28px_90px_-60px_rgba(0,0,0,0.9)]",
          className,
        )}
      >
        <div className="p-3 sm:p-4">
          <div className="relative">
            <div
              role="button"
              tabIndex={hasAny ? 0 : -1}
              onPointerDown={(e) => {
                pressRef.current = { x: e.clientX, y: e.clientY, moved: false };
              }}
              onPointerMove={(e) => {
                const dx = Math.abs(e.clientX - pressRef.current.x);
                const dy = Math.abs(e.clientY - pressRef.current.y);
                if (dx > 6 || dy > 6) pressRef.current.moved = true;
              }}
              onClick={(e) => {
                if (!hasAny) return;
                // If the user dragged the slider (including the DRAG knob), don't open fullscreen.
                if (pressRef.current.moved) return;
                // Don't open fullscreen from the range input.
                const target = e.target;
                if (target instanceof HTMLElement && target.closest('input[type="range"]')) return;
                setOpen(true);
              }}
              className={cx(
                "group relative block w-full text-left",
                hasAny ? "cursor-zoom-in" : "cursor-default",
              )}
              aria-label="Open fullscreen before/after"
            >
              {slider}
              {hasAny ? (
                <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] font-medium tracking-wide text-muted backdrop-blur">
                  Tap to fullscreen
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-100 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen before and after comparison"
        >
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div className="absolute inset-0">
            <BeforeAfterSlider
              beforeUrl={beforeUrl}
              afterUrl={afterUrl}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              initial={value}
              aspect="fill"
              onChange={onChange}
              chromeless
              className="h-full w-full"
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7),transparent)]" />
          <div className="absolute left-4 top-4 text-xs font-medium tracking-[0.14em] uppercase text-white/75">
            Fullscreen comparison
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-[13px] font-medium tracking-[0.04em] text-white backdrop-blur transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            Close
          </button>
        </div>
      ) : null}
    </>
  );
}

