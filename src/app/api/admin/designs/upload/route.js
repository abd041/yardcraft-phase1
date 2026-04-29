import { NextResponse } from "next/server";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { upsertDesign } from "@/lib/designs";

export const runtime = "nodejs";

function getBucket() {
  return (process.env.SUPABASE_STORAGE_BUCKET || "design-images").trim();
}

function normalizeSlug(slug) {
  return typeof slug === "string" ? slug.trim() : "";
}

export async function POST(request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "supabase_not_configured" },
      { status: 500 },
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { ok: false, error: "expected_multipart_form_data" },
      { status: 415 },
    );
  }

  const form = await request.formData();
  const slug = normalizeSlug(form.get("slug"));
  const kind = typeof form.get("kind") === "string" ? form.get("kind") : "";
  const file = form.get("file");

  if (!slug) {
    return NextResponse.json({ ok: false, error: "missing_slug" }, { status: 400 });
  }
  if (kind !== "before" && kind !== "after") {
    return NextResponse.json(
      { ok: false, error: "invalid_kind" },
      { status: 400 },
    );
  }
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "missing_file" }, { status: 400 });
  }

  const bucket = getBucket();
  const ext = (file.name?.split(".").pop() || "jpg").toLowerCase();
  const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 10) || "jpg";
  const objectPath = `designs/${slug}/${kind}-${Date.now()}.${safeExt}`;

  try {
    const supabase = getSupabaseAdmin();
    const bytes = new Uint8Array(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectPath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { ok: false, error: "upload_failed", message: uploadError.message },
        { status: 400 },
      );
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    const url = publicData?.publicUrl || null;

    if (!url) {
      return NextResponse.json(
        { ok: false, error: "public_url_failed" },
        { status: 500 },
      );
    }

    const design = await upsertDesign(
      kind === "before"
        ? { slug, before_image: url }
        : { slug, after_image: url },
    );

    return NextResponse.json({
      ok: true,
      bucket,
      path: objectPath,
      url,
      design,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "unexpected_error", message: err?.message ?? "unknown" },
      { status: 500 },
    );
  }
}

