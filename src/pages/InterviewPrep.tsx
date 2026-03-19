import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Target, CheckCircle, MessageSquare, Lightbulb, BookOpen, Users } from "lucide-react";

const tips = [
  { icon: Target, title: "Research the Company", desc: "Learn about their mission, recent news, and culture before your interview." },
  { icon: MessageSquare, title: "Practice STAR Method", desc: "Structure your answers: Situation, Task, Action, Result." },
  { icon: Lightbulb, title: "Prepare Questions", desc: "Always have 3-5 thoughtful questions ready for the interviewer." },
  { icon: BookOpen, title: "Review Common Questions", desc: "Practice answering behavioral and technical questions for your role." },
  { icon: Users, title: "Mock Interviews", desc: "Practice with a friend or use online tools to simulate real interviews." },
  { icon: CheckCircle, title: "Follow Up", desc: "Send a thank-you email within 24 hours of your interview." },
];

const InterviewPrep = () => (
  <PageLayout>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          🎯 Interview Prep
        </motion.h1>
        <p className="text-muted-foreground mb-10">Ace your next interview with these expert tips</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <motion.div key={tip.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><tip.icon size={24} className="text-primary" /></div>
              <h3 className="text-base font-semibold font-display text-foreground mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default InterviewPrep;
