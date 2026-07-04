import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, log } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const event = String(body?.event || "unknown").slice(0, 64);
    if (dbConfigured) {
      await log(`event:${event}`, true, { props: body?.props || {}, ts: body?.ts });
    } else if (process.env.NODE_ENV !== "production") {
      console.log("[track]", event, body?.props);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
