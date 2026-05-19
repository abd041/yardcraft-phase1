import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/authApi";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

/* ── DELETE /api/admin/users/[id] ───────────────────────────────
   Revokes admin access by setting profiles.role = null.
   Does NOT delete the Supabase Auth user — they can be re-invited.
──────────────────────────────────────────────────────────────── */
export async function DELETE(_req, { params }) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ ok: false, error: "User ID is required." }, { status: 400 });
  }

  if (id === auth.user.id) {
    return NextResponse.json({ ok: false, error: "You cannot revoke your own admin access." }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Supabase not configured." }, { status: 503 });
  }

  const admin = getSupabaseAdmin();

  const { error } = await admin
    .from("profiles")
    .update({ role: null })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
