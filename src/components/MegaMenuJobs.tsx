import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import megaBrowse from "@/assets/mega-browse.jpg";
import megaRemote from "@/assets/mega-remote.jpg";
import megaParttime from "@/assets/mega-parttime.jpg";
import megaFulltime from "@/assets/mega-fulltime.jpg";
import megaIntern from "@/assets/mega-intern.jpg";
import megaContract from "@/assets/mega-contract.jpg";

interface MegaCard {
  title: string;
  keyword: string;
  keywordColor: string;
  desc: string;
  href: string;
  image: string;
}

const megaCards: MegaCard[] = [
  { title: "Browse All Jobs", keyword: "All", keywordColor: "#6366f1", desc: "Explore thousands of openings", href: "/jobs", image: megaBrowse },
  { title: "Remote Jobs", keyword: "Remote", keywordColor: "#3B82F6", desc: "Work from anywhere", href: "/remote-jobs", image: megaRemote },
  { title: "Part-time Jobs", keyword: "Part-time", keywordColor: "#F59E0B", desc: "Flexible hours", href: "/jobs?type=part-time", image: megaParttime },
  { title: "Full-time Jobs", keyword: "Full-time", keywordColor: "#10B981", desc: "Stable careers", href: "/jobs?type=full-time", image: megaFulltime },
  { title: "Internships", keyword: "Internships", keywordColor: "#8B5CF6", desc: "Start your career", href: "/jobs?type=internship", image: megaIntern },
  { title: "Contract Jobs", keyword: "Contract", keywordColor: "#EC4899", desc: "Project-based roles", href: "/jobs?type=contract", image: megaContract },
];

interface Props {
  onClose: () => void;
}

const MegaMenuJobs = ({ onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 w-[700px]"
    >
      <div className="bg-card rounded-2xl shadow-elevated border border-border p-4">
        <div className="grid grid-cols-3 gap-3">
          {megaCards.map((card) => (
            <Link
              key={card.href}
              to={card.href}
              onClick={onClose}
              className="group block rounded-2xl border border-border overflow-hidden hover:shadow-elevated transition-all duration-250 hover:-translate-y-1"
            >
              <div className="relative h-28 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-3">
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {card.title.split(card.keyword).map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <span style={{ color: card.keywordColor }}>{card.keyword}</span>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenuJobs;
