import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import reviewNakato from "@/assets/review-ug-1.jpg";
import reviewOtieno from "@/assets/review-ke-1.jpg";
import reviewMugisha from "@/assets/review-ug-2.jpg";

const testimonials = [
  {
    name: "Sarah Nakato",
    role: "Accounts Assistant, Kampala",
    text: "I applied for three jobs on JobSphere in one evening and got a call from a Kampala firm two days later. Every listing linked straight to the real application page.",
    rating: 5,
    avatar: reviewNakato,
    alt: "Sarah Nakato, an accounts assistant in Kampala who found a job on JobSphere",
  },
  {
    name: "Brian Otieno",
    role: "Software Developer, Nairobi",
    text: "Most Kenyan job boards charge or repost old adverts. JobSphere is free and the listings are fresh — I landed a developer role in Nairobi within two weeks.",
    rating: 5,
    avatar: reviewOtieno,
    alt: "Brian Otieno, a software developer in Nairobi hired through JobSphere",
  },
  {
    name: "Joel Mugisha",
    role: "Logistics Officer, Entebbe",
    text: "The salary information and the interview prep section helped me negotiate properly. I moved from casual work to a full-time logistics job in Entebbe.",
    rating: 5,
    avatar: reviewMugisha,
    alt: "Joel Mugisha, a logistics officer in Entebbe who used JobSphere to find work",
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
                <img src={t.avatar} alt={t.alt} loading="lazy" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
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
