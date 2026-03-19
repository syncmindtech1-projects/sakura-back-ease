import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const CTASection = () => {
  return (
    <section id="cta" className="py-16 md:py-24 gradient-hero">
      <div className="container mx-auto px-4 md:px-8 flex justify-center">
        <motion.div
          className="bg-card rounded-3xl shadow-card px-8 md:px-16 py-12 flex flex-col items-center gap-6 max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
            Start Your Pain-Free Life Today
          </h2>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-accent">$188</span>
            <span className="text-lg text-muted-foreground line-through">$250.99</span>
          </div>
          <a
            href="#"
            className="gradient-cta text-accent-foreground font-semibold text-lg px-10 py-4 rounded-full shadow-cta hover:scale-105 transition-transform"
          >
            Buy Now
          </a>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck size={16} className="text-primary" />
            30 Day Money Back Guarantee
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
