import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

const TABLE = "designs";
const BASE_SELECT = "slug,before_image,after_image,created_at";
const AUDIT_SELECT = "slug,before_image,after_image,created_at,updated_at,updated_by";

function normalizeSlug(slug) {
  const s = typeof slug === "string" ? slug.trim() : "";
  return s;
}

export async function listDesigns() {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabaseAdmin();
  const first = await supabase
    .from(TABLE)
    .select(AUDIT_SELECT)
    .order("created_at", { ascending: false });

  if (!first.error) return first.data ?? [];

  // Backward compatibility if audit columns don't exist yet.
  const fallback = await supabase
    .from(TABLE)
    .select(BASE_SELECT)
    .order("created_at", { ascending: false });

  if (fallback.error) {
    throw new Error(`Supabase listDesigns failed: ${fallback.error.message}`);
  }

  return fallback.data ?? [];
}

export async function getDesignBySlug(slug) {
  const s = normalizeSlug(slug);
  if (!s) return null;
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseAdmin();
  const first = await supabase
    .from(TABLE)
    .select(AUDIT_SELECT)
    .eq("slug", s)
    .maybeSingle();

  if (!first.error) return first.data ?? null;

  // Backward compatibility if audit columns don't exist yet.
  const fallback = await supabase
    .from(TABLE)
    .select(BASE_SELECT)
    .eq("slug", s)
    .maybeSingle();

  if (fallback.error) {
    throw new Error(`Supabase getDesignBySlug failed: ${fallback.error.message}`);
  }

  return fallback.data ?? null;
}

export async function upsertDesign(input) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }

  const slug = normalizeSlug(input?.slug);
  if (!slug) throw new Error("upsertDesign requires a non-empty slug");

  const payload = { slug };
  if (typeof input?.before_image === "string") payload.before_image = input.before_image.trim();
  if (typeof input?.after_image === "string") payload.after_image = input.after_image.trim();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .upsert(
      payload,
      { onConflict: "slug" },
    )
    .select(AUDIT_SELECT)
    .single();

  if (error) throw new Error(`Supabase upsertDesign failed: ${error.message}`);
  return data;
}

export async function updateDesignBySlug(slug, patch) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured (missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }

  const s = normalizeSlug(slug);
  if (!s) throw new Error("updateDesignBySlug requires a non-empty slug");

  const updates = {};
  if (typeof patch?.before_image === "string") updates.before_image = patch.before_image.trim();
  if (typeof patch?.after_image === "string") updates.after_image = patch.after_image.trim();

  if (Object.keys(updates).length === 0) {
    throw new Error("updateDesignBySlug requires before_image and/or after_image");
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .update(updates)
    .eq("slug", s)
    .select(AUDIT_SELECT)
    .maybeSingle();

  if (error) throw new Error(`Supabase updateDesignBySlug failed: ${error.message}`);
  return data ?? null;
}

