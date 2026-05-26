import { Link } from "react-router-dom";
import { Star, Monitor, Globe, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/SafeImage";
import { Project } from "@/data/projects";

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

  return (
    <Link to={`/project/${project.id || (project as any)._id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
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
        <CardContent className="p-4">
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
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
  );
};

export default ProjectCard;