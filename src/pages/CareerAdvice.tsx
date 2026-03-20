import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Search } from "lucide-react";
import { useState } from "react";

const articles = [
  { title: "How to Write a Resume That Gets Noticed", tag: "Resume", read: "5 min", emoji: "📝", author: "Sarah Mitchell", date: "Mar 15, 2026", excerpt: "Your resume is the first impression employers get. Learn formatting tips, keyword optimization, and how to highlight achievements over duties." },
  { title: "10 Interview Questions You Must Prepare For", tag: "Interview", read: "8 min", emoji: "🎯", author: "James Torres", date: "Mar 12, 2026", excerpt: "From 'Tell me about yourself' to 'Why should we hire you?' — master the most common interview questions with expert-crafted answers." },
  { title: "Negotiating Your Salary: A Complete Guide", tag: "Salary", read: "6 min", emoji: "💰", author: "Emily Chen", date: "Mar 10, 2026", excerpt: "Most people leave thousands on the table. Learn when to negotiate, what to say, and how to research your market value." },
  { title: "Remote Work: Tips for Staying Productive", tag: "Remote", read: "4 min", emoji: "🏠", author: "Marcus Johnson", date: "Mar 8, 2026", excerpt: "Set boundaries, create a dedicated workspace, and use time-blocking techniques to thrive in a remote work environment." },
  { title: "Career Change at 30: Is It Too Late?", tag: "Career", read: "7 min", emoji: "🔄", author: "Priya Sharma", date: "Mar 5, 2026", excerpt: "Spoiler: It's never too late. Discover how transferable skills, reskilling programs, and strategic networking can transform your career." },
  { title: "Building Your LinkedIn Profile for Job Hunting", tag: "Networking", read: "5 min", emoji: "🔗", author: "David Kim", date: "Mar 3, 2026", excerpt: "Optimize your headline, craft a compelling summary, and leverage LinkedIn's algorithm to get noticed by recruiters." },
  { title: "Blue Collar to Tech: Making the Transition", tag: "Career", read: "6 min", emoji: "🔧", author: "Mike Reynolds", date: "Feb 28, 2026", excerpt: "Many skilled tradespeople successfully move into tech roles. Learn about bootcamps, certifications, and which tech jobs value hands-on experience." },
  { title: "The Hidden Job Market: How to Access It", tag: "Networking", read: "5 min", emoji: "🕵️", author: "Lisa Park", date: "Feb 25, 2026", excerpt: "Up to 80% of jobs are never publicly posted. Discover how informational interviews and professional networks unlock hidden opportunities." },
];

const tags = ["All", "Resume", "Interview", "Salary", "Remote", "Career", "Networking"];

const CareerAdvice = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    if (activeTag !== "All" && a.tag !== activeTag) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(210,40%,96%)] to-[hsl(200,35%,97%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            📖 Career Advice
          </motion.h1>
          <p className="text-muted-foreground mb-6">Expert tips to level up your career</p>
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
              <motion.article key={a.title} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="h-32 bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-6xl">
                  {a.emoji}
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">{a.tag}</span>
                  <h3 className="text-lg font-semibold font-display text-foreground mt-3 mb-2 group-hover:text-primary transition-colors leading-snug">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><User size={12} />{a.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{a.read}</span>
                    </div>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-primary" />
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
    </PageLayout>
  );
};

export default CareerAdvice;
