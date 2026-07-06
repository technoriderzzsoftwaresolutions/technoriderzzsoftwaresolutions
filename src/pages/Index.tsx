import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, ShieldCheck, Award, Zap,
  ChevronRight, Calendar, User, Search, BookOpen, Terminal, Sparkles,
  Code, Cpu, Smartphone, Server, Database, Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects as staticProjects } from "@/data/projects";
import { fetchProjects, socket } from "@/lib/api";
import HighlightText from "@/components/ui/HighlightText";
import AnimatedText from "@/components/ui/AnimatedText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Phase 2 components
import UniversalSearch from "@/components/UniversalSearch";
import EcosystemSection from "@/components/EcosystemSection";
import TrendingTech from "@/components/TrendingTech";
import StatsCounter from "@/components/StatsCounter";
import PartnerMarquee from "@/components/PartnerMarquee";
import ResearchHubSection from "@/components/ResearchHubSection";
import WorkshopsSection from "@/components/WorkshopsSection";
import OpportunityShelf from "@/components/OpportunityShelf";

// Interactive 3D Canvas
import Interactive3DCanvas from "@/components/ui/Interactive3DCanvas";
import HeroDashboard3D from "@/components/ui/HeroDashboard3D";
import TerrainMesh from "@/components/ui/TerrainMesh";
import ParticleNetwork from "@/components/ui/ParticleNetwork";

interface Blog {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Does Techno Riderzz provide the complete source code for academic projects?",
    answer: "Yes! Every project package includes the full, clean source code, database scripts, detailed project documentation (like DFD, UML diagrams, and presentation slides), and expert installation/setup instructions."
  },
  {
    id: "faq-2",
    question: "Are the internship and training certificates verified?",
    answer: "Absolutely. All certificates issued by Techno Riderzz Software Solutions are ISO 9001:2015 certified. Each certificate contains a unique verification QR code and URL that colleges or potential recruiters can use to validate online."
  },
  {
    id: "faq-3",
    question: "Can I choose a customized topic for my final year major project?",
    answer: "Yes, you can! Our technical mentors can help you customize existing IEEE papers or design a completely new project scope based on your specific university requirements or domain interests (AI, Web, IoT, etc.)."
  },
  {
    id: "faq-4",
    question: "What are the benefits of college partnerships through CollegeHub?",
    answer: "College partnerships enable institutes to organize centralized workshops and Faculty Development Programs (FDPs) at cost-effective rates. It also provides colleges with direct dashboard access to monitor student internship completion and project milestones."
  },
  {
    id: "faq-5",
    question: "What type of internships are available, and do they offer job opportunities?",
    answer: "We offer remote, hybrid, and on-site internship programs in MERN Stack, Python & Machine Learning, Java, and Android. Outstanding performers receive direct placement referrals (Pre-Placement Offers - PPO) with our partner network."
  }
];

// Custom Authentic Brand SVG Logos (Stripe-style)
const ReactLogo = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-7 w-7 select-none pointer-events-none">
    <circle r="2" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1.2" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const PythonLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 select-none pointer-events-none" fill="currentColor">
    <path d="M14.25.18a.06.06 0 0 0-.07 0l-3.5 1.5a.06.06 0 0 0-.03.05v2.52a.06.06 0 0 0 .06.06h3.54c.78 0 1.4.63 1.4 1.4v3.54a.06.06 0 0 0 .06.06h2.52a.06.06 0 0 0 .05-.03l1.5-3.5a.06.06 0 0 0 0-.07l-2.52-5.04a.06.06 0 0 0-.05-.03H14.25z" fill="#3776AB" />
    <path d="M9.75 23.82a.06.06 0 0 0 .07 0l3.5-1.5a.06.06 0 0 0 .03-.05v-2.52a.06.06 0 0 0-.06-.06H9.7c-.78 0-1.4-.63-1.4-1.4v-3.54a.06.06 0 0 0-.06-.06H5.72a.06.06 0 0 0-.05.03l-1.5 3.5a.06.06 0 0 0 0 .07l2.52 5.04a.06.06 0 0 0 .05.03h3.01z" fill="#FFE873" />
  </svg>
);

const TensorFlowLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 select-none pointer-events-none" fill="none">
    <path d="M12 2L2 7.5v11L12 24l10-5.5v-11L12 2zm-1 19.3v-6.5l-6-3.3v-2.2l6 3.3v-6l6 3.3v6l-6-3.3v6.5l6 3.3v-6.5z" fill="#FF6F00" />
  </svg>
);

const NodeJSLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 select-none pointer-events-none" fill="currentColor">
    <path d="M12 2.5a.75.75 0 0 0-.375.1l-7.75 4.5a.75.75 0 0 0-.375.65v9a.75.75 0 0 0 .375.65l7.75 4.5a.75.75 0 0 0 .75 0l7.75-4.5a.75.75 0 0 0 .375-.65v-9a.75.75 0 0 0-.375-.65l-7.75-4.5A.75.75 0 0 0 12 2.5zm-6.5 6l5.5-3.2v6.4L5.5 14.9V8.5zm13 0v6.4l-5.5-3.2V5.3l5.5 3.2z" fill="#339933" />
  </svg>
);

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 select-none pointer-events-none" fill="currentColor">
    <path d="M13.983 8.878h-1.666V7.21h1.666v1.668zm2.083-2.083h-1.667v1.666h1.667V6.795zm-2.083 0h-1.666v1.666h1.666V6.795zm-2.083 0H10.23v1.666h1.666V6.795zm-2.083 0H8.147v1.666h1.667V6.795zm-2.083 0H6.064v1.666h1.667V6.795zm2.083-2.083H10.23V4.38h1.666v2.332zm2.083 0h-1.666V4.38h1.666v2.332zm2.083 0h-1.667V4.38h1.667v2.332zM23.99 12.38c-.035-.116-.27-.426-.966-.426-.412 0-.806.136-1.127.32a.11.11 0 0 1-.157-.038C20.655 10.63 19.34 9.53 17.5 9.53c-2.3 0-4.1 1.7-4.1 3.8h-3c0-2.1-1.8-3.8-4.1-3.8-1.5 0-2.8.75-3.6 1.95a.15.15 0 0 1-.22.02c-.37-.32-.86-.5-1.37-.5-.95 0-1.8.63-2 1.57A6.47 6.47 0 0 0 0 13.96v1c0 3.2 2.6 5.8 5.8 5.8h11.2c2.9 0 5.4-2.1 5.9-5 .45-.25 1-.6 1.15-1.55a.8.8 0 0 0-.06-.83z" fill="#2496ED" />
  </svg>
);

const MongoDBLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 select-none pointer-events-none" fill="currentColor">
    <path d="M12 .5a12.5 12.5 0 0 0-4.5 12.5c0 4.5 4.5 10.5 4.5 10.5s4.5-6 4.5-10.5A12.5 12.5 0 0 0 12 .5zm-1 6.5c0-.5.5-1 .5-1s.5.5.5 1v6c0 .5-.5 1-.5 1s-.5-.5-.5-1V7z" fill="#47A248" />
  </svg>
);

const DjangoLogo = () => (
  <div className="text-emerald-500 font-serif font-black text-xl tracking-tight select-none pointer-events-none">django</div>
);

const FlutterLogo = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7 select-none pointer-events-none" fill="currentColor">
    <path d="M14.314 0L2.3 12 6 15.7 18.014 3.7zM21.7 12L12 21.7l-3.7-3.7 9.7-9.7z" fill="#02569B" />
  </svg>
);

const AWSLogo = () => (
  <div className="text-[#FF9900] font-sans font-black text-lg tracking-wider select-none pointer-events-none">aws</div>
);

