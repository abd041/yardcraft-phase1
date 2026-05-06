"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function dist2(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
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
  onUserInteract,
  className = "",
  showRange = false,
  chromeless = false,
  /** When true, only dragging the center handle moves the divider. */
  handleOnlyDrag = false,
  /** When true with handleOnlyDrag, fullscreen-style pinch/pan/zoom on the comparison layer. */
  allowPinchZoom = false,
  /** Hero / above-the-fold: load images immediately (fixes blank hero on slow mobile networks). */
  eagerImages = false,
}) {
  const [value, setValue] = useState(clamp(Number(initial) || 50, 0, 100));
  const rootRef = useRef(null);
  const zoomLayerRef = useRef(null);
  const draggingRef = useRef(false);
  const pct = useMemo(() => clamp(value, 0, 100), [value]);

  const isInspectMode = Boolean(handleOnlyDrag && allowPinchZoom);
  const [inspect, setInspect] = useState({ s: 1, x: 0, y: 0 });
  const inspectRef = useRef(inspect);
  inspectRef.current = inspect;

  const pointersRef = useRef(new Map());
  const pinchRef = useRef(null);
  const panRef = useRef(null);

  function setInspectBoth(next) {
    setInspect(next);
    inspectRef.current = next;
  }

  const hasBefore = Boolean(beforeUrl);
  const hasAfter = Boolean(afterUrl);
  const hasAny = hasBefore || hasAfter;

  useEffect(() => {
    onChange?.(pct);
  }, [pct, onChange]);

  useEffect(() => {
    setValue(clamp(Number(initial) || 50, 0, 100));
  }, [initial]);

  function setFromClientX(clientX) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(clamp(next, 0, 100));
  }

  function onTrackPointerDown(e) {
    if (!allowDrag || handleOnlyDrag) return;
    onUserInteract?.();
    e.preventDefault?.();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onTrackPointerMove(e) {
    if (!allowDrag || handleOnlyDrag) return;
    if (!draggingRef.current) return;
    onUserInteract?.();
    e.preventDefault?.();
    setFromClientX(e.clientX);
  }

  function onTrackPointerUp(e) {
    if (!allowDrag || handleOnlyDrag) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  function clearInspectPointers() {
    pointersRef.current.clear();
    pinchRef.current = null;
    panRef.current = null;
  }

  function onInspectPointerDown(e) {
    if (!isInspectMode) return;
    e.stopPropagation();
    const el = zoomLayerRef.current;
    if (el?.setPointerCapture) {
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size >= 2) {
      const pts = Array.from(pointersRef.current.values()).slice(0, 2);
      pinchRef.current = {
        d0: dist2(pts[0], pts[1]),
        s0: inspectRef.current.s,
      };
      panRef.current = null;
    } else if (pointersRef.current.size === 1 && inspectRef.current.s > 1.02) {
      panRef.current = {
        cx: e.clientX,
        cy: e.clientY,
        ox: inspectRef.current.x,
        oy: inspectRef.current.y,
      };
      pinchRef.current = null;
    }
    e.preventDefault();
  }

  function onInspectPointerMove(e) {
    if (!isInspectMode) return;
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size >= 2 && pinchRef.current) {
      const pts = Array.from(pointersRef.current.values()).slice(0, 2);
      const d = dist2(pts[0], pts[1]);
      const { d0, s0 } = pinchRef.current;
      if (d0 > 4) {
        const ratio = d / d0;
        const s = clamp(s0 * ratio, 1, 4);
        setInspectBoth({ ...inspectRef.current, s });
      }
    } else if (pointersRef.current.size === 1 && panRef.current) {
      const p = panRef.current;
      setInspectBoth({
        ...inspectRef.current,
        x: p.ox + (e.clientX - p.cx),
        y: p.oy + (e.clientY - p.cy),
      });
    }
    e.preventDefault();
  }

  function onInspectPointerUp(e) {
    if (!isInspectMode) return;
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) panRef.current = null;
    const el = zoomLayerRef.current;
    if (el?.releasePointerCapture) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  useEffect(() => {
    if (!isInspectMode) return;
    const el = zoomLayerRef.current;
    if (!el) return;
    function onWheel(ev) {
      if (!ev.ctrlKey && !ev.metaKey) return;
      ev.preventDefault();
      const cur = inspectRef.current;
      const nextS = clamp(cur.s + -ev.deltaY * 0.009, 1, 4);
      setInspectBoth({ ...cur, s: nextS });
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isInspectMode]);

  const trackTouchClass =
    handleOnlyDrag || isInspectMode ? "touch-none" : "touch-none";

  function onHandlePointerDown(e) {
    if (!allowDrag || !hasBefore || !hasAfter) return;
    onUserInteract?.();
    if (isInspectMode) {
      const v = inspectRef.current;
      if (v.s > 1.02 || Math.abs(v.x) > 1.5 || Math.abs(v.y) > 1.5) {
        setInspectBoth({ s: 1, x: 0, y: 0 });
        clearInspectPointers();
      }
    }
    e.preventDefault?.();
    e.stopPropagation();
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onHandlePointerMove(e) {
    if (!allowDrag || !hasBefore || !hasAfter) return;
    if (!draggingRef.current) return;
    onUserInteract?.();
    e.preventDefault?.();
    setFromClientX(e.clientX);
  }

  function onHandlePointerUp(e) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  const comparisonInner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={beforeUrl || afterUrl}
        alt=""
        draggable={false}
        decoding="async"
        loading={eagerImages ? "eager" : "lazy"}
        fetchPriority={eagerImages ? "high" : undefined}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center [transform:translateZ(0)]"
      />

      {hasAfter ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
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
            decoding="async"
            loading={eagerImages ? "eager" : "lazy"}
            fetchPriority={eagerImages ? "high" : undefined}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center [transform:translateZ(0)]"
          />
        </div>
      ) : null}

      {hasBefore && hasAfter ? (
        <div
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{ left: `calc(${pct}% - 0.5px)` }}
        >
          <div className="h-full w-px bg-white/45 shadow-[0_0_0_1px_rgba(0,0,0,0.3)]" />
          <button
            type="button"
            data-ba-handle
            role="slider"
            tabIndex={0}
            aria-label="Drag to compare before and after"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            className={[
              handleOnlyDrag ? "pointer-events-auto touch-none" : "pointer-events-none",
              "absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/28 bg-black/45 shadow-[0_8px_28px_-18px_rgba(0,0,0,0.9)] backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:h-12 sm:w-12",
            ].join(" ")}
            onPointerDown={handleOnlyDrag ? onHandlePointerDown : undefined}
            onPointerMove={handleOnlyDrag ? onHandlePointerMove : undefined}
            onPointerUp={handleOnlyDrag ? onHandlePointerUp : undefined}
            onPointerCancel={handleOnlyDrag ? onHandlePointerUp : undefined}
          >
            <span className="absolute inset-0 grid place-items-center text-white/85">
              <HandleArrows />
            </span>
          </button>
        </div>
      ) : null}
    </>
  );

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
          "relative isolate overflow-hidden",
          trackTouchClass,
          aspect === "fill" ? "h-full min-h-full min-h-[240px]" : "",
          chromeless
            ? "h-full w-full bg-black"
            : "rounded-2xl border border-card-border bg-black/20 shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_24px_60px_-45px_rgba(0,0,0,0.8)]",
        ].join(" ")}
        style={aspect === "fill" ? undefined : { aspectRatio: aspect }}
        onPointerDown={handleOnlyDrag ? undefined : onTrackPointerDown}
        onPointerMove={handleOnlyDrag ? undefined : onTrackPointerMove}
        onPointerUp={handleOnlyDrag ? undefined : onTrackPointerUp}
        onPointerCancel={handleOnlyDrag ? undefined : onTrackPointerUp}
      >
        {hasAny ? (
          <>
            {isInspectMode ? (
              <div
                ref={zoomLayerRef}
                className="absolute inset-0 h-full w-full"
                style={{
                  transform: `translate(${inspect.x}px, ${inspect.y}px) scale(${inspect.s})`,
                  transformOrigin: "50% 50%",
                  touchAction: "none",
                }}
                onPointerDown={onInspectPointerDown}
                onPointerMove={onInspectPointerMove}
                onPointerUp={onInspectPointerUp}
                onPointerCancel={onInspectPointerUp}
              >
                <div className="relative h-full w-full">{comparisonInner}</div>
              </div>
            ) : (
              <div className="relative h-full w-full">{comparisonInner}</div>
            )}

            {hasBefore ? (
              <div
                className={[
                  "pointer-events-none absolute left-4 z-20 rounded-full border border-white/14 bg-black/35 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.12em] uppercase text-white/80 backdrop-blur-sm shadow-[0_8px_24px_-18px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)]",
                  chromeless ? "top-14" : "top-4",
                ].join(" ")}
              >
                {beforeLabel}
              </div>
            ) : null}
            {hasAfter ? (
              <div
                className={[
                  "pointer-events-none absolute right-4 z-20 rounded-full border border-white/14 bg-black/35 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.12em] uppercase text-white/80 backdrop-blur-sm shadow-[0_8px_24px_-18px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)]",
                  chromeless ? "top-14" : "top-4",
                ].join(" ")}
              >
                {afterLabel}
              </div>
            ) : null}
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
            onChange={(e) => {
              onUserInteract?.();
              setValue(Number(e.target.value));
            }}
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

function HandleArrows() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M6 12h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
