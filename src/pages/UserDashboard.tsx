import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, FileCode, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  // In a real app, this data would come from the user's profile in the database
  const [enrolledCourses] = useState([
    { id: 1, title: "Python Masterclass", progress: 60, nextLesson: "Data Structures" }
  ]);
  
  const [enrolledInternships] = useState([
    { id: 1, title: "MERN Stack Development", status: "Active", durationLeft: "2 Months" }
  ]);
  
  const [purchasedProjects] = useState([
    { id: 1, title: "AI Fraud Detection", downloadLink: "#" }
  ]);

  return (
    <Layout>
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Student! Here's your learning progress.</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-t-4 border-t-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Active Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" /> Internships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{enrolledInternships.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" /> Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{purchasedProjects.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              {enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" /> Next: {course.nextLesson}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary mb-1">{course.progress}% Complete</div>
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You haven't enrolled in any courses yet.</p>
                  <Link to="/courses" className="text-primary hover:underline mt-2 inline-block">Browse Courses</Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Internships</CardTitle>
              <CardDescription>Your active internship programs</CardDescription>
            </CardHeader>
            <CardContent>
              {enrolledInternships.length > 0 ? (
                <div className="space-y-4">
                  {enrolledInternships.map((internship) => (
                    <div key={internship.id} className="p-4 border rounded-lg flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <h4 className="font-semibold">{internship.title}</h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          Duration Left: {internship.durationLeft}
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {internship.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>You don't have any active internships.</p>
                  <Link to="/internships" className="text-primary hover:underline mt-2 inline-block">Find Internships</Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
