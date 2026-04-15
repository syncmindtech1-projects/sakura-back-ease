import { motion } from "framer-motion";
import stepSignup from "@/assets/step-signup.jpg";
import stepSearch from "@/assets/step-search.jpg";
import stepApply from "@/assets/step-apply.jpg";
import stepHired from "@/assets/step-hired.jpg";

const steps = [
  { image: stepSignup, title: "Create Account", desc: "Sign up for free in under 60 seconds" },
  { image: stepSearch, title: "Search Jobs", desc: "Browse by category, location, or keyword" },
  { image: stepApply, title: "Apply Easily", desc: "One-click apply with your saved profile" },
  { image: stepHired, title: "Get Hired", desc: "Land your dream job and start your career" },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="text-sm font-semibold text-primary uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Simple Process
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-border" />
              )}
              <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden mb-4 shadow-glow">
                <img src={step.image} alt={step.title} loading="lazy" width={80} height={80} className="w-full h-full object-cover" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center z-10">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold font-display text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
