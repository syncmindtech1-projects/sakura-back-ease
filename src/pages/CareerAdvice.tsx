import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, User, Search, X, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Article {
  title: string;
  tag: string;
  read: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  content: { heading: string; body: string; bullets?: string[] }[];
}

const articles: Article[] = [
  {
    title: "How to Write a Resume That Gets Noticed",
    tag: "Resume", read: "5 min", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=640&h=360&fit=crop",
    author: "Sarah Mitchell", date: "Mar 15, 2026",
    excerpt: "Your resume is the first impression employers get. Learn formatting tips, keyword optimization, and how to highlight achievements over duties.",
    content: [
      { heading: "1. Lead with impact, not job titles", body: "Recruiters spend 6–8 seconds on a first scan. Put a 2-line summary at the top that names the role you want, your top 2 skills, and one signature achievement (with numbers)." },
      { heading: "2. Achievements > duties", body: "Instead of 'Managed social media', write 'Grew Instagram from 2k → 34k followers in 8 months, driving 18% of website traffic.' Use the formula: Verb + What + Result." },
      { heading: "3. Match the job's keywords", body: "Most companies filter with ATS. Copy the job posting into a word cloud, then work the top 10 skills naturally into your bullets and skills section." },
      { heading: "4. Keep it clean", body: "One page for <10 years experience. No photos, no columns, no icons. Use Inter, Calibri, or Georgia at 10.5–11pt. Save as PDF (unless the posting asks for .docx).", bullets: [
        "Contact info + LinkedIn on top",
        "Reverse-chronological experience",
        "Education below experience",
        "Skills section with tools + languages",
      ] },
      { heading: "5. Before you send", body: "Read it out loud. If a bullet doesn't have a number, a tool, or a result — rewrite it. Get one friend and one recruiter to review." },
    ],
  },
  {
    title: "10 Interview Questions You Must Prepare For",
    tag: "Interview", read: "8 min", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=640&h=360&fit=crop",
    author: "James Torres", date: "Mar 12, 2026",
    excerpt: "From 'Tell me about yourself' to 'Why should we hire you?' — master the most common interview questions with expert-crafted answers.",
    content: [
      { heading: "Tell me about yourself", body: "Use Present → Past → Future. What you do now, one relevant thing you did before, why this role is the next step. 90 seconds max." },
      { heading: "Why do you want this job?", body: "Show you researched the company. Tie their mission or a recent product/win to a skill you bring." },
      { heading: "What is your greatest weakness?", body: "Pick a real one that isn't core to the role, then describe the system you built to manage it." },
      { heading: "Tell me about a conflict at work", body: "STAR: Situation, Task, Action, Result. Focus on how you listened, what you did, and what changed." },
      { heading: "Where do you see yourself in 5 years?", body: "Growth in your craft + more responsibility. Avoid title-chasing or unrelated dreams." },
      { heading: "Why should we hire you?", body: "Match 2–3 of their must-haves with your proof. End with what excites you." },
      { heading: "Describe a failure", body: "Own it, don't blame. Explain what you learned and how you applied it later." },
      { heading: "What's your salary expectation?", body: "Give a researched range (use Payscale/Glassdoor/local salary guides). Anchor slightly above your target." },
      { heading: "Do you have any questions for us?", body: "Always yes. Ask about success metrics for the role, team structure, and how the manager likes to give feedback." },
      { heading: "Behavioral: 'Tell me about a time you led'", body: "Pick an example with clear numbers. Even leading a project (not people) counts if you show ownership." },
    ],
  },
  {
    title: "Negotiating Your Salary: A Complete Guide",
    tag: "Salary", read: "6 min", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=640&h=360&fit=crop",
    author: "Emily Chen", date: "Mar 10, 2026",
    excerpt: "Most people leave thousands on the table. Learn when to negotiate, what to say, and how to research your market value.",
    content: [
      { heading: "Research your market", body: "Check Payscale, BrighterMonday salary reports, and ask 2–3 people in your network. Get a range, not a number." },
      { heading: "Never give the first number", body: "If asked, say: 'Based on the scope, I'm expecting between X and Y — but I'd love to hear the range you've budgeted.'" },
      { heading: "Negotiate the full package", body: "Base salary, bonus, medical, transport, remote days, learning budget, extra leave. Anything is on the table." },
      { heading: "Script for the counter", body: "'Thank you for the offer. Based on my [X years] of experience in [Y] and the results I brought at [Z], I was hoping for [target]. Can we get there?'" },
      { heading: "Get it in writing", body: "Never accept verbally. Ask for a signed offer letter before resigning from your current role." },
    ],
  },
  {
    title: "Remote Work: Tips for Staying Productive",
    tag: "Remote", read: "4 min", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=640&h=360&fit=crop",
    author: "Marcus Johnson", date: "Mar 8, 2026",
    excerpt: "Set boundaries, create a dedicated workspace, and use time-blocking techniques to thrive in a remote work environment.",
    content: [
      { heading: "Have a start ritual", body: "Same time, same coffee, same 5-minute plan. Your brain needs a signal that work has started when there's no commute." },
      { heading: "Time-block your calendar", body: "Deep work in the morning (2× 90-minute blocks). Meetings and admin in the afternoon. Protect the blocks like flights." },
      { heading: "Separate work and life physically", body: "A dedicated corner beats a couch. Close the laptop at end of day and walk away — even one lap around the block." },
      { heading: "Overcommunicate", body: "In remote teams, silence looks like disengagement. Post a daily standup, share progress, ask questions publicly." },
    ],
  },
  {
    title: "Career Change at 30: Is It Too Late?",
    tag: "Career", read: "7 min", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=640&h=360&fit=crop",
    author: "Priya Sharma", date: "Mar 5, 2026",
    excerpt: "Spoiler: It's never too late. Discover how transferable skills, reskilling programs, and strategic networking can transform your career.",
    content: [
      { heading: "Audit your transferable skills", body: "Communication, project management, stakeholder handling, tools — these transfer everywhere. List every skill from your last 3 roles." },
      { heading: "Pick a bridge role", body: "Don't leap. If you're moving from teaching to tech, aim for EdTech customer success first. It's easier to make one jump than two." },
      { heading: "Reskill on nights and weekends", body: "Coursera, ALX, YouTube, and free bootcamps get you 80% of the way. Ship a real portfolio project before you apply." },
      { heading: "Rewrite your story", body: "Your resume must speak the new industry's language. Translate every past achievement into the terms of the new role." },
      { heading: "Network intentionally", body: "80% of career changes happen via warm intros. Message 5 people a week doing what you want to do. Ask, don't sell." },
    ],
  },
  {
    title: "Building Your LinkedIn Profile for Job Hunting",
    tag: "Networking", read: "5 min", image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=640&h=360&fit=crop",
    author: "David Kim", date: "Mar 3, 2026",
    excerpt: "Optimize your headline, craft a compelling summary, and leverage LinkedIn's algorithm to get noticed by recruiters.",
    content: [
      { heading: "Fix your headline", body: "Not just your title — say what you do for whom. 'Frontend Engineer helping fintechs ship fast, accessible React apps.'" },
      { heading: "Your photo matters", body: "Clean background, friendly face, shoulders and up. Profiles with a photo get 14× more views." },
      { heading: "Turn your About into a story", body: "Hook → what you do → proof (numbers, projects) → what you're looking for → clear call to reach out." },
      { heading: "Post 2× per week", body: "Short lessons from your work outperform long essays. The algorithm rewards consistency over virality." },
    ],
  },
  {
    title: "From Trades to Tech: Making the Transition",
    tag: "Career", read: "6 min", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=640&h=360&fit=crop",
    author: "Mike Reynolds", date: "Feb 28, 2026",
    excerpt: "Many skilled tradespeople successfully move into tech roles. Learn about bootcamps, certifications, and which tech jobs value hands-on experience.",
    content: [
      { heading: "Best tech landing zones", body: "Field engineering, hardware installation, network cabling, industrial IoT, and technical support all value hands-on skills." },
      { heading: "Certifications that unlock roles", body: "CompTIA A+ or Network+ (support), Cisco CCNA (networking), AWS Cloud Practitioner (cloud entry)." },
      { heading: "Build a public project", body: "Set up a Raspberry Pi home lab, document it on GitHub, tweet a photo. Hiring managers respond to proof." },
      { heading: "Reframe your resume", body: "Read blueprints = read technical specs. Troubleshoot electrical systems = debug hardware. Same skill, new words." },
    ],
  },
  {
    title: "The Hidden Job Market: How to Access It",
    tag: "Networking", read: "5 min", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=640&h=360&fit=crop",
    author: "Lisa Park", date: "Feb 25, 2026",
    excerpt: "Up to 80% of jobs are never publicly posted. Discover how informational interviews and professional networks unlock hidden opportunities.",
    content: [
      { heading: "Why jobs go hidden", body: "Referrals are cheaper and faster than posting. Managers hire the first qualified person they trust." },
      { heading: "The 15-minute chat", body: "DM a target person: 'I admire your work at X. Could I get 15 min of your time to hear how you got there?' Don't ask for a job." },
      { heading: "Follow up with value", body: "After the chat, send a thank-you plus one useful link. Update them 3 months later on your progress." },
      { heading: "Track your network", body: "Simple spreadsheet: name, company, last contact, next follow-up. Warm relationships open doors cold applications can't." },
    ],
  },
];

