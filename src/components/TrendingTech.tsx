import { Link } from "react-router-dom";
import { 
  Code, Brain, Cloud, Database, Cpu, 
  Smartphone, Share2, Shield, Layers, Radio
} from "lucide-react";

interface Technology {
  name: string;
  category: string; // The URL category slug
  icon: any;
  color: string;
  description: string;
}

const technologies: Technology[] = [
  {
    name: "Python",
    category: "python",
    icon: Code,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    description: "Automation, scripts & data"
  },
  {
    name: "Artificial Intelligence",
    category: "Artificial Intelligence",
    icon: Cpu,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    description: "Neural nets & reasoning"
  },
  {
    name: "Machine Learning",
    category: "Machine Learning",
    icon: Brain,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    description: "Predictive models & math"
  },
  {
    name: "Deep Learning",
    category: "Deep Learning",
    icon: Layers,
    color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    description: "CNNs, RNNs & transformers"
  },
  {
    name: "Cloud Computing",
    category: "Cloud Computing",
    icon: Cloud,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    description: "AWS, Azure & serverless"
  },
  {
    name: "Cyber Security",
    category: "Cyber Security",
    icon: Shield,
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    description: "Security & pen testing"
  },
  {
    name: "Blockchain",
    category: "Blockchain",
    icon: Share2,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    description: "DApps & smart contracts"
  },
  {
    name: "Internet of Things",
    category: "iot",
    icon: Radio,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    description: "Sensors & microcontrollers"
  },
  {
    name: "React / MERN",
    category: "mern",
    icon: Database,
    color: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    description: "Full-stack web applications"
  },
  {
    name: "Java Core",
    category: "java",
    icon: Code,
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    description: "Enterprise OOP systems"
  },
  {
    name: "Flutter Mobile",
    category: "flutter",
    icon: Smartphone,
    color: "bg-blue-600/10 text-blue-600 border-blue-600/20",
    description: "Cross-platform mobile apps"
  }
];

export default function TrendingTech() {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
              Trending Technologies
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore academic projects, courses, and guides organized by active programming domains
            </p>
          </div>
          <Link 
            to="/courses" 
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline shrink-0 text-left md:text-right"
          >
            All Courses & Hubs &rarr;
          </Link>
        </div>

        {/* Scrollable tech list */}
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-hide -mx-4 px-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <Link
                key={tech.name}
                to={`/projects/${encodeURIComponent(tech.category)}`}
                className={`flex items-center gap-3.5 p-4 bg-slate-50 hover:bg-white dark:bg-slate-800/30 dark:hover:bg-slate-800 border rounded-2xl transition-all duration-300 min-w-[240px] shadow-sm hover:shadow-md hover:-translate-y-1 ${tech.color.split(" ")[2]}`}
              >
                <div className={`p-2.5 rounded-xl ${tech.color.split(" ")[0]} ${tech.color.split(" ")[1]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{tech.name}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">{tech.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
