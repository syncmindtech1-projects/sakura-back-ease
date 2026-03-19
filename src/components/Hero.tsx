import { motion } from "framer-motion";
import { ShieldCheck, Zap, Settings, DollarSign } from "lucide-react";
import sakuraDevice from "@/assets/sakura-device.png";

const floatingFeatures = [
  { icon: Zap, label: "Easy to operate – no special knowledge required", position: "top-0 right-0 md:-right-4" },
  { icon: Settings, label: "Offers a number of treatment session options", position: "top-1/3 -right-4 md:-right-8" },
  { icon: ShieldCheck, label: "Combines the 4 most popular physiotherapy treatments", position: "bottom-1/4 -right-4 md:-right-8" },
  { icon: DollarSign, label: "Affordable price", position: "bottom-0 left-0 md:-left-4" },
];

const Hero = () => {
  return (
    <section className="gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
          {/* Left – 40% */}
          <motion.div
            className="lg:w-[40%] flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Sakura – home physiotherapy device for relief of{" "}
              <span className="text-primary">low back pain</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              15 minutes daily treatment sessions – easy to integrate in daily routine
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-accent">$188</span>
              <span className="text-lg text-muted-foreground line-through">$250.99</span>
            </div>

            <a
              href="#cta"
              className="inline-flex items-center justify-center gradient-cta text-accent-foreground font-semibold text-lg px-8 py-4 rounded-full shadow-cta hover:scale-105 transition-transform w-fit"
            >
              Buy Now
            </a>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck size={18} className="text-primary" />
              30 Day Money Back Guarantee
            </div>
          </motion.div>

          {/* Right – 60% */}
          <motion.div
            className="lg:w-[60%] relative flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={sakuraDevice}
              alt="Sakura home physiotherapy device with remote control"
              className="w-full max-w-md lg:max-w-lg animate-float drop-shadow-2xl"
            />

            {/* Floating labels */}
            {floatingFeatures.map((feat, i) => (
              <motion.div
                key={i}
                className={`absolute ${feat.position} hidden md:flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-soft text-xs font-medium text-foreground max-w-[200px]`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              >
                <feat.icon size={14} className="text-primary shrink-0" />
                {feat.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
