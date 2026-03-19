import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

const articles = [
  { title: "How to Write a Resume That Gets Noticed", tag: "Resume", read: "5 min", emoji: "📝" },
  { title: "10 Interview Questions You Must Prepare For", tag: "Interview", read: "8 min", emoji: "🎯" },
  { title: "Negotiating Your Salary: A Complete Guide", tag: "Salary", read: "6 min", emoji: "💰" },
  { title: "Remote Work: Tips for Staying Productive", tag: "Remote", read: "4 min", emoji: "🏠" },
  { title: "Career Change at 30: Is It Too Late?", tag: "Career", read: "7 min", emoji: "🔄" },
  { title: "Building Your LinkedIn Profile for Job Hunting", tag: "Networking", read: "5 min", emoji: "🔗" },
];

const CareerAdvice = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          📖 Career Advice
        </motion.h1>
        <p className="text-muted-foreground mb-10">Expert tips to level up your career</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.div key={a.title} className="group bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-all cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <span className="text-4xl mb-4 block">{a.emoji}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">{a.tag}</span>
              <h3 className="text-lg font-semibold font-display text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.read} read</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CareerAdvice;
