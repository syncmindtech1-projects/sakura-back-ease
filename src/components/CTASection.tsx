import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = ["Free to use", "No credit card required", "Instant job alerts", "One-click apply"];

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4">
            Ready to Find Your Next Job?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join 3.2 million job seekers who trust JobSphere to find their perfect career match.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((b) => (
              <span key={b} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle size={14} className="text-accent" />
                {b}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/jobs"
              className="gradient-primary text-primary-foreground font-semibold text-base px-8 py-4 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2 justify-center"
            >
              Browse Jobs <ArrowRight size={18} />
            </Link>
            <Link
              to="/post-job"
              className="border border-border text-foreground font-semibold text-base px-8 py-4 rounded-xl hover:bg-secondary transition-colors inline-flex items-center gap-2 justify-center"
            >
              Post a Job
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
