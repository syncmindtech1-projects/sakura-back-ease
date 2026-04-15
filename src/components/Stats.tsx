import { motion } from "framer-motion";
import { stats } from "@/lib/jobData";

const statImages: Record<string, string> = {
  "📋": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=80&h=80&fit=crop",
  "🏢": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop",
  "🌍": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&h=80&fit=crop",
  "✅": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=80&h=80&fit=crop",
};

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
                <img
                  src={statImages[stat.icon] || ""}
                  alt={stat.label}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-xl object-cover mx-auto mb-2 ring-2 ring-primary-foreground/30"
                />
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
