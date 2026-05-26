import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { courses as staticCourses } from "@/data/courses";
import { fetchCourseById } from "@/lib/api";
import { ChevronRight, Users, Clock, Building, BookOpen, Award, Globe, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState(staticCourses.find((c) => c.id === id));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;
      try {
        const apiCourse = await fetchCourseById(id);
        if (apiCourse && !apiCourse.message) {
          setCourse({
            ...apiCourse,
            id: apiCourse._id,
            syllabus: apiCourse.syllabus || [],
            whatYouLearn: apiCourse.whatYouLearn || [],
            requirements: apiCourse.requirements || []
          });
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  if (loading && !course) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading course details...</p>
        </div>
      </Layout>
    );
  }
 

  if (!course) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Go back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const courseStats = [
    { icon: Users, label: "Students", value: course.studentsEnrolled },
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: BookOpen, label: "Effort", value: course.effort },
    { icon: Building, label: "Institution", value: course.institution },
    { icon: Award, label: "Level", value: course.level },
    { icon: Globe, label: "Language", value: course.language },
    { icon: Award, label: "Certificate", value: course.hasCertificate ? "Yes" : "No" },
  ];

  const totalLessons = course.syllabus.reduce((acc, section) => acc + section.topics.length, 0);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/" className="hover:text-white">Courses</Link>
            <ChevronRight className="h-4 w-4" />
            <span>{course.title}</span>
          </div>
          <Badge className="bg-primary mb-4">{course.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{course.description}</p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < course.rating ? "text-yellow-500" : "text-gray-500"}>★</span>
              ))}
              <span className="ml-2">({course.rating} rating)</span>
            </div>
            <span className="text-gray-300">•</span>
            <span>{course.studentsEnrolled} students enrolled</span>
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
                {course.whatYouLearn.map((point, index) => (
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
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <p className="text-muted-foreground mb-4">
                {course.syllabus.length} sections • {totalLessons} lectures • {course.duration} total length
              </p>
              <Accordion type="single" collapsible className="border rounded-lg">
                {course.syllabus.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span className="font-semibold text-left">{section.module}</span>
                        <span className="text-sm text-muted-foreground">{section.topics.length} lessons</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {section.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2 text-muted-foreground py-1">
                            <BookOpen className="h-4 w-4" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="prose max-w-none text-muted-foreground">
                <p>{course.extendedDescription}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg overflow-hidden sticky top-24">
              <SafeImage
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* <div className="text-3xl font-bold mb-4">
                  {course.price === 0 ? "Free" : `₹${course.price.toLocaleString()}`}
                </div> */}
                <Link to="/contact">
                <Button className="w-full bg-primary hover:bg-primary/90 mb-3">
                  Enroll Now
                </Button>
                </Link>
                {/* <Button variant="outline" className="w-full mb-6">
                  Add to Wishlist
                </Button> */}
                
                <div className="space-y-3">
                  {courseStats.map((stat, index) => (
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
      </div>
    </Layout>
  );
};

export default CourseDetails;
