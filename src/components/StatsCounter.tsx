import { useEffect, useState, useRef } from "react";
import { 
  Code, Building2, Users, Calendar, 
  Briefcase, BookOpen 
} from "lucide-react";

interface StatItemProps {
  icon: any;
  target: number;
  suffix: string;
  label: string;
  color: string;
}

function Counter({ target, duration = 2000, startTrigger }: { target: number; duration?: number; startTrigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / 16)); // ~60fps
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, startTrigger]);

  // Format count with commas
  return <span>{count.toLocaleString()}</span>;
}

function StatItem({ icon: Icon, target, suffix, label, color }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={elementRef}
      className="flex flex-col items-center p-6 bg-slate-100 border border-slate-300 rounded-2xl transition-all duration-300 hover:border-rose-500/20 hover:bg-slate-150 hover:shadow-lg text-center"
    >
      <div className={`p-4 rounded-2xl ${color} mb-4 flex items-center justify-center border border-slate-200`}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        <Counter target={target} startTrigger={isVisible} />
        {suffix}
      </p>
      <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      icon: Code,
      target: 500,
      suffix: "+",
      label: "Projects",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      icon: Building2,
      target: 20,
      suffix: "+",
      label: "Partner Colleges",
      color: "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400"
    },
    {
      icon: Users,
      target: 10000,
      suffix: "+",
      label: "Active Students",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      icon: Calendar,
      target: 100,
      suffix: "+",
      label: "Workshops Conducted",
      color: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
    },
    {
      icon: Briefcase,
      target: 100,
      suffix: "+",
      label: "Internship Programs",
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
      icon: BookOpen,
      target: 200,
      suffix: "+",
      label: "Research Publications",
      color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full">
            Ecosystem Metrics
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-4">
            Platform Statistics at a Glance
          </h2>
          <div className="h-1 bg-blue-600 w-12 mx-auto mt-4 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <StatItem 
              key={idx}
              icon={stat.icon}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
