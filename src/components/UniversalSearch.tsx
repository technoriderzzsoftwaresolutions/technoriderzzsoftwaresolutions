import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Code, GraduationCap, Briefcase, FileText, ArrowRight, Sparkles, Clock, Calendar, BookOpen } from "lucide-react";
import { projects as staticProjects } from "@/data/projects";
import { courses as staticCourses } from "@/data/courses";
import { internships as staticInternships } from "@/data/internships";
import { fetchProjects, fetchCourses, fetchInternships } from "@/lib/api";

interface SearchResultItem {
  id: string;
  title: string;
  type: "project" | "course" | "internship" | "blog" | "workshop" | "research";
  category: string;
  link: string;
  meta: string;
}

const POPULAR_SUGGESTIONS = ["Python", "AI", "Machine Learning", "React", "MERN Stack", "Java", "Blockchain"];

// Mock workshops and research for indexing
const mockWorkshopsForSearch = [
  { id: "w1", title: "Full-Stack Development Bootcamp", category: "Workshop", link: "/contact?subject=Workshop", meta: "Online • 3 Days" },
  { id: "w2", title: "AI & Deep Learning Hands-on Seminar", category: "Seminar", link: "/contact?subject=Workshop", meta: "CBIT Campus • 1 Day" },
  { id: "w3", title: "IoT Smart Embedded Kits Lab FDP", category: "Training", link: "/contact?subject=Workshop", meta: "Lab Session • 2 Days" }
];

const mockResearchForSearch = [
  { id: "r1", title: "Vulnerabilities in Decentralized Smart Grid Topologies", category: "IEEE Publication", link: "/about", meta: "IEEE Access 2026" },
  { id: "r2", title: "SSVEP Brain-Computer Interfaces with Dilated Neural Models", category: "Scopus Journal", link: "/about", meta: "Applied Sciences 2025" }
];

