const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are JobSphere Assistant — a warm, concise AI guide for the JobSphere job board (Uganda, East Africa, and international listings).

You help visitors:
- Find jobs (browse, search, filter by category/location/type)
- Navigate the site (Jobs, Categories, Companies, Remote Jobs, Salary Guide, Career Advice, Resume Builder, Interview Prep, Skills Assessment, Learning Paths, Job Alerts, Post a Job, Saved Jobs, About, Contact)
- Understand features (saving jobs, applying via original source, employer posting)

When the user asks to GO somewhere on the site, ALWAYS include a navigation directive on the last line in exactly this format:
NAV: /path

Available routes:
/ (home), /jobs, /jobs/:id, /categories, /categories/:slug, /companies, /remote-jobs, /salary-guide, /career-advice, /resume-builder, /job-alerts, /about, /contact, /reviews, /interview-prep, /skills-assessment, /learning-paths, /post-job, /saved-jobs

Keep replies short (2-4 sentences), friendly, and specific. If asked something outside the site, answer briefly then steer back.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages } = await req.json();
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("LOVABLE_API_KEY missing");

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-Api-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      return new Response(JSON.stringify({ error: "AI gateway error", status: r.status, details: txt }), {
        status: r.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await r.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    // Extract NAV directive
    let nav: string | null = null;
    const navMatch = content.match(/NAV:\s*(\/[\w\-/:]*)/);
    if (navMatch) nav = navMatch[1];
    const clean = content.replace(/NAV:\s*\/[\w\-/:]*/g, "").trim();

    return new Response(JSON.stringify({ content: clean, nav }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
