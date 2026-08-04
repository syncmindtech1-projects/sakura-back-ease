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

const CompanyLogo = ({ name, size = "md", className = "" }: CompanyLogoProps) => (
  <div
    aria-hidden="true"
    className={`${sizes[size]} shrink-0 flex items-center justify-center bg-secondary border border-border font-bold font-display tracking-tight text-foreground/70 ${className}`}
  >
    {initials(name)}
  </div>
);

export default CompanyLogo;
