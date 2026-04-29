import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return { supabase, user: null };
  return { supabase, user: data?.user ?? null };
}

export async function getProfileRole(userId) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) return null;
  return data?.role ?? null;
}

export async function requireAdmin({ redirectTo = "/admin/login" } = {}) {
  const { supabase, user } = await getSessionUser();
  if (!user) redirect(redirectTo);

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || data?.role !== "admin") redirect(redirectTo);

  return { supabase, user, role: "admin" };
}

