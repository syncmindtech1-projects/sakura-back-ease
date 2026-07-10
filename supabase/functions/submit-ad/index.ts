import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "syncmindtech1@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    if (!body.advertiser_name || !body.contact_email || !body.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data, error } = await supabase.from("ad_submissions").insert({
      advertiser_name: body.advertiser_name,
      contact_email: body.contact_email,
      company: body.company ?? null,
      phone: body.phone ?? null,
      ad_type: body.ad_type ?? null,
      budget: body.budget ?? null,
      video_url: body.video_url ?? null,
      target_url: body.target_url ?? null,
      message: body.message,
      source: body.source ?? null,
    }).select().single();
    if (error) throw error;

    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailed = false;
    if (resendKey) {
      const html = `
        <h2>New Advertising Request — JobSphere</h2>
        <p><strong>From:</strong> ${esc(body.advertiser_name)} (${esc(body.contact_email)})</p>
        <p><strong>Company:</strong> ${esc(body.company ?? "—")}</p>
        <p><strong>Phone:</strong> ${esc(body.phone ?? "—")}</p>
        <p><strong>Ad Type:</strong> ${esc(body.ad_type ?? "—")} · <strong>Budget:</strong> ${esc(body.budget ?? "—")}</p>
        <p><strong>Video URL:</strong> ${esc(body.video_url ?? "—")}</p>
        <p><strong>Target URL:</strong> ${esc(body.target_url ?? "—")}</p>
        <p><strong>Source:</strong> ${esc(body.source ?? "—")}</p>
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${esc(body.message)}</p>
        <hr/><p style="color:#888">Submission ID: ${data.id}</p>`;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "JobSphere Ads <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          reply_to: body.contact_email,
          subject: `New Ad Request: ${body.advertiser_name}${body.company ? " — " + body.company : ""}`,
          html,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error", r.status, await r.text());
    }
    return new Response(JSON.stringify({ ok: true, id: data.id, emailed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function esc(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
