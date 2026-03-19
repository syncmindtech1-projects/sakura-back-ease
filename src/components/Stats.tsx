import { motion } from "framer-motion";
import { stats } from "@/lib/jobData";

const Stats = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="gradient-primary rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <div className="text-3xl md:text-4xl font-bold font-display text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
