import { motion } from "framer-motion";
import { ExternalLink, X, Play, Megaphone } from "lucide-react";
import { useState } from "react";
import AdvertiseModal from "./AdvertiseModal";

interface VideoAd {
  id: string;
  title: string;
  sponsor: string;
  cta: string;
  link: string;
  thumbnail: string;
  gradient: string;
}

const videoAds: VideoAd[] = [
  {
    id: "v1",
    title: "Your ad could be playing here",
    sponsor: "Available",
    cta: "Learn more",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=360&fit=crop",
    gradient: "from-[#062C1D] to-[#0A3B29]",
  },
  {
    id: "v2",
    title: "Advertise your product to thousands",
    sponsor: "Available",
    cta: "Start now",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&h=360&fit=crop",
    gradient: "from-[#0A3B29] to-[#062C1D]",
  },
];

interface VideoAdSectionProps {
  adIndex?: number;
}

const VideoAdSection = ({ adIndex = 0 }: VideoAdSectionProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const ad = videoAds[adIndex % videoAds.length];

  if (dismissed) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-elevated"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}`} />

          <button
            onClick={() => setDismissed(true)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors z-20"
            aria-label="Dismiss ad"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Empty video slot — clicking opens form */}
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="relative aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden text-left group"
              aria-label="Advertise your video here"
            >
              <img src={ad.thumbnail} alt="Ad slot" loading="lazy" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 group-hover:bg-black/60 transition-colors">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                </motion.div>
                <span className="text-white text-xs font-semibold uppercase tracking-widest">Click to place your video ad</span>
              </div>
            </button>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 bg-white/10 px-3 py-1 rounded-full border border-white/20 w-fit inline-flex items-center gap-1.5">
                <Megaphone size={11} /> Ad slot · {ad.sponsor}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white mt-4 leading-tight">
                {ad.title}
              </h3>
              <p className="text-white/70 text-sm mt-3">
                Submit your video link and campaign details — our team will get your ad live within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => setFormOpen(true)}
                  className="bg-white text-foreground font-bold text-sm px-6 py-3 rounded-xl hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg"
                >
                  {ad.cta} <ExternalLink size={14} />
                </button>
                <button
                  onClick={() => setFormOpen(true)}
                  className="border border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  Advertise here
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AdvertiseModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        source={`video-ad-${ad.id}`}
        requireVideoUrl
        title="Place your video ad"
        subtitle="Send us your video link and we'll get you live"
      />
    </section>
  );
};

export default VideoAdSection;
