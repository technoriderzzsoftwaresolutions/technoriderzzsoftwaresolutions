import { Link } from "react-router-dom";
import { 
  Code, GraduationCap, Briefcase, Calendar, 
  BookOpen, Target, Building2, FileText, ArrowRight 
} from "lucide-react";

interface HubCard {
  title: string;
  subtitle: string;
  description: string;
  stat: string;
  tags: string[];
  link: string;
  icon: any;
  color: string;
}

const hubs: HubCard[] = [
  {
    title: "ProjectHub",
    subtitle: "Academic Projects",
    description: "Discover IEEE, mini, and major projects with complete source code, documentation, and expert setup guidance.",
    stat: "15,000+ Projects",
    tags: ["AI", "ML", "Python", "Web", "IoT", "Blockchain"],
    link: "/projects/python",
    icon: Code,
    color: "from-rose-500/20 to-fuchsia-500/5 text-rose-600 dark:text-rose-400"
  },
  {
    title: "InternHub",
    subtitle: "Industry Experience",
    description: "Get real hands-on experience with remote, hybrid, and offline internship programs aligned with industry standards.",
    stat: "120+ Live Openings",
    tags: ["MERN Stack", "Flutter", "Java", "Python", "Cloud"],
    link: "/internships",
    icon: Briefcase,
    color: "from-amber-500/20 to-orange-500/5 text-amber-600 dark:text-amber-400"
  },
  {
    title: "SkillHub",
    subtitle: "Courses & Training",
    description: "Master trending engineering and coding skills through intensive bootcamps, structured courses, and professional certs.",
    stat: "50+ Courses",
    tags: ["Full Stack", "Data Science", "Python", "SQL", "DevOps"],
    link: "/courses",
    icon: GraduationCap,
    color: "from-emerald-500/20 to-teal-500/5 text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "WorkshopHub",
    subtitle: "Hands-on Seminars",
    description: "Attend college workshops, coding hackathons, faculty development programs (FDPs), and technical seminars.",
    stat: "800+ Conducted",
    tags: ["Bootcamps", "UML Design", "IoT Kit", "AI Tools"],
    link: "/contact?subject=Workshop",
    icon: Calendar,
    color: "from-rose-500/20 to-pink-500/5 text-rose-600 dark:text-rose-400"
  },
  {
    title: "ResearchHub",
    subtitle: "IEEE Publications",
    description: "Get end-to-end guidance for publishing papers in IEEE, Scopus-indexed, and SCI journals, and patent registration.",
    stat: "500+ Papers Published",
    tags: ["IEEE Guidance", "Scopus Journals", "Patents", "Abstracts"],
    link: "/about",
    icon: BookOpen,
    color: "from-purple-500/20 to-violet-500/5 text-purple-600 dark:text-purple-400"
  },
  {
    title: "CareerHub",
    subtitle: "Placement Prep",
    description: "Prepare for interviews, refine your resume with ATS checks, solve coding challenges, and review company questions.",
    stat: "95% Placement Rate",
    tags: ["Resume Builder", "Mock Interviews", "Coding Practice"],
    link: "/contact?subject=Placement",
    icon: Target,
    color: "from-pink-500/20 to-purple-500/5 text-pink-600 dark:text-pink-400"
  },
  {
    title: "CollegeHub",
    subtitle: "Academic Tie-ups",
    description: "centralized digital platform where partner colleges manage workshops, access internship slots, and coordinate campus drives.",
    stat: "200+ Tie-ups",
    tags: ["MOU Partners", "Faculty Portals", "Campus Seminars"],
    link: "/about",
    icon: Building2,
    color: "from-slate-500/20 to-zinc-500/5 text-slate-700 dark:text-slate-300"
  },
  {
    title: "TechBlog",
    subtitle: "Knowledge Sharing",
    description: "Stay ahead with developer-authored blogs, step-by-step programming tutorials, interview tips, and tech news.",
    stat: "200+ Articles",
    tags: ["Coding Tips", "Roadmaps", "Interview Prep", "AI News"],
    link: "/blogs",
    icon: FileText,
    color: "from-teal-500/20 to-cyan-500/5 text-teal-600 dark:text-teal-400"
  }
];

