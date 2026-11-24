import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { internships as staticInternships } from "@/data/internships";
import { fetchInternships, socket } from "@/lib/api";
import { ChevronRight, Clock, Users, Briefcase, MapPin, Calendar, Award, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "/api";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const Internships = () => {
  const [internships, setInternships] = useState(staticInternships);
  const [editingInternship, setEditingInternship] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true";

  const loadInternships = async () => {
    try {
      const apiInternships = await fetchInternships();
      if (apiInternships) {
        const merged = staticInternships.map(staticItem => {
          const apiItem = apiInternships.find(api => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(staticInternships.map(s => String(s.id)));
        const newApiItems = apiInternships.filter(api => !staticIds.has(String(api.id || api._id)));
        setInternships([...merged, ...newApiItems]);
      }
    } catch (err) { console.error(err); }
  };

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
        loadInternships();
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
        loadInternships();
      } else {
        toast.error("Failed to update internship.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  useEffect(() => {
    loadInternships();
    socket.on("data_updated", loadInternships);
    return () => { socket.off("data_updated"); };
  }, []);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Internships</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-primary/80 text-white py-12">
        <div className="container text-center relative">
          <h1 className="text-4xl font-bold mb-4">Internship Programs</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Gain real-world experience with our industry-focused internship programs
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div key={internship.id || (internship as any)._id} className="relative hover:z-50">
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <Link 
                    to={`/internships/${internship.id || (internship as any)._id}`}
                    className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group block h-full"
                  >
                    <div className="relative">
                      <SafeImage
                        src={internship.thumbnail}
                        alt={internship.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isAdmin && (
                        <div className="absolute top-3 right-3 z-50 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setEditingInternship({
                                ...internship,
                                rating: internship.rating || 4.5,
                                studentsEnrolled: internship.studentsEnrolled || 0,
                                price: internship.price || 0,
                                eligibility: internship.eligibility || "Any Graduate/Student",
                                hasRealTimeProjects: internship.hasRealTimeProjects !== false,
                                hasJobOpportunity: internship.hasJobOpportunity !== false,
                                hasCertification: internship.hasCertification !== false,
                                whatYouLearn: internship.whatYouLearn || [],
                                requirements: internship.requirements || [],
                                whoThisIsFor: internship.whoThisIsFor || []
                              });
                              setIsEditOpen(true);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
                            title="Edit Internship"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteInternship(internship.id || (internship as any)._id, internship.title, e)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
                            title="Delete Internship"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                      <Badge className="absolute top-3 left-3 bg-primary">{internship.category.toUpperCase()}</Badge>
                      <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">{internship.internshipType}</Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-left line-clamp-1">
                        {internship.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 text-left">
                        {internship.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{internship.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{internship.studentsEnrolled || "1,200"}</span>
                        </div>
                      </div>
                      {internship.hasJobOpportunity && (
                        <div className="mt-3 text-sm text-green-600 font-medium text-left">
                          ✓ Job Opportunity Available
                        </div>
                      )}
                    </div>
                  </Link>
                </HoverCardTrigger>

                <HoverCardContent side="right" sideOffset={15} className="w-[300px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-5 text-slate-800 z-50 text-left">
                  <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {internship.internshipType} · Verified
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug mt-2">{internship.title}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">{internship.institution || "Techno Riderzz Partner"}</p>
                    </div>

                    <div className="text-[11px] text-slate-600 leading-relaxed">
                      {internship.description}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-600">
                      <div><strong>Duration:</strong> {internship.duration}</div>
                      <div><strong>Type:</strong> {internship.internshipType}</div>
                      <div><strong>Location:</strong> {internship.internshipType === "Remote" ? "Remote" : "Hyderabad"}</div>
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

                    <Link to={`/internships/${internship.id || (internship as any)._id}`}>
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
                    value={editingInternship.institution || "Techno Riderzz Partner"}
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
    </Layout>
  );
};

export default Internships;
