import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from '../../assets/BrandLogo.jpeg';
import { projectCategories } from "@/data/categories";

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Premium light glassmorphic states to blend with the white theme layouts
  const navbarBg = isHome
    ? (isScrolled 
        ? "bg-[#1e40af]/95 backdrop-blur-md border-b border-white/10 text-white shadow-sm py-3" 
        : "bg-[#1e40af] text-white border-b border-white/5 py-4")
    : (isScrolled 
        ? "bg-white/90 backdrop-blur-md border-b border-slate-100/80 text-slate-800 shadow-sm py-3" 
        : "bg-white/70 backdrop-blur-md border-b border-slate-100/40 text-slate-800 py-4");

  const linkColor = (path: string) => {
    const isActive = location.pathname === path;
    if (isHome) {
      return isActive ? "text-rose-500 font-bold" : "text-slate-300 hover:text-rose-500 font-semibold";
    }
    return isActive ? "text-rose-600 font-bold" : "text-slate-600 hover:text-rose-600 font-semibold";
  };

  const dropdownTriggerColor = isHome 
    ? "text-slate-300 hover:text-rose-500 font-semibold" 
    : "text-slate-600 hover:text-rose-600 font-semibold";

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ease-out ${navbarBg}`}>
      <div className="w-full pl-4 pr-6">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Frame */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src={logo} 
              alt="Techno Riderzz Logo" 
              className="w-auto rounded-xl object-contain transition-all duration-300 ease-out"
              style={{ maxHeight: isScrolled ? "46px" : "52px" }}
            />
          </Link>

          {/* Clean Desktop Navigation Links (Stripe & PwC Style) */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-xs xl:text-sm font-bold tracking-wide transition-colors ${linkColor("/")}`}>
              Home
            </Link>

            {/* Projects Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-xs xl:text-sm font-bold tracking-wide transition-colors focus:outline-none ${dropdownTriggerColor}`}>
                Projects <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-2xl bg-white border border-slate-100 p-1.5 shadow-xl text-slate-800">
                {projectCategories.slice(0, 8).map((cat, idx) => (
                  <DropdownMenuItem key={idx} asChild className="rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 text-slate-700 hover:text-rose-600">
                    <Link to={`/projects/${encodeURIComponent(cat.id)}`} className="w-full text-xs py-2 font-bold">
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/internships" className={`text-xs xl:text-sm font-bold tracking-wide transition-colors ${linkColor("/internships")}`}>
              Internships
            </Link>

            <Link to="/courses" className={`text-xs xl:text-sm font-bold tracking-wide transition-colors ${linkColor("/courses")}`}>
              Courses
            </Link>

            <Link to="/about" className={`text-xs xl:text-sm font-bold tracking-wide transition-colors ${linkColor("/about")}`}>
              Research
            </Link>

            <Link to="/blogs" className={`text-xs xl:text-sm font-bold tracking-wide transition-colors ${linkColor("/blogs")}`}>
              Blog
            </Link>
            {typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true" && (
              <Link to="/admin/dashboard" className="text-xs xl:text-sm font-bold tracking-wide text-amber-500 hover:text-amber-600 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Quick Search Action trigger */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  const input = document.getElementById("global-search-input") as HTMLInputElement;
                  if (input) input.focus();
                }, 400);
              }}
              className={`p-2 rounded-xl transition-all ${isHome ? 'hover:bg-white/10 text-white hover:text-rose-400' : 'hover:bg-slate-100 text-slate-500 hover:text-rose-600'}`}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Drawer Trigger */}
          <div className="flex md:hidden items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={isHome ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t mt-2.5 animate-in fade-in slide-in-from-top-1 ${isHome ? 'border-white/10 text-white bg-[#1e40af]/95 rounded-b-2xl border-x border-b shadow-lg px-4' : 'border-slate-100 text-slate-700 bg-white/95 rounded-b-2xl border-x border-b shadow-lg px-4'}`}>
            <div className="flex flex-col gap-4 text-left px-2">
              <Link to="/" className={`text-sm font-bold ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/projects/python" className={`text-sm font-bold ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                Projects
              </Link>
              <Link to="/internships" className={`text-sm font-bold ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                Internships
              </Link>
              <Link to="/courses" className={`text-sm font-bold ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                Courses
              </Link>
              <Link to="/about" className={`text-sm font-bold ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                Research
              </Link>
              <Link to="/blogs" className={`text-sm font-bold ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              {typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true" && (
                <Link to="/admin/dashboard" className={`text-sm font-bold text-amber-500 ${isHome ? 'hover:text-rose-500' : 'hover:text-rose-600'}`} onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}