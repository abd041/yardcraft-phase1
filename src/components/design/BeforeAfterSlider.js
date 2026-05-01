"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = "Before",
  afterLabel = "After",
  initial = 48,
  aspect = "16/9",
  allowDrag = true,
  onChange,
  className = "",
  showRange = true,
  chromeless = false,
}) {
  const [value, setValue] = useState(clamp(Number(initial) || 50, 0, 100));
  const rootRef = useRef(null);
  const draggingRef = useRef(false);
  const pct = useMemo(() => clamp(value, 0, 100), [value]);

  const hasBefore = Boolean(beforeUrl);
  const hasAfter = Boolean(afterUrl);
  const hasAny = hasBefore || hasAfter;

  useEffect(() => {
    onChange?.(pct);
  }, [pct, onChange]);

  function setFromClientX(clientX) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(clamp(next, 0, 100));
  }

  function onPointerDown(e) {
    if (!allowDrag) return;
    // Prevent page scrolling/dragging from competing with the slider.
    e.preventDefault?.();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e) {
    if (!allowDrag) return;
    if (!draggingRef.current) return;
    e.preventDefault?.();
    setFromClientX(e.clientX);
  }

  function onPointerUp(e) {
    if (!allowDrag) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  return (
    <div
      className={[
        chromeless
          ? "relative h-full w-full"
          : "rounded-3xl border border-card-border bg-black/10 p-3 sm:p-4",
        className,
      ].join(" ")}
    >
      <div
        ref={rootRef}
        role="group"
        aria-label="Before and after image comparison"
        className={[
          "relative overflow-hidden touch-none",
          chromeless
            ? "h-full w-full bg-black"
            : "rounded-2xl border border-card-border bg-black/20 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_24px_60px_-45px_rgba(0,0,0,0.8)]",
        ].join(" ")}
        style={aspect === "fill" ? undefined : { aspectRatio: aspect }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {hasAny ? (
          <>
            {/* Base (BEFORE) never moves/shifts */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeUrl || afterUrl}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
            />

            {/* AFTER reveal overlay */}
            {hasAfter ? (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - pct}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - pct}% 0 0)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={afterUrl}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              </div>
            ) : null}

            {hasBefore && hasAfter ? (
              <div
                className="pointer-events-none absolute inset-y-0"
                style={{ left: `calc(${pct}% - 1px)` }}
              >
                <div className="h-full w-[2px] bg-[color-mix(in_oklab,var(--gold)_55%,var(--green))] shadow-[0_0_0_1px_rgba(0,0,0,0.45)]" />
                <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-card-border bg-background/80 backdrop-blur">
                  <div className="absolute inset-0 grid place-items-center text-[10px] font-medium tracking-wide text-muted">
                    DRAG
                  </div>
                  <div className="absolute inset-x-0 bottom-[10px] mx-auto h-[2px] w-7 rounded-full bg-[color-mix(in_oklab,var(--gold)_55%,var(--green))]" />
                </div>
              </div>
            ) : null}

            {hasBefore ? (
              <div
                className={[
                  "pointer-events-none absolute left-4 z-20 rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] font-medium tracking-wide text-muted backdrop-blur",
                  chromeless ? "top-14" : "top-4",
                ].join(" ")}
              >
                {beforeLabel}
              </div>
            ) : null}
            {hasAfter ? (
              <div
                className={[
                  "pointer-events-none absolute right-4 z-20 rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] font-medium tracking-wide text-muted backdrop-blur",
                  chromeless ? "top-14" : "top-4",
                ].join(" ")}
              >
                {afterLabel}
              </div>
            ) : null}

            {hasBefore && hasAfter ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] font-medium tracking-wide text-muted backdrop-blur">
                {allowDrag ? "Drag or use the slider" : "Use the slider"}
              </div>
            ) : (
              <div className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] font-medium tracking-wide text-muted backdrop-blur">
                {hasBefore ? "Before image loaded" : "After image loaded"}
              </div>
            )}
          </>
        ) : (
          <div className="grid h-full place-items-center px-6 text-center text-xs text-muted">
            Add before/after images to see the comparison.
          </div>
        )}
      </div>

      {showRange && !chromeless ? (
        <div className="mt-4 flex items-center gap-4 px-1">
          <div className="text-[11px] font-medium tracking-wide text-muted">Reveal</div>
          <input
            aria-label="Before/after slider"
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full accent-[color-mix(in_oklab,var(--gold)_55%,var(--green))]"
            disabled={!hasBefore || !hasAfter}
          />
          <div className="w-10 text-right text-[11px] tabular-nums text-muted">
            {pct}%
          </div>
        </div>
      ) : null}
    </div>
  );
}

