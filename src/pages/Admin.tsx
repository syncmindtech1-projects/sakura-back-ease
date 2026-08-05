import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Megaphone, Inbox, LogOut, Plus, Pencil, Trash2, Check, X, Video, Loader2, LayoutDashboard, Users } from "lucide-react";

type Tab = "overview" | "jobs" | "submissions" | "ads" | "leads" | "users";


const AD_SLOTS = [
  { key: "banner-0", label: "Text ad – slot 1", kind: "text" },
  { key: "banner-1", label: "Text ad – slot 2", kind: "text" },
  { key: "banner-2", label: "Text ad – slot 3", kind: "text" },
  { key: "banner-3", label: "Text ad – slot 4", kind: "text" },
  { key: "video-0", label: "Video ad – slot 1", kind: "video" },
  { key: "video-1", label: "Video ad – slot 2", kind: "video" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("overview");
  const [busy, setBusy] = useState(false);
  const [creds, setCreds] = useState<{ username: string; password: string } | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [signups, setSignups] = useState<any[]>([]);

  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [editingAd, setEditingAd] = useState<any | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("jobsphere_admin");
    if (!raw) { navigate("/admin-login"); return; }
    setCreds(JSON.parse(raw));
  }, [navigate]);

  const call = async (action: string, payload?: any) => {
    if (!creds) throw new Error("Not authenticated");
    const { data, error } = await supabase.functions.invoke("admin-ops", {
      body: { ...creds, action, payload },
    });
    if (error || (data as any)?.error) throw new Error((data as any)?.error || error?.message);
    return (data as any).data;
  };

  const refresh = async () => {
    if (!creds) return;
    setBusy(true);
    try {
      const [j, s, a, l, u] = await Promise.all([
        call("list_jobs"), call("list_submissions"), call("list_ads"), call("list_ad_submissions"), call("list_signups"),
      ]);
      setJobs(j || []); setSubs(s || []); setAds(a || []); setLeads(l || []); setSignups(u || []);

    } catch (e: any) {
      if (/unauthor|invalid|credential|forbidden/i.test(e.message || "")) {
        sessionStorage.removeItem("jobsphere_admin");
        navigate("/admin-login", { replace: true });
        return;
      }
      toast({ title: "Load failed", description: e.message, variant: "destructive" });
    } finally { setBusy(false); }
  };


  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => { if (creds) refresh(); /* eslint-disable-next-line */ }, [creds]);

  const logout = () => { sessionStorage.removeItem("jobsphere_admin"); navigate("/admin-login"); };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between sticky top-0 z-40 shadow">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold">J</div>
          <div>
            <h1 className="text-lg font-bold font-display">JobSphere Admin</h1>
            <p className="text-xs opacity-80">SyncMind Tech control panel</p>
          </div>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-6">
        <nav className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "jobs", label: "Live Jobs", icon: Briefcase, count: jobs.length },
            { id: "submissions", label: "Pending Submissions", icon: Inbox, count: subs.filter(s => s.status === "pending").length },
            { id: "ads", label: "Site Ads", icon: Megaphone, count: ads.length },
            { id: "leads", label: "Ad Leads", icon: Inbox, count: leads.length },
          ].map((t: any) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${tab === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"}`}>
              <t.icon size={14} /> {t.label}
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-black/10">{t.count}</span>
            </button>
          ))}
          <button onClick={refresh} disabled={busy} className="ml-auto text-xs px-3 py-2 rounded-lg border border-border bg-card hover:bg-secondary">
            {busy ? <Loader2 size={14} className="animate-spin" /> : "Refresh"}
          </button>
        </nav>

        {tab === "jobs" && (
          <JobsPanel jobs={jobs} onEdit={setEditingJob} onDelete={async (id) => {
            if (!confirm("Delete this job?")) return;
            await call("delete_job", { id }).then(refresh).catch((e) => toast({ title: "Failed", description: e.message, variant: "destructive" }));
          }} onNew={() => setEditingJob({})} />
        )}

        {tab === "submissions" && (
          <SubmissionsPanel subs={subs}
            onApprove={async (id) => { await call("approve_submission", { id }); await refresh(); toast({ title: "Approved and published" }); }}
            onReject={async (id) => { await call("reject_submission", { id }); await refresh(); }}
            onDelete={async (id) => { if (confirm("Delete?")) { await call("delete_submission", { id }); await refresh(); } }}
          />
        )}

        {tab === "ads" && (
          <AdsPanel ads={ads} onEdit={setEditingAd} onNew={(slot) => setEditingAd({ slot_key: slot.key, ad_kind: slot.kind, active: true, title: "", cta_label: "Learn more" })}
            onDelete={async (id) => { if (confirm("Remove ad?")) { await call("delete_ad", { id }); await refresh(); } }} />
        )}

        {tab === "leads" && <LeadsPanel leads={leads} />}
      </div>

      {editingJob && (
        <JobEditor job={editingJob} onClose={() => setEditingJob(null)} onSave={async (payload) => {
          try {
            if (payload.id) await call("update_job", payload);
            else await call("create_job", payload);
            setEditingJob(null);
            await refresh();
            toast({ title: "Saved" });
          } catch (e: any) { toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
        }} />
      )}
      {editingAd && (
        <AdEditor ad={editingAd} onClose={() => setEditingAd(null)} onSave={async (payload) => {
          try {
            await call("upsert_ad", payload);
            setEditingAd(null);
            await refresh();
            toast({ title: "Ad saved & live" });
          } catch (e: any) { toast({ title: "Save failed", description: e.message, variant: "destructive" }); }
        }} />
      )}
    </div>
  );
};

