"use client";

import { useEffect, useRef, useState } from "react";
import { Move, Pause, Play, RotateCcw, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

export function PixelForge() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gravity, setGravity] = useState(false);
  
  // Physics config
  const PARTICLE_COUNT = 800; // High count for "Pro Max" feel
  const MOUSE_RADIUS = 150;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        
        // Vibrant neon palette
        const colors = ["#8b5cf6", "#d946ef", "#3b82f6", "#06b6d4"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!isPlaying) return;

        // Mouse Repulsion Physics
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = MOUSE_RADIUS;
        const force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < MOUSE_RADIUS) {
          this.x -= directionX * 3;
          this.y -= directionY * 3;
        } else {
             // Return to base or float freely
             if (!gravity) {
                if (this.x !== this.baseX) {
                    const dx = this.x - this.baseX;
                    this.x -= dx / 50; // Elastic return
                }
                if (this.y !== this.baseY) {
                    const dy = this.y - this.baseY;
                    this.y -= dy / 50;
                }
             }
        }

        // Gravity Mode
        if (gravity) {
            this.vy += 0.2; // Gravity force
            this.x += this.vx;
            this.y += this.vy;

            // Bounce floor
            if (this.y > height) {
                this.y = height;
                this.vy *= -0.8; // Dampening
            }
            // Side walls bounce
            if (this.x > width || this.x < 0) this.vx *= -1;
        }

        // Standard noise movement if no forces
        if (!gravity && distance >= MOUSE_RADIUS) {
            // Nothing needed if returning to base, but maybe standard jitter?
        }
      }

      draw() {
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Connect particles (optional expensive calc, maybe skip for performance if needed)
        // For performance on 800 particles, only connect very close ones
        for (let a = 0; a < particles.length; a++) {
            particles[a].update();
            particles[a].draw();
        }
        
        animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = canvasRef.current?.offsetWidth || 0;
      height = canvas.height = canvasRef.current?.offsetHeight || 0;
      init();
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        mouse.x = clientX - rect.left;
        mouse.y = clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchstart", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchstart", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, gravity]);

  return (
    <div className="relative w-full h-[80vh] bg-black rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
        <canvas 
            ref={canvasRef} 
            className="w-full h-full block touch-none"
        />

        {/* Overlay UI */}
        <div className="absolute top-6 left-6 pointer-events-none">
            <h2 className="text-4xl font-black text-white tracking-tighter mix-blend-difference mb-2">PIXEL FORGE</h2>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest backdrop-blur-md bg-black/50 inline-block px-2 py-1 rounded">Interactive Generative Engine</p>
        </div>

        {/* Controls Toolbar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl">
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="w-px h-8 bg-white/10 mx-1" />
            <button 
                onClick={() => setGravity(false)}
                className={cn("p-3 rounded-xl transition-colors", !gravity ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "bg-neutral-800 text-neutral-400 hover:text-white")}
                title="Float Mode"
            >
                <Move size={20} />
            </button>
            <button 
                onClick={() => setGravity(true)}
                className={cn("p-3 rounded-xl transition-colors", gravity ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/20" : "bg-neutral-800 text-neutral-400 hover:text-white")}
                title="Gravity Mode"
            >
                <Wind size={20} />
            </button>
            <div className="w-px h-8 bg-white/10 mx-1" />
            <button 
                onClick={() => setGravity(false)} // Just resets state via re-render essentially
                className="p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                title="Reset"
            >
                <RotateCcw size={20} />
            </button>
        </div>
    </div>
  );
}
