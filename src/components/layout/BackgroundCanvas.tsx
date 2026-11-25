"use client";

import React, { useEffect, useRef, useState } from "react";

// One-line swap to replace the full-screen village splash backdrop
export const BG_SPLASH_IMAGE = "/bg-village.png";

interface BackgroundCanvasProps {
  reduceMotion: boolean;
  particlesEnabled: boolean;
}

export function BackgroundCanvas({
  reduceMotion,
  particlesEnabled,
}: BackgroundCanvasProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bgAvailable, setBgAvailable] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle parallax drift on pointer movement
  useEffect(() => {
    if (reduceMotion) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * -18;
      const normY = (e.clientY / window.innerHeight - 0.5) * -14;
      setOffset({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion]);

  // Subtle floating embers & golden sparkles behind the UI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!particlesEnabled || reduceMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationFrameId = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 34 }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 1.4 + Math.random() * 2.4,
      speedY: 0.25 + Math.random() * 0.55,
      swayOffset: idx * 0.7,
      alpha: 0.22 + Math.random() * 0.45,
      isGold: idx % 3 !== 0,
    }));

    let tick = 0;
    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += Math.sin(tick + p.swayOffset) * 0.35;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(255, 212, 59, ${p.alpha})`
          : `rgba(255, 135, 60, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [particlesEnabled, reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#17110B]"
    >
      {/* Fallback Moody Village Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 25%, #3B2816 0%, #1F150D 58%, #0E0905 100%)",
        }}
      />

      {/* Splash Art Layer with Parallax Drift */}
      {bgAvailable && (
        <div
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(1.06)`,
            transition: reduceMotion ? "none" : "transform 0.35s ease-out",
          }}
          className="absolute inset-0"
        >
          <img
            src={BG_SPLASH_IMAGE}
            alt=""
            onError={() => setBgAvailable(false)}
            className="h-full w-full object-cover opacity-55"
          />
        </div>
      )}

      {/* Dark Vignette Overlay for crisp UI legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(16, 11, 6, 0.25) 0%, rgba(12, 8, 4, 0.78) 72%, rgba(7, 4, 2, 0.94) 100%)",
        }}
      />

      {/* Ambient Floating Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
