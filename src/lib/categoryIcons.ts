import {
  Briefcase,
  Building2,
  Gavel,
  GraduationCap,
  HardHat,
  HeartPulse,
  Hotel,
  Landmark,
  Laptop,
  Megaphone,
  ShoppingCart,
  Truck,
  Wrench,
  Factory,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  technology: Laptop,
  healthcare: HeartPulse,
  finance: Landmark,
  construction: HardHat,
  education: GraduationCap,
  marketing: Megaphone,
  manufacturing: Factory,
  transportation: Truck,
  hospitality: Hotel,
  retail: ShoppingCart,
  engineering: Wrench,
  legal: Gavel,
  general: Building2,
};

export const getCategoryIcon = (name?: string): LucideIcon =>
  categoryIcons[(name || "").toLowerCase()] ?? Briefcase;
