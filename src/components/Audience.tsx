import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const jobTypes = [
  {
    title: "Professional Jobs",
    emoji: "💼",
    desc: "Office-based, managerial, and corporate careers",
    examples: ["Software Engineers", "Accountants", "Lawyers", "Product Managers", "Marketing Directors"],
    color: "primary",
    href: "/jobs",
  },
  {
    title: "Skilled Trades & Services",
    emoji: "🔧",
    desc: "Hands-on, technical, and trade-based work",
    examples: ["Electricians", "Plumbers", "Welders", "HVAC Technicians", "CDL Drivers"],
    color: "highlight",
    href: "/jobs",
  },
];

const Audience = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="text-sm font-semibold text-highlight uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            For Everyone
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Jobs for Every Type of Worker
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {jobTypes.map((type, i) => (
            <motion.div
              key={type.title}
              className="group relative rounded-3xl border border-border bg-card p-8 hover:shadow-elevated transition-all overflow-hidden"
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="absolute top-0 right-0 text-[120px] opacity-5 -translate-y-4 translate-x-4">
                {type.emoji}
              </div>
              <span className="text-5xl mb-4 block">{type.emoji}</span>
              <h3 className="text-2xl font-bold font-display text-foreground mb-2">{type.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{type.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {type.examples.map((ex) => (
                  <span key={ex} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                    {ex}
                  </span>
                ))}
              </div>
              <Link
                to={type.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore Jobs <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
