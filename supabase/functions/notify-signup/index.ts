import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_EMAIL = "syncmindtech1@gmail.com";

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Validate the caller's JWT — we only ever notify about the authenticated user.
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = userData.user;
    const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
    const fullName =
      (meta.full_name as string) || (meta.name as string) || (user.email?.split("@")[0] ?? "Unknown");
    const provider = (user.app_metadata?.provider as string) ?? "email";
    const method = provider === "google" ? "Google Sign-In" : "Email / Password";
    const signedUpAt = user.created_at ?? new Date().toISOString();

    // Idempotency: only notify once per user.
    const { error: insertErr } = await admin.from("signup_notifications").insert({
      user_id: user.id,
      email: user.email,
      full_name: fullName,
      method,
    });

    if (insertErr) {
      // Duplicate key => already notified.
      return new Response(JSON.stringify({ ok: true, alreadyNotified: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailed = false;
    if (resendKey) {
      const html = `
        <h2>New JobSphere sign-up</h2>
        <p><strong>Full name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(user.email ?? "—")}</p>
        <p><strong>Sign-up method:</strong> ${escapeHtml(method)}</p>
        <p><strong>Timestamp:</strong> ${escapeHtml(new Date(signedUpAt).toUTCString())}</p>
        <hr/>
        <p style="color:#888">No credentials are ever included in this notification.</p>
      `;
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "JobSphere <onboarding@resend.dev>",
          to: [ADMIN_EMAIL],
          subject: `New sign-up: ${fullName}`,
          html,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("Resend error", r.status, await r.text());
    } else {
      console.warn("RESEND_API_KEY not configured — signup logged but email not sent");
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
