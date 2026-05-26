import { Code, Database, Brain, Cpu, Smartphone, Coffee, Cloud, Twitter, Globe } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  projectCount: number;
}

export const categories: Category[] = [
  {
    id: "Deep Learning",
    name: "Deep Learning Projects",
    shortName: "Deep Learning",
    icon: "Code",
    description: "Deep learning projects",
    projectCount: 45
  },
  {
    id: "datascience",
    name: "Data Science Projects",
    shortName: "DS",
    icon: "Database",
    description: "Data analysis and visualization projects",
    projectCount: 62
  },
  {
    id: "Machine Learning",
    name: "Machine Learning Projects",
    shortName: "ML",
    icon: "Brain",
    description: "Machine learning and predictive modeling projects",
    projectCount: 78
  },
  {
    id: "Artificial Intelligence",
    name: "Artificial Intelligence Projects",
    shortName: "AI",
    icon: "Cpu",
    description: "AI-powered applications and systems",
    projectCount: 54
  },
  {
    id: "android",
    name: "Android Projects",
    shortName: "Android",
    icon: "Smartphone",
    description: "Mobile applications for Android platform",
    projectCount: 89
  },
  {
    id: "java",
    name: "Java Projects",
    shortName: "JAVA",
    icon: "Coffee",
    description: "Desktop and enterprise Java applications",
    projectCount: 120
  },
  {
    id: "aws",
    name: "AWS Projects",
    shortName: "AWS",
    icon: "Cloud",
    description: "Cloud-based applications using AWS services",
    projectCount: 35
  },
  {
    id: "dotnet",
    name: ".NET Projects",
    shortName: ".NET",
    icon: "Globe",
    description: "Applications built with Microsoft .NET framework",
    projectCount: 67
  }
];

export const projectCategories = [
  { id: "Deep Learning", name: "Deep Learning Projects", count: 20 },
  { id: "Cyber Security", name: "Cyber Security Projects", count: 20 },
  { id: "Machine Learning", name: "Machine Learning Projects", count: 20 }, // Incl. Heart Disease
  { id: "Artificial Intelligence", name: "Artificial Intelligence Projects", count: 19 },
  { id: "Blockchain", name: "Blockchain Projects", count: 18 },
  { id: "Cloud Computing", name: "Cloud Computing Projects", count: 30 },
  { id: "python", name: "Python Projects", count: 156 },
  { id: "mern", name: "MERN Stack Projects", count: 89 },
  { id: "java", name: "Java Projects", count: 120 },
  { id: "android", name: "Android Projects", count: 89 },
  { id: "dotnet", name: ".NET Projects", count: 67 },
  { id: "aws", name: "AWS Projects", count: 35 },
  { id: "php", name: "PHP Projects", count: 45 },
  { id: "flutter", name: "Flutter Projects", count: 42 }
];

export const internshipCategories = [
  { id: "mern", name: "MERN Stack Internship" },
  { id: "python", name: "Python & ML Internship" },
  { id: "java", name: "Java Internship" },
  { id: "android", name: "Android Internship" },
  { id: "datascience", name: "Data Science Internship" }
];

export const courseCategories = [
  { id: "mern", name: "MERN Stack Course" },
  { id: "python", name: "Python & Data Science" },
  { id: "java", name: "Java Enterprise" },
  { id: "android", name: "Android Development" },
  { id: "ml", name: "Machine Learning" }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(c => c.id === id);
};