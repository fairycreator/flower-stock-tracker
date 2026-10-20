// Reads a supplier invoice (text and/or page images) with Claude and returns structured lines.
// Only signed-in team members may call it. Needs the secret ANTHROPIC_API_KEY;
// optional ANTHROPIC_MODEL (default below).
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
  });
  const { data: member, error: mErr } = await sb.rpc("is_member");
  if (mErr || !member) return json({ error: "not_team_member" }, 403);

  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return json({ error: "not_configured" }, 501);

  let body: { prompt?: string; images?: string[] };
  try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
  const prompt = String(body.prompt ?? "").slice(0, 200_000);
  const images = (body.images ?? []).slice(0, 6);
  if (!prompt) return json({ error: "missing_prompt" }, 400);

  const content: unknown[] = images.map((data) => ({
    type: "image", source: { type: "base64", media_type: "image/jpeg", data },
  }));
  content.push({ type: "text", text: prompt + "\n\nReply with the JSON object only." });

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5-5",
      max_tokens: 16000,
      messages: [{ role: "user", content }],
    }),
  });
  if (!r.ok) return json({ error: `anthropic_${r.status}`, detail: (await r.text()).slice(0, 500) }, 502);
  const msg = await r.json();
  const text: string = (msg.content ?? []).filter((c: { type: string }) => c.type === "text").map((c: { text: string }) => c.text).join("");
  const s = text.indexOf("{"), e = text.lastIndexOf("}");
  if (s < 0 || e < s) return json({ error: "no_json", detail: text.slice(0, 300) }, 502);
  try {
    return json({ result: JSON.parse(text.slice(s, e + 1)) });
  } catch {
    return json({ error: "bad_model_json", detail: text.slice(0, 300) }, 502);
  }
});
