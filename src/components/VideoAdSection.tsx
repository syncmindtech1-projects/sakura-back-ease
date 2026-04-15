import { motion } from "framer-motion";
import { ExternalLink, X, Play } from "lucide-react";
import { useState } from "react";

interface VideoAd {
  id: string;
  title: string;
  sponsor: string;
  cta: string;
  link: string;
  videoUrl: string;
  thumbnail: string;
  gradient: string;
}

const videoAds: VideoAd[] = [
  {
    id: "v1",
    title: "Transform Your Career with AI Skills",
    sponsor: "Coursera",
    cta: "Start Learning",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=360&fit=crop",
    gradient: "from-[#667eea] to-[#764ba2]",
  },
  {
    id: "v2",
    title: "Build Your Remote Career Today",
    sponsor: "RemoteAfrica",
    cta: "Explore Jobs",
    link: "#",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640&h=360&fit=crop",
    gradient: "from-[#a855f7] to-[#6366f1]",
  },
];

interface VideoAdSectionProps {
  adIndex?: number;
}

const VideoAdSection = ({ adIndex = 0 }: VideoAdSectionProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [playing, setPlaying] = useState(false);
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
            {/* Video / Thumbnail */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden">
              {playing ? (
                <iframe
                  src={ad.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={ad.title}
                />
              ) : (
                <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
                  <img
                    src={ad.thumbnail}
                    alt={ad.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play size={24} className="text-foreground ml-1" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/20 w-fit">
                Video Ad · {ad.sponsor}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-display text-white mt-4 leading-tight">
                {ad.title}
              </h3>
              <p className="text-white/70 text-sm mt-3">
                Watch this short video to discover new opportunities and level up your career.
              </p>
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-white text-foreground font-bold text-sm px-8 py-3 rounded-xl hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg w-fit"
              >
                {ad.cta} <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoAdSection;