export default function UniversalSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "project" | "course" | "internship" | "blog" | "workshop" | "research">("all");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Dynamic state loaded from APIs + static defaults
  const [projects, setProjects] = useState<any[]>(staticProjects);
  const [courses, setCourses] = useState<any[]>(staticCourses);
  const [internships, setInternships] = useState<any[]>(staticInternships);
  const [blogs, setBlogs] = useState<any[]>([]);

  // Load search logs and localStorage history
  useEffect(() => {
    // Load history
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }

    const loadAllSources = async () => {
      try {
        const [apiProjects, apiCourses, apiInternships] = await Promise.all([
          fetchProjects().catch(() => []),
          fetchCourses().catch(() => []),
          fetchInternships().catch(() => []),
        ]);

        if (apiProjects && apiProjects.length > 0) setProjects([...staticProjects, ...apiProjects]);
        if (apiCourses && apiCourses.length > 0) setCourses([...staticCourses, ...apiCourses]);
        if (apiInternships && apiInternships.length > 0) setInternships([...staticInternships, ...apiInternships]);

        // Fetch blogs
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const blogRes = await fetch(`${API_URL}/blogs`).then(res => res.json()).catch(() => []);
        if (Array.isArray(blogRes)) {
          setBlogs(blogRes);
        }
      } catch (err) {
        console.error("Error loading search indices:", err);
      }
    };
    loadAllSources();
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Save query to localStorage
  const saveSearchToHistory = (searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) return;

    const filtered = recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase());
    const updated = [term, ...filtered].slice(0, 5); // Limit to 5 items
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem("recent_searches");
  };

  // Normalize all datasets into a single search format
  const allItems: SearchResultItem[] = [
    ...projects.map(p => ({
      id: p.id || p._id,
      title: p.title,
      type: "project" as const,
      category: p.domain || "Academic Project",
      link: `/project/${p.id || p._id}`,
      meta: p.language || p.techStack?.language || "Source Code Included",
    })),
    ...courses.map(c => ({
      id: c.id,
      title: c.title,
      type: "course" as const,
      category: "Skill Course",
      link: `/courses/${c.id}`,
      meta: `${c.duration || "Self-Paced"} • ${c.level || "All Levels"}`
    })),
    ...internships.map(i => ({
      id: i.id,
      title: i.title,
      type: "internship" as const,
      category: `${i.internshipType || "Remote"} Internship`,
      link: `/internships/${i.id}`,
      meta: i.duration || "3 Months"
    })),
    ...blogs.map(b => ({
      id: b._id,
      title: b.title,
      type: "blog" as const,
      category: "Tech Blog",
      link: `/blogs/${b._id}`,
      meta: `By ${b.author || "Techno Riderzz"}`
    })),
    ...mockWorkshopsForSearch.map(w => ({
      id: w.id,
      title: w.title,
      type: "workshop" as const,
      category: w.category,
      link: w.link,
      meta: w.meta
    })),
    ...mockResearchForSearch.map(r => ({
      id: r.id,
      title: r.title,
      type: "research" as const,
      category: r.category,
      link: r.link,
      meta: r.meta
    }))
  ];

  // Perform search filtering
  const filteredResults = allItems.filter(item => {
    const searchStr = `${item.title} ${item.category} ${item.meta}`.toLowerCase();
    const queryStr = query.toLowerCase().trim();
    if (!queryStr) return false;
    
    // Check if type matches tab filter
    if (activeTab !== "all" && item.type !== activeTab) return false;

    return searchStr.includes(queryStr);
  });

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    saveSearchToHistory(suggestion);
    setIsOpen(true);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "project": return <Code className="h-4 w-4 text-blue-500" />;
      case "course": return <GraduationCap className="h-4 w-4 text-emerald-500" />;
      case "internship": return <Briefcase className="h-4 w-4 text-amber-500" />;
      case "blog": return <FileText className="h-4 w-4 text-purple-500" />;
      case "workshop": return <Calendar className="h-4 w-4 text-rose-500" />;
      case "research": return <BookOpen className="h-4 w-4 text-indigo-500" />;
      default: return <Code className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "project": return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "course": return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "internship": return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "blog": return "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "workshop": return "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      case "research": return "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      default: return "";
    }
  };

  return (
    <div id="search-anchor" className="w-full relative" ref={searchRef}>
      {/* Search Input Container */}
      <div className="relative group">
        <input
          id="global-search-input"
          type="text"
          placeholder="Search Projects, Internships, Courses, Research..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filteredResults.length > 0) {
              const firstResult = filteredResults[0];
              saveSearchToHistory(query);
              setIsOpen(false);
              navigate(firstResult.link);
            }
          }}
          className="w-full h-16 pl-14 pr-12 text-base md:text-lg rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
        
        {query && (
          <button 
            onClick={() => setQuery("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Floating Suggestions or Results Panel */}
      {isOpen && (
        <div className="absolute top-full mt-3 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Tabs Filter Bar (Only show when there is a search term) */}
          {query.trim().length > 0 && (
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 py-2 bg-slate-50/50 dark:bg-slate-950/20 overflow-x-auto scroll-hide">
              {(["all", "project", "course", "internship", "blog", "workshop", "research"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs font-semibold px-4 py-2 rounded-lg capitalize transition-all whitespace-nowrap mr-2 ${
                    activeTab === tab 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {tab === "all" ? "All Results" : tab === "research" ? "Research" : `${tab}s`}
                </button>
              ))}
            </div>
          )}

          {/* Results List */}
          <div className="max-h-[400px] overflow-y-auto p-3">
            {query.trim().length > 0 ? (
              filteredResults.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-left">
                    Found {filteredResults.length} matching item{filteredResults.length > 1 ? "s" : ""}
                  </div>
                  
                  {filteredResults.map((item) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      to={item.link}
                      onClick={() => {
                        saveSearchToHistory(query);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-800 text-left"
                    >
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                        {getIcon(item.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${getTypeBadge(item.type)}`}>
                            {item.type}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500 truncate">{item.category}</span>
                        </div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{item.meta}</p>
                      </div>

                      <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-slate-400 dark:text-slate-500 font-medium text-sm">No results match your search query.</p>
                  <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">Try searching for other terms like "Python" or "AI"</p>
                </div>
              )
            ) : (
              // Default state: show popular suggestions and history
              <div className="p-2 text-left">
                
                {/* Recent Searches Layer */}
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        <Clock className="h-3.5 w-3.5" />
                        Recent Searches
                      </span>
                      <button 
                        onClick={clearHistory}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 p-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSuggestionClick(term)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        >
                          <Clock className="h-3 w-3 text-slate-400" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                  Popular Suggestions
                </div>
                
                <div className="flex flex-wrap gap-2 p-2 mb-4">
                  {POPULAR_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 dark:hover:border-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Quick Navigation Hubs
                </div>
                
                <div className="grid grid-cols-2 gap-2 p-2">
                  <Link
                    to="/projects/python"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-500">
                      <Code className="w-4 h-4" />
                    </div>
                    Python Projects
                  </Link>
                  <Link
                    to="/courses"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    Explore Courses
                  </Link>
                  <Link
                    to="/internships"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-500">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    Find Internships
                  </Link>
                  <Link
                    to="/blogs"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    Read Tech Blogs
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
