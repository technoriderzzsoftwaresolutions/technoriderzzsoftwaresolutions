import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HighlightTextProps {
  children: ReactNode;
  variant?: "marker" | "underline" | "glow";
  color?: "primary" | "secondary" | "accent";
  className?: string;
  animated?: boolean;
}

const HighlightText = ({
  children,
  variant = "marker",
  color = "primary",
  className,
  animated = true,
}: HighlightTextProps) => {
  const colorClasses = {
    primary: {
      marker: "before:bg-primary/30",
      underline: "after:bg-primary",
      glow: "text-primary drop-shadow-[0_0_15px_hsl(45_93%_47%/0.5)]",
    },
    secondary: {
      marker: "before:bg-info/30",
      underline: "after:bg-info",
      glow: "text-info drop-shadow-[0_0_15px_hsl(199_89%_48%/0.5)]",
    },
    accent: {
      marker: "before:bg-success/30",
      underline: "after:bg-success",
      glow: "text-success drop-shadow-[0_0_15px_hsl(142_71%_45%/0.5)]",
    },
  };

  if (variant === "marker") {
    return (
      <span
        className={cn(
          "relative inline-block px-2 py-1",
          "before:absolute before:inset-0 before:-z-10 before:rounded-md",
          "before:origin-left",
          animated && "before:animate-marker-expand",
          colorClasses[color].marker,
          className
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === "underline") {
    return (
      <span
        className={cn(
          "relative inline-block",
          "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:rounded-full",
          "after:origin-left",
          animated && "after:animate-underline-expand",
          colorClasses[color].underline,
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        animated && "animate-glow-pulse",
        colorClasses[color].glow,
        className
      )}
    >
      {children}
    </span>
  );
};

export default HighlightText;
