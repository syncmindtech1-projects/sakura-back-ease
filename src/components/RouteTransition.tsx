import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/** On every page change: scroll to top and show a brief loading bar + fade, like a real page reload. */
const RouteTransition = () => {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (first.current) { first.current = false; return; }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-fade-in" />
      <div className="absolute top-0 left-0 h-1 bg-primary" style={{ animation: "route-bar 550ms ease-out forwards" }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
      <style>{`@keyframes route-bar{from{width:0}to{width:100%}}`}</style>
    </div>
  );
};
export default RouteTransition;
