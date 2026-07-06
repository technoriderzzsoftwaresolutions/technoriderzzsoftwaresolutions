import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Code, GraduationCap, Briefcase, Calendar, MapPin, 
  Award, Star, Clock, BookOpen, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { internships } from "@/data/internships";
import { courses } from "@/data/courses";
import SafeImage from "@/components/SafeImage";
import Tilt3D from "@/components/ui/Tilt3D";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { fetchProjects, fetchCourses, fetchInternships, socket } from "@/lib/api";

type TabType = "projects" | "internships" | "courses";

export default function OpportunityShelf() {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [projectsList, setProjectsList] = useState(projects);
  const [internshipsList, setInternshipsList] = useState(internships);
  const [coursesList, setCoursesList] = useState(courses);

  const loadData = async () => {
    try {
      const [apiProjects, apiCourses, apiInternships] = await Promise.all([
        fetchProjects().catch(() => []),
        fetchCourses().catch(() => []),
        fetchInternships().catch(() => []),
      ]);

      if (apiProjects) {
        const merged = projects.map(staticItem => {
          const apiItem = apiProjects.find((api: any) => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(projects.map(s => String(s.id)));
        const newApiItems = apiProjects.filter((api: any) => !staticIds.has(String(api.id || api._id)));
        setProjectsList([...merged, ...newApiItems]);
      }

      if (apiCourses) {
        const merged = courses.map(staticItem => {
          const apiItem = apiCourses.find((api: any) => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(courses.map(s => String(s.id)));
        const newApiItems = apiCourses.filter((api: any) => !staticIds.has(String(api.id || api._id)));
        setCoursesList([...merged, ...newApiItems]);
      }

      if (apiInternships) {
        const merged = internships.map(staticItem => {
          const apiItem = apiInternships.find((api: any) => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(internships.map(s => String(s.id)));
        const newApiItems = apiInternships.filter((api: any) => !staticIds.has(String(api.id || api._id)));
        setInternshipsList([...merged, ...newApiItems]);
      }
    } catch (err) {
      console.error("OpportunityShelf load error:", err);
    }
  };

  useEffect(() => {
    loadData();
    socket.on("data_updated", loadData);
    return () => {
      socket.off("data_updated", loadData);
    };
  }, []);

  const featuredProjects = projectsList.slice(0, 4);
  const featuredInternships = internshipsList.slice(0, 4);
  const featuredCourses = coursesList.slice(0, 4);

  // Dynamic date helper
  const currentUpdateDate = "July 2026";

  return (
    <section className="py-12 md:py-16 bg-slate-50/30 text-slate-900 border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200/60 px-4 py-1.5 rounded-full shadow-sm">
            Discovery Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4 leading-tight tracking-tight">
            Accelerate Your Learning Journey
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-3">
            Explore verified academic projects, certified internships, and intensive training programs in our goal-oriented discovery grid.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center border-b border-slate-200/80 mb-10 max-w-md mx-auto">
          {(["projects", "internships", "courses"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs md:text-sm font-bold pb-3 px-6 capitalize transition-all relative ${
                activeTab === tab 
                  ? "text-rose-600 border-b-2 border-rose-500" 
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Horizontal Marquee with Pauses on Hover & Portalled Udemy-Style Hover Cards */}
        <div className="relative w-full overflow-hidden">
          {/* Left/Right fading gradients to blend marquee edges smoothly */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          {/* Projects Shelf */}
          {activeTab === "projects" && (
            <div className="animate-marquee-scroll-slow hover:[animation-play-state:paused] flex gap-8 py-4 w-max">
              {[...featuredProjects, ...featuredProjects, ...featuredProjects].map((project, idx) => {
                const isAdvanced = parseInt(project.id) % 2 === 0;
                return (
                  <div key={`${project.id}-${idx}`} className="w-[340px] shrink-0 h-full preserve-3d relative hover:z-50">
                    <HoverCard openDelay={100} closeDelay={100}>
                      <HoverCardTrigger asChild>
                        <div className="h-full">
                          <Tilt3D maxTilt={6} scale={1.01} className="h-full">
                            <Link to={`/project/${project.id}`} className="block h-full preserve-3d">
                              <Card className="group overflow-hidden bg-slate-100 border border-slate-300 hover:border-rose-500/35 hover:shadow-lg shadow-sm transition-all duration-300 h-full flex flex-col justify-between text-left rounded-2xl preserve-3d">
                                
                                {/* Image block */}
                                <div className="relative h-48 bg-slate-100 overflow-hidden">
                                  <SafeImage
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                                  />
                                  <Badge className="absolute top-3 left-3 bg-rose-600 text-white border-0 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                    {project.domain}
                                  </Badge>
                                  <Badge className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 border border-slate-200/50 text-[8px] font-semibold shadow-sm">
                                    {isAdvanced ? "Advanced" : "Intermediate"}
                                  </Badge>
                                </div>

                                <CardContent className="p-5 flex-1 flex flex-col justify-between preserve-3d bg-white">
                                  <div className="preserve-3d">
                                    <div className="flex items-center justify-between mb-3">
                                      <Badge className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-50 border border-slate-200/60 text-slate-650">
                                        {project.language}
                                      </Badge>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-bold text-slate-600">{project.rating}</span>
                                      </div>
                                    </div>

                                    <h3 
                                      className="font-bold text-sm md:text-base text-slate-800 line-clamp-2 mb-3 group-hover:text-rose-600 transition-colors h-11"
                                      style={{ transform: "translateZ(15px)" }}
                                    >
                                      {project.title}
                                    </h3>
                                  </div>

                                  <div className="space-y-3 pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                                      <span>{project.applicationType}</span>
                                      <span>{isAdvanced ? "6 Weeks" : "4 Weeks"}</span>
                                    </div>
                                    <div 
                                      className="flex items-center gap-1 text-[10px] font-bold text-rose-600 group-hover:translate-x-0.5 transition-transform"
                                      style={{ transform: "translateZ(10px)" }}
                                    >
                                      Explore Project &rarr;
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          </Tilt3D>
                        </div>
                      </HoverCardTrigger>
                      
                      <HoverCardContent side="right" sideOffset={15} className="w-[330px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-6 text-slate-800 z-50 text-left relative">
                        <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-extrabold text-sm md:text-base text-slate-900 leading-snug">{project.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[9px] font-extrabold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Bestseller</span>
                              <span className="text-[9px] text-slate-500 font-semibold">Updated {currentUpdateDate}</span>
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-500 font-bold tracking-wide flex items-center gap-2">
                            <span>{isAdvanced ? "6 Weeks duration" : "4 Weeks duration"}</span>
                            <span>•</span>
                            <span>{project.language} Code</span>
                            <span>•</span>
                            <span>{project.applicationType}</span>
                          </div>

                          <p className="text-xs text-slate-650 leading-relaxed">
                            {project.description || "Build a fully functional industry-grade software project. Includes dynamic backend validation, optimized databases, and standard diagrams."}
                          </p>

                          <div className="space-y-2 border-t border-slate-100 pt-3">
                            <div className="font-extrabold text-[8px] uppercase tracking-wider text-slate-400">Project Highlights:</div>
                            <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                              <span className="text-rose-600 font-bold mt-0.5">✓</span>
                              <span>Complete production source code & database scripts included</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                              <span className="text-rose-600 font-bold mt-0.5">✓</span>
                              <span>Detailed SRS documentation & PPT slides ready to submit</span>
                            </div>
                            <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                              <span className="text-rose-600 font-bold mt-0.5">✓</span>
                              <span>Includes system architecture, ER, and UML class diagrams</span>
                            </div>
                          </div>

                          <Link to={`/project/${project.id || (project as any)._id}`} className="block w-full">
                            <Button className="w-full bg-[#5624d0] hover:bg-[#401b9c] text-white font-extrabold h-11 rounded-lg text-xs shadow-lg shadow-purple-500/10 mt-2">
                              Explore Project
                            </Button>
                          </Link>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                );
              })}
            </div>
          )}

          {/* Internships Shelf */}
          {activeTab === "internships" && (
            <div className="animate-marquee-scroll-slow hover:[animation-play-state:paused] flex gap-8 py-4 w-max">
              {[...featuredInternships, ...featuredInternships, ...featuredInternships].map((intern, idx) => (
                <div key={`${intern.id}-${idx}`} className="w-[340px] shrink-0 h-full preserve-3d relative hover:z-50">
                  <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <div className="h-full">
                        <Tilt3D maxTilt={6} scale={1.01} className="h-full">
                          <Link to={`/internships/${intern.id}`} className="block h-full preserve-3d">
                            <Card className="group overflow-hidden bg-slate-100 border border-slate-300 hover:border-rose-500/35 hover:shadow-lg shadow-sm transition-all duration-300 h-full flex flex-col justify-between text-left p-6 rounded-2xl preserve-3d">
                              
                              <div>
                                {/* Header */}
                                <div className="flex items-center gap-3.5 mb-4 text-left border-b border-slate-100 pb-4">
                                  <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/50">
                                    <Briefcase className="h-4.5 w-4.5" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-xs text-slate-800">{intern.institution}</h4>
                                    <p className="text-[8px] text-slate-450 uppercase tracking-widest font-extrabold">Verified Partner</p>
                                  </div>
                                </div>

                                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wide select-none shadow-sm">
                                  {intern.internshipType}
                                </span>

                                <h3 
                                  className="font-bold text-sm md:text-base text-slate-800 line-clamp-1 mt-3 mb-2 group-hover:text-rose-600 transition-colors"
                                  style={{ transform: "translateZ(15px)" }}
                                >
                                  {intern.title}
                                </h3>

                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 h-10">
                                  {intern.description}
                                </p>
                              </div>

                              <div className="space-y-4 pt-4 border-t border-slate-100 mt-5">
                                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                    <span>{intern.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                    <span>{intern.internshipType === "Remote" ? "WFH" : "On-site"}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs font-semibold text-left select-none">
                                  <Award className="h-4 w-4 text-emerald-500" />
                                  <span className="text-emerald-600 font-bold">ISO Certificate Included</span>
                                </div>

                                <Button className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold h-10 text-xs shadow-lg shadow-rose-500/10">
                                  Apply Now
                                </Button>
                              </div>
                            </Card>
                          </Link>
                        </Tilt3D>
                      </div>
                    </HoverCardTrigger>
                    
                    <HoverCardContent side="right" sideOffset={15} className="w-[330px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-6 text-slate-800 z-50 text-left relative">
                      <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-extrabold text-sm md:text-base text-slate-900 leading-snug">{intern.title}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">ISO Certified</span>
                            <span className="text-[9px] text-slate-500 font-semibold">Updated {currentUpdateDate}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-500 font-bold tracking-wide flex items-center gap-2">
                          <span>{intern.duration} program</span>
                          <span>•</span>
                          <span>{intern.internshipType} Mode</span>
                          <span>•</span>
                          <span>Placement Linked</span>
                        </div>

                        <p className="text-xs text-slate-650 leading-relaxed">
                          {intern.description}
                        </p>

                        <div className="space-y-2 border-t border-slate-100 pt-3">
                          <div className="font-extrabold text-[8px] uppercase tracking-wider text-slate-400">Internship Syllabus Highlights:</div>
                          <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                            <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                            <span>Get live industrial coding tasks reviewed by tech leads</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                            <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                            <span>Earn ISO 9001:2015 verified credentials for resumes</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                            <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                            <span>Direct placement referral interviews with partner colleges</span>
                          </div>
                        </div>

                          <Link to={`/internships/${intern.id}`} className="block w-full">
                            <Button className="w-full bg-[#5624d0] hover:bg-[#401b9c] text-white font-extrabold h-11 rounded-lg text-xs shadow-lg shadow-purple-500/10 mt-2">
                              Apply for Internship
                            </Button>
                          </Link>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          )}

          {/* Courses Shelf */}
          {activeTab === "courses" && (
            <div className="animate-marquee-scroll-slow hover:[animation-play-state:paused] flex gap-8 py-4 w-max">
              {[...featuredCourses, ...featuredCourses, ...featuredCourses].map((course, idx) => (
                <div key={`${course.id}-${idx}`} className="w-[340px] shrink-0 h-full preserve-3d relative hover:z-50">
                  <HoverCard openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <div className="h-full">
                        <Tilt3D maxTilt={6} scale={1.01} className="h-full">
                          <Link to={`/courses/${course.id}`} className="block h-full preserve-3d">
                            <Card className="group overflow-hidden bg-slate-100 border border-slate-300 hover:border-rose-500/35 hover:shadow-lg shadow-sm transition-all duration-300 h-full flex flex-col justify-between text-left rounded-2xl preserve-3d">
                              
                              {/* Thumbnail */}
                              <div className="relative h-48 bg-slate-100 overflow-hidden">
                                <img 
                                  src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80"} 
                                  alt={course.title}
                                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                                />
                                <span className="absolute top-3 left-3 text-[9px] font-bold text-white bg-rose-600 px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                                  {course.category}
                                </span>
                              </div>

                              <CardContent className="p-5 flex-1 flex flex-col justify-between preserve-3d bg-white">
                                <div className="preserve-3d">
                                  <div className="flex items-center justify-between mb-3 text-[10px] text-slate-500">
                                    <span className="font-semibold text-slate-650 flex items-center gap-1 select-none font-medium">
                                      <GraduationCap className="h-4 w-4 text-rose-500" />
                                      Academy Course
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                      <span className="font-bold text-slate-600">{course.rating}</span>
                                    </div>
                                  </div>

                                  <h3 
                                    className="font-bold text-sm md:text-base text-slate-800 line-clamp-1 mb-2 group-hover:text-rose-600 transition-colors"
                                    style={{ transform: "translateZ(15px)" }}
                                  >
                                    {course.title}
                                  </h3>

                                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 h-10">
                                    {course.description}
                                  </p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100 mt-5">
                                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                                      <span>{course.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                                      <span>{course.syllabus?.length || 8} Modules</span>
                                    </div>
                                  </div>

                                  <Button className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold h-10 text-xs shadow-lg shadow-rose-500/10">
                                    Explore Syllabus
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </Tilt3D>
                      </div>
                    </HoverCardTrigger>
                    
                    <HoverCardContent side="right" sideOffset={15} className="w-[330px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-6 text-slate-800 z-50 text-left relative">
                      <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-extrabold text-sm md:text-base text-slate-900 leading-snug">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] font-extrabold uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded">Bestseller</span>
                            <span className="text-[9px] text-slate-500 font-semibold">Updated {currentUpdateDate}</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-slate-500 font-bold tracking-wide flex items-center gap-2">
                          <span>{course.duration} total duration</span>
                          <span>•</span>
                          <span>{course.level} Level</span>
                          <span>•</span>
                          <span>{course.syllabus?.length || 8} syllabus modules</span>
                        </div>

                        <p className="text-xs text-slate-650 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="space-y-2 border-t border-slate-100 pt-3">
                          <div className="font-extrabold text-[8px] uppercase tracking-wider text-slate-400">Course Syllabus Outline:</div>
                          <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                            <span className="text-[#5624d0] font-bold mt-0.5">✓</span>
                            <span>Build real applications using framework coding playgrounds</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                            <span className="text-[#5624d0] font-bold mt-0.5">✓</span>
                            <span>1-on-1 code reviews with certified industry developers</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-[11px] text-slate-650 leading-tight">
                            <span className="text-[#5624d0] font-bold mt-0.5">✓</span>
                            <span>Includes ATS resume validation and coding practice guides</span>
                          </div>
                        </div>

                          <Link to={`/courses/${course.id}`} className="block w-full">
                            <Button className="w-full bg-[#5624d0] hover:bg-[#401b9c] text-white font-extrabold h-11 rounded-lg text-xs shadow-lg shadow-purple-500/10 mt-2">
                              Enroll in Course
                            </Button>
                          </Link>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
