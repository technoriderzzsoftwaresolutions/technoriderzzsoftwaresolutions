import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, ArrowRight, Code, Database, Brain, Cpu, 
  Smartphone, Coffee, Cloud, Twitter, Globe, FileCode, Users, ChevronLeft, ChevronRight,
  FileText,
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects as staticProjects } from "@/data/projects";
import { categories } from "@/data/categories";
import { fetchProjects, fetchServices, socket } from "@/lib/api";
import HighlightText from "@/components/ui/HighlightText";
import AnimatedText from "@/components/ui/AnimatedText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import DatabaseDesign from "../assets/SystemDesign.png"
import MobileApp from "../assets/MobileAppDevelopment.avif"
import WebApplication from "../assets/WebApplicationDevelopment.jpg"
import CloudSolutions from "../assets/CloudSolutions.webp"
import MachineLearning from "../assets/MachineLearning.jpg"
import ProjectDocumentation from "../assets/ProjectDocumentation.jpg"


const iconMap: Record<string, any> = {
  Code, Database, Brain, Cpu, Smartphone, Coffee, Cloud, Twitter, Globe
};

const staticServices = [
  {
    title: "Custom Project Development",
    description: "Tailored projects in Python, Java, .NET, PHP, and more to meet your specific needs.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    icon: Code
  },
  {
    title: "Database Design & Development",
    description: "Professional ER diagrams, normalization, and implementation in MySQL, PostgreSQL, and MongoDB.",
    image: DatabaseDesign,
    icon: Database
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform apps for Android and iOS using Flutter, React Native, and Kotlin.",
    image: MobileApp,
    icon: Smartphone
  },
  {
    title: "Web Application Development",
    description: "Full-stack web development using React, Angular, Django, Node.js, and ASP.NET.",
    image: WebApplication,
    icon: Globe
  },
  {
    title: "Machine Learning Projects",
    description: "AI development including predictive models, NLP, computer vision, and deep learning.",
    image: MachineLearning,
    icon: Brain
  },
  {
    title: "Cloud Solutions",
    description: "AWS, Azure, and Google Cloud projects with deployment and scaling services.",
    image: CloudSolutions,
    icon: Cloud
  },
  {
    title: "Project Documentation",
    description: "Complete documentation including SRS, DFD, UML, ER diagrams, and presentation slides.",
    image: ProjectDocumentation,
    icon: FileText
  },
  {
    title: "Technical Training",
    description: "Hands-on project experience and training programs in the latest technologies.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    icon: Laptop
  }
];


const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState(staticProjects);
  const [services, setServices] = useState(staticServices);

  const loadData = async () => {
    try {
      const [apiProjects, apiServices] = await Promise.all([
        fetchProjects(),
        fetchServices()
      ]);
      if (apiProjects) setProjects([...staticProjects, ...apiProjects]);
      if (apiServices && apiServices.length > 0) {
        const mappedServices = apiServices.map(s => ({
          ...s,
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
          icon: iconMap[s.iconName] || Code
        }));
        setServices([...staticServices, ...mappedServices]);
      }
    } catch (err) {
      console.error("Data load error:", err);
    }
  };

  useEffect(() => {
    loadData();
    socket.on("data_updated", (data) => {
      console.log("Real-time update received:", data);
      loadData();
    });
    return () => { socket.off("data_updated"); };
  }, []);

  // Filter projects based on input (minimum 3 characters)
  const filteredResults = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      query.length >= 3 && (
        project.title.toLowerCase().includes(query) ||
        project.domain.toLowerCase().includes(query) ||
        project.language.toLowerCase().includes(query) ||
        project.techStack.framework?.toLowerCase().includes(query)
      )
    );
  }).slice(0, 6); // Limit results for the dropdown

  // Popular projects for the bottom section
  const popularProjects = projects.slice(0, 9);

  // Close dropdown when clicking outside the search area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
