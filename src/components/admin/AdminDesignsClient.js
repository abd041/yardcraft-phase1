"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";

function normalizeSlug(slug) {
  return typeof slug === "string" ? slug.trim() : "";
}

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function AdminDesignsClient({ initialDesigns }) {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [designs, setDesigns] = useState(Array.isArray(initialDesigns) ? initialDesigns : []);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState("");

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

  async function upload(kind, file) {
    setError("");
    const slug = normalizeSlug(selectedSlug);
    if (!slug) {
      setError("Pick a design slug first.");
      return;
    }
    if (!file) {
      setError("Choose a file to upload.");
      return;
    }

    const form = new FormData();
    form.set("slug", slug);
    form.set("kind", kind);
    form.set("file", file);

    setBusy(`${kind}:${slug}`);
    try {
      const res = await fetch("/api/admin/designs/upload", {
        method: "POST",
        body: form,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        throw new Error(json?.message || json?.error || "Upload failed");
      }

      const next = json.design;
      setDesigns((prev) => {
        const idx = prev.findIndex((d) => d.slug === next.slug);
        if (idx === -1) return [next, ...prev];
        const copy = prev.slice();
        copy[idx] = next;
        return copy;
      });
    } catch (e) {
      setError(e?.message || "Upload failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="rounded-3xl border border-card-border bg-black/10 p-5">
        <div className="text-xs font-medium tracking-wide text-muted">Design slugs</div>
        <div className="mt-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by slug…"
            className="w-full rounded-2xl border border-card-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
        </div>

        <div className="mt-4 max-h-[420px] overflow-auto pr-1">
          <div className="flex flex-col gap-1">
            {filtered.map((d) => {
              const active = d.slug === selectedSlug;
              return (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => setSelectedSlug(d.slug)}
                  className={cx(
                    "w-full rounded-2xl px-3 py-2 text-left text-sm transition",
                    active
                      ? "bg-white/10 text-foreground"
                      : "text-muted hover:bg-white/5 hover:text-foreground",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium tracking-tight">{d.slug}</span>
                    <span className="text-[11px] text-muted">
                      {(d.before_image ? "B" : "—")}/{(d.after_image ? "A" : "—")}
                    </span>
                  </div>
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

        <div className="mt-4 text-xs text-muted">
          Tip: Uploading an image will create the design row if it doesn’t exist yet.
        </div>
      </div>

      <div className="rounded-3xl border border-card-border bg-black/10 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-xs font-medium tracking-wide text-muted">Selected</div>
            <div className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              {selected?.slug || "—"}
            </div>
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
            onUpload={(file) => upload("before", file)}
          />
          <UploadCard
            title="After image"
            kind="after"
            url={selected?.after_image || ""}
            disabled={!selected?.slug}
            busy={busy === `after:${selected?.slug}`}
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

function UploadCard({ title, kind, url, disabled, busy, onUpload }) {
  const [file, setFile] = useState(null);

  return (
    <div className="rounded-3xl border border-card-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium tracking-wide text-muted">{title}</div>
          <div className="mt-1 text-[11px] text-muted">{url ? "Saved" : "Not set"}</div>
        </div>
        <span className="rounded-full border border-card-border bg-black/10 px-3 py-1 text-[11px] text-muted">
          {kind}
        </span>
      </div>

      <div className="mt-4">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-2xl border border-card-border bg-black/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-44 w-full object-cover" />
          </a>
        ) : (
          <div className="flex h-44 items-center justify-center rounded-2xl border border-card-border bg-black/10 text-xs text-muted">
            Upload an image to preview it here.
          </div>
        )}
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

