import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Download, Eye, Palette, Zap, ArrowRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Experience { role: string; company: string; period: string; details: string; }
interface Education { degree: string; school: string; period: string; }

const templates = [
  { name: "Professional", accent: "#0F5132" },
  { name: "Modern", accent: "#B8860B" },
  { name: "Minimal", accent: "#111827" },
  { name: "Technical", accent: "#1E3A8A" },
];

const features = [
  { icon: Zap, title: "Live Preview", desc: "See your resume update instantly as you type." },
  { icon: Palette, title: "Pick a Template", desc: "Switch between four ATS-friendly styles." },
  { icon: Eye, title: "ATS-Optimized", desc: "Clean HTML/CSS that passes applicant tracking systems." },
  { icon: Download, title: "Print / Save PDF", desc: "One-click print — choose 'Save as PDF' in the dialog." },
];

const ResumeBuilder = () => {
  const [template, setTemplate] = useState(templates[0]);
  const [profile, setProfile] = useState({
    name: "", title: "", email: "", phone: "", location: "", summary: "",
    skills: "React, TypeScript, Node.js, Communication",
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    { role: "", company: "", period: "", details: "" },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { degree: "", school: "", period: "" },
  ]);
  const { toast } = useToast();

  const addExp = () => setExperiences([...experiences, { role: "", company: "", period: "", details: "" }]);
  const rmExp = (i: number) => setExperiences(experiences.filter((_, idx) => idx !== i));
  const setExp = (i: number, patch: Partial<Experience>) =>
    setExperiences(experiences.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));

  const addEdu = () => setEducation([...education, { degree: "", school: "", period: "" }]);
  const rmEdu = (i: number) => setEducation(education.filter((_, idx) => idx !== i));
  const setEdu = (i: number, patch: Partial<Education>) =>
    setEducation(education.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));

  const skillsList = profile.skills.split(",").map((s) => s.trim()).filter(Boolean);

  const download = () => {
    if (!profile.name) {
      toast({ title: "Add your name first", variant: "destructive" });
      return;
    }
    window.print();
    toast({ title: "Print dialog opened", description: "Choose 'Save as PDF' to download your resume." });
  };

  return (
    <PageLayout>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .resume-print, .resume-print * { visibility: visible; }
          .resume-print { position: absolute; left: 0; top: 0; width: 100%; padding: 0; margin: 0; box-shadow: none !important; border: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(160,25%,95%)] py-10 md:py-14 no-print">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            📝 Resume Builder
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Fill in your details on the left, preview live on the right, then download as PDF — free and instant.</p>
        </div>
      </section>

      <section className="py-8 md:py-10 no-print">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {features.map((f, i) => (
              <div key={f.title} className="bg-card rounded-xl border border-border p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3"><f.icon size={18} className="text-primary" /></div>
                <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm font-semibold text-foreground mr-2 self-center">Template:</span>
            {templates.map((t) => (
              <button key={t.name} onClick={() => setTemplate(t)} className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${template.name === t.name ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}>
                {t.name}
              </button>
            ))}
            <button onClick={download} className="ml-auto gradient-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              <Download size={16} /> Download PDF
            </button>
          </div>
        </div>
      </section>

      <section className="pb-16 no-print">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-base font-bold font-display text-foreground mb-4">Personal Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                <Field label="Job title" value={profile.title} onChange={(v) => setProfile({ ...profile, title: v })} />
                <Field label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
                <Field label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
                <Field label="Location" value={profile.location} onChange={(v) => setProfile({ ...profile, location: v })} full />
                <TextArea label="Professional summary" value={profile.summary} onChange={(v) => setProfile({ ...profile, summary: v })} full rows={3} />
                <TextArea label="Skills (comma-separated)" value={profile.skills} onChange={(v) => setProfile({ ...profile, skills: v })} full rows={2} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-display text-foreground">Experience</h3>
                <button onClick={addExp} className="text-xs font-semibold text-primary inline-flex items-center gap-1"><Plus size={14} /> Add</button>
              </div>
              {experiences.map((e, i) => (
                <div key={i} className="border-t border-border pt-4 mt-4 first:mt-0 first:border-0 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Role #{i + 1}</span>
                    {experiences.length > 1 && <button onClick={() => rmExp(i)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Job title" value={e.role} onChange={(v) => setExp(i, { role: v })} />
                    <Field label="Company" value={e.company} onChange={(v) => setExp(i, { company: v })} />
                    <Field label="Period" placeholder="Jan 2023 – Present" value={e.period} onChange={(v) => setExp(i, { period: v })} full />
                    <TextArea label="Achievements (one per line)" value={e.details} onChange={(v) => setExp(i, { details: v })} full rows={3} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold font-display text-foreground">Education</h3>
                <button onClick={addEdu} className="text-xs font-semibold text-primary inline-flex items-center gap-1"><Plus size={14} /> Add</button>
              </div>
              {education.map((e, i) => (
                <div key={i} className="border-t border-border pt-4 mt-4 first:mt-0 first:border-0 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Entry #{i + 1}</span>
                    {education.length > 1 && <button onClick={() => rmEdu(i)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Degree" value={e.degree} onChange={(v) => setEdu(i, { degree: v })} />
                    <Field label="School" value={e.school} onChange={(v) => setEdu(i, { school: v })} />
                    <Field label="Period" placeholder="2018 – 2022" value={e.period} onChange={(v) => setEdu(i, { period: v })} full />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={download} className="w-full gradient-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
              <Download size={16} /> Download PDF <ArrowRight size={14} />
            </button>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="resume-print bg-white border border-border rounded-2xl shadow-elevated p-8 md:p-10 text-[13px] text-gray-800">
              <div className="border-b-4 pb-4 mb-5" style={{ borderColor: template.accent }}>
                <h1 className="text-3xl font-bold" style={{ color: template.accent }}>{profile.name || "Your Name"}</h1>
                <p className="text-base text-gray-600 mt-0.5">{profile.title || "Your Title"}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {[profile.email, profile.phone, profile.location].filter(Boolean).join(" • ") || "email@example.com • phone • city"}
                </p>
              </div>

              {profile.summary && (
                <section className="mb-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-1.5" style={{ color: template.accent }}>Summary</h2>
                  <p className="text-[13px] leading-relaxed text-gray-700">{profile.summary}</p>
                </section>
              )}

              <section className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.accent }}>Experience</h2>
                {experiences.filter((e) => e.role || e.company).map((e, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex items-baseline justify-between">
                      <p className="font-semibold text-gray-900">{e.role || "Role"} <span className="text-gray-500 font-normal">— {e.company || "Company"}</span></p>
                      <span className="text-[11px] text-gray-500">{e.period}</span>
                    </div>
                    {e.details && (
                      <ul className="mt-1 ml-4 list-disc text-[12.5px] text-gray-700 space-y-0.5">
                        {e.details.split("\n").filter(Boolean).map((line, li) => (
                          <li key={li}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>

              <section className="mb-5">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.accent }}>Education</h2>
                {education.filter((e) => e.degree || e.school).map((e, i) => (
                  <div key={i} className="flex items-baseline justify-between mb-1">
                    <p className="text-gray-800"><strong>{e.degree || "Degree"}</strong> — {e.school || "School"}</p>
                    <span className="text-[11px] text-gray-500">{e.period}</span>
                  </div>
                ))}
              </section>

              {skillsList.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: template.accent }}>Skills</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded-md" style={{ backgroundColor: `${template.accent}15`, color: template.accent }}>{s}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 mt-12">
          <AdsBanner variant="banner" adIndex={2} />
        </div>
      </section>
    </PageLayout>
  );
};

const Field = ({ label, value, onChange, placeholder, full }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; full?: boolean }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="text-xs font-semibold text-foreground mb-1 block">{label}</label>
    <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary" />
  </div>
);

const TextArea = ({ label, value, onChange, rows = 3, full }: { label: string; value: string; onChange: (v: string) => void; rows?: number; full?: boolean }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="text-xs font-semibold text-foreground mb-1 block">{label}</label>
    <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm outline-none focus:border-primary resize-none" />
  </div>
);

export default ResumeBuilder;
