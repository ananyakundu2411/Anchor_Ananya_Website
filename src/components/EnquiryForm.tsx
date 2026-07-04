"use client";

import { useState } from "react";
import { site, waLink } from "@/config/site";
import { track } from "@/lib/track";

const EVENT_TYPES = [
  "Wedding / Sangeet / Engagement",
  "Corporate Event",
  "Award Night",
  "Brand Launch",
  "College Event",
  "Cultural Show",
  "Birthday / Baby Shower / Naming",
  "Live Show",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY || "";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startedAt] = useState(() => Date.now());

  function validate(data: FormData) {
    const e: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (name.length < 2) e.name = "Please enter your full name.";
    if (!/^[+\d][\d\s\-()]{7,15}$/.test(phone)) e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address.";
    if (!data.get("eventType")) e.eventType = "Please choose an event type.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);

    // Anti-spam: honeypot + minimum fill time
    if (String(data.get("company") || "") !== "" || Date.now() - startedAt < 2500) {
      setStatus("success"); // silently drop bots
      return;
    }

    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) return;

    const payload = {
      name: String(data.get("name")),
      phone: String(data.get("phone")),
      email: String(data.get("email")),
      eventType: String(data.get("eventType")),
      eventDate: String(data.get("eventDate") || "Not specified"),
      location: String(data.get("location") || "Not specified"),
      audienceSize: String(data.get("audienceSize") || "Not specified"),
      message: String(data.get("message") || ""),
    };

    track("form_submit", { eventType: payload.eventType });

    // Preferred path: server-side lead capture (DB + email) — falls through on failure
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "website_form" }),
      });
      const j = await res.json().catch(() => null);
      if (res.ok && j?.ok) {
        setStatus("success");
        form.reset();
        return;
      }
    } catch { /* fall through to client-side channels */ }

    if (!ENDPOINT) {
      // Fallback: hand the enquiry to WhatsApp so nothing is lost.
      const msg = [
        "Hi Ananya, I would like to enquire about anchoring for an event.",
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email}`,
        `Event Type: ${payload.eventType}`,
        `Event Date: ${payload.eventDate}`,
        `Location: ${payload.location}`,
        `Audience Size: ${payload.audienceSize}`,
        payload.message ? `Message: ${payload.message}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      window.open(waLink(msg), "_blank", "noopener,noreferrer");
      track("whatsapp_click", { source: "form_fallback" });
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
          subject: `New event enquiry from ${payload.name} — ${payload.eventType}`,
          from_name: "Anchor Ananya Website",
          ...payload,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card-premium !translate-y-0 p-10 text-center" role="status">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-8 w-8 stroke-gold" fill="none" strokeWidth="2" aria-hidden>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-3xl text-ivory">Enquiry Received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ivory-dim">
          Thank you! Ananya will get back to you shortly. For instant confirmation,
          reach out directly on WhatsApp.
        </p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p className="mt-1.5 text-xs text-blush" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="card-premium !translate-y-0 space-y-5 p-6 sm:p-10">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Full Name *
          </label>
          <input id="name" name="name" type="text" required placeholder="Your name" className="input-premium" />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Phone Number *
          </label>
          <input id="phone" name="phone" type="tel" required placeholder="+91 98XXX XXXXX" className="input-premium" />
          {err("phone")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Email *
          </label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className="input-premium" />
          {err("email")}
        </div>
        <div>
          <label htmlFor="eventType" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Event Type *
          </label>
          <select id="eventType" name="eventType" required defaultValue="" className="input-premium">
            <option value="" disabled>
              Select event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {err("eventType")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="eventDate" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Event Date
          </label>
          <input id="eventDate" name="eventDate" type="date" className="input-premium" />
        </div>
        <div>
          <label htmlFor="location" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Event Location
          </label>
          <input id="location" name="location" type="text" placeholder="City / venue" className="input-premium" />
        </div>
        <div>
          <label htmlFor="audienceSize" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
            Audience Size
          </label>
          <input id="audienceSize" name="audienceSize" type="text" placeholder="e.g. 200" className="input-premium" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs uppercase tracking-widest2 text-ivory-dim">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell Ananya about your event — theme, schedule, languages, anything special."
          className="input-premium resize-y"
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl border border-blush/40 bg-blush/10 px-4 py-3 text-sm text-blush" role="alert">
          Something went wrong sending your enquiry. Please try again, or reach
          Ananya directly on WhatsApp — {site.whatsapp.number}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" disabled={status === "loading"} className="btn-gold disabled:opacity-60">
          {status === "loading" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/40 border-t-ink" aria-hidden />
              Sending…
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>
        <span className="text-xs text-ivory-dim/70">
          Or instantly:{" "}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
            WhatsApp {site.whatsapp.number}
          </a>
        </span>
      </div>
    </form>
  );
}
