"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const BeamsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let beams: Beam[] = [];

    const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
        beams = Array.from({ length: 30 }, () => createBeam(rect.width, rect.height));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        beams.forEach((beam, i) => {
            beam.y -= beam.speed;
            beam.pulse += beam.pulseSpeed;

            if (beam.y + beam.length < 0) {
                beams[i] = createBeam(canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
            }
            drawBeam(ctx, beam);
        });
        requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
  const angle = -45 + Math.random() * 15;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: height + Math.random() * 100,
    width: 20 + Math.random() * 40,
    length: height * 1.2,
    angle: angle,
    speed: 0.4 + Math.random() * 0.8,
    opacity: 0.05 + Math.random() * 0.1,
    hue: 190 + Math.random() * 40,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.02,
  };
}

function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
  ctx.save();
  ctx.translate(beam.x, beam.y);
  ctx.rotate((beam.angle * Math.PI) / 180);

  const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
  const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
  gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
  gradient.addColorStop(0.5, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
  gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

  ctx.fillStyle = gradient;
  ctx.filter = "blur(10px)";
  ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
  ctx.restore();
}
