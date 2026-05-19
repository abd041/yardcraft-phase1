import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/authApi";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

/* ── GET /api/admin/users ────────────────────────────────────────
   Returns all users who have role="admin" in the profiles table,
   enriched with auth metadata (email, confirmed, last_sign_in).
──────────────────────────────────────────────────────────────── */
export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Supabase not configured." }, { status: 503 });
  }

  const admin = getSupabaseAdmin();

  const { data: profiles, error: profilesError } = await admin
    .from("profiles")
    .select("id, role")
    .eq("role", "admin");

  if (profilesError) {
    return NextResponse.json({ ok: false, error: profilesError.message }, { status: 500 });
  }

  if (!profiles || profiles.length === 0) {
    return NextResponse.json({ ok: true, users: [] });
  }

  const { data: authData, error: authError } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (authError) {
    return NextResponse.json({ ok: false, error: authError.message }, { status: 500 });
  }

  const profileIds = new Set(profiles.map((p) => p.id));
  const users = (authData?.users ?? [])
    .filter((u) => profileIds.has(u.id))
    .map((u) => ({
      id: u.id,
      email: u.email ?? "",
      confirmed: Boolean(u.email_confirmed_at),
      lastSignIn: u.last_sign_in_at ?? null,
      invitedAt: u.invited_at ?? u.created_at ?? null,
    }));

  return NextResponse.json({ ok: true, users });
}

/* ── POST /api/admin/users ───────────────────────────────────────
   Invites a new admin by email:
   1. Supabase sends them a magic-link email
   2. We pre-set profiles.role = "admin" using their new user id
──────────────────────────────────────────────────────────────── */
export async function POST(req) {
  const auth = await requireAdminApi();
  if (!auth.ok) return auth.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: "Supabase not configured." }, { status: 503 });
  }

  let email;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "A valid email address is required." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();

  const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email.trim().toLowerCase(), {
    redirectTo: `${getSiteUrl()}/admin/login`,
  });

  if (inviteError) {
    return NextResponse.json({ ok: false, error: inviteError.message }, { status: 400 });
  }

  const userId = data?.user?.id;
  if (!userId) {
    return NextResponse.json({ ok: false, error: "Invite succeeded but user ID was not returned." }, { status: 500 });
  }

  // Pre-set admin role so the invited user has access the moment they confirm.
  const { error: profileError } = await admin
    .from("profiles")
    .upsert({ id: userId, role: "admin" }, { onConflict: "id" });

  if (profileError) {
    // Non-fatal — invite was sent. Log and surface as a warning.
    console.error("[admin/users] profile upsert failed:", profileError.message);
    return NextResponse.json({
      ok: true,
      warning: "Invite sent but role assignment failed — set profiles.role manually.",
      user: { id: userId, email: data.user.email },
    });
  }

  return NextResponse.json({
    ok: true,
    user: { id: userId, email: data.user.email, confirmed: false },
  });
}
