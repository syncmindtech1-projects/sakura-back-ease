import PageLayout from "@/components/PageLayout";
import AdsBanner from "@/components/AdsBanner";
import { motion } from "framer-motion";
import { Target, CheckCircle, MessageSquare, Lightbulb, BookOpen, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const tips = [
  { icon: Target, title: "Research the Company", desc: "Learn about their mission, recent news, and culture before your interview. Check their LinkedIn, Glassdoor, and recent press releases." },
  { icon: MessageSquare, title: "Practice STAR Method", desc: "Structure your answers: Situation, Task, Action, Result. This framework helps you deliver concise, impactful responses." },
  { icon: Lightbulb, title: "Prepare Questions", desc: "Always have 3-5 thoughtful questions ready. Ask about team dynamics, growth opportunities, and company challenges." },
  { icon: BookOpen, title: "Review Common Questions", desc: "Practice answering behavioral and technical questions specific to your role. Record yourself and review for improvement." },
  { icon: Users, title: "Mock Interviews", desc: "Practice with a friend, mentor, or use online tools to simulate real interviews. Get feedback on body language too." },
  { icon: CheckCircle, title: "Follow Up", desc: "Send a personalized thank-you email within 24 hours. Reference specific conversation points to leave a lasting impression." },
];

const faqs = [
  { q: "What should I wear to an interview?", a: "Research the company culture. When in doubt, business casual is a safe bet. For corporate roles, lean formal. For startups, smart casual works." },
  { q: "How early should I arrive?", a: "Aim to arrive 10-15 minutes early. For virtual interviews, test your setup 30 minutes before and join the call 2-3 minutes early." },
  { q: "How do I handle salary questions?", a: "Deflect early in the process: 'I'd love to learn more about the role first.' When asked directly, provide a researched range based on market data." },
  { q: "What if I don't know an answer?", a: "Be honest — say 'I'm not sure, but here's how I'd approach finding the answer.' Interviewers value honesty and problem-solving more than perfection." },
  { q: "How do I handle interview nerves?", a: "Prepare thoroughly, practice breathing exercises, and remember the interview is a two-way conversation. They're evaluating fit, not perfection." },
];

const InterviewPrep = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-[hsl(45,40%,96%)] to-[hsl(160,25%,95%)] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h1 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Interview Prep
          </motion.h1>
          <p className="text-lg text-muted-foreground">Ace your next interview with these expert tips and resources</p>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          {/* Tips grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {tips.map((tip, i) => (
              <motion.div key={tip.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-all" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><tip.icon size={24} className="text-primary" /></div>
                <h3 className="text-base font-semibold font-display text-foreground mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>

          <AdsBanner variant="banner" adIndex={1} />

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-8 text-center">Common Interview Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} className="bg-card rounded-2xl border border-border overflow-hidden" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} className="text-muted-foreground shrink-0" /> : <ChevronDown size={18} className="text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default InterviewPrep;
