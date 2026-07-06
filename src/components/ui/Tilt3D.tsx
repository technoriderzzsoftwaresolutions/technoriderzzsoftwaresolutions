import React, { useRef, useState } from "react";

interface Tilt3DProps {
  children: React.ReactNode;
  maxTilt?: number; // Maximum tilt angle in degrees
  scale?: number; // Scale factor on hover
  className?: string;
}

export default function Tilt3D({ children, maxTilt = 12, scale = 1.03, className = "" }: Tilt3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [shadowStyle, setShadowStyle] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X coordinate relative to card
    const y = e.clientY - rect.top;  // Mouse Y coordinate relative to card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles
    const rotateX = ((y - centerY) / centerY) * maxTilt * -1; // Tilts forward/backward
    const rotateY = ((x - centerX) / centerX) * maxTilt;      // Tilts left/right

    // Shift dynamic shadow source based on mouse position
    const shadowX = ((centerX - x) / centerX) * 15;
    const shadowY = ((centerY - y) / centerY) * 15;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    setShadowStyle(`${shadowX}px ${shadowY + 25}px 50px -15px rgba(37, 99, 235, 0.25)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadowStyle("");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        boxShadow: shadowStyle,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.2s",
      }}
      className={`will-change-transform transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
