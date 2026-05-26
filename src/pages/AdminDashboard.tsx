import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Save, FolderPlus, BookOpen, Briefcase, Settings, LogOut, Newspaper, Mail } from "lucide-react";

import { projectCategories } from "@/data/categories";
import { socket } from "@/lib/api";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [services, setServices] = useState([]);
  const [internships, setInternships] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);



  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "", code: "", category: "Cyber Security", selectedCategory: "Cyber Security", newCategory: "", domain: "Cyber Security", 
    language: "Python", applicationType: "Web App", description: "", thumbnail: "",
    images: ["", ""],
    techStack: {
      api: "", framework: "", ide: "", database: "",
      hasDFD: false, hasVideos: false, hasERDiagram: false, hasUML: false, hasPPT: false, hasSRS: false
    }
  });

  const [courseForm, setCourseForm] = useState({
    title: "", category: "python", selectedCategory: "python", newCategory: "", description: "", thumbnail: "", 
    price: 0, level: "Beginner", duration: "", effort: "", language: "English", certificate: "Yes",
    whatYouLearn: ["", ""], requirements: ["", ""],
    syllabus: [{ module: "Module 1", lessons: ["Lesson 1"] }]
  });

  const [internshipForm, setInternshipForm] = useState({
    title: "", category: "mern", selectedCategory: "mern", newCategory: "", description: "", thumbnail: "", 
    internshipType: "Remote", duration: "", price: 0,
    whatYouLearn: ["", ""], requirements: ["", ""], whoThisIsFor: ["", ""], eligibility: "",
    hasRealTimeProjects: true, hasJobOpportunity: true, hasCertification: true
  });

  const [serviceForm, setServiceForm] = useState({
    title: "", description: "", iconName: "Code"
  });

  const [blogForm, setBlogForm] = useState({
    title: "", content: "", author: "Admin", thumbnail: "", tags: ["Technology"]
  });



  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const isAuth = localStorage.getItem("isAdminAuth");
    if (!isAuth) {
      toast.error("Unauthorized access. Please login.");
      navigate("/admin");
    } else {
      fetchData();
      
      // Listen for real-time updates
      socket.on("data_updated", (data) => {
        console.log("Real-time update received:", data);
        fetchData();
      });

      return () => {
        socket.off("data_updated");
      };
    }
  }, [navigate]);


  const handleLogout = () => {
    localStorage.removeItem("isAdminAuth");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const fetchData = async () => {
    try {
      const [projRes, courseRes, servRes, internRes, blogRes, contactRes] = await Promise.all([
        fetch(`${API_URL}/projects`),
        fetch(`${API_URL}/courses`),
        fetch(`${API_URL}/services`),
        fetch(`${API_URL}/internships`),
        fetch(`${API_URL}/blogs`),
        fetch(`${API_URL}/contact`)
      ]);

      const projData = await projRes.json();
      const courseData = await courseRes.json();
      const servData = await servRes.json();
      const internData = await internRes.json();
      const blogData = await blogRes.json();
      const contactData = await contactRes.json();

      setProjects(Array.isArray(projData) ? projData : []);
      setCourses(Array.isArray(courseData) ? courseData : []);
      setServices(Array.isArray(servData) ? servData : []);
      setInternships(Array.isArray(internData) ? internData : []);
      setBlogs(Array.isArray(blogData) ? blogData : []);
      setContacts(Array.isArray(contactData) ? contactData : []);

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data. Check backend connection.");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const finalCategory = projectForm.selectedCategory === "new" ? projectForm.newCategory : projectForm.selectedCategory;
      const dataToSubmit = { ...projectForm, category: finalCategory };
      
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit)
      });
      if (res.ok) {
        toast.success("Project added successfully!");
        fetchData();
        setProjectForm({
          title: "", code: "", category: "Cyber Security", selectedCategory: "Cyber Security", newCategory: "", domain: "Cyber Security", 
          language: "Python", applicationType: "Web App", description: "", thumbnail: "",
          images: ["", ""],
          techStack: {
            api: "", framework: "", ide: "", database: "",
            hasDFD: false, hasVideos: false, hasERDiagram: false, hasUML: false, hasPPT: false, hasSRS: false
          }
        });
      } else {
        const err = await res.json();
        toast.error(`Error: ${err.message || 'Failed to add project'}`);
      }
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const finalCategory = courseForm.selectedCategory === "new" ? courseForm.newCategory : courseForm.selectedCategory;
      const dataToSubmit = { ...courseForm, category: finalCategory };

      const res = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit)
      });
      if (res.ok) {
        toast.success("Course added successfully!");
        fetchData();
        setCourseForm({
          title: "", category: "python", selectedCategory: "python", newCategory: "", description: "", thumbnail: "", 
          price: 0, level: "Beginner", duration: "", effort: "", language: "English", certificate: "Yes",
          whatYouLearn: ["", ""], requirements: ["", ""],
          syllabus: [{ module: "Module 1", lessons: ["Lesson 1"] }]
        });
      } else {
        const err = await res.json();
        toast.error(`Error: ${err.message || 'Failed to add course'}`);
      }
    } catch (error) {
      toast.error("Failed to add course");
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceForm)
      });
      if (res.ok) {
        toast.success("Service added successfully!");
        fetchData();
        setServiceForm({ title: "", description: "", iconName: "Code" });
      } else {
        const err = await res.json();
        toast.error(`Error: ${err.message || 'Failed to add service'}`);
      }
    } catch (error) {
      toast.error("Failed to add service");
    }
  };

  const handleAddInternship = async (e) => {
    e.preventDefault();
    try {
      const finalCategory = internshipForm.selectedCategory === "new" ? internshipForm.newCategory : internshipForm.selectedCategory;
      const dataToSubmit = { ...internshipForm, category: finalCategory };

      const res = await fetch(`${API_URL}/internships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit)
      });
      if (res.ok) {
        toast.success("Internship added successfully!");
        fetchData();
        setInternshipForm({
          title: "", category: "mern", selectedCategory: "mern", newCategory: "", description: "", thumbnail: "", 
          internshipType: "Remote", duration: "", price: 0,
          whatYouLearn: ["", ""], requirements: ["", ""], whoThisIsFor: ["", ""], eligibility: "",
          hasRealTimeProjects: true, hasJobOpportunity: true, hasCertification: true
        });
      } else {
        const err = await res.json();
        toast.error(`Error: ${err.message || 'Failed to add internship'}`);
      }
    } catch (error) {
      toast.error("Failed to add internship");
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogForm)
      });
      if (res.ok) {
        toast.success("Blog post added successfully!");
        fetchData();
        setBlogForm({ title: "", content: "", author: "Admin", thumbnail: "", tags: ["Technology"] });
      } else {

        const err = await res.json();
        toast.error(`Error: ${err.message || 'Failed to add blog'}`);
      }
    } catch (error) {
      toast.error("Failed to add blog");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleDeleteItem = async (type: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`${API_URL}/${type}s/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(`${type} deleted successfully`);
        fetchData();
      } else {
        toast.error(`Failed to delete ${type}`);
      }
    } catch (error) {
      toast.error(`Error deleting ${type}`);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      const res = await fetch(`${API_URL}/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Message deleted");
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };



  const defaultCategories = projectCategories.map(c => c.id);
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeCourses = Array.isArray(courses) ? courses : [];
  const safeInternships = Array.isArray(internships) ? internships : [];
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const safeContacts = Array.isArray(contacts) ? contacts : [];

  const uniqueCategories = Array.from(new Set([...defaultCategories, ...safeProjects.map((p: any) => p.category)]));
  const uniqueCourseCategories = Array.from(new Set(["python", "mern-stack", "java-fullstack", ...safeCourses.map((c: any) => c.category)]));
  const uniqueInternshipCategories = Array.from(new Set(["mern", "python", "java", ...safeInternships.map((i: any) => i.category)]));


  return (
    <Layout>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your website content and track new submissions.</p>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="container py-12">
        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4" /> Projects
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Courses
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" /> Services
            </TabsTrigger>
            <TabsTrigger value="internships" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Internships
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" /> Blogs
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Messages
            </TabsTrigger>
          </TabsList>



          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 border-primary/20">
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Project Title</Label>
                      <Input value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} placeholder="e.g. AI Fraud Detection" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Project Code</Label>
                        <Input value={projectForm.code} onChange={(e) => setProjectForm({...projectForm, code: e.target.value})} placeholder="PRJ001" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Input value={projectForm.language} onChange={(e) => setProjectForm({...projectForm, language: e.target.value})} placeholder="Python, Java..." required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        onValueChange={(val) => setProjectForm({...projectForm, selectedCategory: val})} 
                        value={projectForm.selectedCategory}
                      >
                        <SelectTrigger><SelectValue placeholder="Select existing category..." /></SelectTrigger>
                        <SelectContent>
                          {uniqueCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                          <SelectItem value="new" className="text-primary font-semibold">+ Add New Category</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {projectForm.selectedCategory === "new" && (
                        <div className="mt-2 space-y-2 border-l-2 border-primary pl-4 py-2">
                          <Label>New Category Name</Label>
                          <Input 
                            value={projectForm.newCategory} 
                            onChange={(e) => setProjectForm({...projectForm, newCategory: e.target.value})} 
                            placeholder="e.g. Game Development" 
                            required 
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Domain</Label>
                        <Input value={projectForm.domain} onChange={(e) => setProjectForm({...projectForm, domain: e.target.value})} placeholder="Cyber Security" required />
                      </div>
                      <div className="space-y-2">
                        <Label>App Type</Label>
                        <Select 
                          onValueChange={(val) => setProjectForm({...projectForm, applicationType: val})} 
                          value={projectForm.applicationType}
                        >
                          <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Web App">Web App</SelectItem>
                            <SelectItem value="Desktop App">Desktop App</SelectItem>
                            <SelectItem value="Mobile App">Mobile App</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Thumbnail URL</Label>
                        <Input value={projectForm.thumbnail} onChange={(e) => setProjectForm({...projectForm, thumbnail: e.target.value})} placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Documentation URL</Label>
                        <Input value={projectForm.documentation || ""} onChange={(e) => setProjectForm({...projectForm, documentation: e.target.value})} placeholder="https://..." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Images (Comma separated URLs)</Label>
                      <Input value={projectForm.images?.join(", ") || ""} onChange={(e) => setProjectForm({...projectForm, images: e.target.value.split(", ")})} placeholder="https://..., https://..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Video Files (Comma separated URLs)</Label>
                      <Input value={projectForm.videoFiles?.join(", ") || ""} onChange={(e) => setProjectForm({...projectForm, videoFiles: e.target.value.split(", ")})} placeholder="https://..., https://..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} placeholder="Short overview..." required />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg space-y-4 border">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500">Tech Stack</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">API</Label>
                          <Input className="h-8 text-xs" value={projectForm.techStack.api} onChange={e => setProjectForm({...projectForm, techStack: {...projectForm.techStack, api: e.target.value}})} placeholder="e.g. Flask" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Web Framework</Label>
                          <Input className="h-8 text-xs" value={projectForm.techStack.framework} onChange={e => setProjectForm({...projectForm, techStack: {...projectForm.techStack, framework: e.target.value}})} placeholder="e.g. React" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">IDE</Label>
                          <Input className="h-8 text-xs" value={projectForm.techStack.ide} onChange={e => setProjectForm({...projectForm, techStack: {...projectForm.techStack, ide: e.target.value}})} placeholder="e.g. VS Code" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Database</Label>
                          <Input className="h-8 text-xs" value={projectForm.techStack.database} onChange={e => setProjectForm({...projectForm, techStack: {...projectForm.techStack, database: e.target.value}})} placeholder="e.g. MySQL" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg space-y-3 border">
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500">Documentation</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "hasDFD", label: "DFD Diagram" },
                          { id: "hasVideos", label: "Project Videos" },
                          { id: "hasERDiagram", label: "E-R Diagram" },
                          { id: "hasUML", label: "UML Diagrams" },
                          { id: "hasPPT", label: "Final PPT" },
                          { id: "hasSRS", label: "SRS Doc" }
                        ].map(item => (
                          <div key={item.id} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              id={`admin-${item.id}`}
                              checked={projectForm.techStack[item.id]}
                              onChange={e => setProjectForm({...projectForm, techStack: {...projectForm.techStack, [item.id]: e.target.checked}})}
                              className="h-3 w-3 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor={`admin-${item.id}`} className="text-[10px] cursor-pointer">{item.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Existing Projects</CardTitle></CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b">
                        <tr><th className="px-4 py-3 text-left">Code</th><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {safeProjects.map((proj: any) => (
                          <tr key={proj._id}>

                            <td className="px-4 py-3 font-mono text-xs text-primary">{proj.code}</td>
                            <td className="px-4 py-3 font-medium truncate max-w-[300px]">{proj.title}</td>
                            <td className="px-4 py-3 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteItem('project', proj._id)} 
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          {/* COURSES TAB */}
          <TabsContent value="courses" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 border-primary/20">
                <CardHeader><CardTitle>Add New Course</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCourse} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Course Title</Label>
                      <Input value={courseForm.title} onChange={(e) => setCourseForm({...courseForm, title: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        onValueChange={(val) => setCourseForm({...courseForm, selectedCategory: val})} 
                        value={courseForm.selectedCategory}
                      >
                        <SelectTrigger><SelectValue placeholder="Select existing category..." /></SelectTrigger>
                        <SelectContent>
                          {uniqueCourseCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                          <SelectItem value="new" className="text-primary font-semibold">+ Add New Category</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {courseForm.selectedCategory === "new" && (
                        <div className="mt-2 space-y-2 border-l-2 border-primary pl-4 py-2">
                          <Label>New Category Name</Label>
                          <Input 
                            value={courseForm.newCategory} 
                            onChange={(e) => setCourseForm({...courseForm, newCategory: e.target.value})} 
                            placeholder="e.g. Data Science" 
                            required 
                          />
                        </div>
                      )}
                    </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Price (₹)</Label>
                          <Input type="number" value={courseForm.price} onChange={(e) => setCourseForm({...courseForm, price: Number(e.target.value)})} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input value={courseForm.duration} onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})} placeholder="e.g. 10 Days" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Level</Label>
                          <Input value={courseForm.level} onChange={(e) => setCourseForm({...courseForm, level: e.target.value})} placeholder="Beginner" />
                        </div>
                        <div className="space-y-2">
                          <Label>Effort</Label>
                          <Input value={courseForm.effort} onChange={(e) => setCourseForm({...courseForm, effort: e.target.value})} placeholder="4-5 hours/day" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Input value={courseForm.language} onChange={(e) => setCourseForm({...courseForm, language: e.target.value})} placeholder="English" />
                        </div>
                        <div className="space-y-2">
                          <Label>Certificate</Label>
                          <Select onValueChange={(val) => setCourseForm({...courseForm, certificate: val})} value={courseForm.certificate}>
                            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Thumbnail URL</Label>
                        <Input value={courseForm.thumbnail} onChange={(e) => setCourseForm({...courseForm, thumbnail: e.target.value})} placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <Label>What you'll learn (Comma separated)</Label>
                        <Textarea value={courseForm.whatYouLearn.join(", ")} onChange={(e) => setCourseForm({...courseForm, whatYouLearn: e.target.value.split(", ")})} placeholder="Basics, Advanced, Deployment" />
                      </div>
                      <div className="space-y-2">
                        <Label>Requirements (Comma separated)</Label>
                        <Textarea value={courseForm.requirements.join(", ")} onChange={(e) => setCourseForm({...courseForm, requirements: e.target.value.split(", ")})} placeholder="Internet, Basic Math" />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea value={courseForm.description} onChange={(e) => setCourseForm({...courseForm, description: e.target.value})} required />
                      </div>
                      <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Course</Button>
                    </form>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Existing Courses</CardTitle></CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b">
                        <tr><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-left">Price</th><th className="px-4 py-3 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {safeCourses.map((c: any) => (
                          <tr key={c._id}>

                            <td className="px-4 py-3 font-medium">{c.title}</td>
                            <td className="px-4 py-3">₹{c.price}</td>
                            <td className="px-4 py-3 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteItem('course', c._id)} 
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          
          {/* SERVICES TAB */}
          <TabsContent value="services" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 border-primary/20">
                <CardHeader><CardTitle>Add New Service</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleAddService} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon Name</Label>
                      <Input value={serviceForm.iconName} onChange={(e) => setServiceForm({...serviceForm, iconName: e.target.value})} placeholder="e.g. Code, Shield, Cloud" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} required />
                    </div>
                    <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
                  </form>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Our Services</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((s: any) => (
                      <div key={s._id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-shadow">

                        <div>
                          <h4 className="font-bold text-slate-800">{s.title}</h4>
                          <p className="text-sm text-slate-500">{s.description}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteItem('service', s._id)} 
                          className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          {/* INTERNSHIPS TAB */}
          <TabsContent value="internships" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 border-primary/20">
                <CardHeader><CardTitle>Add New Internship</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleAddInternship} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Internship Title</Label>
                      <Input value={internshipForm.title} onChange={(e) => setInternshipForm({...internshipForm, title: e.target.value})} required />
                    </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select 
                            onValueChange={(val) => setInternshipForm({...internshipForm, selectedCategory: val})} 
                            value={internshipForm.selectedCategory}
                          >
                            <SelectTrigger><SelectValue placeholder="Select existing category..." /></SelectTrigger>
                            <SelectContent>
                              {uniqueInternshipCategories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                              <SelectItem value="new" className="text-primary font-semibold">+ Add New Category</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          {internshipForm.selectedCategory === "new" && (
                            <div className="mt-2 space-y-2 border-l-2 border-primary pl-4 py-2">
                              <Label>New Category Name</Label>
                              <Input 
                                value={internshipForm.newCategory} 
                                onChange={(e) => setInternshipForm({...internshipForm, newCategory: e.target.value})} 
                                placeholder="e.g. Data Science" 
                                required 
                              />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Price (₹)</Label>
                          <Input type="number" value={internshipForm.price} onChange={(e) => setInternshipForm({...internshipForm, price: Number(e.target.value)})} required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select onValueChange={(val) => setInternshipForm({...internshipForm, internshipType: val})} defaultValue={internshipForm.internshipType}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Remote">Remote</SelectItem>
                              <SelectItem value="On-site">On-site</SelectItem>
                              <SelectItem value="Hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Duration</Label>
                          <Input value={internshipForm.duration} onChange={(e) => setInternshipForm({...internshipForm, duration: e.target.value})} placeholder="e.g. 3 Months" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Thumbnail URL</Label>
                        <Input value={internshipForm.thumbnail} onChange={(e) => setInternshipForm({...internshipForm, thumbnail: e.target.value})} placeholder="https://..." />
                      </div>
                      <div className="grid grid-cols-3 gap-2 py-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="hasRealTimeProjects" checked={internshipForm.hasRealTimeProjects} onChange={(e) => setInternshipForm({...internshipForm, hasRealTimeProjects: e.target.checked})} className="h-3 w-3" />
                          <Label htmlFor="hasRealTimeProjects" className="text-xs">Real-Time Projects</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="hasJobOpportunity" checked={internshipForm.hasJobOpportunity} onChange={(e) => setInternshipForm({...internshipForm, hasJobOpportunity: e.target.checked})} className="h-3 w-3" />
                          <Label htmlFor="hasJobOpportunity" className="text-xs">Job Opportunity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="hasCertification" checked={internshipForm.hasCertification} onChange={(e) => setInternshipForm({...internshipForm, hasCertification: e.target.checked})} className="h-3 w-3" />
                          <Label htmlFor="hasCertification" className="text-xs">Certificate</Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Who this is for (Comma separated)</Label>
                        <Input value={internshipForm.whoThisIsFor.join(", ")} onChange={(e) => setInternshipForm({...internshipForm, whoThisIsFor: e.target.value.split(", ")})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Eligibility</Label>
                        <Input value={internshipForm.eligibility} onChange={(e) => setInternshipForm({...internshipForm, eligibility: e.target.value})} placeholder="e.g. Any Graduate/Student" />
                      </div>
                      <div className="space-y-2">
                        <Label>What you'll learn (Comma separated)</Label>
                        <Textarea value={internshipForm.whatYouLearn.join(", ")} onChange={(e) => setInternshipForm({...internshipForm, whatYouLearn: e.target.value.split(", ")})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Requirements (Comma separated)</Label>
                        <Textarea value={internshipForm.requirements.join(", ")} onChange={(e) => setInternshipForm({...internshipForm, requirements: e.target.value.split(", ")})} />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea value={internshipForm.description} onChange={(e) => setInternshipForm({...internshipForm, description: e.target.value})} required />
                      </div>
                      <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Internship</Button>
                    </form>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Existing Internships</CardTitle></CardHeader>
                <CardContent>
                   <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b">
                        <tr><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {safeInternships.map((i: any) => (
                          <tr key={i._id}>

                            <td className="px-4 py-3 font-medium">{i.title}</td>
                            <td className="px-4 py-3">{i.internshipType}</td>
                            <td className="px-4 py-3 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteItem('internship', i._id)} 
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          {/* BLOGS TAB */}
          <TabsContent value="blogs" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-1 border-primary/20">
                <CardHeader><CardTitle>Add New Blog Post</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={handleAddBlog} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Blog Title</Label>
                        <Input value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} placeholder="Enter blog title" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Author Name</Label>
                        <Input value={blogForm.author} onChange={(e) => setBlogForm({...blogForm, author: e.target.value})} placeholder="Admin" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Featured Image URL</Label>
                        <Input value={blogForm.thumbnail} onChange={(e) => setBlogForm({...blogForm, thumbnail: e.target.value})} placeholder="https://unsplash.com/..." />
                      </div>

                      <div className="space-y-2">
                        <Label>Tags (Comma separated)</Label>
                        <Input value={blogForm.tags.join(", ")} onChange={(e) => setBlogForm({...blogForm, tags: e.target.value.split(", ")})} placeholder="Tech, Development, Coding" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Blog Content (Supports HTML)</Label>
                      <Textarea 
                        value={blogForm.content} 
                        onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} 
                        className="min-h-[300px] font-mono text-sm" 
                        placeholder="<p>Write your blog content here...</p>"
                        required 
                      />
                      <p className="text-[10px] text-slate-500 italic">Pro-tip: Use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;b&gt; for formatting.</p>
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6">
                       <Plus className="mr-2 h-5 w-5" /> PUBLISH BLOG POST
                    </Button>

                  </form>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Published Blogs</CardTitle></CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b">
                        <tr><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-left">Author</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y">
                        {safeBlogs.map((b: any) => (
                          <tr key={b._id}>
                             <td className="px-4 py-3 font-medium truncate max-w-[200px]">{b.title}</td>

                            <td className="px-4 py-3">{b.author}</td>
                            <td className="px-4 py-3 text-xs text-slate-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteBlog(b._id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MESSAGES TAB */}
          <TabsContent value="messages">
             <Card>
                <CardHeader>
                   <CardTitle>Inquiries & Messages</CardTitle>
                   <CardDescription>Messages received from Contact form and Blog enquiry popups.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                      {safeContacts.length === 0 ? (
                        <p className="text-center py-12 text-slate-400">No messages yet.</p>
                      ) : (
                        safeContacts.map((msg: any) => (
                          <div key={msg._id} className="border rounded-xl p-6 bg-slate-50 relative group">

                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <h3 className="font-bold text-lg text-slate-900">{msg.name}</h3>
                                   <p className="text-sm text-primary font-medium">{msg.email}</p>
                                </div>
                                <div className="text-right">
                                   <p className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                                   <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => handleDeleteContact(msg._id)}
                                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                   >
                                      <Trash2 className="h-4 w-4" />
                                   </Button>
                                </div>
                             </div>
                             <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Subject: {msg.subject}</p>
                                <p className="text-slate-700 whitespace-pre-wrap">{msg.message}</p>
                             </div>
                          </div>
                        ))
                      )}
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>


      </div>
    </Layout>
  );
};

export default AdminDashboard;
