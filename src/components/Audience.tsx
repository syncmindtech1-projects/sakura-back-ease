import { motion } from "framer-motion";
import { Car, Monitor, Baby, HardHat, Dumbbell, Scale } from "lucide-react";

const audiences = [
  {
    icon: Car,
    title: "Long-Distance Drivers",
    desc: "Prolonged sitting causes pressure on spinal discs and leads to chronic lower back pain.",
  },
  {
    icon: Monitor,
    title: "Office Workers",
    desc: "Hours of sitting with poor posture creates muscle imbalances and stiffness in the lumbar region.",
  },
  {
    icon: Baby,
    title: "Mothers with Young Babies",
    desc: "Frequent bending, lifting and carrying puts extra strain on the lower back muscles.",
  },
  {
    icon: HardHat,
    title: "Manual Labor Workers",
    desc: "Repetitive heavy lifting and physical strain accelerates wear on spinal structures.",
  },
  {
    icon: Dumbbell,
    title: "Sportsmen & Athletes",
    desc: "Intense training and impact sports can lead to muscle fatigue and lower back injuries.",
  },
  {
    icon: Scale,
    title: "Overweight Individuals",
    desc: "Excess weight increases load on the spine, leading to chronic discomfort and pain.",
  },
];

const Audience = () => {
  return (
    <section id="audience" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Who can benefit from using Sakura
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon size={32} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Audience;
