import { Link } from "react-router-dom";
import { Star, Clock, BookOpen, Users, ChevronRight, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";
import Tilt3D from "@/components/ui/Tilt3D";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { socket } from "@/lib/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function CoursesSection() {
  const [coursesList, setCoursesList] = useState(courses);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isAdmin = typeof window !== "undefined" && localStorage.getItem("isAdminAuth") === "true";

  const loadCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      if (res.ok) {
        const apiCourses = await res.json();
        const merged = courses.map(staticItem => {
          const apiItem = apiCourses.find((api: any) => String(api.id || api._id) === String(staticItem.id));
          return apiItem ? { ...staticItem, ...apiItem } : staticItem;
        });
        const staticIds = new Set(courses.map(s => String(s.id)));
        const newApiItems = apiCourses.filter((api: any) => !staticIds.has(String(api.id || api._id)));
        setCoursesList([...merged, ...newApiItems]);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    loadCourses();
    socket.on("data_updated", loadCourses);
    return () => {
      socket.off("data_updated", loadCourses);
    };
  }, []);

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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
    try {
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
      const res = await fetch(`${API_URL}/courses/${editingCourse.id || (editingCourse as any)._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Course updated successfully!");
        setIsEditOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to update course.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <section className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">
              Skills Hub
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mt-4">
              Popular Training Courses
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2">
              Accelerate your engineering skills with structured curriculum, quizzes, and live coding.
            </p>
          </div>
          <Link to="/courses" className="shrink-0 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
              View All Courses <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coursesList.slice(0, 3).map((course) => (
            <div key={course.id} className="h-full relative hover:z-50">
              <HoverCard openDelay={150} closeDelay={150}>
                <HoverCardTrigger asChild>
                  <div className="h-full">
                    <Tilt3D maxTilt={8} scale={1.02} className="h-full">
                      <div className="flex flex-col justify-between h-full bg-slate-900/10 rounded-2xl border border-slate-900/60 overflow-hidden shadow-sm hover:border-rose-500/20 hover:bg-slate-900/25 transition-all duration-300">

                        {/* Thumbnail */}
                        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                          <img
                            src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80"}
                            alt={course.title}
                            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
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
                          <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-rose-600 px-3 py-1 rounded-full uppercase tracking-wider">
                            {course.category}
                          </span>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-3 text-left">
                              <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                <GraduationCap className="h-4 w-4 text-blue-500" />
                                {course.institution || "Techno Riderzz Academy"}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="font-bold text-slate-700 dark:text-slate-300">{course.rating}</span>
                              </div>
                            </div>

                            <h3 className="font-bold text-lg text-slate-900 dark:text-white text-left line-clamp-1 mb-3">
                              {course.title}
                            </h3>

                            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-6 line-clamp-2 text-left">
                              {course.description}
                            </p>
                          </div>

                          <div className="space-y-4 pt-4 border-t border-slate-900/60">
                            <div className="grid grid-cols-3 gap-2 text-left">
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Duration</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                                  {course.duration}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Syllabus</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                                  <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                                  {course.syllabus?.length || 8} Modules
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Enrolled</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                                  <Users className="h-3.5 w-3.5 text-slate-400" />
                                  {course.studentsEnrolled?.toLocaleString() || "1,200"}
                                </span>
                              </div>
                            </div>

                            <Link to={`/courses/${course.id}`} className="block w-full">
                              <Button className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 shadow-lg shadow-rose-500/10">
                                Explore Syllabus
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Tilt3D>
                  </div>
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
                        <span className="text-[10px] font-bold text-amber-700">{course.rating}</span>
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

                    <Link to={`/courses/${course.id}`}>
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
    </section>
  );
}
