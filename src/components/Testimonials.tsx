import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMarcus from "@/assets/avatar-marcus.jpg";
import avatarEmily from "@/assets/avatar-emily.jpg";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Software Engineer",
    text: "I found my dream remote job within a week. The search filters are incredible — I could narrow down by tech stack, salary, and company culture.",
    rating: 5,
    avatar: avatarSarah,
  },
  {
    name: "Marcus Johnson",
    role: "Licensed Electrician",
    text: "As a skilled tradesperson, most job sites ignore us. JobSphere actually has listings for skilled trades. Got hired in 3 days!",
    rating: 5,
    avatar: avatarMarcus,
  },
  {
    name: "Emily Chen",
    role: "Product Manager",
    text: "The salary guide helped me negotiate a 30% raise. The career advice section is pure gold for anyone looking to level up.",
    rating: 5,
    avatar: avatarEmily,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.span
            className="text-sm font-semibold text-accent uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Success Stories
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold font-display text-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-elevated transition-shadow relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Quote size={24} className="text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-highlight text-highlight" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={t.avatar} alt={t.name} loading="lazy" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
