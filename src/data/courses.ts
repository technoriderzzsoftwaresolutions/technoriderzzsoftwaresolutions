import { projectImages } from '../assets/projectsImages/Images.js'

export interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  rating: number;
  studentsEnrolled: number;
  duration: string;
  effort: string;
  institution: string;
  subject: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  hasCertificate: boolean;
  hasQuizzes: boolean;
  price: number;
  whatYouLearn: string[];
  requirements: string[];
  syllabus: {
    module: string;
    topics: string[];
    duration: string;
  }[];
  extendedDescription: string;
}

export const courses: Course[] = [
  {
    id: "5",
    title: "Python Programming Intensive",
    category: "python",
    description: "Go from zero to building structured automation programs and object-oriented systems in just 10 days.",
    thumbnail: projectImages?.Python_Programming_Intensive?.banner,
    rating: 4.7,
    studentsEnrolled: 5600,
    duration: "10 Days",
    effort: "4-5 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Programming",
    level: "Beginner",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 99,
    whatYouLearn: [
      "Master Python syntax and fundamental logic",
      "Understand complex data structures like Dictionaries and Sets",
      "Implement Object-Oriented Programming (OOP) concepts",
      "Handle files and resolve runtime exceptions",
      "Build modular programs for automation tasks"
    ],
    requirements: ["No prior programming experience required", "A computer with internet connection"],
    syllabus: [
      { module: "Fundamentals", topics: ["Syntax", "Variables", "Data Types"], duration: "2 Days" },
      { module: "Control Flow", topics: ["Conditionals", "Loops", "Nested Loops"], duration: "1 Day" },
      { module: "Functions", topics: ["Lambda", "Modules", "Packages"], duration: "1 Day" },
      { module: "Data Structures", topics: ["Lists", "Tuples", "Dictionaries"], duration: "2 Days" },
      { module: "Professional Dev", topics: ["File Handling", "Exception Handling", "OOP Mastery"], duration: "3 Days" },
      { module: "Capstone", topics: ["Final Project Deployment"], duration: "1 Day" }
    ],
    extendedDescription: "This intensive program transforms beginners into confident Python developers. We focus on 'learning by doing,' moving quickly from basic syntax to professional-grade object-oriented programming."
  },
  {
    id: "6",
    title: "C Programming Foundations",
    category: "c-programming",
    description: "Master the logic and memory management principles of C, the foundation of all modern languages.",
    thumbnail: projectImages?.C_Programming_Foundations?.banner,
    rating: 4.6,
    studentsEnrolled: 3100,
    duration: "12 Days",
    effort: "3-4 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Computer Science",
    level: "Beginner",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 79,
    whatYouLearn: [
      "Understand C program structure and tokens",
      "Control program flow with conditional and looping statements",
      "Master pointers and pointer arithmetic",
      "Utilize structures and unions for data grouping",
      "Manage file input/output operations"
    ],
    requirements: ["Basic mathematical logic"],
    syllabus: [
      { module: "Intro", topics: ["Structure of C", "Tokens", "Data Types"], duration: "1 Day" },
      { module: "Flow", topics: ["Decision Making", "Loops", "Break/Continue"], duration: "2 Days" },
      { module: "Logic", topics: ["1D/2D Arrays", "Recursion"], duration: "2 Days" },
      { module: "Memory", topics: ["Pointers", "Pointer Arithmetic"], duration: "2 Days" },
      { module: "Data", topics: ["Structures", "Unions", "File Handling"], duration: "2 Days" },
      { module: "Final", topics: ["Procedural Programming Project"], duration: "3 Days" }
    ],
    extendedDescription: "Learn procedural programming from the ground up. This course provides a strong foundation in memory management and data structures essential for any software engineering career."
  },
  {
    id: "7",
    title: "Modern C++ Specialization",
    category: "cpp",
    description: "Learn high-performance programming with C++, from core concepts to advanced OOP and STL.",
    thumbnail: projectImages?.Modern_Cplusplus_Specialization?.banner,
    rating: 4.9,
    studentsEnrolled: 2800,
    duration: "10 Days",
    effort: "4-6 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Software Engineering",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 119,
    whatYouLearn: [
      "Master C++ I/O streams and syntax",
      "Implement advanced OOP including Polymorphism",
      "Utilize dynamic memory management",
      "Apply templates and the Standard Template Library (STL)",
      "Build robust inventory management systems"
    ],
    requirements: ["Basic programming knowledge"],
    syllabus: [
      { module: "Foundations", topics: ["IDE Setup", "Input/Output", "Basics"], duration: "1 Day" },
      { module: "Flow", topics: ["Control Statements", "Loops"], duration: "2 Days" },
      { module: "Handling", topics: ["Functions", "Arrays", "Pointers"], duration: "2 Days" },
      { module: "OOP Mastery", topics: ["Classes", "Inheritance", "Polymorphism"], duration: "3 Days" },
      { module: "Advanced", topics: ["Templates", "STL", "File Streams"], duration: "2 Days" }
    ],
    extendedDescription: "C++ is the backbone of high-performance software. This course transitions you from simple logic to complex object-oriented design and professional software architecture."
  },
  {
    id: "8",
    title: "JavaScript Programming Masterclass",
    category: "javascript-programming",
    description: "Master the language of the web, from basic syntax to modern ES6+ and DOM manipulation.",
    thumbnail: projectImages?.JavaScript_Programming_Masterclass?.banner,
    rating: 4.9,
    studentsEnrolled: 8500,
    duration: "15 Days",
    effort: "5-7 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Web Development",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 199,
    whatYouLearn: [
      "Master JS fundamentals and syntax",
      "Manipulate web pages dynamically via the DOM",
      "Understand Asynchronous JS (Promises, Async/Await)",
      "Work with modern ES6+ features",
      "Connect frontends to APIs using Fetch"
    ],
    requirements: ["Basic computer literacy"],
    syllabus: [
      { module: "Basics", topics: ["Variables", "Operators", "Control Flow"], duration: "2 Days" },
      { module: "Logic", topics: ["Functions", "Arrays", "High-Order Functions"], duration: "2 Days" },
      { module: "DOM", topics: ["Selecting Elements", "Event Handling"], duration: "2 Days" },
      { module: "Modern JS", topics: ["ES6 Concepts", "Destructuring", "Modules"], duration: "2 Days" },
      { module: "Async", topics: ["Fetch API", "Promises", "JSON"], duration: "2 Days" },
      { module: "Labs", topics: ["Interactive Web Apps"], duration: "5 Days" }
    ],
    extendedDescription: "JavaScript powers the modern web. This course takes you from basic tags to deploying complex, interactive web applications that look stunning on any device."
  },
  {
    id: "9",
    title: "SQL & Relational Databases",
    category: "sql-programming",
    description: "Become an expert in data querying, database design, and relational management.",
    thumbnail: projectImages?.SQL_and_Relational_Databases?.banner,
    rating: 4.8,
    studentsEnrolled: 4200,
    duration: "10 Days",
    effort: "4 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Database Management",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 89,
    whatYouLearn: [
      "Understand DBMS vs RDBMS architecture",
      "Master SQL commands (SELECT, CRUD)",
      "Implement Joins and database normalization",
      "Write Stored Procedures and Triggers",
      "Optimize database performance via Indexing"
    ],
    requirements: ["Basic analytical skills"],
    syllabus: [
      { module: "Intro", topics: ["Tables", "Keys", "DBMS vs RDBMS"], duration: "1 Day" },
      { module: "Querying", topics: ["Basic Commands", "Filtering"], duration: "2 Days" },
      { module: "Relationships", topics: ["Joins", "Normalization"], duration: "2 Days" },
      { module: "Functions", topics: ["Aggregate Functions", "Subqueries"], duration: "2 Days" },
      { module: "Advanced", topics: ["Procedures", "Triggers", "Indexing"], duration: "3 Days" }
    ],
    extendedDescription: "Data is the most valuable asset in the modern tech world. Learn to manage it like a professional by mastering industry-standard relational database logic."
  },
  {
    id: "10",
    title: "Go Programming: High-Performance Systems",
    category: "go-programming",
    description: "Learn to build fast, reliable, and efficient software with Google's Go language.",
    thumbnail: projectImages?.Go_Programming_High_Performance?.banner,
    rating: 4.8,
    studentsEnrolled: 2100,
    duration: "15 Days",
    effort: "4-6 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Systems Programming",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 149,
    whatYouLearn: [
      "Go syntax and program structure",
      "Effective use of Slices and Maps",
      "Master Concurrency with Goroutines and Channels",
      "Interface-based polymorphism in Go",
      "Building robust RESTful APIs"
    ],
    requirements: ["Basic programming logic"],
    syllabus: [
      { module: "Go Basics", topics: ["CLI Tools", "Data Types", "Variables"], duration: "2 Days" },
      { module: "Logic", topics: ["Control Structures", "Scope"], duration: "2 Days" },
      { module: "Collections", topics: ["Arrays", "Slices", "Maps"], duration: "2 Days" },
      { module: "OOP in Go", topics: ["Structs", "Methods", "Interfaces"], duration: "2 Days" },
      { module: "Concurrency", topics: ["Channels", "Goroutines", "Select"], duration: "3 Days" },
      { module: "Web", topics: ["HTTP Servers", "REST APIs"], duration: "4 Days" }
    ],
    extendedDescription: "Go is optimized for cloud-scale computing. Master the language that powers Docker and Kubernetes to build high-concurrency backend systems."
  },
  {
    id: "11",
    title: "Front-End Development: Modern UI/UX",
    category: "front-end-development",
    description: "A professional roadmap covering HTML, CSS, JavaScript, and React for modern web development.",
    thumbnail: projectImages?.Front_End_Development_Modern?.banner,
    rating: 4.9,
    studentsEnrolled: 11000,
    duration: "20 Days",
    effort: "5-7 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Web Development",
    level: "Beginner",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 199,
    whatYouLearn: [
      "Semantic HTML5 and modern CSS3",
      "Responsive design with Flexbox and Grid",
      "JS fundamentals and ES6+ interactivity",
      "React component architecture and state management",
      "Styling with Tailwind CSS and Bootstrap"
    ],
    requirements: ["No prior knowledge required"],
    syllabus: [
      { module: "HTML", topics: ["Web Tech", "Semantic Elements"], duration: "2 Days" },
      { module: "CSS Styling", topics: ["Box Model", "Flexbox", "Animations"], duration: "3 Days" },
      { module: "JS Mastery", topics: ["DOM", "Events", "Modern ES6+"], duration: "5 Days" },
      { module: "Responsive", topics: ["Tailwind", "Bootstrap"], duration: "2 Days" },
      { module: "React Core", topics: ["JSX", "Components", "Hooks"], duration: "5 Days" },
      { module: "Advanced", topics: ["Router", "Context API", "Vite"], duration: "3 Days" }
    ],
    extendedDescription: "Step into front-end engineering. This path takes you from basic layouts to complex, high-performance React applications that look stunning on any device."
  },
  {
    id: "12",
    title: "Python Full Stack: Django + React",
    category: "python-fullstack",
    description: "Build complete end-to-end applications using Django, React, and SQL database management.",
    thumbnail: projectImages?.Python_Full_Stack_Django_React?.banner,
    rating: 4.9,
    studentsEnrolled: 3800,
    duration: "21 Days",
    effort: "6-8 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Full Stack",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 349,
    whatYouLearn: [
      "Python OOP and Backend server logic",
      "Django MVT architecture and template handling",
      "React frontend components and state management",
      "Django REST Framework (DRF) for API design",
      "Relational database integration with SQL and ORM"
    ],
    requirements: ["Basic programming understanding"],
    syllabus: [
      { module: "Python Mastery", topics: ["Syntax", "OOP", "Exceptions"], duration: "6 Days" },
      { module: "Frontend", topics: ["HTML/CSS", "JS", "Responsive UI"], duration: "3 Days" },
      { module: "React", topics: ["Hooks", "Router", "Components"], duration: "4 Days" },
      { module: "Django Core", topics: ["Models", "Views", "migrations"], duration: "4 Days" },
      { module: "APIs & Auth", topics: ["DRF", "Serializers", "JWT"], duration: "4 Days" }
    ],
    extendedDescription: "The professional roadmap for Python lovers. Master the batteries-included Django framework and connect it to a lightning-fast React frontend for industrial applications."
  },
  {
    id: "13",
    title: "Java Full Stack: Enterprise Specialization",
    category: "java-fullstack",
    description: "Master Java, Spring Boot, React, and SQL for building professional industrial-scale applications.",
    thumbnail: projectImages?.Java_Full_Stack_Enterprise_Specialization?.banner,
    rating: 4.9,
    studentsEnrolled: 4200,
    duration: "25 Days",
    effort: "8 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Full Stack",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 399,
    whatYouLearn: [
      "Advanced Java Collections and Stream API",
      "Spring Boot core and RESTful web services",
      "React state management with functional components",
      "Relational database design and JDBC integration",
      "Enterprise security: authentication and authorization"
    ],
    requirements: ["Foundational coding knowledge"],
    syllabus: [
      { module: "Java Foundations", topics: ["Syntax", "OOP", "Exception Handling"], duration: "4 Days" },
      { module: "Advanced Java", topics: ["Collections", "Stream API"], duration: "2 Days" },
      { module: "Client Web", topics: ["HTML/CSS", "JS Interactivity"], duration: "3 Days" },
      { module: "React Frontend", topics: ["Hooks", "Context API", "Axios"], duration: "4 Days" },
      { module: "Backend Core", topics: ["Spring Boot", "JPA", "RESTful APIs"], duration: "6 Days" },
      { module: "Corporate", topics: ["Security", "Maven", "Deployment"], duration: "6 Days" }
    ],
    extendedDescription: "Build enterprise applications from scratch. You will learn the exact stack used by global tech giants, focusing on Spring Boot backends and React frontends."
  },
  {
    id: "14",
    title: "MongoDB: NoSQL Architect",
    category: "mongodb",
    description: "Master the leading NoSQL database for building high-performance, scalable modern applications.",
    thumbnail: projectImages?.MongoDB_NoSQL_Architect?.banner,
    rating: 4.7,
    studentsEnrolled: 1900,
    duration: "7 Days",
    effort: "4 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Databases",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 129,
    whatYouLearn: [
      "Document-oriented modeling and NoSQL concepts",
      "Mastering Aggregation Pipelines for data analysis",
      "Advanced indexing and database sharding",
      "Database security, roles, and backup strategies",
      "Integration with Node.js via Mongoose ODM"
    ],
    requirements: ["Basic understanding of databases"],
    syllabus: [
      { module: "Intro", topics: ["NoSQL Types", "Setup", "Shell"], duration: "1 Day" },
      { module: "Data Model", topics: ["BSON", "CRUD", "Projection"], duration: "1 Day" },
      { module: "Pipelines", topics: ["Indexing", "Aggregation Mastery"], duration: "1 Day" },
      { module: "Relationships", topics: ["Embedded vs Referenced", "Lookup"], duration: "1 Day" },
      { module: "Performance", topics: ["Sharding", "Security", "Backup"], duration: "1 Day" },
      { module: "Integration", topics: ["Mongoose", "PyMongo", "Lab"], duration: "2 Days" }
    ],
    extendedDescription: "Shift your mindset from tables to documents. This course prepares you to handle unstructured data at scale for modern real-time applications."
  },
  {
    id: "15",
    title: "Power BI for Business Intelligence",
    category: "power-bi",
    description: "Transform raw business data into meaningful insights with interactive Power BI dashboards.",
    thumbnail: projectImages?.Power_BI_for_Business_Intelligence?.banner,
    rating: 4.8,
    studentsEnrolled: 3500,
    duration: "7 Days",
    effort: "4-5 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Data Analytics",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 149,
    whatYouLearn: [
      "Connect and transform data with Power Query",
      "Advanced Data Modeling and DAX calculations",
      "Creating rich interactive charts and matrices",
      "Setting up Row-level Security (RLS)",
      "Publishing and collaborating in Power BI Service"
    ],
    requirements: ["Basic spreadsheet skills"],
    syllabus: [
      { module: "Intro", topics: ["BI Concepts", "Setup", "Datasets"], duration: "1 Day" },
      { module: "Power Query", topics: ["Connectors", "Cleaning", "Shaping"], duration: "1 Day" },
      { module: "DAX Core", topics: ["Relationships", "Measures", "Time Intelligence"], duration: "2 Days" },
      { module: "Viz Mastery", topics: ["Formatting", "KPIs", "Bookmarks"], duration: "2 Days" },
      { module: "Collaborate", topics: ["RLS", "Publishing", "Service"], duration: "1 Day" }
    ],
    extendedDescription: "Data is useless without clarity. This course focuses on the art of data storytelling, teaching you to build professional reports that drive business decisions."
  },
  {
    id: "16",
    title: "MERN Stack Development",
    category: "mern-stack",
    description: "Master the modern full-stack JavaScript suite with MongoDB, Express, React, and Node.js.",
    thumbnail: projectImages?.MERN_Stack_Development?.banner,
    rating: 4.8,
    studentsEnrolled: 7200,
    duration: "25 Days",
    effort: "6-8 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Full Stack",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 299,
    whatYouLearn: [
      "Modern React frontend architecture",
      "Scalable Node.js & Express.js backend logic",
      "NoSQL document modeling with MongoDB",
      "JWT-based security and authentication",
      "CI/CD and cloud deployment for full stack apps"
    ],
    requirements: ["Basic JS knowledge"],
    syllabus: [
      { module: "Foundations", topics: ["Responsive HTML/CSS", "Bootstrap"], duration: "2 Days" },
      { module: "JS Logic", topics: ["ES6 Mastery", "DOM", "Events"], duration: "3 Days" },
      { module: "React Core", topics: ["JSX", "Hooks", "Routing", "Axios"], duration: "6 Days" },
      { module: "Backend Tier", topics: ["Node Basics", "Express APIs", "Security"], duration: "5 Days" },
      { module: "Data & Auth", topics: ["MongoDB", "Mongoose", "JWT Auth"], duration: "6 Days" },
      { module: "Deployment", topics: ["Git", "Deployment", "Best Practices"], duration: "3 Days" }
    ],
    extendedDescription: "The gold standard for full-stack developers. Learn to build fast, robust, and single-page applications with the most high-demand stack in the industry today."
  },
  {
    id: "17",
    title: "Python EDA for Data Scientists",
    category: "python-eda",
    description: "Master exploratory data analysis techniques to uncover hidden patterns using Python libraries.",
    thumbnail: projectImages?.Python_EDA_for_Data_Scientists?.banner,
    rating: 4.7,
    studentsEnrolled: 2500,
    duration: "7 Days",
    effort: "4-5 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Data Science",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 129,
    whatYouLearn: [
      "Vectorized computations with NumPy",
      "High-performance data manipulation with Pandas",
      "Data cleaning and handling missing values",
      "Advanced statistical visualization with Seaborn",
      "Feature engineering and interactive plotting"
    ],
    requirements: ["Basic Python skills"],
    syllabus: [
      { module: "Analysis Intro", topics: ["Jupyter", "EDA Workflow"], duration: "1 Day" },
      { module: "NumPy Core", topics: ["Arrays", "Broadcasting", "Math Ops"], duration: "1 Day" },
      { module: "Pandas mastery", topics: ["DataFrames", "Filtering", "Aggregations"], duration: "2 Days" },
      { module: "Visualization", topics: ["Matplotlib", "Seaborn", "Plots"], duration: "1 Day" },
      { module: "Techniques", topics: ["Outliers", "Scaling", "Interactive Viz"], duration: "2 Days" }
    ],
    extendedDescription: "80% of data science is cleaning and understanding data. This course focuses on that 80%, ensuring you can derive insights from any messy real-world dataset."
  },
  {
    id: "18",
    title: "Machine Learning (Python) + Math Specialization",
    category: "ml-python-math",
    description: "Master ML algorithms and their underlying mathematical foundations for predictive modeling.",
    thumbnail: projectImages?.Machine_Learning_Python?.banner,
    rating: 4.8,
    studentsEnrolled: 5800,
    duration: "21 Days",
    effort: "10-15 hours/week",
    institution: "Techno Riderzz Academy",
    subject: "Data Science",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 299,
    whatYouLearn: [
      "Math for ML: Linear Algebra, Calculus, Statistics",
      "Supervised logic: Regression and Classification",
      "Unsupervised logic: Clustering and Anomaly detection",
      "Model optimization: Regularization and Tuning",
      "Advanced Ensemble methods and model deployment"
    ],
    requirements: ["Intermediate Python", "Analytical thinking"],
    syllabus: [
      { module: "ML Math", topics: ["Linear Algebra", "Calculus", "Probability"], duration: "3 Days" },
      { module: "Data Pre-processing", topics: ["Cleaning", "Scaling", "EDA"], duration: "3 Days" },
      { module: "Algorithms I", topics: ["Linear Regression", "Logistic", "SVM"], duration: "6 Days" },
      { module: "Algorithms II", topics: ["Clustering", "Decision Trees", "PCA"], duration: "5 Days" },
      { module: "Professional", topics: ["Tuning", "APIs", "Git"], duration: "4 Days" }
    ],
    extendedDescription: "Go beyond 'import sklearn'. This course explains the 'why' behind the 'how', teaching you to build, optimize, and deploy industrial-grade predictive models."
  },
  {
    id: "19",
    title: "Artificial Intelligence: Python + Math",
    category: "ai-python-math",
    description: "Master AI principles from mathematical theory to deep learning and NLP applications.",
    thumbnail: projectImages?.Artificial_Intelligence_Python?.banner,
    rating: 4.9,
    studentsEnrolled: 6200,
    duration: "22 Days",
    effort: "10-15 hours/week",
    institution: "Techno Riderzz Academy",
    subject: "Artificial Intelligence",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 349,
    whatYouLearn: [
      "Deep mathematical foundations of AI algorithms",
      "Search and optimization techniques (A*, Genetic)",
      "Neural Network architectures (ANN, CNN, RNN)",
      "Activation functions and Backpropagation logic",
      "Natural Language Processing (NLP) and Chatbots"
    ],
    requirements: ["Strong math foundation", "Python skills"],
    syllabus: [
      { module: "AI Math", topics: ["Linear Algebra", "Optimization", "Calc"], duration: "3 Days" },
      { module: "Search Tech", topics: ["BFS/DFS", "Genetic Algorithms"], duration: "2 Days" },
      { module: "Core AI", topics: ["Supervised", "Unsupervised", "Pattern Rec"], duration: "5 Days" },
      { module: "Neural Nets", topics: ["Backpropagation", "Deep Learning basics"], duration: "4 Days" },
      { module: "Advanced AI", topics: ["CNN", "RNN", "NLP", "Sentiments"], duration: "5 Days" },
      { module: "Deployment", topics: ["APIs", "Git", "Best Practices"], duration: "3 Days" }
    ],
    extendedDescription: "This course transforms you into an AI engineer. You will build everything from handwritten digit recognizers to complex sentiment analysis systems."
  },
  {
    id: "20",
    title: "Data Science: Complete Career Track",
    category: "data-science-track",
    description: "A 40-day journey from Python fundamentals to Deep Learning and Business Intelligence.",
    thumbnail: projectImages?.Data_Science_Complete?.banner,
    rating: 4.9,
    studentsEnrolled: 12500,
    duration: "40 Days",
    effort: "15-20 hours/week",
    institution: "Techno Riderzz Academy",
    subject: "Data Science",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 499,
    whatYouLearn: [
      "Comprehensive Python and Statistics foundations",
      "Relational (SQL) and NoSQL (MongoDB) management",
      "Data visualization with Power BI dashboards",
      "End-to-End Machine Learning and Deep Learning",
      "NLP and Model deployment in production environments"
    ],
    requirements: ["No prior knowledge required", "High dedication"],
    syllabus: [
      { module: "Foundations", topics: ["Python", "OOP", "Math"], duration: "7 Days" },
      { module: "Data Processing", topics: ["Pandas", "EDA", "Cleaning"], duration: "4 Days" },
      { module: "Databases", topics: ["SQL", "Relational", "MongoDB"], duration: "4 Days" },
      { module: "Viz & Intelligence", topics: ["Power BI", "Dashboards"], duration: "3 Days" },
      { module: "Intelligence Tier", topics: ["Supervised", "Unsupervised", "Ensemble"], duration: "7 Days" },
      { module: "Advanced Tier", topics: ["Deep Learning", "NLP", "Vision"], duration: "5 Days" },
      { module: "Capstone", topics: ["Production Ready Deployment"], duration: "10 Days" }
    ],
    extendedDescription: "Our most comprehensive program. It takes you through the entire data lifecycle, ending with a massive Capstone project featuring an AI application integrated with a professional dashboard."
  },
  {
    id: "21",
    title: "Prompt Engineering & Generative AI",
    category: "prompt-engineering",
    description: "Learn to master LLMs and build autonomous AI workflows via professional prompting.",
    thumbnail: projectImages?.Prompt_Engineering_Generative_AI?.banner,
    rating: 4.9,
    studentsEnrolled: 2800,
    duration: "4 Days",
    effort: "5 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Generative AI",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 199,
    whatYouLearn: [
      "Understand tokenization and LLM behavior",
      "Master contextual and Role-based prompt design",
      "Implement multi-turn prompt chaining",
      "Automate workflows using LangChain and Python",
      "Ethical AI design and bias mitigation"
    ],
    requirements: ["Basic computer usage"],
    syllabus: [
      { module: "Intro", topics: ["LLM tokens", "Model behavior"], duration: "1 Day" },
      { module: "Prompt Craft", topics: ["Contextual", "Chain-of-thought"], duration: "1 Day" },
      { module: "Advanced Chaining", topics: ["Iterative Refinement", "Reasoning"], duration: "1 Day" },
      { module: "Automation", topics: ["Python APIs", "LangChain Intro"], duration: "1 Day" }
    ],
    extendedDescription: "Prompting is the new coding. Master the science of interacting with AI to build assistants, content generators, and reasoning tools."
  },
  {
    id: "22",
    title: "Generative AI Engineering",
    category: "generative-ai",
    description: "Master foundational models for text, image, audio, and video generation.",
    thumbnail: projectImages?.Generative_AI_Engineering?.banner,
    rating: 4.9,
    studentsEnrolled: 2200,
    duration: "6 Days",
    effort: "5-6 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Artificial Intelligence",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 249,
    whatYouLearn: [
      "Understand LLMs and Foundational models",
      "Fine-tuning techniques for custom datasets",
      "Image generation with Diffusion models (DALL-E, Midjourney)",
      "Audio generation and voice cloning basics",
      "Building RAG systems for domain knowledge"
    ],
    requirements: ["Intermediate Python", "NLP basics"],
    syllabus: [
      { module: "Foundations", topics: ["Generative vs Discriminative", "LLMs"], duration: "1 Day" },
      { module: "Text Generation", topics: ["Prompt Design", "Token Limits"], duration: "1 Day" },
      { module: "Media Gen", topics: ["Diffusion Models", "DALL-E", "Audio"], duration: "1 Day" },
      { module: "Fine Tuning", topics: ["Embeddings", "Domain adaptation"], duration: "1 Day" },
      { module: "Integration", topics: ["LangChain", "OpenAI APIs", "Apps"], duration: "1 Day" },
      { module: "Projects", topics: ["Automation Content tools"], duration: "1 Day" }
    ],
    extendedDescription: "Step into the world of creative AI. You will learn to architect systems that can generate human-like text and professional-grade digital media from simple prompts."
  },
  {
    id: "23",
    title: "Agentic AI & Autonomous Tools",
    category: "agentic-ai-tools",
    description: "Learn to build autonomous AI agents for complex workflow orchestration.",
    thumbnail: projectImages?.Agentic_AI_Autonomous_Tools?.banner,
    rating: 4.9,
    studentsEnrolled: 1800,
    duration: "4 Days",
    effort: "5-6 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Artificial Intelligence",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 249,
    whatYouLearn: [
      "Reactive vs Deliberative AI architectures",
      "Designing multi-step reasoning and goal planning",
      "Integrating agents with external tools and APIs",
      "Autonomous error recovery and decision hierarchies",
      "Building agents for web scraping and report generation"
    ],
    requirements: ["Strong Python skills"],
    syllabus: [
      { module: "Agent Intro", topics: ["BabyAGI", "AutoGPT", "Frameworks"], duration: "1 Day" },
      { module: "Planning", topics: ["Goal Setting", "Task hierarchies"], duration: "1 Day" },
      { module: "Integration", topics: ["Tools", "APIs", "Execution", "Recovery"], duration: "1 Day" },
      { module: "Monitoring", topics: ["Safety", "Evaluation", "Deployment"], duration: "1 Day" }
    ],
    extendedDescription: "Go beyond simple chatbots. Build AI systems that can plan, execute, and refine their own tasks autonomously using professional agentic frameworks."
  },
  {
    id: "24",
    title: "Blockchain & Smart Contracts",
    category: "blockchain",
    description: "Understand distributed ledgers and build decentralized applications (DApps) from scratch.",
    thumbnail: projectImages?.Blockchain_Smart_Contracts?.banner,
    rating: 4.8,
    studentsEnrolled: 2200,
    duration: "6 Days",
    effort: "5-6 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Blockchain",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 279,
    whatYouLearn: [
      "Master Blockchain hashing and security principles",
      "Understand Consensus (PoW, PoS, PoD)",
      "Develop Solidity Smart Contracts for Ethereum",
      "Build DApps with Web3.js and wallet integration",
      "Explore industry use cases (Finance, Supply Chain)"
    ],
    requirements: ["Basic JS and Networking knowledge"],
    syllabus: [
      { module: "Ledger Intro", topics: ["Blocks", "Nodes", "Consensus"], duration: "1 Day" },
      { module: "Security", topics: ["Hashing", "SHA-256", "Signatures"], duration: "1 Day" },
      { module: "Smart Contracts", topics: ["Solidity Basics", "EVM", "Deployment"], duration: "2 Days" },
      { module: "DApp Dev", topics: ["Web3.js", "MetaMask", "Voting Apps"], duration: "1 Day" },
      { module: "Industry Use", topics: ["Finance", "mHealth", "Supply Chain"], duration: "1 Day" }
    ],
    extendedDescription: "Understand the technology of trust. This course provides a hands-on journey from basic blocks to complex decentralized architectures."
  },
  {
    id: "25",
    title: "React Native: Cross-Platform Mobile",
    category: "react-native",
    description: "Learn to build professional mobile apps for iOS and Android using a single codebase.",
    thumbnail: projectImages?.React_Native_Cross_Platform_Mobile?.banner,
    rating: 4.8,
    studentsEnrolled: 3100,
    duration: "10 Days",
    effort: "5-6 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Mobile Development",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 199,
    whatYouLearn: [
      "Master React Native core components and layout",
      "Styling with Flexbox and StyleSheet",
      "State management with functional Hooks",
      "Multi-screen navigation and routing",
      "API integration and local storage management"
    ],
    requirements: ["Intermediate React knowledge"],
    syllabus: [
      { module: "Setup", topics: ["Expo CLI", "Project Structure"], duration: "1 Day" },
      { module: "UI Mastery", topics: ["View", "Text", "Styling", "Input"], duration: "2 Days" },
      { module: "Logic", topics: ["useState", "useEffect", "Props"], duration: "1 Day" },
      { module: "Navigation", topics: ["Stack", "Tab", "Drawer"], duration: "1 Day" },
      { module: "Data tier", topics: ["APIs", "JSON", "AsyncStorage"], duration: "1 Day" },
      { module: "Advanced", topics: ["Gestures", "Animations", "Notifications"], duration: "2 Days" },
      { module: "Release", topics: ["Debugging", "Testing", "APK build"], duration: "2 Days" }
    ],
    extendedDescription: "One code, two platforms. Master React Native and build highly optimized, native-feeling mobile applications for the global market."
  },
  {
    id: "26",
    title: "Quantum Computing Foundations",
    category: "quantum-computing",
    description: "Master qubits, superposition, and quantum algorithm design for advanced computing.",
    thumbnail: projectImages?.Quantum_Computing_Foundations?.banner,
    rating: 4.9,
    studentsEnrolled: 1200,
    duration: "4 Days",
    effort: "6-8 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Advanced Computing",
    level: "Advanced",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 299,
    whatYouLearn: [
      "Classical vs Quantum computing logic",
      "Mastering Superposition and Entanglement",
      "Designing and measuring Quantum Gates",
      "Implementing algorithms (Grover, Shor) in circuits",
      "Programming simulations using Qiskit or Cirq"
    ],
    requirements: ["Linear Algebra knowledge", "Python skills"],
    syllabus: [
      { module: "Core physics", topics: ["Qubits", "Entanglement"], duration: "1 Day" },
      { module: "Logic", topics: ["Gates", "Circuits", "Probability"], duration: "1 Day" },
      { module: "Algorithms", topics: ["Grover's", "Shor's", "Teleportation"], duration: "1 Day" },
      { module: "Programming", topics: ["Qiskit", "QML Intro", "Simulations"], duration: "1 Day" }
    ],
    extendedDescription: "Bridge the gap between physics and computer science. You will build and simulate quantum circuits that solve problems impossible for classical machines."
  },
  {
    id: "27",
    title: "DevOps & Cloud Automation",
    category: "devops",
    description: "Master the software lifecycle using Docker, Kubernetes, Jenkins, and Terraform.",
    thumbnail: projectImages?.DevOps_Cloud_Automation?.banner,
    rating: 4.8,
    studentsEnrolled: 4800,
    duration: "10 Days",
    effort: "6-8 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Cloud Infrastructure",
    level: "Intermediate",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 299,
    whatYouLearn: [
      "CI/CD principles and automated pipelines",
      "Advanced version control with Git mastery",
      "Docker containerization and image orchestration",
      "Kubernetes cluster management and Pod deployments",
      "Infrastructure as Code (IaC) with Terraform"
    ],
    requirements: ["Basic Linux/Networking understanding"],
    syllabus: [
      { module: "Lifecycle", topics: ["CI/CD Intro", "Culture"], duration: "1 Day" },
      { module: "Git Mastery", topics: ["Branching", "Collaboration"], duration: "1 Day" },
      { module: "Automation", topics: ["Maven", "Jenkins Pipelines"], duration: "2 Days" },
      { module: "Docker", topics: ["Images", "Containers", "Dockerfiles"], duration: "1 Day" },
      { module: "Orchestrate", topics: ["Kubernetes", "Pods", "Deployments"], duration: "2 Days" },
      { module: "Infrastructure", topics: ["Prometheus", "Terraform", "AWS"], duration: "3 Days" }
    ],
    extendedDescription: "Bridge the gap between development and operations. Learn to build resilient, automated pipelines that deliver software at light-speed."
  },
  {
    id: "28",
    title: "Git & Version Control Mastery",
    category: "git-vcs",
    description: "Learn professional code collaboration, branching workflows, and conflict resolution.",
    thumbnail: projectImages?.Git_Version_Control_Mastery?.banner,
    rating: 4.8,
    studentsEnrolled: 5400,
    duration: "3 Days",
    effort: "4 hours/day",
    institution: "Techno Riderzz Academy",
    subject: "Software Engineering",
    level: "Beginner",
    language: "English",
    hasCertificate: true,
    hasQuizzes: true,
    price: 49,
    whatYouLearn: [
      "Distributed VCS principles and Git architecture",
      "Mastering branching, merging, and rebasing",
      "Remote collaboration with GitHub and Pull Requests",
      "Git advanced techniques: Stashing, Tagging, and Undoing",
      "Implementing professional Git workflows (GitFlow)"
    ],
    requirements: ["Basic computer usage"],
    syllabus: [
      { module: "Git Basics", topics: ["Staging", "Commits", "History"], duration: "1 Day" },
      { module: "Collab", topics: ["Remote Repos", "PRs", "Code Review"], duration: "1 Day" },
      { module: "Workflows", topics: ["Rebasing", "GitFlow", "CI/CD integration"], duration: "1 Day" }
    ],
    extendedDescription: "Git is mandatory for every professional developer. This intensive 3-day course ensures you can manage code history and collaborate with teams without fear."
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(c => c.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(c => c.category === category);
};