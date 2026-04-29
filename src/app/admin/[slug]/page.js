import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/AdminShell";

const sections = [
  {
    slug: "users",
    title: "Users",
    body: "Stub admin section. Add RBAC, listing, invites, and audit logs here.",
  },
  {
    slug: "settings",
    title: "Settings",
    body: "Stub admin section. Add feature flags, billing, and environment config here.",
  },
  {
    slug: "content",
    title: "Content",
    body: "Stub admin section. Add CMS forms and publishing workflows here.",
  },
];

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const section = sections.find((s) => s.slug === params.slug);
  if (!section) return {};
  return { title: `Admin • ${section.title}` };
}

export default function Page({ params }) {
  const section = sections.find((s) => s.slug === params.slug);
  if (!section) notFound();

  return (
    <AdminShell title={section.title}>
      <div className="rounded-2xl border border-card-border bg-black/10 p-5">
        <p className="text-sm text-muted">{section.body}</p>
      </div>
    </AdminShell>
  );
}

