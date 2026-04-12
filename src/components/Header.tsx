import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Search, Bell, User, Heart, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSavedJobs } from "@/contexts/SavedJobsContext";
import MegaMenuJobs from "@/components/MegaMenuJobs";
import { getJobStats } from "@/lib/jobData";

interface MegaMenuItem { label: string; href: string; desc: string; icon: string; }
interface NavItem { label: string; href: string; mega?: MegaMenuItem[]; megaType?: string; }

const { totalJobs } = getJobStats();

const navItems: NavItem[] = [
  {
    label: "Find Jobs",
    href: "/jobs",
    megaType: "jobs",
  },
  {
    label: "Categories",
    href: "/categories",
    mega: [
      { label: "Technology", href: "/categories/technology", desc: "Software, IT & digital", icon: "💻" },
      { label: "Healthcare", href: "/categories/healthcare", desc: "Medical & nursing", icon: "🏥" },
      { label: "Construction", href: "/categories/construction", desc: "Building & trades", icon: "🏗️" },
      { label: "Finance", href: "/categories/finance", desc: "Banking & accounting", icon: "💰" },
      { label: "Manufacturing", href: "/categories/manufacturing", desc: "Production & assembly", icon: "🏭" },
      { label: "View All Categories", href: "/categories", desc: "12+ industries", icon: "📂" },
    ],
  },
  {
    label: "Companies",
    href: "/companies",
    mega: [
      { label: "Top Companies", href: "/companies", desc: "Leading employers", icon: "🏢" },
      { label: "Startups", href: "/companies?type=startup", desc: "Fast-growing companies", icon: "🚀" },
      { label: "Enterprise", href: "/companies?type=enterprise", desc: "Fortune 500 & more", icon: "🌐" },
      { label: "Company Reviews", href: "/reviews", desc: "Real employee insights", icon: "⭐" },
    ],
  },
  {
    label: "Resources",
    href: "/career-advice",
    mega: [
      { label: "Career Advice", href: "/career-advice", desc: "Tips from industry experts", icon: "📖" },
      { label: "Resume Builder", href: "/resume-builder", desc: "Create a standout resume", icon: "📝" },
      { label: "Salary Guide", href: "/salary-guide", desc: "Know your worth", icon: "💵" },
      { label: "Interview Prep", href: "/interview-prep", desc: "Ace your next interview", icon: "🎯" },
    ],
  },
  { label: "Job Alerts", href: "/job-alerts" },
  { label: "About Us", href: "/about" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();
  const { savedCount } = useSavedJobs();

  const newJobsCount = Math.min(totalJobs, 24);

  const handleMegaEnter = (label: string) => { clearTimeout(megaTimeout.current); setActiveMega(label); };
  const handleMegaLeave = () => { megaTimeout.current = setTimeout(() => setActiveMega(null), 200); };

  const handleHeaderSearch = () => {
    if (headerSearch.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(headerSearch.trim())}`);
      setSearchOpen(false);
      setHeaderSearch("");
    }
  };

  useEffect(() => () => clearTimeout(megaTimeout.current), []);

  return (
    <>
      <div className="gradient-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-8 py-2 text-xs">
          <span className="hidden sm:inline font-medium">
            🌍 <strong>100% FREE</strong> job browsing — {newJobsCount} new jobs posted today across Uganda, Africa, UAE, Europe & Americas!
          </span>
          <span className="sm:hidden text-xs font-medium">🌍 {newJobsCount} new jobs posted today!</span>
          <div className="flex items-center gap-3 md:gap-5">
            <Link to="/jobs" className="hover:underline font-semibold hidden md:inline">Register</Link>
            <span className="hidden md:inline text-primary-foreground/40">or</span>
            <Link to="/jobs" className="hover:underline font-semibold hidden md:inline">Login</Link>
            <div className="flex items-center gap-1 text-primary-foreground/70"><Globe size={12} /><span>English</span></div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg font-display">J</div>
            <span className="text-xl font-bold font-display text-foreground">Job<span className="text-gradient">Sphere</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => (item.mega || item.megaType) && handleMegaEnter(item.label)} onMouseLeave={handleMegaLeave}>
                <Link to={item.href} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
                  {item.label}
                  {(item.mega || item.megaType) && <ChevronDown size={14} className={`transition-transform ${activeMega === item.label ? 'rotate-180' : ''}`} />}
                </Link>
                <AnimatePresence>
                  {item.megaType === "jobs" && activeMega === item.label && (
                    <div onMouseEnter={() => handleMegaEnter(item.label)} onMouseLeave={handleMegaLeave}>
                      <MegaMenuJobs onClose={() => setActiveMega(null)} />
                    </div>
                  )}
                  {item.mega && activeMega === item.label && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50" onMouseEnter={() => handleMegaEnter(item.label)} onMouseLeave={handleMegaLeave}>
                      <div className="bg-card rounded-2xl shadow-elevated border border-border p-4 min-w-[420px] grid grid-cols-2 gap-1">
                        {item.mega.map((sub) => (
                          <Link key={sub.label} to={sub.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary transition-colors group" onClick={() => setActiveMega(null)}>
                            <span className="text-2xl mt-0.5">{sub.icon}</span>
                            <div>
                              <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{sub.label}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{sub.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-1">
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><Search size={20} /></button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, width: 0 }} animate={{ opacity: 1, y: 0, width: 300 }} exit={{ opacity: 0, y: 8, width: 0 }} className="absolute right-0 top-full mt-2 z-50">
                    <div className="bg-card rounded-xl shadow-elevated border border-border p-2 flex gap-2">
                      <input type="text" placeholder="Search jobs..." value={headerSearch} onChange={(e) => setHeaderSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleHeaderSearch()} autoFocus className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                      <button onClick={handleHeaderSearch} className="gradient-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium">Go</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/saved-jobs" className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative" title="Saved Jobs">
              <Heart size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full gradient-primary text-primary-foreground text-[10px] font-bold px-1">{savedCount}</span>
              )}
            </Link>

            <Link to="/saved-jobs" className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full gradient-warm text-highlight-foreground text-[10px] font-bold px-1">{savedCount}</span>
              )}
            </Link>

            <Link to="/post-job" className="gradient-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity ml-1">Post a Job</Link>
            <button className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><User size={20} /></button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <Link to="/saved-jobs" className="p-2 rounded-xl hover:bg-secondary text-muted-foreground relative">
              <Bell size={20} />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center rounded-full gradient-warm text-highlight-foreground text-[9px] font-bold px-0.5">{savedCount}</span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-foreground" aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-card border-t border-border">
              <div className="px-4 pt-4">
                <div className="flex gap-2">
                  <input type="text" placeholder="Search jobs..." value={headerSearch} onChange={(e) => setHeaderSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleHeaderSearch(); setMenuOpen(false); } }} className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                  <button onClick={() => { handleHeaderSearch(); setMenuOpen(false); }} className="gradient-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium"><Search size={16} /></button>
                </div>
              </div>
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link to={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-xl hover:bg-secondary">
                      {item.label}
                      {(item.mega || item.megaType) && <ChevronDown size={14} />}
                    </Link>
                  </div>
                ))}
                <div className="border-t border-border mt-2 pt-3 space-y-2">
                  <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                    <Heart size={16} /> Saved Jobs
                    {savedCount > 0 && (
                      <span className="min-w-[18px] h-[18px] flex items-center justify-center rounded-full gradient-primary text-primary-foreground text-[10px] font-bold px-1">{savedCount}</span>
                    )}
                  </Link>
                  <Link to="/post-job" onClick={() => setMenuOpen(false)} className="block text-center gradient-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl">Post a Job</Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
