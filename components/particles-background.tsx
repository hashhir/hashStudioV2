"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const particles: Particle[] = [];
    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particleCount = Math.min(90, Math.floor((width * height) / 18000));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      particleCount = Math.min(90, Math.floor((width * height) / 18000));
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

      particles.length = 0;
      for (let index = 0; index < particleCount; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.7 + 0.6,
        });
      }
    };

    const render = () => {
      const fill = resolvedTheme === "dark" ? "rgba(246, 242, 235, 0.5)" : "rgba(15, 15, 16, 0.36)";
      const link = resolvedTheme === "dark" ? "rgba(246, 242, 235, 0.1)" : "rgba(15, 15, 16, 0.08)";

      context.clearRect(0, 0, width, height);

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const dx = pointerRef.current.x - particle.x;
        const dy = pointerRef.current.y - particle.y;
        const distance = Math.hypot(dx, dy) || 1;

        if (pointerRef.current.active && distance < 220) {
          const force = (1 - distance / 220) * 0.045;
          particle.vx -= (dx / distance) * force;
          particle.vy -= (dy / distance) * force;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.96;
        particle.vy *= 0.96;

        particle.vx += (Math.random() - 0.5) * 0.002;
        particle.vy += (Math.random() - 0.5) * 0.002;

        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        context.beginPath();
        context.fillStyle = fill;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();

        for (let neighborIndex = index + 1; neighborIndex < particles.length; neighborIndex += 1) {
          const neighbor = particles[neighborIndex];
          const distanceToNeighbor = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);

          if (distanceToNeighbor < 90) {
            context.beginPath();
            context.strokeStyle = link;
            context.lineWidth = 0.5;
            context.moveTo(particle.x, particle.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
    };

    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
}
