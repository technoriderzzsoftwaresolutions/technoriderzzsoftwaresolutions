import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-in" | "slide-in" | "typewriter";
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const AnimatedText = ({
  children,
  variant = "fade-up",
  delay = 0,
  className,
  as: Component = "div",
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const variants = {
    "fade-up": cn(
      "transition-all duration-700 ease-out",
      isVisible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    ),
    "fade-in": cn(
      "transition-opacity duration-700 ease-out",
      isVisible ? "opacity-100" : "opacity-0"
    ),
    "slide-in": cn(
      "transition-all duration-700 ease-out",
      isVisible
        ? "opacity-100 translate-x-0"
        : "opacity-0 -translate-x-8"
    ),
    typewriter: cn(
      isVisible ? "animate-typewriter" : "opacity-0"
    ),
  };

  return (
    <Component ref={ref as any} className={cn(variants[variant], className)}>
      {children}
    </Component>
  );
};

export default AnimatedText;
