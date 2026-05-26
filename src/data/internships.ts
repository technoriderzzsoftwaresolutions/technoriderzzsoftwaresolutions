export interface Internship {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  rating: number;
  studentsEnrolled: number;
  duration: string;
  length: string;
  institution: string;
  internshipType: "Remote" | "On-site" | "Hybrid";
  hasRealTimeProjects: boolean;
  hasJobOpportunity: boolean;
  hasCertification: boolean;
  eligibility: string;
  whatYouLearn: string[];
  requirements: string[];
  whoThisIsFor: string[];
  price: number;
}

export const internships: Internship[] = [
  {
    id: "1",
    title: "MERN Stack Development Internship",
    category: "mern",
    description: "Gain hands-on experience in full-stack web development. Work on real client projects and build your portfolio with production-ready applications.",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    rating: 4.8,
    studentsEnrolled: 850,
    duration: "3 Months",
    length: "Full-time",
    institution: "Techno Riderzz Academy",
    internshipType: "Remote",
    hasRealTimeProjects: true,
    hasJobOpportunity: true,
    hasCertification: true,
    eligibility: "B.Tech/BCA/MCA students or graduates",
    whatYouLearn: [
      "Build production-ready web applications",
      "Work with agile development methodologies",
      "Collaborate using Git and GitHub",
      "Deploy applications to cloud platforms",
      "Work in a professional team environment",
      "Receive mentorship from industry experts"
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Understanding of React fundamentals",
      "Ability to commit 40 hours/week",
      "Strong communication skills"
    ],
    whoThisIsFor: [
      "Recent graduates looking for industry experience",
      "Students seeking practical project exposure",
      "Career changers entering web development",
      "Developers wanting to enhance their portfolio"
    ],
    price: 199
  },
  {
    id: "2",
    title: "Python & Machine Learning Internship",
    category: "python",
    description: "Work on real machine learning projects. Learn to build and deploy ML models while gaining valuable industry experience.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
    rating: 4.9,
    studentsEnrolled: 1200,
    duration: "4 Months",
    length: "Full-time",
    institution: "Techno Riderzz Academy",
    internshipType: "Remote",
    hasRealTimeProjects: true,
    hasJobOpportunity: true,
    hasCertification: true,
    eligibility: "B.Tech/M.Tech/MCA students or graduates with Python knowledge",
    whatYouLearn: [
      "Build and deploy ML models",
      "Work with real-world datasets",
      "Implement data pipelines",
      "Use cloud ML services (AWS/GCP)",
      "Collaborate on research projects",
      "Present findings and documentation"
    ],
    requirements: [
      "Proficiency in Python programming",
      "Basic understanding of machine learning concepts",
      "Knowledge of statistics and mathematics",
      "Ability to work independently"
    ],
    whoThisIsFor: [
      "Data science enthusiasts",
      "Students pursuing AI/ML specialization",
      "Professionals transitioning to ML roles",
      "Researchers seeking practical experience"
    ],
    price: 249
  },
  {
    id: "3",
    title: "Java Enterprise Development Internship",
    category: "java",
    description: "Gain enterprise development experience with Java and Spring Boot. Work on scalable applications used by real businesses.",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop",
    rating: 4.7,
    studentsEnrolled: 650,
    duration: "3 Months",
    length: "Full-time",
    institution: "Techno Riderzz Academy",
    internshipType: "Hybrid",
    hasRealTimeProjects: true,
    hasJobOpportunity: true,
    hasCertification: true,
    eligibility: "B.Tech/BCA/MCA students with Java knowledge",
    whatYouLearn: [
      "Enterprise application development",
      "Spring Boot and microservices",
      "Database design and optimization",
      "API development and integration",
      "Testing and code quality practices",
      "DevOps and deployment"
    ],
    requirements: [
      "Strong Java programming skills",
      "Understanding of OOP principles",
      "Basic SQL knowledge",
      "Willingness to learn new technologies"
    ],
    whoThisIsFor: [
      "Java developers seeking enterprise experience",
      "Students interested in backend development",
      "Professionals looking to upskill",
      "Anyone interested in scalable systems"
    ],
    price: 229
  },
  {
    id: "4",
    title: "Android App Development Internship",
    category: "android",
    description: "Build real Android applications that will be published on the Play Store. Work with modern development practices and tools.",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    rating: 4.6,
    studentsEnrolled: 520,
    duration: "3 Months",
    length: "Part-time",
    institution: "Techno Riderzz Academy",
    internshipType: "Remote",
    hasRealTimeProjects: true,
    hasJobOpportunity: true,
    hasCertification: true,
    eligibility: "Students or graduates with basic Android/Kotlin knowledge",
    whatYouLearn: [
      "Modern Android development with Kotlin",
      "Jetpack Compose UI development",
      "App architecture best practices",
      "Firebase integration",
      "Play Store publishing process",
      "App monetization strategies"
    ],
    requirements: [
      "Basic knowledge of Kotlin or Java",
      "Understanding of Android basics",
      "Android device for testing",
      "20 hours/week commitment"
    ],
    whoThisIsFor: [
      "Mobile development enthusiasts",
      "Students with Android coursework",
      "Developers looking to build portfolio apps",
      "Freelancers wanting to expand skills"
    ],
    price: 179
  }
];

export const getInternshipById = (id: string): Internship | undefined => {
  return internships.find(i => i.id === id);
};

export const getInternshipsByCategory = (category: string): Internship[] => {
  return internships.filter(i => i.category === category);
};