import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Records a new sign-up so it shows up in the Admin Dashboard.
// No email notification is sent for sign-ups (dashboard-only tracking).
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "").trim();
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
    const method = provider === "google" ? "Google" : "Email/Password";
    const rawRole = String(meta.role ?? "").toLowerCase();
    const role = rawRole.includes("provider") || rawRole.includes("employer") ? "Job Provider" : "Job Seeker";

    // Idempotent: primary key on user_id means one row per user.
    const { error: insertErr } = await admin.from("signup_notifications").insert({
      user_id: user.id,
      email: user.email,
      full_name: fullName,
      method,
      role,
    });

    return new Response(
      JSON.stringify({ ok: true, alreadyRecorded: Boolean(insertErr) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
