import { Building } from "lucide-react";

interface CollegeLogo {
  name: string;
  type: string;
  location: string;
}

const colleges: CollegeLogo[] = [
  { name: "JNTU Hyderabad", type: "Technical University", location: "Kukatpally" },
  { name: "Osmania University", type: "State University", location: "Tarnaka" },
  { name: "CBIT Hyderabad", type: "Engineering Institute", location: "Gandipet" },
  { name: "VNR Vignana Jyothi", type: "Technical Campus", location: "Bachupally" },
  { name: "GRIET Engineering", type: "Autonomous College", location: "Miyapur" },
  { name: "Vardhaman College", type: "Technology Institute", location: "Shamshabad" },
  { name: "GITAM Deemed Univ", type: "Private University", location: "Visakhapatnam" },
  { name: "KMIT Hyderabad", type: "Engineering College", location: "Narayanguda" }
];

export default function PartnerMarquee() {
  // Duplicate list to make infinite loop continuous
  const marqueeItems = [...colleges, ...colleges];

  return (
    <section className="py-6 bg-white overflow-hidden border-b border-slate-100">

      {/* Outer marquee viewport */}
      <div className="relative w-full flex items-center overflow-hidden py-4">
        {/* Left/Right fading gradients to blend the marquee ends */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Inner Track */}
        <div className="animate-marquee gap-6">
          {marqueeItems.map((college, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:border-blue-500/30 dark:hover:border-blue-500/20 group hover:shadow-md transition-all duration-300 min-w-[240px] md:min-w-[280px]"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-all duration-300">
                <Building className="h-5 w-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {college.name}
                </h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {college.type} • {college.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
