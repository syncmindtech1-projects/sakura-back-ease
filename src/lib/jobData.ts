export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  category: string;
  
  salary: string;
  posted: string;
  logo?: string;
  featured?: boolean;
  remote?: boolean;
  urgent?: boolean;
  description: string;
  tags: string[];
  applyUrl: string;
  requirements?: string[];
  benefits?: string[];
  status?: "active" | "coming_soon";
  contactEmail?: string;
  source?: string;
}

/** Keyword map used to classify scraped listings that arrive without a category. */
const CATEGORY_KEYWORDS: [string, RegExp][] = [
  ["Technology", /\b(software|developer|engineer(ing)? intern|it |ict|data|devops|cloud|cyber|network|programmer|web|frontend|backend|full[- ]?stack|system admin|database|analyst programmer|ai|machine learning|product manager|ui\/ux|technical support)\b/i],
  ["Healthcare", /\b(nurse|nursing|clinical|medical|doctor|health|midwife|pharmac|laborator|lab technician|dental|hiv|nutrition|counsel(l)?or|surgeon|radiograph)\b/i],
  ["Finance", /\b(account(ant|s|ing)?|finance|financial|audit|banker|banking|credit|loan|treasur|tax|bookkeep|cashier|grants|microfinance|investment)\b/i],
  ["Construction", /\b(construction|site (engineer|manager|supervisor)|foreman|mason|quantity surveyor|surveyor|architect|plumb|carpent|welder)\b/i],
  ["Education", /\b(teacher|teaching|lecturer|tutor|school|head ?teacher|academic|training officer|trainer|education|curriculum|librarian)\b/i],
  ["Marketing", /\b(marketing|brand|digital market|content|seo|social media|communicat|public relations|graphic design|copywrit)\b/i],
  ["Manufacturing", /\b(production|factory|plant|quality (control|assurance)|qa officer|machine operator|manufactur|packaging|maintenance technician)\b/i],
  ["Transportation", /\b(driver|logistic|fleet|dispatch|transport|supply chain|warehouse|courier|rider|store ?keeper|procurement)\b/i],
  ["Hospitality", /\b(chef|cook|waiter|waitress|hotel|restaurant|barista|housekeep|front office|receptionist|tour|travel|catering|laundry)\b/i],
  ["Retail", /\b(sales|shop|retail|merchandis|store manager|customer (care|service)|business development|telesales|agent)\b/i],
  ["Engineering", /\b(mechanic|electric|civil engineer|mechanical|technician|engineer|solar|energy|water)\b/i],
  ["Legal", /\b(legal|advocate|lawyer|paralegal|compliance|governance|policy officer)\b/i],
];

/** Best-effort category classification for listings scraped without metadata. */
export const inferCategory = (text: string): string => {
  for (const [name, re] of CATEGORY_KEYWORDS) if (re.test(text)) return name;
  return "General";
};

export const jobCategories = [

  { name: "Technology", icon: "💻", color: "primary", description: "Software, data, cloud and IT roles across East Africa.", roles: ["Software Engineer", "Data Analyst", "DevOps", "Product Manager"] },
  { name: "Healthcare", icon: "🏥", color: "accent", description: "Clinical, public health and medical support positions.", roles: ["Nurse", "Medical Officer", "Lab Technician", "Pharmacist"] },
  { name: "Finance", icon: "💰", color: "highlight", description: "Banking, accounting, audit and fintech opportunities.", roles: ["Accountant", "Banker", "Auditor", "Loan Officer"] },
  { name: "Construction", icon: "🏗️", color: "primary", description: "Site, civil and project roles powering infrastructure.", roles: ["Site Engineer", "Foreman", "Surveyor", "Project Manager"] },
  { name: "Education", icon: "📚", color: "accent", description: "Teaching, training and academic administration jobs.", roles: ["Teacher", "Lecturer", "Tutor", "Education Officer"] },
  { name: "Marketing", icon: "📢", color: "highlight", description: "Brand, digital, content and growth marketing roles.", roles: ["Digital Marketer", "Brand Manager", "Content Writer", "SEO Specialist"] },
  { name: "Manufacturing", icon: "🏭", color: "primary", description: "Production, quality and plant operations careers.", roles: ["Production Supervisor", "QA Officer", "Machine Operator", "Plant Manager"] },
  { name: "Transportation", icon: "🚛", color: "accent", description: "Logistics, fleet, driving and supply-chain positions.", roles: ["Driver", "Logistics Officer", "Dispatcher", "Fleet Manager"] },
  { name: "Hospitality", icon: "🏨", color: "highlight", description: "Hotels, restaurants, tourism and guest services.", roles: ["Chef", "Front Office", "Tour Guide", "Hotel Manager"] },
  { name: "Retail", icon: "🛒", color: "primary", description: "Sales, merchandising and store operations roles.", roles: ["Sales Associate", "Store Manager", "Cashier", "Merchandiser"] },
  { name: "Engineering", icon: "⚙️", color: "accent", description: "Mechanical, electrical and civil engineering openings.", roles: ["Mechanical Engineer", "Electrical Engineer", "Civil Engineer", "Maintenance"] },
  { name: "Legal", icon: "⚖️", color: "highlight", description: "Advocacy, compliance and corporate legal positions.", roles: ["Advocate", "Legal Officer", "Paralegal", "Compliance"] },
];


/**
 * Live jobs are loaded from the database (scraped_jobs + posted_jobs) via
 * useLiveJobs(). The old hard-coded listing array was removed because its
 * apply links pointed at generic careers pages instead of real vacancies.
 */
export const featuredJobs: Job[] = [];

let liveJobsCache: Job[] = [];
export const setLiveJobsCache = (jobs: Job[]) => { liveJobsCache = jobs; };
export const getLiveJobsCache = () => liveJobsCache;

export const getJobStats = (jobs: Job[] = liveJobsCache) => {
  const totalJobs = jobs.length;
  const companies = new Set(jobs.map((j) => j.company)).size;
  const countries = new Set(
    jobs.map((j) => j.location.split(",").pop()?.trim()).filter(Boolean)
  ).size;
  return { totalJobs, companies, countries };
};

export const getJobCategoriesWithCounts = (jobs: Job[] = liveJobsCache) => {
  const counts: Record<string, number> = {};
  jobs.forEach((j) => { counts[j.category] = (counts[j.category] || 0) + 1; });
  return jobCategories.map((cat) => ({ ...cat, count: counts[cat.name] || 0 }));
};

export const topCompanies = [
  { name: "Andela Uganda", industry: "Technology", logo: "\u{1F7E3}" },
  { name: "Mulago Hospital", industry: "Healthcare", logo: "\u{1F7E2}" },
  { name: "Umeme Limited", industry: "Energy", logo: "\u{1F535}" },
  { name: "Safaricom PLC", industry: "Telecoms", logo: "\u{1F7E1}" },
  { name: "Stanbic Bank", industry: "Finance", logo: "\u{1F7E0}" },
  { name: "DHL East Africa", industry: "Logistics", logo: "\u{1F534}" },
].map((company) => ({ ...company, jobs: 0 }));

export const stats = [
  { label: "Free Job Listings", value: "900+", icon: "\u{1F4CB}" },
  { label: "Companies", value: "400+", icon: "\u{1F3E2}" },
  { label: "Countries Covered", value: "8+", icon: "\u{1F30D}" },
  { label: "Successful Placements", value: "1.5M+", icon: "\u2705" },
];
