import { motion } from "framer-motion";
import { Flame, Vibrate, Magnet, ArrowDownUp } from "lucide-react";

const features = [
  {
    icon: ArrowDownUp,
    title: "Dynamic Traction",
    description: "Relieves muscle fatigue and restores natural spinal alignment",
  },
  {
    icon: Flame,
    title: "Heating Therapy",
    description: "Relaxes muscle spasms with gentle therapeutic warmth",
  },
  {
    icon: Vibrate,
    title: "Vibration Massage",
    description: "Relaxes lumbar muscles and improves circulation",
  },
  {
    icon: Magnet,
    title: "Magnetic Therapy",
    description: "Accelerates muscle healing through magnetic field therapy",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          4 Treatments in One Device
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              className="flex flex-col items-center text-center bg-secondary rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feat.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
