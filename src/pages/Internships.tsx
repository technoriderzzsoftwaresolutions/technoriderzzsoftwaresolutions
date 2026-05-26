import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { internships as staticInternships } from "@/data/internships";
import { fetchInternships, socket } from "@/lib/api";
import { ChevronRight, Clock, Users, Briefcase, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Internships = () => {
  const [internships, setInternships] = useState(staticInternships);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInternship, setNewInternship] = useState({
    title: "", category: "mern", description: "", thumbnail: "", 
    internshipType: "Remote", duration: "3 Months",
    whatYouLearn: ["Full stack development", "Real world projects"],
    requirements: ["Basic coding skills"],
    whoThisIsFor: ["Students", "Graduates"],
    eligibility: ["Any Technical background"],
    hasRealTimeProjects: true,
    hasJobOpportunity: true,
    hasCertification: true
  });

  const loadInternships = async () => {
    try {
      const apiInternships = await fetchInternships();
      if (apiInternships) setInternships([...staticInternships, ...apiInternships]);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadInternships();
    socket.on("data_updated", loadInternships);
    return () => { socket.off("data_updated"); };
  }, []);

  const handleAddInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/internships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInternship)
      });
      if (res.ok) {
        toast.success("Internship added successfully!");
        setIsDialogOpen(false);
        setNewInternship({ title: "", category: "mern", description: "", internshipType: "Remote", duration: "3 Months" });
      } else {
        toast.error("Failed to add internship.");
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
            <Link 
              key={internship.id || (internship as any)._id} 
              to={`/internships/${internship.id || (internship as any)._id}`}
              className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative">
                <SafeImage
                  src={internship.thumbnail}
                  alt={internship.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary">{internship.category.toUpperCase()}</Badge>
                <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">{internship.internshipType}</Badge>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {internship.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {internship.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{internship.studentsEnrolled}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{internship.length}</span>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < internship.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">({internship.rating})</span>
                  </div>
                  <span className="font-bold text-lg text-primary">
                    {internship.price === 0 ? "Free" : `₹${internship.price}`}
                  </span>
                </div> */}
                {internship.hasJobOpportunity && (
                  <div className="mt-3 text-sm text-green-600 font-medium">
                    ✓ Job Opportunity Available
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Internships;
