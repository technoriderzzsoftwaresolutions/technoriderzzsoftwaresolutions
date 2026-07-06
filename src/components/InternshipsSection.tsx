import { Link } from "react-router-dom";
import { Briefcase, MapPin, Calendar, Award, ChevronRight, Building, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { internships } from "@/data/internships";
import Tilt3D from "@/components/ui/Tilt3D";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { socket } from "@/lib/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function InternshipsSection() {
  const [internshipsList, setInternshipsList] = useState(internships);
  const [editingInternship, setEditingInternship] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true";

  const loadInternships = async () => {
    try {
      const res = await fetch(`${API_URL}/internships`);
      if (res.ok) {
        const apiInternships = await res.json();
        const merged = internships.map(staticItem => {
          const apiItem = apiInternships.find((api: any) => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(internships.map(s => String(s.id)));
        const newApiItems = apiInternships.filter((api: any) => !staticIds.has(String(api.id || api._id)));
        setInternshipsList([...merged, ...newApiItems]);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadInternships();
    socket.on("data_updated", loadInternships);
    return () => {
      socket.off("data_updated", loadInternships);
    };
  }, []);

  const handleDeleteInternship = async (internshipId: string, internshipTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm(`Are you sure you want to delete internship "${internshipTitle}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/internships/${internshipId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Internship deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to delete internship.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  const handleSaveInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInternship) return;
    try {
      const res = await fetch(`${API_URL}/internships/${editingInternship.id || (editingInternship as any)._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingInternship)
      });
      if (res.ok) {
        toast.success("Internship updated successfully!");
        setIsEditOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to update internship.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <section className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">
              Career Openings
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mt-4">
              Live Internship Opportunities
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2">
              Work on production-grade client apps, gain real experience, and build a verified portfolio.
            </p>
          </div>
          <Link to="/internships" className="shrink-0 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              View All Internships <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {internshipsList.slice(0, 3).map((intern) => (
            <div key={intern.id} className="h-full relative hover:z-50">
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <div className="h-full">
                    <Tilt3D maxTilt={8} scale={1.02} className="h-full">
                      <div className="flex flex-col justify-between h-full bg-slate-900/10 p-6 rounded-2xl border border-slate-900/60 shadow-sm hover:border-rose-500/20 hover:bg-slate-900/25 transition-all duration-300">
                        
                        <div>
                          {/* Company Header */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3.5 text-left">
                              <div className="h-10 w-10 rounded-xl bg-rose-950/20 text-rose-500 flex items-center justify-center border border-rose-900/30">
                                <Building className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{intern.institution}</h4>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Verified Partner</p>
                              </div>
                            </div>
                            {isAdmin && (
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setEditingInternship({
                                      ...intern,
                                      rating: intern.rating || 4.5,
                                      studentsEnrolled: intern.studentsEnrolled || 0,
                                      price: intern.price || 0,
                                      eligibility: intern.eligibility || "Any Graduate/Student",
                                      hasRealTimeProjects: intern.hasRealTimeProjects !== false,
                                      hasJobOpportunity: intern.hasJobOpportunity !== false,
                                      hasCertification: intern.hasCertification !== false,
                                      whatYouLearn: intern.whatYouLearn || [],
                                      requirements: intern.requirements || [],
                                      whoThisIsFor: intern.whoThisIsFor || []
                                    });
                                    setIsEditOpen(true);
                                  }}
                                  className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
                                  title="Edit Internship"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={(e) => handleDeleteInternship(intern.id || (intern as any)._id, intern.title, e)}
                                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
                                  title="Delete Internship"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Title & Type Badge */}
                          <div className="mb-4 text-left">
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded-full uppercase tracking-wide select-none">
                              {intern.internshipType}
                            </span>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1.5 line-clamp-1">
                              {intern.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 text-left">
                            {intern.description}
                          </p>
                        </div>

                        {/* Details Footer */}
                        <div className="space-y-4 pt-4 border-t border-slate-900/60">
                          <div className="grid grid-cols-2 gap-3 text-left">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              <span>{intern.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <MapPin className="h-4 w-4 text-slate-400" />
                              <span>{intern.internshipType === "Remote" ? "Work from Home" : "Hyderabad"}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 text-left">
                            <Award className="h-4 w-4 text-emerald-500" />
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">ISO Certificate Included</span>
                          </div>

                          <Link to={`/internships/${intern.id}`} className="block w-full">
                            <Button className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 shadow-lg shadow-rose-500/10">
                              Apply Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Tilt3D>
                  </div>
                </HoverCardTrigger>

                <HoverCardContent side="right" sideOffset={15} className="w-[300px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-5 text-slate-800 z-50 text-left">
                  <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {intern.internshipType} · Verified
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug mt-2">{intern.title}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">{intern.institution}</p>
                    </div>

                    <div className="text-[11px] text-slate-600 leading-relaxed">
                      {intern.description}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-600">
                      <div><strong>Duration:</strong> {intern.duration}</div>
                      <div><strong>Type:</strong> {intern.internshipType}</div>
                      <div><strong>Location:</strong> {intern.internshipType === "Remote" ? "Remote" : "Hyderabad"}</div>
                      <div><strong>Certificate:</strong> Included</div>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-200 pt-2.5">
                      <div className="font-extrabold text-[8px] uppercase tracking-wider text-slate-400">Highlights:</div>
                      {["Real client project exposure", "Mentored by industry experts", "Internship completion certificate"].map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={`/internships/${intern.id}`}>
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold h-10 rounded-lg text-xs mt-1">
                        Apply Now →
                      </Button>
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>

      </div>

      {/* Edit Internship Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit Internship Details</DialogTitle>
          </DialogHeader>
          {editingInternship && (
            <form onSubmit={handleSaveInternship} className="space-y-4 text-left mt-2">
              <div className="space-y-1">
                <Label htmlFor="intern-title">Internship Title</Label>
                <Input
                  id="intern-title"
                  type="text"
                  value={editingInternship.title}
                  onChange={(e) => setEditingInternship({ ...editingInternship, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="intern-institution">Institution / Partner</Label>
                  <Input
                    id="intern-institution"
                    type="text"
                    value={editingInternship.institution}
                    onChange={(e) => setEditingInternship({ ...editingInternship, institution: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="intern-category">Category</Label>
                  <Input
                    id="intern-category"
                    type="text"
                    value={editingInternship.category}
                    onChange={(e) => setEditingInternship({ ...editingInternship, category: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="intern-type">Internship Type</Label>
                  <Input
                    id="intern-type"
                    type="text"
                    value={editingInternship.internshipType}
                    onChange={(e) => setEditingInternship({ ...editingInternship, internshipType: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="intern-duration">Duration</Label>
                  <Input
                    id="intern-duration"
                    type="text"
                    value={editingInternship.duration}
                    onChange={(e) => setEditingInternship({ ...editingInternship, duration: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="intern-price">Price (₹)</Label>
                  <Input
                    id="intern-price"
                    type="number"
                    value={editingInternship.price}
                    onChange={(e) => setEditingInternship({ ...editingInternship, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="intern-rating">Rating</Label>
                  <Input
                    id="intern-rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingInternship.rating}
                    onChange={(e) => setEditingInternship({ ...editingInternship, rating: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="intern-enrolled">Enrolled Students</Label>
                  <Input
                    id="intern-enrolled"
                    type="number"
                    value={editingInternship.studentsEnrolled}
                    onChange={(e) => setEditingInternship({ ...editingInternship, studentsEnrolled: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="intern-eligibility">Eligibility</Label>
                <Input
                  id="intern-eligibility"
                  type="text"
                  value={editingInternship.eligibility}
                  onChange={(e) => setEditingInternship({ ...editingInternship, eligibility: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-between py-2 border-y border-slate-100 my-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="intern-realtime"
                    checked={editingInternship.hasRealTimeProjects}
                    onChange={(e) => setEditingInternship({ ...editingInternship, hasRealTimeProjects: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="intern-realtime" className="text-xs font-medium">Real-Time Projects</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="intern-job"
                    checked={editingInternship.hasJobOpportunity}
                    onChange={(e) => setEditingInternship({ ...editingInternship, hasJobOpportunity: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="intern-job" className="text-xs font-medium">Job Opportunity</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="intern-cert"
                    checked={editingInternship.hasCertification}
                    onChange={(e) => setEditingInternship({ ...editingInternship, hasCertification: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="intern-cert" className="text-xs font-medium">Certification</Label>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="intern-learn">What you'll learn (comma-separated)</Label>
                <Textarea
                  id="intern-learn"
                  rows={2}
                  value={editingInternship.whatYouLearn?.join(", ") || ""}
                  onChange={(e) => setEditingInternship({ ...editingInternship, whatYouLearn: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="intern-reqs">Requirements (comma-separated)</Label>
                <Textarea
                  id="intern-reqs"
                  rows={2}
                  value={editingInternship.requirements?.join(", ") || ""}
                  onChange={(e) => setEditingInternship({ ...editingInternship, requirements: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="intern-who">Who this is for (comma-separated)</Label>
                <Textarea
                  id="intern-who"
                  rows={2}
                  value={editingInternship.whoThisIsFor?.join(", ") || ""}
                  onChange={(e) => setEditingInternship({ ...editingInternship, whoThisIsFor: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="intern-thumbnail">Thumbnail URL</Label>
                <Input
                  id="intern-thumbnail"
                  type="text"
                  value={editingInternship.thumbnail}
                  onChange={(e) => setEditingInternship({ ...editingInternship, thumbnail: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="intern-description">Description</Label>
                <Textarea
                  id="intern-description"
                  rows={3}
                  value={editingInternship.description}
                  onChange={(e) => setEditingInternship({ ...editingInternship, description: e.target.value })}
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
