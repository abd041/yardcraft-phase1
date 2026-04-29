"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { ToastHost } from "@/components/ui/ToastHost";

function normalizeSlug(slug) {
  return typeof slug === "string" ? slug.trim() : "";
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function AdminDesignsClient({ initialDesigns }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [designs, setDesigns] = useState(Array.isArray(initialDesigns) ? initialDesigns : []);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const [progress, setProgress] = useState(null);

  const toastIdRef = useRef(0);

  function pushToast(toast) {
    const id = `${Date.now()}-${toastIdRef.current++}`;
    setToasts((prev) => [...prev, { id, durationMs: 2600, ...toast }]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    const slug = normalizeSlug(searchParams.get("slug"));
    if (slug) setSelectedSlug(slug);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return designs;
    return designs.filter((d) => (d.slug || "").toLowerCase().includes(q));
  }, [designs, query]);

  const selected = useMemo(() => {
    const slug = normalizeSlug(selectedSlug);
    if (!slug) return null;
    return designs.find((d) => d.slug === slug) ?? null;
  }, [designs, selectedSlug]);

  function xhrUpload(form, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/admin/designs/upload");

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return;
        onProgress?.(Math.round((evt.loaded / evt.total) * 100));
      };

      xhr.onload = () => {
        try {
          const json = JSON.parse(xhr.responseText || "{}");
          if (xhr.status >= 200 && xhr.status < 300 && json?.ok) {
            resolve(json);
          } else {
            reject(new Error(json?.message || json?.error || "Upload failed"));
          }
        } catch {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(form);
    });
  }

  async function upload(kind, file) {
    setError("");
    const slug = normalizeSlug(selectedSlug);
    if (!slug) {
      setError("Pick a design slug first.");
      pushToast({ type: "error", title: "Select a slug first" });
      return;
    }
    if (!file) {
      setError("Choose a file to upload.");
      pushToast({ type: "error", title: "Choose a file" });
      return;
    }

    const form = new FormData();
    form.set("slug", slug);
    form.set("kind", kind);
    form.set("file", file);

    setBusy(`${kind}:${slug}`);
    setProgress(0);
    try {
      const json = await xhrUpload(form, (pct) => setProgress(pct));

      const next = json.design;
      setDesigns((prev) => {
        const idx = prev.findIndex((d) => d.slug === next.slug);
        if (idx === -1) return [next, ...prev];
        const copy = prev.slice();
        copy[idx] = next;
        return copy;
      });

      pushToast({
        type: "success",
        title: `${kind === "before" ? "Before" : "After"} image saved`,
        message: slug,
      });
    } catch (e) {
      setError(e?.message || "Upload failed");
      pushToast({
        type: "error",
        title: "Upload failed",
        message: e?.message || "Try again",
      });
    } finally {
      setBusy(null);
      setProgress(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <ToastHost toasts={toasts} onRemove={removeToast} />

      <div className="rounded-3xl border border-card-border bg-black/10 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_22px_60px_-52px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-wide text-muted">Properties</div>
            <div className="mt-1 text-sm font-semibold tracking-tight text-foreground">
              Slug manager
            </div>
          </div>
          <span className="rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] text-muted">
            {designs.length} total
          </span>
        </div>

        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by slug…"
            className="w-full rounded-2xl border border-card-border bg-card px-10 py-3 text-sm text-foreground placeholder:text-muted shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
          <div className="pointer-events-none -mt-9 ml-3 h-6 w-6 text-muted">
            <SearchIcon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 max-h-[420px] overflow-auto pr-1">
          <div className="flex flex-col gap-1">
            {filtered.map((d) => {
              const active = d.slug === selectedSlug;
              const updatedAt = d.updated_at || d.created_at || null;
              const ready = Boolean(d.before_image && d.after_image);
              return (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => setSelectedSlug(d.slug)}
                  className={cx(
                    "w-full rounded-2xl px-3 py-2 text-left text-sm transition hover:-translate-y-px",
                    active
                      ? "bg-white/10 text-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--gold)_20%,transparent)]"
                      : "text-muted hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cx(
                          "h-2 w-2 rounded-full",
                          ready
                            ? "bg-[color-mix(in_oklab,var(--green)_70%,var(--gold))]"
                            : "bg-white/15",
                        )}
                      />
                      <span className="font-semibold tracking-tight">{d.slug}</span>
                    </div>
                    <StatusPill ready={ready} before={Boolean(d.before_image)} after={Boolean(d.after_image)} />
                  </div>
                  {updatedAt ? (
                    <div className="mt-1 text-[11px] text-muted/80">
                      Updated {new Date(updatedAt).toLocaleDateString()}
                    </div>
                  ) : null}
                </button>
              );
            })}

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-card-border bg-card px-4 py-3 text-sm text-muted">
                No designs match your search.
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-card-border bg-card px-4 py-3 text-xs text-muted">
          Tip: Uploading creates the property if it doesn’t exist yet. “Ready” means both images are set.
        </div>
      </div>

      <div className="rounded-3xl border border-card-border bg-black/10 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_22px_60px_-52px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-wide text-muted">Selected</div>
            <div className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              {selected?.slug || "—"}
            </div>
            {selected?.slug ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <StatusPill
                  ready={Boolean(selected.before_image && selected.after_image)}
                  before={Boolean(selected.before_image)}
                  after={Boolean(selected.after_image)}
                />
                <button
                  type="button"
                  onClick={() => {
                    const url = `${window.location.origin}/design/${selected.slug}`;
                    navigator.clipboard?.writeText(url);
                    pushToast({ type: "success", title: "Copied homeowner URL", message: selected.slug });
                  }}
                  className="rounded-full border border-card-border bg-card px-3 py-1 text-[11px] font-semibold tracking-wide text-muted hover:text-foreground hover:bg-white/5 transition"
                >
                  Copy URL
                </button>
              </div>
            ) : null}
          </div>
          {selected?.slug ? (
            <div className="flex gap-2">
              <Button href={`/design/${selected.slug}`} variant="secondary">
                View page
              </Button>
              <Button href="/api/designs" variant="ghost">
                API
              </Button>
            </div>
          ) : null}
        </div>

        {progress != null ? (
          <div className="mt-4 rounded-2xl border border-card-border bg-card px-4 py-3 text-xs text-muted">
            Uploading… <span className="text-foreground">{progress}%</span>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-[color-mix(in_oklab,var(--green)_75%,var(--gold))]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <UploadCard
            title="Before image"
            kind="before"
            url={selected?.before_image || ""}
            disabled={!selected?.slug}
            busy={busy === `before:${selected?.slug}`}
            updatedAt={selected?.updated_at || selected?.created_at || null}
            updatedBy={selected?.updated_by || null}
            onUpload={(file) => upload("before", file)}
          />
          <UploadCard
            title="After image"
            kind="after"
            url={selected?.after_image || ""}
            disabled={!selected?.slug}
            busy={busy === `after:${selected?.slug}`}
            updatedAt={selected?.updated_at || selected?.created_at || null}
            updatedBy={selected?.updated_by || null}
            onUpload={(file) => upload("after", file)}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-card-border bg-card px-4 py-3 text-xs text-muted">
          Stored fields in Supabase: <span className="text-foreground">slug</span>,{" "}
          <span className="text-foreground">before_image</span>,{" "}
          <span className="text-foreground">after_image</span>,{" "}
          <span className="text-foreground">created_at</span>.
        </div>
      </div>
    </div>
  );
}

function UploadCard({ title, kind, url, disabled, busy, updatedAt, updatedBy, onUpload }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer?.files?.[0] || null;
    if (f) setFile(f);
  }

  return (
    <div className="rounded-3xl border border-card-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium tracking-wide text-muted">{title}</div>
          <div className="mt-1 text-[11px] text-muted">
            {url ? "Saved" : "Not set"}
            {updatedAt ? (
              <span className="ml-2 text-muted/80">
                • Updated {new Date(updatedAt).toLocaleString()}
              </span>
            ) : null}
            {updatedBy ? (
              <span className="ml-2 text-muted/80">• By {String(updatedBy).slice(0, 8)}…</span>
            ) : null}
          </div>
        </div>
        <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] text-muted">
          {kind}
        </span>
      </div>

      <div className="mt-4">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cx(
            "relative overflow-hidden rounded-2xl border border-card-border bg-black/10 transition",
            dragOver ? "bg-white/5 border-[color-mix(in_oklab,var(--green)_35%,var(--card-border))]" : "",
          )}
        >
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-44 w-full object-cover" />
            </a>
          ) : (
            <div className="flex h-44 items-center justify-center px-6 text-center text-xs text-muted">
              Drag & drop an image here, or choose a file below.
            </div>
          )}

          <div
            className={cx(
              "pointer-events-none absolute inset-0 grid place-items-center bg-black/40 text-xs font-semibold tracking-wide text-foreground transition",
              dragOver ? "opacity-100" : "opacity-0",
            )}
          >
            Drop to select file
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          disabled={disabled || busy}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-white/15"
        />

        <Button
          type="button"
          variant="secondary"
          disabled={disabled || busy || !file}
          onClick={() => onUpload(file)}
          className="w-full justify-center"
        >
          {busy ? "Uploading…" : "Upload & save URL"}
        </Button>

        {url ? (
          <div className="break-all rounded-2xl border border-card-border bg-black/10 px-4 py-3 text-[11px] text-muted">
            {url}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StatusPill({ ready, before, after }) {
  const label = ready ? "Ready" : before || after ? "Partial" : "Needs images";
  const tone = ready
    ? "border-[color-mix(in_oklab,var(--green)_45%,var(--card-border))] bg-[color-mix(in_oklab,var(--green)_12%,transparent)] text-foreground"
    : before || after
      ? "border-[color-mix(in_oklab,var(--gold)_35%,var(--card-border))] bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] text-foreground"
      : "border-card-border bg-black/10 text-muted";

  return (
    <span className={cx("rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide", tone)}>
      {label} <span className="text-muted">({before ? "B" : "—"}/{after ? "A" : "—"})</span>
    </span>
  );
}

function SearchIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

