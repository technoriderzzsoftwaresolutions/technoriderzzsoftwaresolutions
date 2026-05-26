import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { internships } from "@/data/internships";
import { ChevronRight, Users, Clock, Building, Briefcase, Award, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { fetchInternshipById } from "@/lib/api";

const InternshipDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [internship, setInternship] = useState(internships.find((i) => i.id === id));
  const [loading, setLoading] = useState(true);
  const relatedInternships = internships.filter((i) => i.id !== id).slice(0, 3);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll 😌
    });

    const loadInternship = async () => {
      if (!id) return;
      try {
        const apiInternship = await fetchInternshipById(id);
        if (apiInternship && !apiInternship.message) {
          setInternship({
            ...apiInternship,
            id: apiInternship._id,
            whatYouLearn: apiInternship.whatYouLearn || [],
            requirements: apiInternship.requirements || [],
            whoThisIsFor: apiInternship.whoThisIsFor || []
          });
        }
      } catch (error) {
        console.error("Failed to fetch internship details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!internships.find((i) => i.id === id)) {
      loadInternship();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading && !internship) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading internship details...</p>
        </div>
      </Layout>
    );
  }


  if (!internship) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Internship not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const internshipStats = [
    { icon: Users, label: "Students Enrolled", value: internship.studentsEnrolled },
    { icon: Clock, label: "Duration", value: internship.duration },
    { icon: Building, label: "Institution", value: internship.institution },
    { icon: Briefcase, label: "Type", value: internship.internshipType },
    { icon: Award, label: "Real-time Projects", value: internship.hasRealTimeProjects ? "Yes" : "No" },
    { icon: Briefcase, label: "Job Opportunity", value: internship.hasJobOpportunity ? "Yes" : "No" },
    { icon: Award, label: "Certificate", value: internship.hasCertification ? "Yes" : "No" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/" className="hover:text-white">Internships</Link>
            <ChevronRight className="h-4 w-4" />
            <span>{internship.title}</span>
          </div>
          <Badge className="bg-primary mb-4">{internship.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{internship.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{internship.description}</p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{internship.studentsEnrolled}</div>
              <div className="text-sm text-gray-400">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{internship.duration}</div>
              <div className="text-sm text-gray-400">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{internship.length}</div>
              <div className="text-sm text-gray-400">Commitment</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <div className="bg-card border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {internship.whatYouLearn.map((point, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {internship.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Who This Internship Is For */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Who this internship is for</h2>
              <ul className="space-y-2">
                {internship.whoThisIsFor.map((audience, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Eligibility</h2>
              <p className="text-muted-foreground">{internship.eligibility}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg overflow-hidden sticky top-24">
              <SafeImage
                src={internship.thumbnail}
                alt={internship.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* <div className="text-3xl font-bold mb-2">
                  {internship.price === 0 ? "Free" : `₹${internship.price.toLocaleString()}`}
                </div> */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < internship.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                  ))}
                  <span className="ml-1 text-muted-foreground">({internship.rating})</span>
                </div>
                <Link to="/contact">
                <Button className="w-full bg-primary hover:bg-primary/90 mb-3">
                  Enroll Now
                </Button>
                </Link>
                <Link to="/contact">
                <Button variant="outline" className="w-full mb-6">
                  Request Callback
                </Button>
                </Link>
                
                <div className="space-y-3">
                  {internshipStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <stat.icon className="h-4 w-4" />
                        <span>{stat.label}</span>
                      </div>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Internships */}
        {relatedInternships.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Internships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedInternships.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/internships/${item.id}`}
                  className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <SafeImage
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <Badge className="mb-2">{item.category}</Badge>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.duration}</span>
                      <span>{item.studentsEnrolled} students</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InternshipDetails;
