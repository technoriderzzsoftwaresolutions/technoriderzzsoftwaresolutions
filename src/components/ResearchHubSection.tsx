import { useState, useEffect } from "react";
import { socket } from "@/lib/api";
import { Link } from "react-router-dom";
import { BookOpen, FileText, CheckCircle, ChevronRight, Award, Compass, Scale, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Tilt3D from "@/components/ui/Tilt3D";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ResearchService {
  title: string;
  badge: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
}

const services: ResearchService[] = [
  {
    title: "IEEE Publication Support",
    badge: "IEEE Conferences",
    description: "End-to-end guidance for drafting, formatting, and submitting engineering papers to top IEEE international conferences.",
    features: ["LaTeX template compliance", "Double-blind review check", "Camera-ready paper prep"],
    icon: FileText,
    color: "from-rose-500/20 to-fuchsia-500/5 text-rose-600 dark:text-rose-400"
  },
  {
    title: "Scopus & SCI Journals",
    badge: "High Impact Factor",
    description: "Targeted support for publishing in peer-reviewed Scopus-indexed, SCI, and UGC Care-listed international journals.",
    features: ["Journal matchmaking", "Plagiarism check (Turnitin)", "Reviewer rebuttal support"],
    icon: Award,
    color: "from-emerald-500/20 to-teal-500/5 text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Patent Filing Assistance",
    badge: "Indian Patent Office",
    description: "Support for student innovators to draft claims, perform prior-art searches, and file provisional/complete patents.",
    features: ["Prior-art search report", "Drafting Form 1 & Form 2", "Response to FER queries"],
    icon: Scale,
    color: "from-amber-500/20 to-orange-500/5 text-amber-600 dark:text-amber-400"
  },
  {
    title: "Research Methodology",
    badge: "Writing & Datasets",
    description: "Assistance in defining paper abstracts, literature surveys, experimental setup, and sifting through datasets.",
    features: ["Abstract optimization", "Python simulation code", "UML/Block architecture design"],
    icon: Compass,
    color: "from-purple-500/20 to-violet-500/5 text-purple-600 dark:text-purple-400"
  }
];

export default function ResearchHubSection() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [servicesList, setServicesList] = useState<any[]>(services);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true";

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      if (res.ok) {
        const apiServices = await res.json();
        if (apiServices && apiServices.length > 0) {
          const merged = services.map(staticItem => {
            const apiItem = apiServices.find((api: any) => api.title.toLowerCase() === staticItem.title.toLowerCase());
            if (apiItem) {
              return {
                id: apiItem._id || apiItem.id,
                _id: apiItem._id || apiItem.id,
                title: apiItem.title,
                description: apiItem.description,
                badge: apiItem.badge || staticItem.badge,
                features: apiItem.features || staticItem.features,
                color: apiItem.color || staticItem.color,
                icon: staticItem.icon
              };
            }
            return staticItem;
          });

          const staticTitles = new Set(services.map(s => s.title.toLowerCase()));
          const newApiItems = apiServices.filter((api: any) => !staticTitles.has(api.title.toLowerCase()))
            .map((api: any) => ({
              id: api._id || api.id,
              _id: api._id || api.id,
              title: api.title,
              description: api.description,
              badge: api.badge || "Research Service",
              features: api.features || ["Consulting", "Documentation"],
              color: api.color || "from-rose-500/20 to-fuchsia-500/5 text-rose-600",
              icon: FileText
            }));

          setServicesList([...merged, ...newApiItems]);
        } else {
          setServicesList(services);
        }
      }
    } catch (err) {
      console.error(err);
      setServicesList(services);
    }
  };

  useEffect(() => {
    fetchServices();
    socket.on("data_updated", fetchServices);
    return () => {
      socket.off("data_updated", fetchServices);
    };
  }, []);

  const handleDeleteService = async (index: number, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) return;
    const serviceToDelete = servicesList[index];
    try {
      if (serviceToDelete._id || serviceToDelete.id) {
        const id = serviceToDelete._id || serviceToDelete.id;
        const res = await fetch(`${API_URL}/services/${id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          toast.success("Service deleted successfully!");
          fetchServices();
        } else {
          toast.error("Failed to delete service.");
        }
      } else {
        setServicesList(servicesList.filter((_, idx) => idx !== index));
        toast.success("Service deleted locally!");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex === null || !editingService) return;
    try {
      if (editingService._id || editingService.id) {
        const id = editingService._id || editingService.id;
        const res = await fetch(`${API_URL}/services/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingService)
        });
        if (res.ok) {
          toast.success("Service updated successfully!");
          setIsEditOpen(false);
          fetchServices();
        } else {
          toast.error("Failed to update service.");
        }
      } else {
        const updated = [...servicesList];
        updated[editingIndex] = editingService;
        setServicesList(updated);
        setIsEditOpen(false);
        toast.success("Service details updated locally!");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <section className="py-8 md:py-12 bg-background text-slate-900 relative overflow-hidden border-b border-slate-100/60">
      {/* Background visual accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-fuchsia-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full">
            ResearchHub
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Academic Research & Journal Publications
          </h2>
          <div className="h-1 bg-rose-600 w-16 mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-slate-500 mt-4 leading-relaxed">
            Turn your engineering projects into certified publications. Get guided research support for IEEE conferences, high-impact journals, and patent registration.
          </p>
        </div>

        {/* Horizontal Infinite Marquee Ticker */}
        <div className="relative w-full overflow-hidden mb-6">
          {/* Left/Right fading gradients to blend marquee edges smoothly */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-scroll-slow flex gap-6 py-4">
            {[...servicesList, ...servicesList, ...servicesList].map((service, idx) => {
              const Icon = service.icon;
              const iconColorClass = service.color.includes("text-rose-600") ? "text-rose-500" :
                                     service.color.includes("text-emerald-600") ? "text-emerald-500" :
                                     service.color.includes("text-amber-600") ? "text-amber-500" :
                                     service.color.includes("text-purple-600") ? "text-purple-500" : "text-slate-400";
              return (
                <div key={`${service.title}-${idx}`} className="w-[285px] shrink-0 h-full relative hover:z-50">
                  <HoverCard openDelay={150} closeDelay={150}>
                    <HoverCardTrigger asChild>
                      <div className="h-full">
                        <Tilt3D maxTilt={8} scale={1.03} className="h-full">
                          <div className="flex flex-col justify-between h-full bg-slate-100 border border-slate-300 rounded-2xl p-6 hover:border-rose-300 hover:shadow-lg transition-all duration-300 text-left min-h-[380px] shadow-sm">
                            
                            <div>
                              {/* Badge and Icon */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-rose-500 bg-rose-950/20 border border-rose-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                                    {service.badge}
                                  </span>
                                  {isAdmin && (
                                    <div className="flex gap-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          const origIdx = idx % servicesList.length;
                                          setEditingIndex(origIdx);
                                          const item = servicesList[origIdx];
                                          setEditingService({
                                            ...item,
                                            features: item.features || [],
                                            color: item.color || "from-rose-500/20 to-fuchsia-500/5 text-rose-600",
                                            badge: item.badge || "Core Research"
                                          });
                                          setIsEditOpen(true);
                                        }}
                                        className="bg-amber-500 hover:bg-amber-600 text-white p-1 rounded-full shadow border border-white transition-all hover:scale-105"
                                        title="Edit Service"
                                      >
                                        <Pencil className="h-3 w-3" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          const origIdx = idx % servicesList.length;
                                          handleDeleteService(origIdx, service.title, e);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow border border-white transition-all hover:scale-105"
                                        title="Delete Service"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <div className={`${iconColorClass} flex items-center justify-center`}>
                                  <Icon className="h-6 w-6" />
                                </div>
                              </div>

                              {/* Title */}
                              <h3 className="text-lg font-bold text-slate-900 mb-3">
                                {service.title}
                              </h3>

                              {/* Description */}
                              <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-5">
                                {service.description}
                              </p>

                              {/* Features list */}
                              <ul className="space-y-2 mb-6">
                                {service.features.map((feat, fIdx) => (
                                  <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                                    <CheckCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* CTA Action */}
                            <Link 
                              to="/contact?subject=Research" 
                              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors mt-auto"
                            >
                              Consult Advisor <ChevronRight className="h-3.5 w-3.5" />
                            </Link>

                          </div>
                        </Tilt3D>
                      </div>
                    </HoverCardTrigger>

                    <HoverCardContent side="right" sideOffset={15} className="w-[300px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-5 text-slate-800 z-50 text-left">
                      <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                            {service.badge}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-900 leading-snug mt-2">{service.title}</h4>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{service.description}</p>
                        <div className="space-y-1.5 border-t border-slate-200 pt-2.5">
                          <div className="font-extrabold text-[8px] uppercase tracking-wider text-slate-400">What's Included:</div>
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-[11px] text-slate-600">
                              <CheckCircle className="h-3 w-3 text-rose-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                        <Link to="/contact?subject=Research">
                          <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold h-10 rounded-lg text-xs mt-1">
                            Consult Advisor →
                          </Button>
                        </Link>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Hub stats / Call to action banner */}
        <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-left shadow-sm">
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-rose-500" />
              Need custom research assistance?
            </h4>
            <p className="text-xs md:text-sm text-slate-500">
              Submit your project title or abstract, and our academic panel will evaluate publication suitability within 24 hours.
            </p>
          </div>
          <Link to="/contact?subject=Research">
            <Button className="rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 px-8 shrink-0 shadow-lg shadow-rose-500/10">
              Submit Abstract
            </Button>
          </Link>
        </div>

      </div>
      {/* Edit Service Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit Research Service</DialogTitle>
          </DialogHeader>
          {editingService && (
            <form onSubmit={handleSaveService} className="space-y-4 text-left mt-2">
              <div className="space-y-1">
                <Label htmlFor="service-title">Service Title</Label>
                <Input
                  id="service-title"
                  type="text"
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="service-badge">Badge Text</Label>
                <Input
                  id="service-badge"
                  type="text"
                  value={editingService.badge}
                  onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  rows={3}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="service-features">Features (comma-separated)</Label>
                <Textarea
                  id="service-features"
                  rows={2}
                  value={editingService.features?.join(", ") || ""}
                  onChange={(e) => setEditingService({ ...editingService, features: e.target.value.split(",").map(t => t.trim()) })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="service-color">Color Style / Gradient Classes</Label>
                <Input
                  id="service-color"
                  type="text"
                  value={editingService.color}
                  onChange={(e) => setEditingService({ ...editingService, color: e.target.value })}
                  placeholder="e.g. from-rose-500/20 to-fuchsia-500/5 text-rose-600"
                  required
                />
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
