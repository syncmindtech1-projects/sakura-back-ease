import { Link } from "react-router-dom";

const footerLinks = {
  "For Job Seekers": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Remote Jobs", href: "/remote-jobs" },
    { label: "Career Advice", href: "/career-advice" },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: "Job Alerts", href: "/job-alerts" },
    { label: "Saved Jobs", href: "/saved-jobs" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/post-job" },
    { label: "Create Account", href: "/auth?mode=register" },
    { label: "Contact Sales", href: "/contact" },
  ],
  Categories: [
    { label: "Technology", href: "/categories/technology" },
    { label: "Healthcare", href: "/categories/healthcare" },
    { label: "Construction", href: "/categories/construction" },
    { label: "Finance", href: "/categories/finance" },
    { label: "Manufacturing", href: "/categories/manufacturing" },
  ],
  Company: [
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Reviews", href: "/reviews" },
    { label: "Learning Paths", href: "/learning-paths" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-display">J</div>
              <span className="text-xl font-bold font-display text-background">JobSphere</span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              Uganda's #1 free job platform curating opportunities across East Africa — Uganda, Kenya, Tanzania, Rwanda, South Sudan, Ethiopia & Ghana. 100% free to browse.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-background mb-4 font-display">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-background/50 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-background/40">© {new Date().getFullYear()} JobSphere. All rights reserved.</p>
            <p className="text-sm text-background/40 mt-1">
              Designed and developed by{" "}
              <a
                href="https://syncmindtech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background underline underline-offset-2 transition-colors"
              >
                SyncMind Tech
              </a>
            </p>
          </div>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="text-sm text-background/40 hover:text-background/70 transition-colors">About</Link>
            <Link to="/contact" className="text-sm text-background/40 hover:text-background/70 transition-colors">Contact</Link>
            <Link to="/privacy-policy" className="text-sm text-background/40 hover:text-background/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm text-background/40 hover:text-background/70 transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="text-sm text-background/40 hover:text-background/70 transition-colors">Disclaimer</Link>
          </nav>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
