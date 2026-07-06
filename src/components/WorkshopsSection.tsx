import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, User, AlertTriangle, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workshops } from "@/data/workshops";
import Tilt3D from "@/components/ui/Tilt3D";

// Helper Countdown component
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 text-center bg-slate-950/40 p-3 rounded-2xl border border-slate-900/60">
      <div>
        <div className="text-sm font-black text-rose-500">{timeLeft.days}</div>
        <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Days</div>
      </div>
      <div>
        <div className="text-sm font-black text-rose-500">{timeLeft.hours}</div>
        <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Hrs</div>
      </div>
      <div>
        <div className="text-sm font-black text-rose-500">{timeLeft.minutes}</div>
        <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Mins</div>
      </div>
      <div>
        <div className="text-sm font-black text-rose-500 animate-pulse">{timeLeft.seconds}</div>
        <div className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">Secs</div>
      </div>
    </div>
  );
}

export default function WorkshopsSection() {
  return (
    <section id="workshops" className="py-8 md:py-12 bg-white text-slate-900 border-b border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-4 py-1.5 rounded-full">
              Workshops Hub
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mt-4">
              Upcoming Technical Workshops
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2">
              Book your slots for hands-on, kit-based lab workshops led by industry mentors.
            </p>
          </div>
          <Link to="/contact?subject=Workshop" className="shrink-0 mt-4 md:mt-0">
            <Button variant="outline" className="gap-2 rounded-full border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Request College MoU <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Horizontal Infinite Marquee Ticker */}
        <div className="relative w-full overflow-hidden">
          {/* Left/Right fading gradients to blend marquee edges smoothly */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee-scroll-slow flex gap-6 py-4">
            {[...workshops, ...workshops, ...workshops].map((w, idx) => (
              <div key={`${w.id}-${idx}`} className="w-[320px] shrink-0 h-full">
                <Tilt3D maxTilt={6} scale={1.02} className="h-full">
                  <div className="flex flex-col justify-between h-full bg-slate-900/15 border border-slate-900/60 p-6 rounded-2xl text-left hover:border-rose-500/20 hover:bg-slate-900/35 transition-all duration-300 shadow-md min-h-[480px]">
                    
                    <div>
                      {/* Category Pill and Ticking Alert */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-rose-500 bg-rose-950/20 border border-rose-900/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none">
                          {w.category}
                        </span>
                        {w.seatsLeft <= 10 && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500 bg-rose-950/20 px-2 py-0.5 rounded-full select-none">
                            <AlertTriangle className="h-3 w-3 animate-pulse" /> Only {w.seatsLeft} Seats Left!
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-lg text-white mb-4 line-clamp-2">
                        {w.title}
                      </h3>

                      {/* Countdown Timer component */}
                      <div className="mb-6">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                          Registration Closes In
                        </span>
                        <CountdownTimer targetDate={w.date} />
                      </div>
                    </div>

                     {/* Info Footer */}
                    <div className="space-y-4 pt-4 border-t border-slate-900/60 mt-auto">
                      {/* Speaker Info */}
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-900/30 border border-slate-900 flex items-center justify-center text-slate-400">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-200">{w.speaker}</h4>
                          <p className="text-[9px] text-slate-400">{w.speakerTitle}</p>
                        </div>
                      </div>
 
                      {/* Venue and Date Details */}
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                          <span className="truncate">{w.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500 shrink-0" />
                          <span>{new Date(w.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                      </div>
 
                      {/* Register Trigger */}
                      <Link to={w.registrationLink} className="block w-full">
                        <Button className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 shadow-lg shadow-rose-500/10">
                          Register Now
                        </Button>
                      </Link>
                    </div>

                  </div>
                </Tilt3D>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
