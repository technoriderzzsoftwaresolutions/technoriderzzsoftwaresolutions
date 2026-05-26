import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-header-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>16-11-469/27, Beside State Bank of India, SBI Colony, Moosarambagh, Hyderabad - 500036, Telangana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+918340819112" className="hover:text-primary">+91 83408 19112</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:technoriderzzsoftwaresolutions@gmail.com" className="hover:text-primary">technoriderzzsoftwaresolutions@gmail.com</a>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/technoriderzzsoftwaresolutions" target="_blank" rel="noopener noreferrer" className="p-2 bg-header-foreground/10 rounded-full hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/techno_riderzz" target="_blank" rel="noopener noreferrer" className="p-2 bg-header-foreground/10 rounded-full hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-header-foreground/80">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
               <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
               <li><Link to="/blogs" className="hover:text-primary">Blog</Link></li>
               <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <ul className="space-y-2 text-sm text-header-foreground/80">
              <li><Link to="/projects/python" className="hover:text-primary">Python Projects</Link></li>
              <li><Link to="/projects/android" className="hover:text-primary">Android Projects</Link></li>
              <li><Link to="/projects/java" className="hover:text-primary">Java Projects</Link></li>
              <li><Link to="/projects/deep-learning" className="hover:text-primary">Deep Learning</Link></li>
              <li><Link to="/projects/cyber-security" className="hover:text-primary">Cyber Security</Link></li>
              <li><Link to="/projects/machine-learning" className="hover:text-primary">Machine Learning</Link></li>
            </ul>
          </div>

          {/* Trainings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trainings</h3>
            <ul className="space-y-2 text-sm text-header-foreground/80">
              <li><Link to="/courses" className="hover:text-primary">All Courses</Link></li>
              <li><Link to="/internships" className="hover:text-primary">Internship Programs</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-header-foreground/20 mt-8 pt-8 text-center text-sm text-header-foreground/60">
          <p>&copy; {new Date().getFullYear()} Techno Riderzz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;