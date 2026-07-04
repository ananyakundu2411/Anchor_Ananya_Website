import { NextRequest, NextResponse } from "next/server";
import { dbConfigured, insert, log } from "@/lib/db";

const RECEIVER = process.env.ENQUIRY_RECEIVER_EMAIL || "ananyakundu2411@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const b = await req.json().catch(() => null);
    if (!b) return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });

    const name = String(b.name || "").trim();
    const phone = String(b.phone || "").trim();
    const email = String(b.email || "").trim();
    if (name.length < 2 || !/^[+\d][\d\s\-()]{7,15}$/.test(phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, reason: "validation" }, { status: 400 });
    }

    const lead = {
      name,
      phone,
      email,
      event_type: String(b.eventType || "").slice(0, 120),
      event_date: String(b.eventDate || "").slice(0, 40),
      location: String(b.location || "").slice(0, 160),
      audience_size: String(b.audienceSize || "").slice(0, 40),
      message: String(b.message || "").slice(0, 4000),
      source: String(b.source || "website_form").slice(0, 80),
    };

    let stored = false;
    if (dbConfigured) {
      const r = await insert("leads", lead);
      stored = r.ok;
    }

    // Server-side email forward (Web3Forms) if configured
    let emailed = false;
    const w3key = process.env.WEB3FORMS_ACCESS_KEY;
    if (w3key) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: w3key,
            subject: `New event enquiry from ${lead.name} — ${lead.event_type}`,
            from_name: "Anchor Ananya Website",
            to_note: RECEIVER,
            ...lead,
          }),
        });
        emailed = res.ok;
      } catch { /* fall through */ }
    }

    if (dbConfigured) await log("lead", true, { stored, emailed });
    if (!stored && !emailed) return NextResponse.json({ ok: false, reason: "no_channel_configured" });
    return NextResponse.json({ ok: true, stored, emailed });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: (e as Error).message }, { status: 200 });
  }
}
