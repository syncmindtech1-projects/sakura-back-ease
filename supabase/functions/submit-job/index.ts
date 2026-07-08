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
    const required = ["title", "company", "description", "contact_email"];
    for (const f of required) {
      if (!body[f] || String(body[f]).trim() === "") {
        return new Response(JSON.stringify({ error: `Missing field: ${f}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("job_submissions")
      .insert({
        title: body.title,
        company: body.company,
        contact_email: body.contact_email,
        location: body.location ?? null,
        salary: body.salary ?? null,
        job_type: body.job_type ?? null,
        category: body.category ?? null,
        description: body.description,
        apply_url: body.apply_url ?? null,
        plan: body.plan ?? null,
      })
      .select()
      .single();

    if (error) throw error;

    // Attempt email notification via Resend (optional; requires RESEND_API_KEY)
    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailed = false;
    if (resendKey) {
      const html = `
        <h2>New Job Submission — JobSphere</h2>
        <p><strong>Title:</strong> ${escape(body.title)}</p>
        <p><strong>Company:</strong> ${escape(body.company)}</p>
        <p><strong>Contact:</strong> ${escape(body.contact_email)}</p>
        <p><strong>Location:</strong> ${escape(body.location ?? "—")}</p>
        <p><strong>Salary:</strong> ${escape(body.salary ?? "—")}</p>
        <p><strong>Type:</strong> ${escape(body.job_type ?? "—")} · <strong>Category:</strong> ${escape(body.category ?? "—")}</p>
        <p><strong>Plan:</strong> ${escape(body.plan ?? "—")}</p>
        <p><strong>Apply URL:</strong> ${escape(body.apply_url ?? "—")}</p>
        <h3>Description</h3>
        <p style="white-space:pre-wrap">${escape(body.description)}</p>
        <hr/>
        <p style="color:#888">Submission ID: ${data.id}</p>
      `;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "JobSphere <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          reply_to: body.contact_email,
          subject: `New Job Submission: ${body.title} — ${body.company}`,
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

function escape(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