// ---------- Panels ----------

const JobsPanel = ({ jobs, onEdit, onDelete, onNew }: any) => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-border">
      <h2 className="font-bold font-display">Live Jobs ({jobs.length})</h2>
      <button onClick={onNew} className="text-sm font-semibold px-3 py-2 rounded-lg gradient-primary text-primary-foreground inline-flex items-center gap-2"><Plus size={14} /> New job</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-xs uppercase text-muted-foreground"><tr>
          <th className="text-left p-3">Title</th><th className="text-left p-3">Company</th><th className="text-left p-3">Location</th><th className="text-left p-3">Type</th><th className="p-3"></th>
        </tr></thead>
        <tbody>
          {jobs.map((j: any) => (
            <tr key={j.id} className="border-t border-border hover:bg-secondary/50">
              <td className="p-3 font-medium">{j.title}</td>
              <td className="p-3">{j.company}</td>
              <td className="p-3 text-muted-foreground">{j.location || "—"}</td>
              <td className="p-3 text-muted-foreground">{j.job_type || "—"}</td>
              <td className="p-3 text-right">
                <button onClick={() => onEdit(j)} className="p-2 hover:bg-secondary rounded" title="Edit"><Pencil size={14} /></button>
                <button onClick={() => onDelete(j.id)} className="p-2 hover:bg-red-100 text-red-600 rounded" title="Delete"><Trash2 size={14} /></button>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No jobs yet.</td></tr>}
        </tbody>
      </table>
    </div>
  </div>
);

const SubmissionsPanel = ({ subs, onApprove, onReject, onDelete }: any) => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-border">
      <h2 className="font-bold font-display">Pending Job Submissions</h2>
      <p className="text-xs text-muted-foreground">Approve to publish live to the site.</p>
    </div>
    <div className="divide-y divide-border">
      {subs.map((s: any) => (
        <div key={s.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold truncate">{s.title}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${s.status === "pending" ? "bg-yellow-100 text-yellow-800" : s.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{s.status}</span>
            </div>
            <p className="text-xs text-muted-foreground">{s.company} · {s.location || "—"} · {s.contact_email}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            {s.status === "pending" && (
              <>
                <button onClick={() => onApprove(s.id)} className="text-xs px-3 py-2 rounded-lg bg-green-600 text-white inline-flex items-center gap-1"><Check size={12} /> Approve</button>
                <button onClick={() => onReject(s.id)} className="text-xs px-3 py-2 rounded-lg bg-red-600 text-white inline-flex items-center gap-1"><X size={12} /> Reject</button>
              </>
            )}
            <button onClick={() => onDelete(s.id)} className="text-xs px-3 py-2 rounded-lg border border-border"><Trash2 size={12} /></button>
          </div>
        </div>
      ))}
      {subs.length === 0 && <div className="p-8 text-center text-muted-foreground">No submissions yet.</div>}
    </div>
  </div>
);

const AdsPanel = ({ ads, onEdit, onNew, onDelete }: any) => (
  <div className="grid md:grid-cols-2 gap-4">
    {AD_SLOTS.map((slot) => {
      const ad = ads.find((a: any) => a.slot_key === slot.key);
      return (
        <div key={slot.key} className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{slot.kind === "video" ? <Video size={12} className="inline" /> : <Megaphone size={12} className="inline" />} {slot.key}</p>
              <h3 className="font-bold font-display">{slot.label}</h3>
            </div>
            {ad ? (
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-semibold">Live</span>
            ) : (
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">Empty</span>
            )}
          </div>
          {ad ? (
            <>
              <p className="font-semibold text-sm">{ad.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{ad.blurb}</p>
              {ad.video_url && <p className="text-[11px] mt-2 text-primary truncate">{ad.video_url}</p>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => onEdit(ad)} className="text-xs px-3 py-2 rounded-lg border border-border inline-flex items-center gap-1"><Pencil size={12} /> Edit</button>
                <button onClick={() => onDelete(ad.id)} className="text-xs px-3 py-2 rounded-lg border border-border text-red-600 inline-flex items-center gap-1"><Trash2 size={12} /> Remove</button>
              </div>
            </>
          ) : (
            <button onClick={() => onNew(slot)} className="w-full mt-2 py-3 rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary">
              <Plus size={14} className="inline mr-1" /> Add {slot.kind} ad
            </button>
          )}
        </div>
      );
    })}
  </div>
);

const LeadsPanel = ({ leads }: any) => (
  <div className="bg-card border border-border rounded-2xl overflow-hidden">
    <div className="p-4 border-b border-border"><h2 className="font-bold font-display">Advertiser Leads</h2></div>
    <div className="divide-y divide-border">
      {leads.map((l: any) => (
        <div key={l.id} className="p-4">
          <p className="font-semibold">{l.advertiser_name} <span className="text-xs text-muted-foreground">· {l.contact_email}</span></p>
          <p className="text-xs text-muted-foreground">{l.company || "—"} · Budget: {l.budget || "—"} · Type: {l.ad_type || "—"}</p>
          {l.video_url && <p className="text-xs text-primary">{l.video_url}</p>}
          <p className="text-sm mt-1">{l.message}</p>
        </div>
      ))}
      {leads.length === 0 && <div className="p-8 text-center text-muted-foreground">No leads yet.</div>}
    </div>
  </div>
);

// ---------- Modals ----------

const Field = ({ label, ...p }: any) => (
  <div>
    <label className="text-xs font-semibold mb-1 block">{label}</label>
    <input {...p} className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
  </div>
);

const JobEditor = ({ job, onClose, onSave }: any) => {
  const [f, setF] = useState({
    id: job.id, title: job.title || "", company: job.company || "", contact_email: job.contact_email || "syncmindtech1@gmail.com",
    location: job.location || "", salary: job.salary || "", apply_url: job.apply_url || "",
    job_type: job.job_type || "Full-time", category: job.category || "Technology", description: job.description || "",
  });
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl w-full max-w-2xl p-6 my-8">
        <h2 className="text-xl font-bold font-display mb-4">{job.id ? "Edit job" : "Create job"}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title *" value={f.title} onChange={(e: any) => setF({ ...f, title: e.target.value })} />
          <Field label="Company *" value={f.company} onChange={(e: any) => setF({ ...f, company: e.target.value })} />
          <Field label="Contact email *" value={f.contact_email} onChange={(e: any) => setF({ ...f, contact_email: e.target.value })} />
          <Field label="Location" value={f.location} onChange={(e: any) => setF({ ...f, location: e.target.value })} />
          <Field label="Salary" value={f.salary} onChange={(e: any) => setF({ ...f, salary: e.target.value })} />
          <Field label="Apply URL" value={f.apply_url} onChange={(e: any) => setF({ ...f, apply_url: e.target.value })} />
          <Field label="Type" value={f.job_type} onChange={(e: any) => setF({ ...f, job_type: e.target.value })} />
          <Field label="Category" value={f.category} onChange={(e: any) => setF({ ...f, category: e.target.value })} />
        </div>
        <div className="mt-3">
          <label className="text-xs font-semibold mb-1 block">Description *</label>
          <textarea rows={6} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
          <button onClick={() => onSave(f)} className="px-4 py-2 text-sm gradient-primary text-primary-foreground rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};

const AdEditor = ({ ad, onClose, onSave }: any) => {
  const [f, setF] = useState({
    id: ad.id, slot_key: ad.slot_key, ad_kind: ad.ad_kind || "text",
    title: ad.title || "", blurb: ad.blurb || "", sponsor: ad.sponsor || "",
    cta_label: ad.cta_label || "Learn more", cta_link: ad.cta_link || "",
    video_url: ad.video_url || "", image_url: ad.image_url || "",
    active: ad.active ?? true,
  });
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl w-full max-w-2xl p-6 my-8">
        <h2 className="text-xl font-bold font-display mb-1">{ad.id ? "Edit ad" : "Create ad"}</h2>
        <p className="text-xs text-muted-foreground mb-4">Slot: <strong>{f.slot_key}</strong> · Kind: {f.ad_kind}</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title *" value={f.title} onChange={(e: any) => setF({ ...f, title: e.target.value })} />
          <Field label="Sponsor" value={f.sponsor} onChange={(e: any) => setF({ ...f, sponsor: e.target.value })} />
          <Field label="CTA label" value={f.cta_label} onChange={(e: any) => setF({ ...f, cta_label: e.target.value })} />
          <Field label="CTA link" value={f.cta_link} onChange={(e: any) => setF({ ...f, cta_link: e.target.value })} />
          {f.ad_kind === "video" && <Field label="Video URL (YouTube/Vimeo/MP4)" value={f.video_url} onChange={(e: any) => setF({ ...f, video_url: e.target.value })} />}
          <Field label="Image URL (optional)" value={f.image_url} onChange={(e: any) => setF({ ...f, image_url: e.target.value })} />
        </div>
        <div className="mt-3">
          <label className="text-xs font-semibold mb-1 block">Blurb</label>
          <textarea rows={3} value={f.blurb} onChange={(e) => setF({ ...f, blurb: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} />
          Active (live on site)
        </label>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-border rounded-lg">Cancel</button>
          <button onClick={() => onSave(f)} className="px-4 py-2 text-sm gradient-primary text-primary-foreground rounded-lg">Save & publish</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
