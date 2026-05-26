import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-header text-header-foreground py-2 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <a href="tel:+1234567890" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span>+1 234 567 890</span>
          </a>
          <a href="mailto:info@technoriderzz.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="h-3.5 w-3.5" />
            <span>info@technoriderzz.com</span>
          </a>
          <span className="hidden md:flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>New York, USA</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/contact">
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs px-3 py-1 h-7">
            Request Project
          </Button>
          </Link>
          {/* <Button variant="outline" size="sm" className="border-header-foreground/30 text-primary-foreground hover:text-white hover:bg-header-foreground/10 text-xs px-3 py-1 h-7">
            Log In
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;