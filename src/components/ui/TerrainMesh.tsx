import { useEffect, useRef } from "react";

export default function TerrainMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const COLS = 36;
    const ROWS = 22;
    const LINE_COLOR_TOP = "rgba(99,102,241,0.08)";
    const LINE_COLOR_MID = "rgba(79,70,229,0.18)";
    const LINE_COLOR_BOT = "rgba(59,130,246,0.35)";

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function getHeight(col: number, row: number, time: number): number {
      const nx = col / COLS;
      const ny = row / ROWS;
      const wave =
        Math.sin(nx * 6 + time * 0.6) * 18 +
        Math.sin(ny * 5 - time * 0.5) * 14 +
        Math.sin((nx + ny) * 7 + time * 0.8) * 10 +
        Math.sin(nx * 3 - ny * 4 + time * 0.4) * 8;
      return wave;
    }

    function project(
      x: number,
      y: number,
      z: number,
      W: number,
      H: number
    ): [number, number] {
      // Simple perspective projection from 3D grid to 2D canvas
      const fov = 0.75;
      const camZ = 1.6;
      const scale = fov / (fov + (z + camZ));
      const px = W / 2 + x * scale * W * 0.65;
      const py = H * 0.68 + y * scale * H * 0.55;
      return [px, py];
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Build 2D grid of projected points
      const pts: [number, number][][] = [];
      for (let row = 0; row <= ROWS; row++) {
        const rowPts: [number, number][] = [];
        for (let col = 0; col <= COLS; col++) {
          const gx = (col / COLS - 0.5) * 2.4;   // -1.2 to 1.2
          const gz = (row / ROWS) * 1.8 - 0.2;    // 0 to 1.8 depth
          const height = getHeight(col, row, t);
          const gy = height / H - gz * 0.18;       // lift + depth tilt
          const [px, py] = project(gx, gy, gz, W, H);
          rowPts.push([px, py]);
        }
        pts.push(rowPts);
      }

      // Draw horizontal lines (rows)
      for (let row = 0; row <= ROWS; row++) {
        const alpha = row / ROWS; // 0 = far/top, 1 = near/bottom
        const color =
          alpha < 0.35
            ? LINE_COLOR_TOP
            : alpha < 0.65
            ? LINE_COLOR_MID
            : LINE_COLOR_BOT;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = alpha < 0.4 ? 0.6 : alpha < 0.7 ? 0.9 : 1.3;
        for (let col = 0; col <= COLS; col++) {
          const [px, py] = pts[row][col];
          if (col === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Draw vertical lines (columns)
      for (let col = 0; col <= COLS; col++) {
        ctx.beginPath();
        for (let row = 0; row <= ROWS; row++) {
          const alpha = row / ROWS;
          const color =
            alpha < 0.35
              ? LINE_COLOR_TOP
              : alpha < 0.65
              ? LINE_COLOR_MID
              : LINE_COLOR_BOT;
          ctx.strokeStyle = color;
          ctx.lineWidth = alpha < 0.4 ? 0.5 : alpha < 0.7 ? 0.8 : 1.1;
          const [px, py] = pts[row][col];
          if (row === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(px, py);
          }
        }
      }

      t += 0.012;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[55%] pointer-events-none z-0"
      style={{ maskImage: "linear-gradient(to top, black 30%, transparent 100%)" }}
    />
  );
}
