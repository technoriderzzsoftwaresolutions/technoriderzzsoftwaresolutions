import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from '../../assets/BrandLogo.jpeg'
import { projectCategories } from "@/data/categories";

const MainNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const defaultCategories = projectCategories.map(c => c.id);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(defaultCategories);
  const location = useLocation();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    fetch(`${API_URL}/projects/categories/unique`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Merge fetched categories with default ones and remove duplicates
          const merged = Array.from(new Set([...defaultCategories, ...data]));
          setDynamicCategories(merged);
        }
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const isActive = (path: string) => location.pathname === path;


  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive(path) ? "text-primary" : "text-foreground"
    }`;

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Techno Riderzz Logo" className="h-10 w-full rounded-lg" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/about" className={navLinkClass("/about")}>
              About
            </Link>

            {/* Projects Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
                Projects <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {dynamicCategories.map((cat, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <Link to={`/projects/${encodeURIComponent(cat)}`} className="w-full">
                      {cat} Projects
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Courses Link */}
            <Link to="/courses" className={navLinkClass("/courses")}>
              Courses
            </Link>

            <Link to="/services" className={navLinkClass("/services")}>
              Services
            </Link>

            {/* Internships Link */}
            <Link to="/internships" className={navLinkClass("/internships")}>
              Internships
            </Link>

            <Link to="/contact" className={navLinkClass("/contact")}>
              Contact
            </Link>
            <Link to="/blogs" className={navLinkClass("/blogs")}>
              Blog
            </Link>


          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={navLinkClass("/")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={navLinkClass("/about")}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="space-y-2">
                <span className="text-sm font-semibold text-muted-foreground">Projects</span>
                {dynamicCategories.map((cat, idx) => (
                  <Link
                    key={idx}
                    to={`/projects/${encodeURIComponent(cat)}`}
                    className="block text-sm pl-4 py-1 hover:text-primary "
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat} Projects
                  </Link>
                ))}
              </div>
              <Link to="/courses" className={navLinkClass("/courses")}>
              Courses
            </Link>
              <Link
                to="/services"
                className={navLinkClass("/services")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
                <Link to="/internships" className={navLinkClass("/internships")}>
              Internships
            </Link>
              <Link
                to="/contact"
                className={navLinkClass("/contact")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/blogs"
                className={navLinkClass("/blogs")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;