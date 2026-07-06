import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Monitor, Globe, Code, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";
import { Project } from "@/data/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProjectCardProps {
  project: Project;
}

const domainColors: Record<string, string> = {
  "Machine Learning": "bg-domain-ml",
  "Deep Learning": "bg-domain-dl",
  "Artificial Intelligence": "bg-domain-ai",
  "Web Development": "bg-domain-web",
  "Mobile Development": "bg-domain-mobile",
  "Enterprise": "bg-info",
  "Cloud Computing": "bg-info",
  "Computer Vision": "bg-domain-ml",
  "Education": "bg-success",
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const AppIcon = project.applicationType === "Web App" ? Globe : project.applicationType === "Mobile App" ? Code : Monitor;
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleDeleteProject = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/projects/${project.id || (project as any)._id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Project deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to delete project.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      const res = await fetch(`${API_URL}/projects/${editingProject.id || (editingProject as any)._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject)
      });
      if (res.ok) {
        toast.success("Project updated successfully!");
        setIsEditOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to update project.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <div className="relative group h-full">
      <Link to={`/project/${project.id || (project as any)._id}`} className="block h-full">
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
          <div className="relative overflow-hidden">
            <SafeImage
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className={`absolute top-3 left-3 ${domainColors[project.domain] || "bg-primary"} text-white border-0`}>
              {project.domain}
            </Badge>
          </div>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {project.language}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <span className="text-sm font-medium">{project.rating}</span>
                </div>
              </div>
              <h3 className="font-semibold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <AppIcon className="h-3.5 w-3.5" />
                <span>{project.applicationType}</span>
              </div>
              {project.metaTags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs py-0">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>

      {isAdmin && (
        <div className="absolute top-3 right-3 z-50 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setEditingProject({
                ...project,
                techStack: project.techStack || {
                  api: "",
                  framework: "",
                  ide: "",
                  database: "",
                  hasDFD: false,
                  hasVideos: false,
                  hasERDiagram: false,
                  hasUML: false,
                  hasPPT: false,
                  hasSRS: false
                },
                images: project.images || ["", "", ""],
                metaTags: project.metaTags || [],
                videoFiles: project.videoFiles || [],
                documentation: project.documentation || ""
              });
              setIsEditOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
            title="Edit Project"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDeleteProject}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
            title="Delete Project"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Edit Project Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl w-full rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit Project Details</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <form onSubmit={handleSaveProject} className="space-y-4 text-left mt-2">
              <div className="space-y-1">
                <Label htmlFor="proj-title">Project Title</Label>
                <Input
                  id="proj-title"
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="proj-code">Project Code</Label>
                  <Input
                    id="proj-code"
                    type="text"
                    value={editingProject.code}
                    onChange={(e) => setEditingProject({ ...editingProject, code: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="proj-language">Language</Label>
                  <Input
                    id="proj-language"
                    type="text"
                    value={editingProject.language}
                    onChange={(e) => setEditingProject({ ...editingProject, language: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="proj-category">Category</Label>
                  <Input
                    id="proj-category"
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="proj-domain">Domain</Label>
                  <Input
                    id="proj-domain"
                    type="text"
                    value={editingProject.domain}
                    onChange={(e) => setEditingProject({ ...editingProject, domain: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="proj-rating">Rating (0 - 5)</Label>
                  <Input
                    id="proj-rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editingProject.rating}
                    onChange={(e) => setEditingProject({ ...editingProject, rating: parseFloat(e.target.value) || 4.5 })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="proj-app-type">Application Type</Label>
                  <select
                    id="proj-app-type"
                    value={editingProject.applicationType}
                    onChange={(e) => setEditingProject({ ...editingProject, applicationType: e.target.value as any })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="Web App">Web App</option>
                    <option value="Desktop App">Desktop App</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="proj-thumbnail">Thumbnail URL</Label>
                <Input
                  id="proj-thumbnail"
                  type="text"
                  value={editingProject.thumbnail}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="proj-description">Description</Label>
                <Textarea
                  id="proj-description"
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  required
                />
              </div>

              {/* Tech Stack Specs */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <h4 className="text-sm font-semibold text-slate-800">Tech Stack Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="proj-api">API Integration</Label>
                    <Input
                      id="proj-api"
                      type="text"
                      value={editingProject.techStack?.api || ""}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        techStack: { ...editingProject.techStack, api: e.target.value }
                      })}
                      placeholder="e.g. REST API, GraphQL"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="proj-framework">Framework</Label>
                    <Input
                      id="proj-framework"
                      type="text"
                      value={editingProject.techStack?.framework || ""}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        techStack: { ...editingProject.techStack, framework: e.target.value }
                      })}
                      placeholder="e.g. React, Django"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="proj-ide">IDE Tool</Label>
                    <Input
                      id="proj-ide"
                      type="text"
                      value={editingProject.techStack?.ide || ""}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        techStack: { ...editingProject.techStack, ide: e.target.value }
                      })}
                      placeholder="e.g. VS Code, PyCharm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="proj-database">Database</Label>
                    <Input
                      id="proj-database"
                      type="text"
                      value={editingProject.techStack?.database || ""}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        techStack: { ...editingProject.techStack, database: e.target.value }
                      })}
                      placeholder="e.g. MongoDB, MySQL"
                    />
                  </div>
                </div>
              </div>

              {/* Checklist & Resources */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
                <h4 className="text-sm font-semibold text-slate-800">Checklist & Resources Included</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "hasDFD", label: "DFD Diagram" },
                    { id: "hasVideos", label: "Video Demo" },
                    { id: "hasERDiagram", label: "ER Diagram" },
                    { id: "hasUML", label: "UML Diagram" },
                    { id: "hasPPT", label: "Final PPT" },
                    { id: "hasSRS", label: "SRS Doc" }
                  ].map(item => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`modal-${item.id}`}
                        checked={!!(editingProject.techStack?.[item.id as keyof typeof editingProject.techStack])}
                        onChange={e => setEditingProject({
                          ...editingProject,
                          techStack: {
                            ...editingProject.techStack,
                            [item.id]: e.target.checked
                          }
                        })}
                        className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={`modal-${item.id}`} className="text-xs cursor-pointer">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screenshots Gallery */}
              <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <h4 className="text-sm font-semibold text-slate-800">Gallery Screenshots</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="space-y-1">
                      <Label htmlFor={`proj-image-${idx}`}>Screenshot {idx + 1} URL</Label>
                      <Input
                        id={`proj-image-${idx}`}
                        type="text"
                        value={editingProject.images?.[idx] || ""}
                        onChange={(e) => {
                          const newImages = [...(editingProject.images || [])];
                          newImages[idx] = e.target.value;
                          setEditingProject({ ...editingProject, images: newImages });
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentation & Video & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="proj-documentation">Documentation URL/Details</Label>
                  <Input
                    id="proj-documentation"
                    type="text"
                    value={editingProject.documentation || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, documentation: e.target.value })}
                    placeholder="Documentation path or description"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="proj-video-files">Video Files (Comma separated)</Label>
                  <Input
                    id="proj-video-files"
                    type="text"
                    value={editingProject.videoFiles?.join(", ") || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, videoFiles: e.target.value.split(", ").filter(Boolean) })}
                    placeholder="e.g. Attack Simulation, Sector Overview"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="proj-metatags">Meta Tags (Comma separated)</Label>
                <Input
                  id="proj-metatags"
                  type="text"
                  value={editingProject.metaTags?.join(", ") || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, metaTags: e.target.value.split(", ").filter(Boolean) })}
                  placeholder="e.g. IEEE, Smart Grid, Cyber Attack"
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
    </div>
  );
};

export default ProjectCard;