const techDetails: Record<string, { desc: string, projects: string, difficulty: string, role: string }> = {
  "React / Next.js": {
    desc: "Build highly interactive, dynamic, and component-driven user interfaces. Next.js offers server-side pre-rendering and dynamic hydration for 100% crawlable search authority.",
    projects: "4,200+ Projects",
    difficulty: "Intermediate",
    role: "Frontend Developer"
  },
  "Python / PyTorch": {
    desc: "Train deep neural networks, design computer vision classifiers, and develop complex AI architectures. PyTorch provides flexible graph computation.",
    projects: "5,600+ Projects",
    difficulty: "Advanced",
    role: "AI Research Engineer"
  },
  "TensorFlow / AI": {
    desc: "Develop production-ready machine learning models, image recognition systems, and sequential prediction algorithms with TensorFlow's scalable pipeline.",
    projects: "3,400+ Projects",
    difficulty: "Advanced",
    role: "Machine Learning Engineer"
  },
  "Node.js / Express": {
    desc: "Architect scalable server-side microservices, handle concurrent web socket connections, and build high-performance RESTful APIs.",
    projects: "2,800+ Projects",
    difficulty: "Intermediate",
    role: "Backend Engineer"
  },
  "Docker / K8s": {
    desc: "Containerize applications to ensure identical dev-to-prod runtime environments. Orchestrate microservices at scale using Kubernetes clusters.",
    projects: "1,200+ Projects",
    difficulty: "Advanced",
    role: "DevOps Engineer"
  },
  "MongoDB / SQL": {
    desc: "Design flexible JSON-like document databases with MongoDB or structured relational tables with SQL. Optimize query speeds using indexation.",
    projects: "3,100+ Projects",
    difficulty: "Intermediate",
    role: "Database Administrator"
  },
  "Django / Flask": {
    desc: "Leverage Python's robust libraries to design complete web platforms rapidly. Django includes a built-in admin dashboard and ORM out of the box.",
    projects: "1,850+ Projects",
    difficulty: "Intermediate",
    role: "Full Stack Engineer"
  },
  "Flutter / Dart": {
    desc: "Write once, run anywhere. Compile high-performance, native-speed mobile applications for both iOS and Android from a single Dart codebase.",
    projects: "2,100+ Projects",
    difficulty: "Intermediate",
    role: "Mobile App Developer"
  },
  "AWS Cloud": {
    desc: "Deploy serverless Lambda functions, scale computing power dynamically with EC2, store assets securely on S3 buckets, and deliver global assets via CloudFront.",
    projects: "1,500+ Projects",
    difficulty: "Advanced",
    role: "Cloud Architect"
  }
};

const technologies = [
  { name: "React / Next.js", icon: ReactLogo, slug: "mern" },
  { name: "Python / PyTorch", icon: PythonLogo, slug: "python" },
  { name: "TensorFlow / AI", icon: TensorFlowLogo, slug: "python" },
  { name: "Node.js / Express", icon: NodeJSLogo, slug: "mern" },
  { name: "Docker / K8s", icon: DockerLogo, slug: "mern" },
  { name: "MongoDB / SQL", icon: MongoDBLogo, slug: "mern" },
  { name: "Django / Flask", icon: DjangoLogo, slug: "python" },
  { name: "Flutter / Dart", icon: FlutterLogo, slug: "flutter" },
  { name: "AWS Cloud", icon: AWSLogo, slug: "mern" },
];

