import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "syncmindtech1@gmail.com";

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const formType = String(body.form_type ?? "contact").slice(0, 40);
    const email = String(body.email ?? "").trim();
    const name = body.name ? String(body.name).slice(0, 200) : null;
    const subject = body.subject ? String(body.subject).slice(0, 300) : null;
    const message = body.message ? String(body.message).slice(0, 5000) : null;

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "A valid email address is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("contact_messages")
      .insert({ form_type: formType, name, email, subject, message, meta: body.meta ?? null })
      .select()
      .single();
    if (error) throw error;

    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailed = false;
    if (resendKey) {
      const metaRows = body.meta && typeof body.meta === "object"
        ? Object.entries(body.meta).map(([k, v]) => `<p><strong>${esc(k)}:</strong> ${esc(v)}</p>`).join("")
        : "";
      const html = `
        <h2>New ${esc(formType)} submission — JobSphere</h2>
        <p><strong>Name:</strong> ${esc(name ?? "—")}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Subject:</strong> ${esc(subject ?? "—")}</p>
        ${metaRows}
        <h3>Message</h3>
        <p style="white-space:pre-wrap">${esc(message ?? "—")}</p>
        <hr/><p style="color:#888">Submission ID: ${data.id}</p>`;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "JobSphere <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          reply_to: email,
          subject: `[JobSphere ${formType}] ${subject ?? name ?? email}`,
          html,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error", r.status, await r.text());
    } else {
      console.warn("RESEND_API_KEY not configured — submission stored but email not sent");
    }

    return new Response(JSON.stringify({ ok: true, emailed }), {
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
