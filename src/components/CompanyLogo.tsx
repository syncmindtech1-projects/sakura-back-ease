import { useEffect, useState } from "react";

interface CompanyLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-9 h-9 text-[11px] rounded-lg",
  md: "w-12 h-12 text-sm rounded-xl",
  lg: "w-16 h-16 text-lg rounded-2xl",
};

const initials = (name: string) =>
  (name || "?")
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "?";

const CompanyLogo = ({ name, size = "md", className = "" }: CompanyLogoProps) => {
  const [logoFailed, setLogoFailed] = useState(false);
  const publishableKey = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY;
  const logoUrl = publishableKey && name
    ? `https://img.logo.dev/name/${encodeURIComponent(name)}?token=${publishableKey}&size=128&format=png&fallback=404`
    : "";

  useEffect(() => setLogoFailed(false), [name]);

  return (
    <div
      className={`${sizes[size]} shrink-0 flex items-center justify-center overflow-hidden bg-card border border-border font-bold font-display tracking-tight text-foreground/70 ${className}`}
    >
      {logoUrl && !logoFailed ? (
        <img
          src={logoUrl}
          alt={`${name} company logo`}
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        <span aria-label={`${name} initials`}>{initials(name)}</span>
      )}
    </div>
  );
};

export default CompanyLogo;