export default function EcosystemSection() {
  return (
    <section className="py-8 md:py-12 bg-white text-slate-900 border-b border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full">
            Ecosystem Navigation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 tracking-tight">
            Explore the Techno Riderzz Ecosystem
          </h2>
          <div className="h-1 bg-rose-600 w-16 mx-auto mt-4 rounded-full" />
          <p className="text-base md:text-lg text-slate-500 mt-4 leading-relaxed">
            Everything you need to build skills, complete hands-on projects, publish research papers, and launch a successful tech career.
          </p>
        </div>

        {/* Horizontal Infinite Marquee Ticker */}
        <div className="relative w-full overflow-hidden">
          {/* Left/Right fading gradients to blend marquee edges smoothly */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-scroll-slow flex gap-6 py-4">
            {[...hubs, ...hubs].map((hub, idx) => {
              const Icon = hub.icon;
              // Extract base color name from text-color definition
              const iconColorClass = hub.color.includes("text-rose-600") ? "text-rose-500" :
                                     hub.color.includes("text-amber-600") ? "text-amber-500" :
                                     hub.color.includes("text-emerald-600") ? "text-emerald-500" :
                                     hub.color.includes("text-purple-600") ? "text-purple-500" :
                                     hub.color.includes("text-pink-600") ? "text-pink-500" :
                                     hub.color.includes("text-slate-700") ? "text-slate-450" :
                                     hub.color.includes("text-teal-600") ? "text-teal-500" : "text-slate-400";
              return (
                <Link 
                  key={`${hub.title}-${idx}`}
                  to={hub.link}
                  className="group relative flex flex-col justify-between bg-slate-100 border border-slate-300 p-6 rounded-2xl w-[320px] shrink-0 min-h-[340px] text-left hover:border-rose-300 hover:shadow-lg transition-all duration-300 shadow-sm overflow-hidden"
                >
                  {/* Subtle top-right accent glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-500/5 to-transparent rounded-tr-2xl" />

                  {/* DEFAULT VIEW */}
                  <div>
                    {/* Clean Icon */}
                    <div className={`${iconColorClass} mb-5 group-hover:scale-110 transition-transform duration-300 flex items-center justify-start`}>
                      <Icon className="h-7 w-7" />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="mb-3">
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-0.5 select-none">
                        {hub.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {hub.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {hub.description}
                    </p>
                  </div>

                  <div>
                    {/* Live Stats Pill */}
                    <div className="flex items-center justify-between mb-4 border-t border-slate-100 pt-4">
                      <span className="text-xs font-semibold text-slate-400 select-none">Live Status</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full select-none">
                        {hub.stat}
                      </span>
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hub.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 select-none">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Explore Button */}
                    <div className="flex items-center gap-1.5 text-sm font-bold text-rose-600 group-hover:text-rose-700 transition-colors">
                      Explore Hub 
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>

                  {/* HOVER VIEW (INLINE OVERLAY): Perfect, fluid transition that moves with the slider and does not break on coordinate calculation */}
                  <div className="absolute inset-0 bg-slate-100 p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between z-20 border-2 border-rose-500 shadow-xl">
                    <div>
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <div className={iconColorClass}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{hub.title}</h4>
                          <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block">{hub.subtitle}</span>
                        </div>
                      </div>
                      
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-4">
                        {hub.description}
                      </p>

                      <div className="space-y-2.5 border-t border-slate-100 pt-3 mt-4">
                        <div className="flex items-center justify-between text-[10px] text-slate-650">
                          <span><strong>Ecosystem Stats:</strong></span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{hub.stat}</span>
                        </div>
                        <div className="space-y-1.5 text-[10px] text-slate-600 text-left">
                          <strong>Active Verticals:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hub.tags.map(tag => (
                              <span key={tag} className="bg-slate-50 border border-slate-200 text-slate-500 px-2 py-0.5 rounded text-[8px] font-bold">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-extrabold text-rose-600 border-t border-slate-100 pt-4 mt-2">
                      Explore Hub 
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>

                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
