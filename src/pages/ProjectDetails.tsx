import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { projects as staticProjects } from "@/data/projects";
import { fetchProjectById } from "@/lib/api";
import { ChevronRight, FileText, Video, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import SafeImage from "@/components/SafeImage";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(staticProjects.find((p) => p.id === id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      try {
        // Try fetching from API if it looks like a MongoDB ID or if not found in static
        const apiProject = await fetchProjectById(id);
        if (apiProject && !apiProject.message) {
          setProject({
            ...apiProject,
            id: apiProject._id, // Normalize ID
            images: apiProject.images || [],
            videoFiles: apiProject.videoFiles || [],
            techStack: apiProject.techStack || {}
          });
        }
      } catch (error) {
        console.error("Failed to fetch project details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  const relatedProjects = staticProjects.filter((p) => p.id !== id && p.category === project?.category);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading && !project) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading project details...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const techStack = [
    { label: "API", value: project.techStack.api, available: true },
    { label: "Web Framework", value: project.techStack.framework, available: true },
    { label: "IDE", value: project.techStack.ide, available: true },
    { label: "Database", value: project.techStack.database, available: true },
    { label: "DFD Diagram", value: "", available: project.techStack.hasDFD },
    { label: "Videos", value: "", available: project.techStack.hasVideos },
    { label: "E-R Diagram", value: "", available: project.techStack.hasERDiagram },
    { label: "UML Diagrams", value: "", available: project.techStack.hasUML },
    { label: "Final PPT", value: "", available: project.techStack.hasPPT },
    { label: "SRS", value: "", available: project.techStack.hasSRS },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description || "Academic project by Techno Riderzz",
    "programmingLanguage": project.language,
    "codeRepository": project.code || "https://github.com/technoriderzz",
    "applicationCategory": project.applicationType,
    "runtimePlatform": project.techStack?.framework || "",
    "author": {
      "@type": "Organization",
      "name": "Techno Riderzz"
    }
  };

  return (
    <Layout>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/projects/${project.category.toLowerCase()}`} className="hover:text-primary">
              {project.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{project.title}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="secondary">{project.code}</Badge>
                <Badge variant="outline">{project.applicationType}</Badge>
                <Badge className="bg-primary text-primary-foreground">{project.language}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < project.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                  ))}
                  <span className="ml-1">({project.rating})</span>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="bg-muted rounded-lg overflow-hidden mb-6">
              <SafeImage
                src={project.images[selectedImage] || project.thumbnail}
                alt={project.title}
                className="w-full h-[400px] object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 mb-8">
              {project.images.slice(0, 4).map((img, i) => (
                <div onClick={() => setSelectedImage(i)} key={i} className="w-20 h-20 bg-muted rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary">
                  <SafeImage
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="documentation">Documentation & PPT</TabsTrigger>
                <TabsTrigger value="videos">Video Files</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Project Overview</h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <h4 className="text-lg font-semibold mb-3">Domain: {project.domain}</h4>
                  <h4 className="text-lg font-semibold mb-3">Key Features:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Complete source code with documentation</li>
                    <li>Database design with ER diagrams</li>
                    <li>User-friendly interface</li>
                    <li>Scalable architecture</li>
                    <li>Easy to customize and extend</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="documentation" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-semibold">Project Documentation</h4>
                      <p className="text-sm text-muted-foreground">{project.documentation}</p>
                    </div>
                    <Button className="ml-auto">Download</Button>
                  </div>
                  {project.techStack.hasPPT && (
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Final Presentation (PPT)</h4>
                        <p className="text-sm text-muted-foreground">PowerPoint presentation</p>
                      </div>
                      <Button className="ml-auto">Download</Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="videos" className="mt-6">
                {project.videoFiles.length > 0 ? (
                  <div className="space-y-4">
                    {project.videoFiles.map((video, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                        <Video className="h-8 w-8 text-primary" />
                        <div>
                          <h4 className="font-semibold">{video}</h4>
                          <p className="text-sm text-muted-foreground">Video tutorial</p>
                        </div>
                        <Button className="ml-auto">Watch</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No video files available for this project.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Tech Stack & Resources</h3>
              <div className="space-y-3">
                {techStack.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {item.value && <span className="text-sm">{item.value}</span>}
                      {item.available ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact">
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                  Get This Project
                </Button>
              </Link>
              {/* <Button variant="outline" className="w-full mt-3">
                Add to Cart
              </Button> */}
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetails;
