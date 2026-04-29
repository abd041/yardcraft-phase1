import { NextResponse } from "next/server";

import { listDesigns, upsertDesign } from "@/lib/designs";

export async function GET() {
  const designs = await listDesigns();
  return NextResponse.json({ designs });
}

export async function POST(request) {
  let body = null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  try {
    const design = await upsertDesign(body);
    return NextResponse.json({ ok: true, design });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "upsert_failed", message: err?.message ?? "unknown" },
      { status: 400 },
    );
  }
}

