import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import logo from "../../assets/BrandLogo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f1117] text-slate-400 text-sm border-t border-slate-800">
      <div className="container mx-auto px-6 py-16 max-w-7xl">

        {/* Top Section: Brand + 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-slate-800 pb-12 mb-8">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Technoriderzz" className="h-12 w-auto rounded-xl" />
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed">
              India's central student technology ecosystem — projects, internships, courses & IEEE research.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.linkedin.com/in/technoriderzz-software-solutions-04b171418" target="_blank" rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a href="https://www.instagram.com/technoriderzzsoft?igsh=MThmdWptM3N4NWQ1aA==" target="_blank" rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-pink-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a href="https://www.youtube.com/@technoriderzzsoftwaresolutions" target="_blank" rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                <Youtube className="h-3.5 w-3.5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573024593339" target="_blank" rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200">
                <Facebook className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Column: Platform */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link to="/projects/python" className="hover:text-white hover:translate-x-1 transition-all inline-block">Projects</Link></li>
              <li><Link to="/internships" className="hover:text-white hover:translate-x-1 transition-all inline-block">Internships</Link></li>
              <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition-all inline-block">Courses</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">IEEE Research</Link></li>
              <li><Link to="/blogs" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tech Blog</Link></li>
            </ul>
          </div>

          {/* Column: Learning */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Learning</h4>
            <ul className="space-y-2.5">
              <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition-all inline-block">Python & ML</Link></li>
              <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition-all inline-block">Web Development</Link></li>
              <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition-all inline-block">Data Science</Link></li>
              <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition-all inline-block">Cloud & DevOps</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">Research Guidance</Link></li>
            </ul>
          </div>

          {/* Column: Company */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-white hover:translate-x-1 transition-all inline-block">Sitemap</a></li>
            </ul>
          </div>

          {/* Column: Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">Moosarambagh, Hyderabad,<br />Telangana, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <a href="mailto:technoriderzzsoftwaresolutions@gmail.com" className="text-xs hover:text-white transition-colors">
                  technoriderzzsoftwaresolutions@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <a href="tel:+918340819112" className="text-xs hover:text-white transition-colors">
                  +91 83408 19112
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>© {currentYear} <span className="text-slate-400 font-semibold">Techno Riderzz Software Solutions</span>. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
            <a href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;