export default function Index() {
  const [projects, setProjects] = useState(staticProjects);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [faqQuery, setFaqQuery] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[]>(defaultFAQs);

  const loadData = async () => {
    try {
      const apiProjects = await fetchProjects().catch(() => []);
      if (apiProjects && apiProjects.length > 0) {
        setProjects([...staticProjects, ...apiProjects]);
      }
      
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const blogRes = await fetch(`${API_URL}/blogs`).then(res => res.json()).catch(() => []);
      if (Array.isArray(blogRes)) {
        setBlogs(blogRes.slice(0, 3)); // Display latest 3 blogs
      }
    } catch (err) {
      console.error("Data load error:", err);
    }
  };

  useEffect(() => {
    loadData();
    socket.on("data_updated", (data) => {
      loadData();
    });
    return () => { socket.off("data_updated"); };
  }, []);

  // Filter FAQs in real-time
  useEffect(() => {
    const query = faqQuery.toLowerCase().trim();
    if (!query) {
      setFilteredFAQs(defaultFAQs);
    } else {
      const filtered = defaultFAQs.filter(
        faq => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
      );
      setFilteredFAQs(filtered);
    }
  }, [faqQuery]);

  // Page level SEO & JSON-LD schema injection
  useEffect(() => {
    document.title = "Techno Riderzz | Central Student Technology Ecosystem";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Discover projects with source code, certified internships, courses, and guidance for research publications from India's central student technology ecosystem.");
    }

    // Dynamic JSON-LD injection
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Techno Riderzz",
      "alternateName": "Techno Riderzz EdTech platform",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
    
    const scriptId = "jsonld-schema-website";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
    
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  const popularProjects = projects.slice(0, 3);

  return (
    <Layout>
      {/* 1. Hero Section (Centered Layout with Stripe-like 3D Canvas & Udemy-like Search focus) */}
      <section className="relative w-full overflow-hidden pt-10 md:pt-14 pb-8 md:pb-12 border-b border-slate-200/60" style={{ background: "linear-gradient(to bottom, #1e40af 0%, #2b4c9e 40%, #ffffff 100%)" }}>
        
        {/* Interactive 3D Canvas globe backdrop (perfectly centered, faint watermark logo) */}
        <Interactive3DCanvas isHeroBackground={true} />

        {/* Particle network constellation — glowing dots + connecting lines */}
        <ParticleNetwork />

        <div className="container mx-auto px-4 relative z-30 max-w-4xl text-center space-y-6">
          {/* Centered Typography (PwC & Udemy Style) */}
          <div className="space-y-5 animate-in fade-in duration-1000 delay-100">
            <h1 className="text-4xl md:text-7xl text-white leading-tight tracking-tight max-w-3xl mx-auto font-extrabold">
              Build Your Future <br />
              With <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(to right, #00f2fe, #ff758f)" }}
              >One Platform.</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
              A technology ecosystem delivering <span className="text-[#00f2fe] font-bold underline decoration-[#00f2fe]/40 decoration-2 underline-offset-4">world-class software engineering</span>, <span className="text-[#00f2fe] font-bold underline decoration-[#00f2fe]/40 decoration-2 underline-offset-4">AI innovation</span>, <span className="text-[#00f2fe] font-bold underline decoration-[#00f2fe]/40 decoration-2 underline-offset-4">digital transformation</span>, and enterprise solutions for businesses and institutions while <span className="text-[#00f2fe] font-bold underline decoration-[#00f2fe]/40 decoration-2 underline-offset-4">cultivating future talent</span> through practical learning.
            </p>
          </div>

          {/* Centered Search Commander Bar */}
          <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            <UniversalSearch />
          </div>

          {/* Discovery Action Triggers */}
          <div className="flex flex-wrap justify-center items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            <Link to="/projects/python">
              <Button size="lg" className="rounded-full px-8 bg-rose-600 hover:bg-rose-700 text-white font-semibold h-12 shadow-lg shadow-rose-500/20 transition-all duration-200">
                Explore Projects
              </Button>
            </Link>
            <Link to="/internships">
              <Button size="lg" className="rounded-full px-8 bg-white text-blue-900 hover:bg-amber-50 font-semibold h-12 shadow-lg transition-all duration-200">
                Find Internships
              </Button>
            </Link>
          </div>

        </div>

        {/* Infinite Technologies Scroll Marquee Ticker (Full Width with Lite BG) */}
        <div className="mt-14 w-full overflow-hidden relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-400 bg-slate-50/50 border-y border-slate-100/80 py-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3 text-center">
            Supported Technologies & Frameworks
          </span>
          <div className="relative w-full overflow-hidden">
            {/* Left/Right fading gradients to blend marquee edges smoothly with white background */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-scroll-slow flex gap-12 items-center">
              {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, idx) => {
                const Icon = tech.icon;
                const details = techDetails[tech.name] || {
                  desc: "Learn trending industry frameworks and technologies through practical projects.",
                  projects: "1,000+ Projects",
                  difficulty: "Intermediate",
                  role: "Software Developer"
                };
                return (
                  <HoverCard key={`${tech.name}-${idx}`} openDelay={150} closeDelay={150}>
                    <HoverCardTrigger asChild>
                      <div>
                        <Link 
                          to={`/projects/${tech.slug}`}
                          className="flex items-center gap-3.5 px-6 py-2.5 bg-slate-100 border border-slate-300 shadow-sm rounded-xl shrink-0 hover:scale-105 transition-all duration-300 cursor-pointer group hover:border-slate-300/80 hover:shadow-md"
                        >
                          <Icon />
                          <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-900 transition-colors tracking-wide select-none">
                            {tech.name}
                          </span>
                        </Link>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" align="center" className="w-80 rounded-2xl bg-slate-100 border border-slate-300 shadow-xl p-5 text-slate-800 z-50 text-left">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3.5 border-b border-slate-100 pb-3">
                          <Icon />
                          <div>
                            <h4 className="font-extrabold text-xs text-slate-900">{tech.name}</h4>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">{details.role}</p>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-500 leading-relaxed">
                          <p>{details.desc}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-100/70 text-slate-650">
                          <div><strong>Ecosystem:</strong> {details.projects}</div>
                          <div><strong>Difficulty:</strong> {details.difficulty}</div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ecosystem Hubs Grid Section */}
      <EcosystemSection />

      {/* 3. Tabbed Opportunity Discovery Shelf (Udemy & Coursera Style) */}
      <OpportunityShelf />

      {/* 4. Research Hub Section */}
      <ResearchHubSection />

      {/* 5. Trust & Credentials Section (Stats Counter) */}
      <section className="py-8 bg-background border-b border-slate-100/60">
        <StatsCounter />
      </section>
    </Layout>
  );
}
