import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Code, Database, Smartphone, Globe, Cpu, Cloud, FileCode, Users, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fetchServices, socket } from "@/lib/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Services = () => {
  const staticServices = [
    {
      icon: Code,
      title: "Custom Project Development",
      description: "Get custom-built projects tailored to your specific requirements. We develop projects in Python, Java, .NET, PHP, and more."
    },
    {
      icon: Database,
      title: "Database Design & Development",
      description: "Professional database design services including ER diagrams, normalization, and implementation in MySQL, PostgreSQL, MongoDB."
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for Android and iOS using Flutter, React Native, and Kotlin."
    },
    {
      icon: Globe,
      title: "Web Application Development",
      description: "Full-stack web development using modern frameworks like React, Angular, Django, Node.js, and ASP.NET."
    },
    {
      icon: Cpu,
      title: "Machine Learning Projects",
      description: "AI and ML project development including predictive models, NLP, computer vision, and deep learning applications."
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "AWS, Azure, and Google Cloud based projects with deployment, scaling, and management services."
    },
    {
      icon: FileCode,
      title: "Project Documentation",
      description: "Complete project documentation including SRS, DFD, UML diagrams, ER diagrams, and final presentation slides."
    },
    {
      icon: Users,
      title: "Technical Training",
      description: "Corporate and individual training programs in various technologies with hands-on project experience."
    }
  ];

  const [services, setServices] = useState(staticServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "", iconName: "Code" });

  const loadServices = async () => {
    try {
      const apiServices = await fetchServices();
      if (apiServices && apiServices.length > 0) {
        const iconMap: Record<string, any> = {
          Code, Database, Smartphone, Globe, Cpu, Cloud, FileCode, Users
        };
        const mappedApiServices = apiServices.map(s => ({
          ...s,
          icon: iconMap[s.iconName] || Code
        }));
        setServices([...staticServices, ...mappedApiServices]);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  useEffect(() => {
    loadServices();
    socket.on("data_updated", loadServices);
    return () => { socket.off("data_updated"); };
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService)
      });
      if (res.ok) {
        toast.success("Service added successfully!");
        setIsDialogOpen(false);
        setNewService({ title: "", description: "", iconName: "Code" });
      } else {
        toast.error("Failed to add service.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions for all your academic and professional project needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project requirements. Our team of experts 
            is ready to help you build the perfect solution.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10" asChild>
              <Link to="/">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
