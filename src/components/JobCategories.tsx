import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getJobCategoriesWithCounts } from "@/lib/jobData";
import catTech from "@/assets/cat-technology.jpg";
import catHealth from "@/assets/cat-healthcare.jpg";
import catFinance from "@/assets/cat-finance.jpg";
import catConstruction from "@/assets/cat-construction.jpg";
import catEducation from "@/assets/cat-education.jpg";
import catMarketing from "@/assets/cat-marketing.jpg";
import catManufacturing from "@/assets/cat-manufacturing.jpg";
import catHospitality from "@/assets/cat-hospitality.jpg";
import catTransportation from "@/assets/cat-transportation.jpg";
import catRetail from "@/assets/cat-retail.jpg";
import catEngineering from "@/assets/cat-engineering.jpg";
import catLegal from "@/assets/cat-legal.jpg";

const categoryImages: Record<string, string> = {
  Technology: catTech,
  Healthcare: catHealth,
  Finance: catFinance,
  Construction: catConstruction,
  Education: catEducation,
  Marketing: catMarketing,
  Manufacturing: catManufacturing,
  Hospitality: catHospitality,
  Transportation: catTransportation,
  Retail: catRetail,
  Engineering: catEngineering,
  Legal: catLegal,
};

const jobCategories = getJobCategoriesWithCounts();

const JobCategories = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <header className="mb-10 pb-6 border-b border-border flex items-end justify-between">
          <div>
            <span className="eyebrow">The Index</span>
            <h2 className="serif text-3xl md:text-5xl mt-3 text-foreground">Browse by industry</h2>
          </div>
          <p className="hidden md:block text-sm text-muted-foreground max-w-xs">
            Roles are grouped by discipline, then ranked by recency and hiring velocity.
          </p>
        </header>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
          {jobCategories.map((cat, i) => (
            <li key={cat.name}>
              <Link
                to={`/categories/${cat.name.toLowerCase()}`}
                className="group flex flex-col h-full border-r border-b border-border bg-card hover:bg-secondary/40 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                  <img
                    src={categoryImages[cat.name] || catTech}
                    alt=""
                    loading="lazy"
                    width={480}
                    height={300}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <span className="absolute top-3 left-3 eyebrow bg-background/85 px-2 py-1 backdrop-blur-sm">
                    №{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="serif text-xl text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                    <span className="text-xs text-muted-foreground num shrink-0">{cat.count.toLocaleString()} roles</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{(cat as any).description}</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground truncate">
                      {((cat as any).roles || []).slice(0, 2).join(' · ')}
                    </span>
                    <ArrowUpRight size={14} className="text-muted-foreground group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default JobCategories;
