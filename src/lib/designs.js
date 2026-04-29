import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

const TABLE = "designs";

function normalizeSlug(slug) {
  const s = typeof slug === "string" ? slug.trim() : "";
  return s;
}

export async function listDesigns() {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("slug,before_image,after_image,created_at")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Supabase listDesigns failed: ${error.message}`);
  return data ?? [];
}

export async function getDesignBySlug(slug) {
  const s = normalizeSlug(slug);
  if (!s) return null;
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("slug,before_image,after_image,created_at")
    .eq("slug", s)
    .maybeSingle();
console.log(data , "data")
  if (error) throw new Error(`Supabase getDesignBySlug failed: ${error.message}`);
  return data ?? null;
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
    .select("slug,before_image,after_image,created_at")
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
    .select("slug,before_image,after_image,created_at")
    .maybeSingle();

  if (error) throw new Error(`Supabase updateDesignBySlug failed: ${error.message}`);
  return data ?? null;
}

