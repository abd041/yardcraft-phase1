"use client";

import { Button } from "@/components/ui/Button";

export function AdminQuickEditFab({ slug }) {
  return (
    <div className="fixed bottom-20 right-4 z-50 hidden sm:block">
      <div className="rounded-3xl border border-card-border bg-background/80 p-3 backdrop-blur">
        <div className="text-[11px] font-medium tracking-wide text-muted">
          Admin controls
        </div>
        <div className="mt-2 flex gap-2">
          <Button href={`/admin/designs?slug=${encodeURIComponent(slug)}`} className="px-4 py-2">
            Edit property
          </Button>
          <Button href={`/admin/designs?slug=${encodeURIComponent(slug)}`} variant="secondary" className="px-4 py-2">
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

