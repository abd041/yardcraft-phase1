"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/Button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/designs";

  const { supabase, supabaseInitError } = useMemo(() => {
    try {
      return { supabase: createSupabaseBrowserClient(), supabaseInitError: "" };
    } catch (err) {
      return { supabase: null, supabaseInitError: err?.message || "Supabase is not configured." };
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (!supabase) throw new Error(supabaseInitError || "Supabase is not configured.");
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-0)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute top-20 left-[-220px] h-[520px] w-[520px] rounded-full bg-green/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-160px,rgba(214,178,94,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),transparent_45%,rgba(0,0,0,0.78))]" />
      </div>

      <Container className="relative flex min-h-screen items-center justify-center py-10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center">
            <Logo />
          </div>

          <div className="mt-6 rounded-3xl border border-card-border bg-card p-6 sm:p-8">
            <div className="text-center">
              <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
                YardCraft Admin
              </div>
              <h1 className="mt-2 font-serif text-3xl font-semibold leading-[1.08] tracking-[-0.01em] text-foreground">
                Sign in
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted">
                Invite-only access. Use your admin credentials.
              </p>
            </div>

            {supabaseInitError || searchParams.get("error") === "supabase_not_configured" ? (
              <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                {supabaseInitError || "Supabase is not configured for this deployment."}{" "}
                <span className="block mt-2 text-xs text-amber-100/80">
                  Set <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span> and{" "}
                  <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> in Vercel
                  Environment Variables, then redeploy.
                </span>
              </div>
            ) : null}

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-6 grid gap-3">
              <label className="grid gap-2">
                <span className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
                  Email
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="you@yardcraft.com"
                  disabled={!supabase}
                  className="w-full rounded-2xl border border-card-border bg-black/10 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
                  Password
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  disabled={!supabase}
                  className="w-full rounded-2xl border border-card-border bg-black/10 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </label>

              <Button
                disabled={busy || !supabase}
                type="submit"
                className="mt-2 w-full justify-center"
              >
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <div className="mt-5 rounded-2xl border border-card-border bg-black/10 px-4 py-3 text-xs text-muted">
              Admin access is restricted. If you need access, invite your email in Supabase.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

