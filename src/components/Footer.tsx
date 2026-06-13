import { Link } from "react-router-dom";

const footerLinks = {
  "For Job Seekers": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Remote Jobs", href: "/remote-jobs" },
    { label: "Salary Guide", href: "/salary-guide" },
    { label: "Career Advice", href: "/career-advice" },
    { label: "Resume Builder", href: "/resume-builder" },
    { label: "Job Alerts", href: "/job-alerts" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/post-job" },
    { label: "Browse Candidates", href: "/candidates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Employer Dashboard", href: "/employer" },
  ],
  Categories: [
    { label: "Technology", href: "/categories/technology" },
    { label: "Healthcare", href: "/categories/healthcare" },
    { label: "Construction", href: "/categories/construction" },
    { label: "Finance", href: "/categories/finance" },
    { label: "Manufacturing", href: "/categories/manufacturing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-display">
                J
              </div>
              <span className="text-xl font-bold font-display text-background">
                JobSphere
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              Uganda's #1 free job platform curating opportunities across East Africa — Uganda, Kenya, Tanzania, Rwanda, South Sudan, Ethiopia & Ghana. 100% free to browse.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-background mb-4 font-display">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/50 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} JobSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-background/40 hover:text-background/70 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-background/40 hover:text-background/70 transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-background/40 hover:text-background/70 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
