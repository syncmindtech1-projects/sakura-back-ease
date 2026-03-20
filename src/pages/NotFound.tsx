import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageLayout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div className="text-center max-w-lg mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-8xl block mb-6">🔍</span>
            <h1 className="text-6xl font-bold font-display text-foreground mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">This page doesn't exist — but thousands of jobs do.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2 justify-center">
                <Home size={16} /> Go Home
              </Link>
              <Link to="/jobs" className="border border-border text-foreground font-semibold px-6 py-3 rounded-xl hover:bg-secondary transition-colors inline-flex items-center gap-2 justify-center">
                <Search size={16} /> Browse Jobs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
