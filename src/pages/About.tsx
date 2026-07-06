import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { Award, Users, BookOpen, Briefcase } from "lucide-react";
import { useEffect } from "react";
import poojaImg from "@/assets/pooja.jpg";

const About = () => {
 
  const stats = [
    { icon: BookOpen, value: "500+", label: "Projects Delivered" },
    { icon: Users, value: "10,000+", label: "Happy Students" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Briefcase, value: "100+", label: "Corporate Clients" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Techno Riderzz</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Empowering students and professionals with quality projects, courses, and internships since 2015
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card border rounded-lg">
              <stat.icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Techno Riderzz, we believe in making quality education and practical projects accessible 
                to everyone. Our mission is to bridge the gap between academic learning and industry 
                requirements by providing real-world projects and hands-on training.
              </p>
              <p className="text-muted-foreground">
                We are committed to helping students excel in their academic projects while also 
                preparing them for successful careers in technology. Our team of experienced 
                developers and educators work tirelessly to create comprehensive learning resources.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span>Industry-relevant projects with complete documentation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span>Expert guidance and support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span>Affordable pricing for students</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span>Regular updates with latest technologies</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Our Leadership */}
{/* Our Leadership - Professional Profile Design */}
<div className="container py-16 md:py-24">
  <div className="flex flex-col items-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Leadership</h2>
    <div className="h-1.5 w-20 bg-primary rounded-full" />
  </div>

  <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
    <div className="grid grid-cols-1 lg:grid-cols-12">
      
      {/* Left Column: Image & Quick Info (Sidebar) */}
      <div className="lg:col-span-5 bg-slate-50 p-8 md:p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
        <div className="relative mb-8">
          {/* Decorative Ring */}
          <div className="absolute -inset-4 border border-primary/20 rounded-full animate-spin-slow" />
          <div className="w-48 h-48 md:w-64 md:h-64 bg-slate-950 rounded-full flex items-center justify-center text-white relative overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
            <img 
              src={poojaImg} 
              alt="Pooja Mishra" 
              className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Pooja Mishra</h3>
          <p className="text-primary font-semibold text-lg mb-4">Founder & CEO</p>
          
          <div className="flex flex-col gap-2 mb-6">
            <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
              M.Sc Computer Science
            </span>
            <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
              M.Tech Computer Science
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Continuous Narrative Content */}
      <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            Pooja Mishra is the Founder and CEO of the organization, holding dual Master’s degrees in Computer Science (M.Sc and M.Tech). She brings a strong blend of software industry expertise and academic excellence, allowing her to effectively translate complex technical concepts into real-world, scalable solutions.
          </p>

          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            She has deep specialization in Machine Learning (ML), Deep Learning (DL), Reinforcement Learning (RL), Natural Language Processing (NLP), Data Science, and Full-Stack Development. Throughout her career in the software industry, she has successfully designed, developed, and deployed intelligent, production-ready systems that align with modern business and technology demands.
          </p>

          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            In addition to her professional software industry experience, Pooja actively contributes as a trainer and mentor, enabling learners through structured, outcome-driven learning programs in advanced technologies. Her approach emphasizes practical implementation, clarity of concepts, and industry readiness, empowering individuals to confidently apply advanced technical skills in professional environments.
          </p>

          <p className="text-slate-700 text-lg leading-relaxed font-medium italic border-t pt-6 border-slate-100">
            As a visionary leader, technologist, and educator, Pooja Mishra is committed to innovation, continuous learning, and knowledge sharing. Her mission is to create lasting impact by equipping individuals and organizations with future-ready skills and intelligent solutions in an AI-driven digital landscape.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>
    </Layout>
  );
};

export default About;
