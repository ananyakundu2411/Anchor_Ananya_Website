/**
 * Minimal Supabase PostgREST helper (server-only). No SDK dependency.
 * All functions are no-ops returning { ok: false, reason: "not_configured" }
 * when SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are absent.
 */
const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const dbConfigured = Boolean(URL_ && KEY);

type Result = { ok: boolean; reason?: string; status?: number; data?: unknown };

async function rest(path: string, init: RequestInit): Promise<Result> {
  if (!dbConfigured) return { ok: false, reason: "not_configured" };
  try {
    const res = await fetch(`${URL_}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: KEY!,
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
    });
    const ok = res.ok;
    let data: unknown = null;
    try { data = await res.json(); } catch { /* empty body is fine */ }
    return { ok, status: res.status, data, reason: ok ? undefined : `http_${res.status}` };
  } catch (e) {
    return { ok: false, reason: `fetch_error:${(e as Error).message}` };
  }
}

export function insert(table: string, rows: object | object[]) {
  return rest(table, { method: "POST", body: JSON.stringify(rows), headers: { Prefer: "return=minimal" } });
}

export function upsert(table: string, rows: object | object[], onConflict: string) {
  return rest(`${table}?on_conflict=${onConflict}`, {
    method: "POST",
    body: JSON.stringify(rows),
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
  });
}

export function log(kind: string, ok: boolean, detail: object = {}) {
  return insert("sync_logs", { kind, ok, detail });
}