const tags = ["All", "Resume", "Interview", "Salary", "Remote", "Career", "Networking"];

const CareerAdvice = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [openArticle, setOpenArticle] = useState<Article | null>(null);

  const filtered = articles.filter((a) => {
    if (activeTag !== "All" && a.tag !== activeTag) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(160,25%,95%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Career Advice
          </motion.h1>
          <p className="text-muted-foreground mb-6">Expert tips to level up your career — click any article to read the full guide.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border max-w-md flex-1">
              <Search size={18} className="text-muted-foreground" />
              <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent w-full text-sm text-foreground placeholder:text-muted-foreground outline-none" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((t) => (
                <button key={t} onClick={() => setActiveTag(t)} className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors ${activeTag === t ? 'bg-primary/10 text-primary font-semibold' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.article key={a.title} onClick={() => setOpenArticle(a)} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated hover:border-primary/30 transition-all cursor-pointer text-left" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <img src={a.image} alt={a.title} loading="lazy" className="h-40 w-full object-cover" />
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">{a.tag}</span>
                  <h3 className="text-lg font-semibold font-display text-foreground mt-3 mb-2 group-hover:text-primary transition-colors leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User size={12} />{a.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{a.read}</span>
                    </div>
                    <span className="text-primary font-semibold inline-flex items-center gap-1">Read <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-8">
            <AdsBanner variant="banner" adIndex={1} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openArticle && (
          <motion.div className="fixed inset-0 z-[70] bg-black/60 flex items-end md:items-center justify-center p-0 md:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenArticle(null)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-border shadow-elevated">
              <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">{openArticle.tag}</span>
                <button onClick={() => setOpenArticle(null)} className="p-1.5 rounded-lg hover:bg-secondary"><X size={18} /></button>
              </div>
              <div className="px-6 py-6 md:px-10 md:py-8">
                <img src={openArticle.image} alt={openArticle.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground leading-tight">{openArticle.title}</h2>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3 mb-6">
                  <span className="flex items-center gap-1"><User size={12} />{openArticle.author}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{openArticle.read} read</span>
                  <span>{openArticle.date}</span>
                </div>
                <p className="text-base text-foreground/90 leading-relaxed mb-6 italic border-l-2 border-primary pl-4">{openArticle.excerpt}</p>
                <div className="space-y-6">
                  {openArticle.content.map((s, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold font-display text-foreground mb-2">{s.heading}</h3>
                      <p className="text-sm text-foreground/80 leading-relaxed">{s.body}</p>
                      {s.bullets && (
                        <ul className="mt-3 space-y-1.5">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-foreground/80"><CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default CareerAdvice;
