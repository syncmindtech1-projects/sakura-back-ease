import type { User } from "@supabase/supabase-js";
import { BadgeCheck, Globe2, LogOut } from "lucide-react";

interface PremiumBannerProps {
  user: User | null;
  displayName: string;
  newJobsCount: number;
  onLogout: () => void;
}

// Premium, luxurious dark-green announcement banner (72px).
// Banner is non-sticky: scrolls away on scroll-down, reappears on scroll-up
// while the main navbar (in Header.tsx) remains sticky at top:0.
const PremiumBanner = ({ user, displayName, newJobsCount, onLogout }: PremiumBannerProps) => {
  return (
    <div
      className="relative w-full text-white overflow-hidden"
      style={{
        minHeight: 96,
        paddingTop: 14,
        paddingBottom: 14,
        background:
          "linear-gradient(90deg, #062C1D 0%, #0A3B29 50%, #062C1D 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      }}
    >

      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 500px 120px at 50% 50%, rgba(127,227,138,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Subtle noise texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />

      <div
        className="relative flex items-center gap-3 md:gap-6 mx-auto min-h-[68px] w-full"
        style={{
          maxWidth: 1440,
          paddingLeft: "clamp(12px, 3vw, 32px)",
          paddingRight: "clamp(12px, 3vw, 32px)",
        }}
      >
        {/* LEFT: FREE pill */}
        <div className="hidden md:flex items-center">
          <span
            className="inline-flex items-center gap-2.5 rounded-full"
            style={{
              background: "rgba(76,175,80,0.14)",
              border: "1px solid rgba(127,255,150,0.18)",
              padding: "12px 20px",
            }}
          >
            <span
              className="inline-block"
              style={{
                width: 8, height: 8,
                background: "#8CE99A",
                transform: "rotate(45deg)",
                borderRadius: 1,
              }}
            />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>100% FREE</span>
          </span>
        </div>

        <Divider className="hidden lg:block" />

        {/* SECOND: heading/subtitle */}
        <div className="hidden lg:block leading-none">
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            Find real jobs. Build your future.
          </div>
          <div style={{ marginTop: 4, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
            <span style={{ color: "#79E38D" }}>{newJobsCount} new</span> verified jobs posted today
          </div>
        </div>

        <Divider className="hidden xl:block" />

        {/* CENTER: motto */}
        <div
          className="flex-1 hidden xl:flex justify-center px-4"
        >
          <p
            className="text-center m-0"
            style={{
              maxWidth: 620,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            Real jobs. <span style={{ color: "#7FE38A" }}>Real futures.</span>
          </p>
        </div>

        {/* Mobile shrunken center */}
        <div className="flex-1 min-w-0 xl:hidden text-left sm:text-center">
          <p
            className="m-0 truncate"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}
          >
            Find real jobs. <span style={{ color: "#7FE38A" }}>{newJobsCount} new today.</span>
          </p>
        </div>

        <Divider className="hidden 2xl:block" />

        {/* RIGHT features */}
        <div className="hidden 2xl:flex items-center" style={{ gap: 28 }}>
          <Feature icon={<BadgeCheck size={18} />} heading="Verified Employers" subtitle="Trusted companies only" />
          <Feature icon={<Globe2 size={18} />} heading="Jobs Across Africa" subtitle="All roles. All levels." />
        </div>

        <Divider className="hidden md:block" />

        {/* RIGHT user area */}
        <div className="flex items-center shrink-0 gap-2 md:gap-4">
          {user ? (
            <>
              <span
                className="max-w-[90px] sm:max-w-[160px] truncate text-[13px] md:text-base"
                style={{ fontWeight: 600, color: "#fff" }}
              >
                Hi, {displayName}
              </span>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 group shrink-0 h-9 md:h-[42px] px-3 md:px-[22px] text-[13px] md:text-[15px]"
                style={{
                  padding: undefined,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                }}
              >
                <LogOut size={16} strokeWidth={1.75} /> Logout
              </button>
            </>
          ) : (
            <>
              <a href="/auth" className="text-[13px] md:text-[15px] shrink-0" style={{ fontWeight: 600, color: "#fff" }}>
                Login
              </a>
               <a
                href="/auth?mode=register"
                className="inline-flex items-center shrink-0 whitespace-nowrap h-9 md:h-[42px] px-3 md:px-[22px] text-[13px] md:text-[15px]"
                style={{
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  transition: "all 0.25s ease",
                }}
              >
                Get started
              </a> 
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Divider = ({ className = "" }: { className?: string }) => (
  <span
    className={className}
    aria-hidden
    style={{
      width: 1,
      height: 42,
      background: "rgba(255,255,255,0.12)",
      display: "inline-block",
    }}
  />
);

const Feature = ({ icon, heading, subtitle }: { icon: React.ReactNode; heading: string; subtitle: string }) => (
  <div className="flex items-center gap-3">
    <span
      className="inline-flex items-center justify-center rounded-full"
      style={{
        width: 40, height: 40,
        border: "1px solid rgba(127,255,150,0.35)",
        background: "rgba(127,255,150,0.06)",
        color: "#8CE99A",
      }}
    >
      {icon}
    </span>
    <div className="leading-tight">
      <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{heading}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{subtitle}</div>
    </div>
  </div>
);

export default PremiumBanner;
