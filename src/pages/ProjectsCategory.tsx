import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/ProjectCard";
import { projects as staticProjects } from "@/data/projects";
import { getCategoryById } from "@/data/categories";
import { fetchProjects, addProject, socket } from "@/lib/api";
import { ChevronRight, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProjectsCategory = () => {
  const { category: rawCategory } = useParams<{ category: string }>();
  const category = decodeURIComponent(rawCategory || "");
  const categoryData = getCategoryById(category);
  const [projects, setProjects] = useState(staticProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "", code: "", category: category || "Deep Learning", domain: category || "Deep Learning",
    language: "Python", applicationType: "Web App", description: "", thumbnail: "",
    images: ["", ""],
    techStack: {
      api: "", framework: "", ide: "", database: "",
      hasDFD: false, hasVideos: false, hasERDiagram: false, hasUML: false, hasPPT: false, hasSRS: false
    }
  });

  const loadProjects = async () => {
    try {
      const apiProjects = await fetchProjects(category);
      if (apiProjects) {
        const merged = staticProjects.map(staticItem => {
          const apiItem = apiProjects.find(api => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(staticProjects.map(s => String(s.id)));
        const newApiItems = apiProjects.filter(api => !staticIds.has(String(api.id || api._id)));
        setProjects([...merged, ...newApiItems]);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadProjects();
    socket.on("data_updated", loadProjects);
    return () => { socket.off("data_updated"); };
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await addProject(newProject);
      if (success) {
        toast.success("Project added successfully!");
        setIsDialogOpen(false);
      } else {
        toast.error("Failed to add project.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };
  
  const filteredProjects = projects.filter(
    (p) => p.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <Layout>
      {/* Breadcrumb ... */}
      <div className="bg-muted/30 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/" className="hover:text-primary">Projects</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{categoryData?.name || category}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{categoryData?.name || `${category} Projects`}</h1>
            <p className="text-muted-foreground mt-2">
              {categoryData?.description || `Browse our collection of ${category} projects`}
            </p>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">
              Browse all projects
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsCategory;
