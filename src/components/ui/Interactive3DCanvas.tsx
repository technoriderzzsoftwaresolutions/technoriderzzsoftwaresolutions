import { useEffect, useState, useRef } from "react";
import emblem from "@/assets/BrandEmblem.jpg";

interface SpherePixel {
  destIdx: number;
  nx: number;
  ny: number;
  nz: number;
}

interface Interactive3DCanvasProps {
  isHeroBackground?: boolean;
}

export default function Interactive3DCanvas({ isHeroBackground = false }: Interactive3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 10, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotX = -(y / (rect.height / 2)) * 18 + 10;
      const rotY = (x / (rect.width / 2)) * 18;
      setRotate({ x: rotX, y: rotY });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 10, y: 0 });
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const size = 420;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.src = emblem;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;
      tempCtx.drawImage(img, 0, 0);
      const srcImgData = tempCtx.getImageData(0, 0, img.width, img.height);
      const srcData = srcImgData.data;

      const cx = size / 2;
      const cy = size / 2;
      const r = size / 2 - 12;

      // Pre-calculate sphere pixel coordinates (Cache) for 60fps performance
      const pixelCache: SpherePixel[] = [];
      for (let y = 0; y < size; y++) {
        const dy = y - cy;
        if (Math.abs(dy) > r) continue;

        const ny = dy / r;
        const latWidth = Math.sqrt(r * r - dy * dy);

        for (let x = 0; x < size; x++) {
          const dx = x - cx;
          if (Math.abs(dx) > latWidth) continue;

          const nx = dx / r;
          const nz = Math.sqrt(1 - nx * nx - ny * ny);
          const destIdx = (y * size + x) * 4;

          pixelCache.push({ destIdx, nx, ny, nz });
        }
      }

      let angle = 0;
      const srcWidth = img.width;
      const srcHeight = img.height;
      const srcCx = srcWidth / 2;
      const srcCy = srcHeight / 2;
      // Globe radius scale matching the emblem's circular logo boundary (reduced to crop out white margin completely)
      const srcR = srcWidth * 0.435;

      const drawFrame = () => {
        ctx.clearRect(0, 0, size, size);

        const destImgData = ctx.createImageData(size, size);
        const destData = destImgData.data;

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const scaleX = srcR / srcWidth;
        const scaleY = srcR / srcHeight;
        const cxNorm = srcCx / srcWidth;
        const cyNorm = srcCy / srcHeight;

        // Map cached coordinates using 3D orthographic projection
        for (let i = 0; i < pixelCache.length; i++) {
          const p = pixelCache[i];

          const rx = p.nx * cosA - p.nz * sinA;
          const rz = p.nz * cosA + p.nx * sinA;

          // Scale coordinates so they map strictly within the logo circle boundary
          // This eliminates the wide white space / transparent gaps on the sides!
          const tx = rz >= 0 
            ? (rx * scaleX) + cxNorm 
            : (-rx * scaleX) + cxNorm;
          const ty = (p.ny * scaleY) + cyNorm;

          const floatX = tx * srcWidth;
          const floatY = ty * srcHeight;

          // Bilinear Interpolation for smooth rendering
          const x1 = Math.floor(floatX) % srcWidth;
          const y1 = Math.floor(floatY) % srcHeight;
          const x2 = (x1 + 1) % srcWidth;
          const y2 = (y1 + 1) % srcHeight;

          const dx = floatX - Math.floor(floatX);
          const dy = floatY - Math.floor(floatY);

          const destIdx = p.destIdx;

          const idx11 = (y1 * srcWidth + x1) * 4;
          const idx21 = (y1 * srcWidth + x2) * 4;
          const idx12 = (y2 * srcWidth + x1) * 4;
          const idx22 = (y2 * srcWidth + x2) * 4;

          const red = Math.floor(
            srcData[idx11] * (1 - dx) * (1 - dy) +
            srcData[idx21] * dx * (1 - dy) +
            srcData[idx12] * (1 - dx) * dy +
            srcData[idx22] * dx * dy
          );

          const green = Math.floor(
            srcData[idx11 + 1] * (1 - dx) * (1 - dy) +
            srcData[idx21 + 1] * dx * (1 - dy) +
            srcData[idx12 + 1] * (1 - dx) * dy +
            srcData[idx22 + 1] * dx * dy
          );

          const blue = Math.floor(
            srcData[idx11 + 2] * (1 - dx) * (1 - dy) +
            srcData[idx21 + 2] * dx * (1 - dy) +
            srcData[idx12 + 2] * (1 - dx) * dy +
            srcData[idx22 + 2] * dx * dy
          );

          destData[destIdx] = red;
          destData[destIdx + 1] = green;
          destData[destIdx + 2] = blue;
          destData[destIdx + 3] = 255;
        }

        ctx.putImageData(destImgData, 0, 0);

        // Specular highlight gradient (light reflection top-left)
        const hlGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 0, cx - r * 0.2, cy - r * 0.2, r * 0.6);
        hlGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        hlGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
        hlGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = hlGrad;
        ctx.fill();

        // Delicate outer glowing ring
        ctx.strokeStyle = "rgba(244, 63, 94, 0.25)";
        ctx.lineWidth = 3;
        ctx.stroke();

        angle += 0.005;
        animationId = requestAnimationFrame(drawFrame);
      };

      drawFrame();
    };

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const containerClass = isHeroBackground
    ? "absolute inset-x-0 top-0 w-full h-full flex items-start justify-center pt-20 md:pt-24 pointer-events-none z-0 overflow-hidden"
    : "relative w-full h-full flex items-center justify-center z-10";

  const sizeClass = isHeroBackground
    ? "w-[280px] h-[280px] md:w-[380px] md:h-[380px] opacity-[0.25]"
    : "w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-100";

  return (
    <div ref={containerRef} className={containerClass}>
      <div
        className={`${sizeClass} transition-transform duration-500 ease-out preserve-3d animate-in fade-in zoom-in-95 duration-1000`}
        style={{
          perspective: "1000px",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        <div className="absolute inset-[-15px] rounded-full bg-gradient-to-br from-rose-500/10 to-indigo-500/10 blur-[35px] pointer-events-none" />

        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(244,63,94,0.15)]"
        />
      </div>
    </div>
  );
}
