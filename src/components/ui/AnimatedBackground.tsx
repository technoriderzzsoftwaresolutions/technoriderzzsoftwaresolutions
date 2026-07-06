import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
  shape: "circle" | "square" | "triangle";
}

const AnimatedBackground = () => {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(346.8 77.2% 49.8% / 0.05)",
      "hsl(350 80% 60% / 0.04)",
      "hsl(320 84% 61% / 0.04)",
      "hsl(262 83% 58% / 0.03)",
      "hsl(142 71% 45% / 0.03)",
    ];

    const shapeTypes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"];
    
    const generatedShapes: FloatingShape[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 80 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    }));

    setShapes(generatedShapes);
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseStyle = {
      width: shape.size,
      height: shape.size,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      animationDuration: `${shape.duration}s`,
      animationDelay: `${shape.delay}s`,
      backgroundColor: shape.shape !== "triangle" ? shape.color : "transparent",
    };

    if (shape.shape === "circle") {
      return (
        <div
          key={shape.id}
          className="absolute rounded-full animate-float-slow blur-sm"
          style={baseStyle}
        />
      );
    }

    if (shape.shape === "square") {
      return (
        <div
          key={shape.id}
          className="absolute rounded-lg animate-float-slow rotate-45 blur-sm"
          style={baseStyle}
        />
      );
    }

    return (
      <div
        key={shape.id}
        className="absolute animate-float-slow"
        style={{
          ...baseStyle,
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid ${shape.color}`,
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map(renderShape)}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
    </div>
  );
};

export default AnimatedBackground;
