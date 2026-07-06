import { Linkedin, Star, Quote } from "lucide-react";

interface SuccessCard {
  name: string;
  avatar: string;
  college: string;
  placedAt: string;
  package: string;
  projectBuilt: string;
  quote: string;
}

const stories: SuccessCard[] = [
  {
    name: "Rohan Sharma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    college: "VNR Vignana Jyothi Institute",
    placedAt: "Amazon",
    package: "28 LPA",
    projectBuilt: "AI-Based Real-time Attendance System",
    quote: "Building my final-year project at Techno Riderzz was the turning point. The technical depth of the ML stack and IEEE guidance helped me clear the Amazon system design rounds."
  },
  {
    name: "Sneha Reddy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    college: "CBIT Hyderabad",
    placedAt: "Microsoft",
    package: "32 LPA",
    projectBuilt: "IoT-Driven Smart Agriculture Irrigation",
    quote: "The internship and hands-on IoT hardware training gave me industry-ready skills. I was able to showcase real projects on my portfolio which made my Microsoft application stand out!"
  },
  {
    name: "Sai Kiran",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    college: "GRIET Hyderabad",
    placedAt: "TCS Digital",
    package: "9.5 LPA",
    projectBuilt: "Security Framework using Blockchain",
    quote: "I joined the MERN stack boot camp and completed my project documentation. The mentorship from the core engineering team helped me secure a direct placement in TCS Digital."
  }
];

export default function SuccessStories() {
  return (
    <section className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full">
            Alumni Placements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
            Student Success Stories
          </h2>
          <div className="h-1 bg-rose-600 w-12 mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-3">
            Hear from our students who built projects, completed internships, and launched their careers.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div 
              key={story.name}
              className="flex flex-col justify-between bg-slate-900/10 p-8 rounded-2xl border border-slate-900/60 relative hover:border-rose-500/20 hover:bg-slate-900/25 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Quote bubble absolute accent */}
              <Quote className="absolute top-6 right-8 h-8 w-8 text-rose-500/10 group-hover:text-rose-500/20 transition-colors" />

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic mb-8 relative z-10 text-left">
                  "{story.quote}"
                </p>
              </div>

              {/* Student Bio */}
              <div>
                {/* Project tag */}
                <div className="mb-6 p-3 bg-slate-900/20 rounded-2xl border border-slate-900/60 text-left">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block mb-1">
                    Project Built
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate block">
                    {story.projectBuilt}
                  </span>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-4">
                  <img 
                    src={story.avatar} 
                    alt={story.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {story.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mb-1">
                      {story.college}
                    </p>
                    {/* Placed tag */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded-full select-none">
                        {story.placedAt}
                      </span>
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded-full select-none">
                        {story.package}
                      </span>
                    </div>
                  </div>

                  {/* LinkedIn Connect Icon */}
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-slate-900/20 hover:bg-blue-950/30 text-slate-400 hover:text-blue-400 rounded-xl border border-slate-900/60 hover:border-blue-900/40 transition-all"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
