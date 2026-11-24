import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SafeImage from "@/components/SafeImage";
import { courses as staticCourses } from "@/data/courses";
import { fetchCourses, socket } from "@/lib/api";
import { ChevronRight, Clock, Users, BookOpen, Star, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "/api";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const Courses = () => {
  const [courses, setCourses] = useState(staticCourses);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true";

  const loadCourses = async () => {
    try {
      const apiCourses = await fetchCourses();
      if (apiCourses) {
        const merged = staticCourses.map(staticItem => {
          const apiItem = apiCourses.find(api => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(staticCourses.map(s => String(s.id)));
        const newApiItems = apiCourses.filter(api => !staticIds.has(String(api.id || api._id)));
        setCourses([...merged, ...newApiItems]);
      }
    } catch (err) { console.error(err); }
  };

  const handleDeleteCourse = async (courseId: string, courseTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm(`Are you sure you want to delete course "${courseTitle}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/courses/${courseId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Course deleted successfully!");
        loadCourses();
      } else {
        toast.error("Failed to delete course.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    const payload = { ...editingCourse };
    if (editingCourse.tempSyllabusStr) {
      try {
        payload.syllabus = JSON.parse(editingCourse.tempSyllabusStr);
        delete payload.tempSyllabusStr;
      } catch (err) {
        toast.error("Invalid JSON format in Syllabus field.");
        return;
      }
    }
    try {
      const res = await fetch(`${API_URL}/courses/${editingCourse.id || (editingCourse as any)._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Course updated successfully!");
        setIsEditOpen(false);
        loadCourses();
      } else {
        toast.error("Failed to update course.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  useEffect(() => {
    loadCourses();
    socket.on("data_updated", loadCourses);
    return () => { socket.off("data_updated"); };
  }, []);

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
            <div key={course.id || (course as any)._id} className="relative hover:z-50">
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <Link 
                    to={`/courses/${course.id || (course as any)._id}`}
                    className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group block h-full"
                  >
                    <div className="relative">
                      <SafeImage
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isAdmin && (
                        <div className="absolute top-3 right-3 z-50 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setEditingCourse({
                                ...course,
                                rating: course.rating || 4.5,
                                studentsEnrolled: course.studentsEnrolled || 0,
                                duration: course.duration || "10 Days",
                                effort: course.effort || "",
                                institution: course.institution || "Techno Riderzz Academy",
                                subject: course.subject || "",
                                level: course.level || "Beginner",
                                language: course.language || "English",
                                hasCertificate: course.hasCertificate !== false,
                                hasQuizzes: course.hasQuizzes !== false,
                                price: course.price || 0,
                                whatYouLearn: course.whatYouLearn || [],
                                requirements: course.requirements || [],
                                extendedDescription: course.extendedDescription || "",
                                syllabus: course.syllabus || []
                              });
                              setIsEditOpen(true);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
                            title="Edit Course"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteCourse(course.id || (course as any)._id, course.title, e)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg border border-white transition-all hover:scale-105 duration-200"
                            title="Delete Course"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                      <Badge className="absolute top-3 left-3 bg-primary">{course.category.toUpperCase()}</Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors text-left line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 text-left">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{course.studentsEnrolled || "1,200"}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </HoverCardTrigger>

                <HoverCardContent side="right" sideOffset={15} className="w-[310px] rounded-xl bg-slate-100 border border-slate-300 shadow-2xl p-5 text-slate-800 z-50 text-left">
                  <HoverCardPrimitive.Arrow className="fill-slate-100 stroke-slate-300" width={12} height={6} />
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        Bestseller · Updated 2026
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug mt-2">{course.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-amber-700">{course.rating || "4.8"}</span>
                        <span className="text-[10px] text-slate-400">· {course.studentsEnrolled?.toLocaleString() || "1,200"} students</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">{course.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-600">
                      <div><strong>Duration:</strong> {course.duration}</div>
                      <div><strong>Modules:</strong> {course.syllabus?.length || 8}</div>
                      <div><strong>Category:</strong> {course.category}</div>
                      <div><strong>Certificate:</strong> Yes</div>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-200 pt-2.5">
                      <div className="font-extrabold text-[8px] uppercase tracking-wider text-slate-400">What you'll get:</div>
                      {["Structured video curriculum", "Hands-on coding projects", "Course completion certificate"].map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <CheckCircle className="h-3 w-3 text-rose-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link to={`/courses/${course.id || (course as any)._id}`}>
                      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold h-10 rounded-lg text-xs mt-1">
                        Explore Syllabus →
                      </Button>
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg w-full rounded-2xl bg-white p-6 shadow-2xl overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit Course Details</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <form onSubmit={handleSaveCourse} className="space-y-4 text-left mt-2">
              <div className="space-y-1">
                <Label htmlFor="course-title">Course Title</Label>
                <Input
                  id="course-title"
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="course-category">Category</Label>
                  <Input
                    id="course-category"
                    type="text"
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="course-duration">Duration</Label>
                  <Input
                    id="course-duration"
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="course-level">Level</Label>
                  <Input
                    id="course-level"
                    type="text"
                    value={editingCourse.level}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="course-language">Language</Label>
                  <Input
                    id="course-language"
                    type="text"
                    value={editingCourse.language}
                    onChange={(e) => setEditingCourse({ ...editingCourse, language: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="course-price">Price (₹)</Label>
                  <Input
                    id="course-price"
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({ ...editingCourse, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="course-rating">Rating</Label>
                  <Input
                    id="course-rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingCourse.rating}
                    onChange={(e) => setEditingCourse({ ...editingCourse, rating: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="course-enrolled">Enrolled Students</Label>
                  <Input
                    id="course-enrolled"
                    type="number"
                    value={editingCourse.studentsEnrolled}
                    onChange={(e) => setEditingCourse({ ...editingCourse, studentsEnrolled: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="course-effort">Effort</Label>
                  <Input
                    id="course-effort"
                    type="text"
                    value={editingCourse.effort}
                    onChange={(e) => setEditingCourse({ ...editingCourse, effort: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="course-institution">Institution</Label>
                  <Input
                    id="course-institution"
                    type="text"
                    value={editingCourse.institution}
                    onChange={(e) => setEditingCourse({ ...editingCourse, institution: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="course-subject">Subject</Label>
                  <Input
                    id="course-subject"
                    type="text"
                    value={editingCourse.subject}
                    onChange={(e) => setEditingCourse({ ...editingCourse, subject: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="course-certificate"
                      checked={editingCourse.hasCertificate}
                      onChange={(e) => setEditingCourse({ ...editingCourse, hasCertificate: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="course-certificate" className="text-xs font-medium">Certificate</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="course-quizzes"
                      checked={editingCourse.hasQuizzes}
                      onChange={(e) => setEditingCourse({ ...editingCourse, hasQuizzes: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="course-quizzes" className="text-xs font-medium">Quizzes</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-learn">What you'll learn (comma-separated)</Label>
                <Textarea
                  id="course-learn"
                  rows={2}
                  value={editingCourse.whatYouLearn?.join(", ") || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, whatYouLearn: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-requirements">Requirements (comma-separated)</Label>
                <Textarea
                  id="course-requirements"
                  rows={2}
                  value={editingCourse.requirements?.join(", ") || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, requirements: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-extended-desc">Extended Description</Label>
                <Textarea
                  id="course-extended-desc"
                  rows={3}
                  value={editingCourse.extendedDescription || ""}
                  onChange={(e) => setEditingCourse({ ...editingCourse, extendedDescription: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-syllabus">Syllabus Modules (JSON Format)</Label>
                <Textarea
                  id="course-syllabus"
                  rows={4}
                  value={editingCourse.tempSyllabusStr !== undefined ? editingCourse.tempSyllabusStr : JSON.stringify(editingCourse.syllabus, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditingCourse({ ...editingCourse, syllabus: parsed, tempSyllabusStr: undefined });
                    } catch (err) {
                      setEditingCourse({ ...editingCourse, tempSyllabusStr: e.target.value });
                    }
                  }}
                  placeholder='[{"module": "Module 1", "topics": ["Topic 1", "Topic 2"], "duration": "2 Days"}]'
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-thumbnail">Thumbnail URL</Label>
                <Input
                  id="course-thumbnail"
                  type="text"
                  value={editingCourse.thumbnail}
                  onChange={(e) => setEditingCourse({ ...editingCourse, thumbnail: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="course-description">Description</Label>
                <Textarea
                  id="course-description"
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  required
                />
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Courses;