<section className="relative h-[650px] md:h-[750px] w-full overflow-hidden flex items-center bg-slate-900">
  {/* Background Slides Layer */}
  {services.map((service, index) => {
    const isBgActive = index === currentSlide;
    return (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
          isBgActive ? "opacity-100 z-10" : "opacity-0 z-0"
        }`}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-6000 ease-out ${
            isBgActive ? "scale-105" : "scale-125"
          }`}
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-slate-950" />
      </div>
    );
  })}

  {/* Main Content Layer */}
  <div className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center">
    
    {/* 1. Animated Badge (Top) */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm mb-12">
      <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
      Our Professional Services
    </div>

    {/* 2. Search Container (Now in the Center) */}
    <div className="max-w-2xl w-full mx-auto relative mb-16" ref={searchRef}>
      <div className="relative group">
        <Input
          type="text"
          placeholder="Search projects (e.g., 'Python', 'Web App')..."
          value={searchQuery}
          onFocus={() => setIsDropdownOpen(true)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          className="h-16 pl-14 pr-4 text-lg rounded-full bg-white/95 border-0 shadow-2xl focus-visible:ring-2 ring-primary/50"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
        <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-8 hidden sm:flex bg-primary hover:bg-primary/90 text-white">
          Search
        </Button>
      </div>

      {/* Floating Search Results Dropdown */}
      {isDropdownOpen && searchQuery.length >= 3 && (
        <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[420px] overflow-y-auto p-2">
            {filteredResults.length > 0 ? (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-left">
                  Found {filteredResults.length} Matching Projects
                </div>
                {filteredResults.map((project) => (
                  <Link 
                    key={project.id || (project as any)._id} 
                    to={`/project/${project.id || (project as any)._id}`}
                    className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/5 flex-shrink-0 flex items-center justify-center group-hover:bg-primary/10">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left overflow-hidden flex-1">
                      <p className="font-semibold text-sm text-slate-900 truncate">{project.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {project.domain} • {project.language}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </>
            ) : (
              <div className="p-10 text-center">
                <p className="text-slate-500 font-medium">No results found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* 3. Text Animation Block (Now Below Search) */}
    <div className="min-h-[200px] flex flex-col items-center justify-start">
      {services.map((service, index) => {
        const isActive = index === currentSlide;
        return (
          isActive && (
            <div key={index} className="flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight transition-all duration-1000 transform animate-in fade-in slide-in-from-left-10">
                {service.title}
              </h2>
              <div className="h-1 bg-blue-500 mb-6 w-24 animate-in zoom-in duration-1500" />
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
                {service.description}
              </p>
            </div>
          )
        )
      })}
    </div>
  </div>
</section>

      {/* Category Quick Links */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 items-">
            {categories.map((cat) => {
              const IconComponent = iconMap[cat.icon] || Code;
              return (
                <Link
                  key={cat.id}
                  to={`/projects/${cat.id}`}
                  className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg hover:shadow-md transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-center">{cat.shortName}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedText variant="fade-up" className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              <span className="font-handwritten text-3xl md:text-4xl lg:text-5xl">Our </span>
              <HighlightText variant="marker">Services</HighlightText>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive solutions for all your academic and professional project needs
            </p>
          </AnimatedText>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-card border rounded-xl p-5 md:p-6 h-full hover:shadow-lg transition-all group">
                    <div className="h-12 w-12 md:h-14 md:w-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:from-primary group-hover:to-primary/80 transition-all">
                      <service.icon className="h-6 w-6 md:h-7 md:w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{service.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
          <div className="text-center mt-6 md:mt-8">
            <Link to="/services">
              <Button variant="outline" className="gap-2">
                View All Services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <AnimatedText variant="fade-up" className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              <span className="font-handwritten text-3xl md:text-4xl lg:text-5xl">About </span>
              <HighlightText variant="underline" color="secondary">Us</HighlightText>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed px-2">
              <strong>Techno Riderzz Software Solutions</strong> is a leading technology company based in Hyderabad, 
              dedicated to providing innovative solutions for academic projects, professional training, and software development. 
              We specialize in helping students and professionals achieve their goals through cutting-edge technology, 
              comprehensive training programs, and hands-on project experience.
            </p>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 px-2">
              Our mission is to bridge the gap between academic learning and industry requirements by offering 
              real-world project experience, expert guidance, and quality education in emerging technologies.
            </p>
            <Link to="/about">
              <Button size="lg" className="gap-2 hover-wiggle">
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </section>

      {/* Popular Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="font-handwritten text-3xl md:text-4xl">Popular </span>
              <HighlightText variant="marker">Projects</HighlightText>
            </h2>
            <Link to="/projects/python">
              <Button variant="outline" className="gap-2 hover-wiggle">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {popularProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <AnimatedText variant="fade-up">
            <h2 className="text-3xl font-bold mb-4 font-handwritten text-4xl md:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Explore our courses and internship programs to gain practical skills and real-world experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/courses">
                <Button size="lg" variant="secondary" className="hover-wiggle">Browse Courses</Button>
              </Link>
              <Link to="/internships">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-wiggle">
                  Explore Internships
                </Button>
              </Link>
            </div>
          </AnimatedText>
        </div>
      </section>
    </Layout>
  );
};

export default Index;




















// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { 
//   Search, ArrowRight, Code, Database, Brain, Cpu, 
//   Smartphone, Coffee, Cloud, Twitter, Globe, FileCode, Users, ChevronLeft, ChevronRight,
//   FileText,
//   Laptop
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Layout from "@/components/layout/Layout";
// import ProjectCard from "@/components/ProjectCard";
// import { projects } from "@/data/projects";
// import { categories } from "@/data/categories";
// import HighlightText from "@/components/ui/HighlightText";
// import AnimatedText from "@/components/ui/AnimatedText";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import DatabaseDesign from "../assets/SystemDesign.png"
// import MobileApp from "../assets/MobileAppDevelopment.avif"
// import WebApplication from "../assets/WebApplicationDevelopment.jpg"
// import CloudSolutions from "../assets/CloudSolutions.webp"
// import MachineLearning from "../assets/MachineLearning.jpg"
// import ProjectDocumentation from "../assets/ProjectDocumentation.jpg"


// const iconMap: Record<string, any> = {
//   Code, Database, Brain, Cpu, Smartphone, Coffee, Cloud, Twitter, Globe
// };

// const services = [
//   {
//     title: "Custom Project Development",
//     description: "Tailored projects in Python, Java, .NET, PHP, and more to meet your specific needs.",
//     image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
//     icon: Code
//   },
//   {
//     title: "Database Design & Development",
//     description: "Professional ER diagrams, normalization, and implementation in MySQL, PostgreSQL, and MongoDB.",
//     image: DatabaseDesign,
//     icon: Database
//   },
//   {
//     title: "Mobile App Development",
//     description: "Native and cross-platform apps for Android and iOS using Flutter, React Native, and Kotlin.",
//     image: MobileApp,
//     icon: Smartphone
//   },
//   {
//     title: "Web Application Development",
//     description: "Full-stack web development using React, Angular, Django, Node.js, and ASP.NET.",
//     image: WebApplication,
//     icon: Globe
//   },
//   {
//     title: "Machine Learning Projects",
//     description: "AI development including predictive models, NLP, computer vision, and deep learning.",
//     image: MachineLearning,
//     icon: Brain
//   },
//   {
//     title: "Cloud Solutions",
//     description: "AWS, Azure, and Google Cloud projects with deployment and scaling services.",
//     image: CloudSolutions,
//     icon: Cloud
//   },
//   {
//     title: "Project Documentation",
//     description: "Complete documentation including SRS, DFD, UML, ER diagrams, and presentation slides.",
//     image: ProjectDocumentation,
//     icon: FileText
//   },
//   {
//     title: "Technical Training",
//     description: "Hands-on project experience and training programs in the latest technologies.",
//     image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
//     icon: Laptop
//   }
// ];


// const Index = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const searchRef = useRef<HTMLDivElement>(null);

//   // Filter projects based on input (minimum 3 characters)
//   const filteredResults = projects.filter((project) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       query.length >= 3 && (
//         project.title.toLowerCase().includes(query) ||
//         project.domain.toLowerCase().includes(query) ||
//         project.language.toLowerCase().includes(query) ||
//         project.techStack.framework?.toLowerCase().includes(query)
//       )
//     );
//   }).slice(0, 6); // Limit results for the dropdown

//   // Popular projects for the bottom section
//   const popularProjects = projects.slice(0, 9);

//   // Close dropdown when clicking outside the search area
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <Layout>
//       {/* Hero Section */}
//   <section className="relative h-[650px] md:h-[750px] w-full overflow-hidden flex items-center bg-slate-900">
//   {/* Background Slides */}
//   {services.map((service, index) => {
//     const isActive = index === currentSlide;

//     return (
//       <div
//         key={index}
//         className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
//           isActive ? "z-10 opacity-100" : "z-0 opacity-0"
//         }`}
//         style={{
//           clipPath: isActive 
//             ? "inset(0% 0% 0% 0%)" 
//             : "inset(0% 50% 0% 50%)",
//         }}
//       >
//         {/* Background Image with Zoom */}
//         <div
//           className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${
//             isActive ? "scale-100" : "scale-125"
//           }`}
//           style={{ backgroundImage: `url(${service.image})` }}
//         />

//         {/* Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950/90" />

//         {/* Decorative Vertical Accent Line (Left Side) */}
//         <div 
//           className={`absolute top-1/2 left-12 w-1 h-32 bg-blue-500 transition-all duration-1000 delay-500 hidden md:block ${
//             isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
//           }`} 
//         />

//         {/* Content Container: Using your exact requested style and animations */}
//         <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 pb-32 md:pb-40">
//           <div className="max-w-3xl text-left">
//             <h2 
//               className={`text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-1000 delay-300 ${
//                 isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
//               }`}
//             >
//               {service.title}
//             </h2>
            
//             <div 
//               className={`h-1 bg-blue-500 mb-6 transition-all duration-[1500ms] ${
//                 isActive ? "w-24" : "w-0"
//               }`} 
//             />
            
//             <p 
//               className={`text-slate-300 text-lg md:text-xl max-w-xl transition-all duration-1000 delay-500 ${
//                 isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//               }`}
//             >
//               {service.description}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   })}

//   {/* Search UI Layer */}
//   <div className="container mx-auto px-4 relative z-20 mt-auto pb-12">
//     <div className="max-w-3xl mx-auto relative" ref={searchRef}>
//       <div className="relative group shadow-2xl rounded-full">
//         <Input
//           type="text"
//           placeholder="Search services or technologies..."
//           value={searchQuery}
//           onFocus={() => setIsDropdownOpen(true)}
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             setIsDropdownOpen(true);
//           }}
//           className="h-16 pl-14 pr-6 text-lg rounded-full bg-white/95 border-0 focus-visible:ring-4 ring-primary/30"
//         />
//         <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
//         <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-8 bg-primary hover:bg-primary/90 text-white hidden md:flex">
//           Search Now
//         </Button>
//       </div>

//       {/* Slide Indicators */}
//       <div className="flex justify-center gap-3 mt-8">
//         {services.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentSlide(i)}
//             className={`h-1.5 transition-all duration-500 rounded-full ${
//               currentSlide === i ? "w-10 bg-primary" : "w-4 bg-white/30"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   </div>
// </section>

//       {/* Category Quick Links */}
//       <section className="py-12 bg-secondary/50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 items-">
//             {categories.map((cat) => {
//               const IconComponent = iconMap[cat.icon] || Code;
//               return (
//                 <Link
//                   key={cat.id}
//                   to={`/projects/${cat.id}`}
//                   className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg hover:shadow-md transition-all hover:-translate-y-1 group"
//                 >
//                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                     <IconComponent className="h-6 w-6" />
//                   </div>
//                   <span className="text-sm font-medium text-center">{cat.shortName}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Services Carousel Section */}
//       <section className="py-12 md:py-16 bg-secondary/30">
//         <div className="container mx-auto px-4">
//           <AnimatedText variant="fade-up" className="text-center mb-8 md:mb-10">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
//               <span className="font-handwritten text-3xl md:text-4xl lg:text-5xl">Our </span>
//               <HighlightText variant="marker">Services</HighlightText>
//             </h2>
//             <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
//               Comprehensive solutions for all your academic and professional project needs
//             </p>
//           </AnimatedText>
//           <Carousel
//             opts={{
//               align: "start",
//               loop: true,
//             }}
//             className="w-full max-w-6xl mx-auto"
//           >
//             <CarouselContent className="-ml-2 md:-ml-4">
//               {services.map((service, index) => (
//                 <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
//                   <div className="bg-card border rounded-xl p-5 md:p-6 h-full hover:shadow-lg transition-all group">
//                     <div className="h-12 w-12 md:h-14 md:w-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:from-primary group-hover:to-primary/80 transition-all">
//                       <service.icon className="h-6 w-6 md:h-7 md:w-7 text-primary group-hover:text-primary-foreground transition-colors" />
//                     </div>
//                     <h3 className="font-semibold text-base md:text-lg mb-2">{service.title}</h3>
//                     <p className="text-muted-foreground text-xs md:text-sm">{service.description}</p>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="hidden md:flex -left-12" />
//             <CarouselNext className="hidden md:flex -right-12" />
//           </Carousel>
//           <div className="text-center mt-6 md:mt-8">
//             <Link to="/services">
//               <Button variant="outline" className="gap-2">
//                 View All Services <ArrowRight className="h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-accent/10">
//         <div className="container mx-auto px-4">
//           <AnimatedText variant="fade-up" className="max-w-4xl mx-auto text-center">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
//               <span className="font-handwritten text-3xl md:text-4xl lg:text-5xl">About </span>
//               <HighlightText variant="underline" color="secondary">Us</HighlightText>
//             </h2>
//             <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed px-2">
//               <strong>Techno Riderzz Software Solutions</strong> is a leading technology company based in Hyderabad, 
//               dedicated to providing innovative solutions for academic projects, professional training, and software development. 
//               We specialize in helping students and professionals achieve their goals through cutting-edge technology, 
//               comprehensive training programs, and hands-on project experience.
//             </p>
//             <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 px-2">
//               Our mission is to bridge the gap between academic learning and industry requirements by offering 
//               real-world project experience, expert guidance, and quality education in emerging technologies.
//             </p>
//             <Link to="/about">
//               <Button size="lg" className="gap-2 hover-wiggle">
//                 Learn More About Us <ArrowRight className="h-4 w-4" />
//               </Button>
//             </Link>
//           </AnimatedText>
//         </div>
//       </section>

//       {/* Popular Projects Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold">
//               <span className="font-handwritten text-3xl md:text-4xl">Popular </span>
//               <HighlightText variant="marker">Projects</HighlightText>
//             </h2>
//             <Link to="/projects/python">
//               <Button variant="outline" className="gap-2 hover-wiggle">
//                 View All <ArrowRight className="h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
//             {popularProjects.map((project) => (
//               <ProjectCard key={project.id} project={project} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-primary text-primary-foreground">
//         <div className="container mx-auto px-4 text-center">
//           <AnimatedText variant="fade-up">
//             <h2 className="text-3xl font-bold mb-4 font-handwritten text-4xl md:text-5xl">
//               Ready to Start Your Journey?
//             </h2>
//             <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
//               Explore our courses and internship programs to gain practical skills and real-world experience.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link to="/courses">
//                 <Button size="lg" variant="secondary" className="hover-wiggle">Browse Courses</Button>
//               </Link>
//               <Link to="/internships">
//                 <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-wiggle">
//                   Explore Internships
//                 </Button>
//               </Link>
//             </div>
//           </AnimatedText>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Index;
