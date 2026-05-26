import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { courses as staticCourses } from "@/data/courses";
import { fetchCourses, socket } from "@/lib/api";
import { ChevronRight, Clock, Users, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Courses = () => {
  const [courses, setCourses] = useState(staticCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "", category: "python", description: "", thumbnail: "", 
    price: 0, level: "Beginner", duration: "10 Days", effort: "4-5 hours/day",
    language: "English", certificate: "Yes",
    whatYouLearn: ["Master Python basics", "Build real-world apps"],
    requirements: ["Basic computer knowledge"],
    syllabus: [
      { module: "Fundamentals", lessons: ["Intro to Python", "Data Types"] }
    ]
  });

  const loadCourses = async () => {
    try {
      const apiCourses = await fetchCourses();
      if (apiCourses) setCourses([...staticCourses, ...apiCourses]);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadCourses();
    socket.on("data_updated", loadCourses);
    return () => { socket.off("data_updated"); };
  }, []);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse)
      });
      if (res.ok) {
        toast.success("Course added successfully!");
        setIsDialogOpen(false);
        setNewCourse({ title: "", category: "python", description: "", price: 0, duration: "10 Days" });
      } else {
        toast.error("Failed to add course.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/30 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Courses</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-primary/80 text-white py-12">
        <div className="container text-center relative">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Master in-demand skills with our comprehensive courses designed by industry experts
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id || (course as any)._id} 
              to={`/courses/${course.id || (course as any)._id}`}
              className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative">
                <SafeImage
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary">{course.category.toUpperCase()}</Badge>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.studentsEnrolled}</span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < course.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">({course.rating})</span>
                  </div>
                  <span className="font-bold text-lg text-primary">
                    {course.price === 0 ? "Free" : `₹${course.price}`}
                  </span>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
