import { useEffect, useState, useRef } from "react";
import { CheckCircle, Award, Terminal, Briefcase, FileText, ArrowUpRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";

export default function HeroDashboard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 12, y: -8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Max rotation: X-axis 14deg, Y-axis 14deg
      const rotX = -(y / (rect.height / 2)) * 14 + 10;
      const rotY = (x / (rect.width / 2)) * 14 - 5;
      setRotate({ x: rotX, y: rotY });
    };

    const handleMouseLeave = () => {
      // Revert to stable default angle
      setRotate({ x: 12, y: -8 });
    };

    const el = containerRef.current;
    if (el) {
      window.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (el) {
        window.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto mt-14 mb-6 perspective-1000 preserve-3d"
      style={{ minHeight: "360px" }}
    >
      {/* 3D Tilted Wrapper with smooth transition */}
      <div 
        className="w-full h-full preserve-3d transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        
        {/* Main Dashboard Frame (Linear style mockup container) */}
        <div className="relative w-full aspect-[16/10] bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-2 md:p-3 overflow-hidden preserve-3d">
          {/* Mockup Dashboard Analytics Image */}
          <SafeImage 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80" 
            alt="Ecosystem Console Mockup"
            className="w-full h-full object-cover rounded-xl opacity-75 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Floating Card 1: Internship Offer (Z-depth 45px, float slow 1) */}
        <div className="absolute -top-6 -left-6 md:-left-12 w-52 md:w-56 bg-slate-955 bg-slate-950/85 backdrop-blur border border-rose-500/30 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 preserve-3d animate-float-card-1">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Briefcase className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <h5 className="text-[10px] font-bold text-white leading-none">MERN Stack Internship</h5>
              <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-wider block mt-1">Verified Offer</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-800/80 pt-2.5">
            <span>Stipend: ₹15,000/mo</span>
            <span className="text-white font-bold flex items-center gap-0.5">Applied <CheckCircle className="h-3 w-3 text-emerald-400" /></span>
          </div>
        </div>

        {/* Floating Card 2: Academic Project (Z-depth 75px, float slow 2) */}
        <div className="absolute -bottom-6 -right-6 md:-right-10 w-56 md:w-64 bg-slate-955 bg-slate-950/85 backdrop-blur border border-indigo-500/30 p-4 rounded-2xl shadow-2xl transition-all duration-300 preserve-3d animate-float-card-2">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="h-8.5 w-8.5 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Terminal className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <h5 className="text-[10px] font-bold text-white leading-none">AI Quality Classifier</h5>
              <span className="text-[8px] text-indigo-400 font-bold block mt-1">Python + TensorFlow</span>
            </div>
          </div>
          <div className="space-y-1.5 text-left border-t border-slate-800/80 pt-2.5">
            <div className="flex items-center justify-between text-[8px] text-slate-400">
              <span>Source Code Package</span>
              <span className="text-emerald-400 font-bold">Complete Included</span>
            </div>
            <div className="flex items-center justify-between text-[8px] text-slate-400">
              <span>Report & PPT</span>
              <span className="text-emerald-400 font-bold">120+ Pages</span>
            </div>
          </div>
        </div>

        {/* Floating Card 3: IEEE Publication Guidance (Z-depth 105px, float slow 3) */}
        <div className="absolute top-12 -right-8 md:-right-16 w-48 md:w-52 bg-slate-955 bg-slate-955 bg-slate-950/85 backdrop-blur border border-rose-500/30 p-3.5 rounded-2xl shadow-2xl transition-all duration-300 preserve-3d animate-float-card-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div className="text-left">
              <h5 className="text-[10px] font-bold text-white leading-none">IEEE Paper Draft</h5>
              <span className="text-[8px] text-slate-400 block mt-0.5">Scopus / SCI Guidance</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[8px] font-bold text-rose-455 text-rose-400 border-t border-slate-800/80 pt-2.5 text-left">
            <span>Publish Journal</span>
            <ArrowUpRight className="h-3 w-3 text-rose-400" />
          </div>
        </div>

      </div>
    </div>
  );
}
