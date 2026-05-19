"use client";

import { useRef, useState } from "react";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function initials(email) {
  const parts = (email || "").split("@")[0].split(/[._-]/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return null;
  }
}

export function AdminUsersClient({ initialUsers = [], currentUserId }) {
  const [users, setUsers] = useState(initialUsers);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [revoking, setRevoking] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef(null);

  function clearMessages() {
    setError("");
    setSuccess("");
  }

  async function invite(e) {
    e.preventDefault();
    clearMessages();
    const trimmed = email.trim();
    if (!trimmed) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Invite failed.");
      if (json.warning) setError(`Warning: ${json.warning}`);
      else setSuccess(`Invitation sent to ${trimmed}. They'll appear here once confirmed.`);
      setEmail("");
      if (json.user) {
        setUsers((prev) => {
          if (prev.some((u) => u.id === json.user.id)) return prev;
          return [{ ...json.user, confirmed: false, lastSignIn: null, invitedAt: new Date().toISOString() }, ...prev];
        });
      }
    } catch (err) {
      setError(err.message || "Invite failed.");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  async function revoke(userId) {
    clearMessages();
    setRevoking(userId);
    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(userId)}`, {
        method: "DELETE",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Revoke failed.");
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setSuccess("Admin access revoked.");
    } catch (err) {
      setError(err.message || "Revoke failed.");
    } finally {
      setRevoking(null);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">

      {/* LEFT: Invite form */}
      <div className="rounded-3xl border border-card-border bg-black/10 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_22px_60px_-52px_rgba(0,0,0,0.9)]">
        <div className="relative">
          <div className="text-xs font-semibold tracking-wide text-muted">Invite admin</div>
          <div className="mt-1 text-base font-semibold tracking-tight text-foreground">Add a team member</div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            They&apos;ll receive an email invitation. Once they confirm and set a password, they&apos;ll have full admin access.
          </p>
        </div>

        <form onSubmit={invite} className="mt-5 grid gap-3">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@yardcraft.com"
            autoComplete="email"
            disabled={busy}
            className="w-full rounded-2xl border border-card-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !email.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--green)_40%,var(--card-border))] bg-[color-mix(in_oklab,var(--green)_14%,transparent)] px-6 py-3 text-sm font-semibold tracking-tight text-foreground transition hover:bg-[color-mix(in_oklab,var(--green)_22%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            {busy ? (
              <>
                <Spinner />
                Sending…
              </>
            ) : (
              "Send invitation"
            )}
          </button>
        </form>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs leading-relaxed text-red-200">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mt-4 rounded-2xl border border-[color-mix(in_oklab,var(--green)_35%,var(--card-border))] bg-[color-mix(in_oklab,var(--green)_10%,transparent)] px-4 py-3 text-xs leading-relaxed text-foreground">
            {success}
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl border border-card-border bg-card px-4 py-3 text-xs leading-relaxed text-muted">
          Invited users can log in at <span className="font-mono text-foreground/80">/admin/login</span> once they confirm their email.
        </div>
      </div>

      {/* RIGHT: Users list */}
      <div className="rounded-3xl border border-card-border bg-black/10 p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_22px_60px_-52px_rgba(0,0,0,0.9)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-wide text-muted">Current admins</div>
            <div className="mt-1 text-base font-semibold tracking-tight text-foreground">
              {users.length} {users.length === 1 ? "member" : "members"}
            </div>
          </div>
          <span className="rounded-full border border-card-border bg-background/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-muted">
            Admin only
          </span>
        </div>

        {users.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-card-border bg-card px-4 py-8 text-center text-sm text-muted">
            No admins yet — invite someone using the form.
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {users.map((u) => {
              const isSelf = u.id === currentUserId;
              const isRevoking = revoking === u.id;
              const lastSeen = u.lastSignIn ? formatDate(u.lastSignIn) : null;

              return (
                <div
                  key={u.id}
                  className="flex items-center gap-3 rounded-2xl border border-card-border bg-card px-4 py-3"
                >
                  {/* Avatar */}
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-card-border bg-white/5 text-sm font-semibold tracking-tight text-foreground">
                    {initials(u.email) || "?"}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-semibold tracking-tight text-foreground">
                        {u.email}
                      </span>
                      {isSelf ? (
                        <span className="rounded-full border border-card-border bg-black/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted">
                          You
                        </span>
                      ) : null}
                      <span
                        className={cx(
                          "rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide",
                          u.confirmed
                            ? "border-[color-mix(in_oklab,var(--green)_40%,var(--card-border))] bg-[color-mix(in_oklab,var(--green)_10%,transparent)] text-foreground"
                            : "border-[color-mix(in_oklab,var(--gold)_35%,var(--card-border))] bg-[color-mix(in_oklab,var(--gold)_8%,transparent)] text-foreground",
                        )}
                      >
                        {u.confirmed ? "Active" : "Invite pending"}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">
                      {lastSeen ? `Last sign in: ${lastSeen}` : u.confirmed ? "Never signed in" : "Awaiting confirmation"}
                    </div>
                  </div>

                  {/* Revoke */}
                  {!isSelf ? (
                    <button
                      type="button"
                      disabled={isRevoking}
                      onClick={() => revoke(u.id)}
                      className="shrink-0 rounded-full border border-card-border bg-black/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-muted transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                    >
                      {isRevoking ? "Revoking…" : "Revoke"}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
