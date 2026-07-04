"use client";

/**
 * Lightweight conversion-event tracking.
 * Sends a beacon to /api/track (no-ops server-side without a DB) and,
 * if an analytics layer (gtag/va) exists, forwards there too.
 * Never blocks navigation; safe to call from onClick on links.
 */
export type TrackEvent =
  | "whatsapp_click"
  | "form_submit"
  | "gallery_cta"
  | "instagram_click"
  | "review_click";

export function track(event: TrackEvent, props: Record<string, string> = {}) {
  try {
    const payload = JSON.stringify({
      event,
      props: { ...props, path: window.location.pathname },
      ts: Date.now(),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body: payload, keepalive: true }).catch(() => {});
    }
    // Forward to gtag/Vercel Analytics if present
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; va?: (...a: unknown[]) => void };
    w.gtag?.("event", event, props);
    w.va?.("event", { name: event, data: props });
  } catch {
    /* never break the UI for tracking */
  }
}
