import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  r: number;
  g: number;
  b: number;
  layer: number; // 0=far, 1=mid, 2=near
}

interface Streak {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  r: number;
  g: number;
  b: number;
}

const PALETTE = [
  { r: 255, g: 255, b: 255 }, // pure white
];

function randPalette() {
  return PALETTE[0];
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let streaks: Streak[] = [];
    let mouse = { x: -9999, y: -9999 };
    let t = 0;

    const LAYER_CONFIG = [
      { count: 35, speedMult: 0.25, radiusMult: 0.6, alpha: 0.3, connectDist: 120 },
      { count: 45, speedMult: 0.5,  radiusMult: 1.0, alpha: 0.55, connectDist: 155 },
      { count: 25, speedMult: 0.85, radiusMult: 1.6, alpha: 0.8,  connectDist: 110 },
    ];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      spawnParticles();
    }

    function spawnParticles() {
      particles = [];
      LAYER_CONFIG.forEach((cfg, layer) => {
        for (let i = 0; i < cfg.count; i++) {
          const col = randPalette();
          const speed = (Math.random() * 0.4 + 0.15) * cfg.speedMult;
          const angle = Math.random() * Math.PI * 2;
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: (Math.random() * 1.2 + 0.6) * cfg.radiusMult,
            baseAlpha: cfg.alpha,
            alpha: cfg.alpha,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.025 + 0.01,
            color: `rgb(${col.r},${col.g},${col.b})`,
            r: col.r, g: col.g, b: col.b,
            layer,
          });
        }
      });
    }

    function spawnStreak() {
      const col = randPalette();
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      const angle = (Math.random() * 0.6 + 0.2) * Math.PI;
      const speed = Math.random() * 6 + 4;
      if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
      else if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
      else if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
      else { x = 0; y = Math.random() * canvas.height; }
      streaks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 60 + 40,
        r: col.r, g: col.g, b: col.b,
      });
    }
    function drawFrame() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Spawn streaks and draw streaks removed to keep bg clean without lines

      // Update + draw particles
      for (const p of particles) {
        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * p.baseAlpha * 0.4;

        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100 && mdist > 0) {
          const force = (100 - mdist) / 100 * 0.8;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpd = 1.2 * (p.layer + 1) * 0.5;
        if (spd > maxSpd) { p.vx *= maxSpd / spd; p.vy *= maxSpd / spd; }

        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap (bounce with slight randomness)
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw glow — 3 rings
        const glowR = p.radius * 8;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grd.addColorStop(0,   `rgba(${p.r},${p.g},${p.b},${p.alpha * 0.9})`);
        grd.addColorStop(0.3, `rgba(${p.r},${p.g},${p.b},${p.alpha * 0.4})`);
        grd.addColorStop(0.7, `rgba(${p.r},${p.g},${p.b},${p.alpha * 0.08})`);
        grd.addColorStop(1,   `rgba(${p.r},${p.g},${p.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Hard bright center dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${Math.min(1, p.alpha + 0.5)})`;
        ctx.fill();
      }

      // Drawing connections and mouse lines removed to keep background clean without lines

      t++;
      animId = requestAnimationFrame(drawFrame);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    drawFrame();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
    />
  );
}
