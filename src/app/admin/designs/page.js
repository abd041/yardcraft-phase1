import { AdminShell } from "@/components/admin/AdminShell";
import { listDesigns } from "@/lib/designs";
import { AdminDesignsClient } from "@/components/admin/AdminDesignsClient";

export const metadata = {
  title: "Admin • Designs",
  description: "Manage YardCraft design pages (before/after images).",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const designs = await listDesigns();

  
  return (
    <AdminShell title="Designs">
      <AdminDesignsClient initialDesigns={designs} />
    </AdminShell>
  );
}

