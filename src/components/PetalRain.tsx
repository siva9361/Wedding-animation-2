"use client";

import { useEffect, useRef } from "react";

type Kind = "rose" | "marigold" | "jasmine";

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  flip: number;
  vflip: number;
  sway: number;
  size: number;
  sprite: HTMLCanvasElement;
  life: number;
}

interface PetalRainProps {
  /** Continuous gentle fall. */
  active: boolean;
  /** Increment to trigger a one-off celebratory burst. */
  burst: number;
}

const SPRITE = 64;

function makeSprite(draw: (ctx: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE;
  const ctx = c.getContext("2d")!;
  ctx.translate(SPRITE / 2, SPRITE / 2);
  draw(ctx);
  return c;
}

function rosePetal(base: string, edge: string) {
  return makeSprite((ctx) => {
    const g = ctx.createRadialGradient(-6, -8, 2, 0, 0, 30);
    g.addColorStop(0, base);
    g.addColorStop(1, edge);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -26);
    ctx.bezierCurveTo(24, -18, 22, 18, 0, 28);
    ctx.bezierCurveTo(-22, 18, -24, -18, 0, -26);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.25)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.quadraticCurveTo(4, 0, 0, 22);
    ctx.stroke();
  });
}

function marigoldPetal(color: string) {
  return makeSprite((ctx) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.bezierCurveTo(14, -20, 16, 6, 10, 18);
    ctx.lineTo(5, 14);
    ctx.lineTo(0, 20);
    ctx.lineTo(-5, 14);
    ctx.lineTo(-10, 18);
    ctx.bezierCurveTo(-16, 6, -14, -20, 0, -22);
    ctx.fill();
    ctx.fillStyle = "rgba(180,70,0,.35)";
    ctx.fillRect(-1, -16, 2, 30);
  });
}

function jasmine() {
  return makeSprite((ctx) => {
    ctx.shadowColor = "rgba(120,100,60,.35)";
    ctx.shadowBlur = 4;
    ctx.fillStyle = "#fffef8";
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / 5);
      ctx.beginPath();
      ctx.ellipse(0, -13, 6.5, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#f3e2a6";
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

export default function PetalRain({ active, burst }: PetalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petals = useRef<Petal[]>([]);
  const sprites = useRef<Record<Kind, HTMLCanvasElement[]> | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pick = (): HTMLCanvasElement => {
    const s = sprites.current!;
    const r = Math.random();
    const kind: Kind = r < 0.45 ? "rose" : r < 0.75 ? "marigold" : "jasmine";
    const list = s[kind];
    return list[(Math.random() * list.length) | 0];
  };

  const spawn = (x: number, y: number, vx: number, vy: number): Petal => ({
    x,
    y,
    vx,
    vy,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.06,
    flip: Math.random() * Math.PI * 2,
    vflip: 0.02 + Math.random() * 0.05,
    sway: Math.random() * Math.PI * 2,
    size: 0.28 + Math.random() * 0.32,
    sprite: pick(),
    life: 0,
  });

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    sprites.current = {
      rose: [rosePetal("#ff5d7d", "#a3002f"), rosePetal("#ff8fab", "#c2185b"), rosePetal("#e0284f", "#7a0020")],
      marigold: [marigoldPetal("#ffb300"), marigoldPetal("#ff8f00"), marigoldPetal("#ffd54f")],
      jasmine: [jasmine()],
    };

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      ctx.clearRect(0, 0, w, h);

      const target = reduced ? 0 : Math.round(Math.min(w, 1400) / 28);
      if (activeRef.current && petals.current.length < target && Math.random() < 0.25 * dt) {
        petals.current.push(spawn(Math.random() * w, -30, (Math.random() - 0.5) * 0.6, 0.6 + Math.random() * 0.9));
      }

      const next: Petal[] = [];
      for (const p of petals.current) {
        p.life += dt;
        p.sway += 0.02 * dt;
        p.vy = Math.min(p.vy + 0.035 * dt, 1.6 + p.size * 2);
        p.vx *= 0.985;
        p.x += (p.vx + Math.sin(p.sway) * 0.6) * dt;
        p.y += p.vy * dt;
        p.rot += p.vrot * dt;
        p.flip += p.vflip * dt;
        if (p.y > h + 40 || p.x < -60 || p.x > w + 60) continue;
        next.push(p);

        const s = SPRITE * p.size;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, 0.35 + Math.abs(Math.cos(p.flip)) * 0.65);
        ctx.globalAlpha = Math.min(1, p.life / 12);
        ctx.drawImage(p.sprite, -s / 2, -s / 2, s, s);
        ctx.restore();
      }
      petals.current = next;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Celebratory burst from the centre of the doorway
  useEffect(() => {
    if (!burst || !sprites.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = reduced ? 0 : Math.min(110, Math.round(w / 9));
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
      const speed = 4 + Math.random() * 9;
      petals.current.push(
        spawn(
          w * (i % 2 ? 0.72 : 0.28) + (Math.random() - 0.5) * 80,
          h * 0.55,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
        ),
      );
    }
    // Plus a curtain from the top edge
    for (let i = 0; i < count / 2; i++) {
      petals.current.push(spawn(Math.random() * w, -20 - Math.random() * h * 0.6, 0, 1 + Math.random()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burst]);

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />;
}
