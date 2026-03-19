import { motion } from "framer-motion";
import { Play } from "lucide-react";

const steps = [
  "Lie down on a bed or sofa and position the device under your lower back",
  "Choose the treatment session on the device remote control",
  "Enjoy your home physiotherapy session for 15 minutes",
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 gradient-hero">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          This is how easy it is to use Sakura
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Video placeholder */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-muted aspect-video flex items-center justify-center shadow-card cursor-pointer group">
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-cta group-hover:scale-110 transition-transform">
                <Play size={28} className="text-accent-foreground ml-1" />
              </div>
              <span className="absolute bottom-4 left-4 text-sm font-medium text-muted-foreground">
                Watch tutorial
              </span>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="lg:w-1/2 w-full flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-foreground text-base leading-relaxed pt-2">{step}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
