import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  description: "Admin dashboard for managing content and settings.",
};

export default async function Page() {
  await requireAdmin();
  return (
    <AdminShell title="Overview">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="API login" value="POST /api/login" />
        <Card title="API upload" value="POST /api/upload" />
        <Card title="Design pages" value="/design + /design/[slug]" />
        <Card title="Dynamic admin page" value="/admin/[slug]" />
      </div>
    </AdminShell>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl border border-card-border bg-black/10 p-5">
      <div className="text-xs font-medium tracking-[0.14em] uppercase text-muted">
        {title}
      </div>
      <div className="mt-2 text-sm font-semibold tracking-tight text-foreground">
        {value}
      </div>
    </div>
  );
}

