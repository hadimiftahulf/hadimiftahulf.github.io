"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./language-provider";
import { 
  Code, 
  Play, 
  Terminal, 
  Cpu, 
  Zap, 
  FlaskConical, 
  Maximize2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface Experiment {
  id: string;
  name: string;
  description: Record<'en' | 'id', string>;
  code: string;
  action: () => void;
  color: string;
}

const experiments: Experiment[] = [
  {
    id: "particle-burst",
    name: "Particle Dispersal",
    description: {
      en: "Trigger a canvas-based physics simulation using high-performance particles.",
      id: "Memicu simulasi fisika berbasis canvas menggunakan partikel berkinerja tinggi."
    },
    color: "text-pink-500",
    code: `async function disperseParticles() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}`,
    action: () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  },
  {
    id: "glitch-matrix",
    name: "Reality Glitch",
    description: {
      en: "Inject a temporary CSS filter matrix to distort the view rendering pipeline.",
      id: "Menyuntikkan matriks filter CSS sementara untuk mendistorsi pipeline rendering."
    },
    color: "text-green-500",
    code: `function triggerGlitch() {
  document.body.style.filter = "invert(1) hue-rotate(90deg)";
  document.body.style.transform = "scale(0.98)";
  
  setTimeout(() => {
    document.body.style.filter = "";
    document.body.style.transform = "";
  }, 200);

  // Reality check
  console.log("System compromised...");
}`,
    action: () => {
      document.body.style.transition = "all 0.1s ease";
      document.body.style.filter = "invert(1) hue-rotate(90deg) contrast(1.5)";
      document.body.style.transform = "scale(1.02) skewX(2deg)";
      
      setTimeout(() => {
        document.body.style.filter = "invert(0.5) hue-rotate(-45deg)";
        document.body.style.transform = "scale(0.98) skewX(-2deg)";
      }, 100);

      setTimeout(() => {
        document.body.style.filter = "";
        document.body.style.transform = "";
        document.body.style.transition = "";
      }, 300);
    }
  },
  {
    id: "warp-speed",
    name: "Warp Speed",
    description: {
      en: "Accelerate DOM elements to simulate heavy G-force interactions.",
      id: "Mempercepat elemen DOM untuk mensimulasikan interaksi G-force berat."
    },
    color: "text-cyan-500",
    code: `function engageWarpDrive() {
  const elements = document.querySelectorAll('.card');
  
  elements.forEach(el => {
    el.style.transform = "translateZ(100px) scale(0.9)";
    el.style.filter = "blur(2px)";
  });

  setTimeout(resetPhysics, 1000);
}`,
    action: () => {
        const main = document.querySelector('main');
        if (main) {
            main.animate([
                { transform: 'scale(1)', filter: 'blur(0px)' },
                { transform: 'scale(1.1)', filter: 'blur(4px)' },
                { transform: 'scale(1)', filter: 'blur(0px)' }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
            });
        }
    }
  }
];

export function TheLaboratory() {
  const { language } = useLanguage();
  const [activeExp, setActiveExp] = useState(experiments[0]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    activeExp.action();
    setTimeout(() => setIsRunning(false), 1000);
  };

  return (
    <section className="py-32 relative bg-background min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 max-w-6xl mx-auto px-4">
            
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
                >
                    <FlaskConical size={14} />
                    The Laboratory
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter mb-4">
                    {language === 'en' ? "EXPERIMENTAL" : "EKSPERIMENTAL"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">{language === 'en' ? "PLAYGROUND" : "AREA"}</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    {language === 'en' 
                        ? "Pushing the boundaries of web interactivity. Interactive prototypes and physics simulations."
                        : "Melampaui batas interaktivitas web. Prototipe interaktif dan simulasi fisika."}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. Experiment Selector */}
                <div className="lg:col-span-4 space-y-4">
                    {experiments.map((exp) => (
                        <button
                            key={exp.id}
                            onClick={() => setActiveExp(exp)}
                            className={cn(
                                "w-full text-left p-4 rounded-xl border transition-all duration-300 group flex items-start gap-4 hover:bg-secondary/50",
                                activeExp.id === exp.id 
                                    ? "bg-secondary border-primary/50 ring-1 ring-primary/20 shadow-lg" 
                                    : "bg-background/50 border-white/5"
                            )}
                        >
                            <div className={cn("p-2 rounded-lg bg-background border border-white/10 group-hover:scale-110 transition-transform", exp.color)}>
                                <Zap size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{exp.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{exp.description[language]}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* 2. Holographic Code Editor */}
                <div className="lg:col-span-8 flex flex-col">
                    <div className="relative flex-1 bg-[#0d1117] rounded-t-xl border border-white/10 overflow-hidden shadow-2xl">
                        {/* Title Bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs font-mono text-muted-foreground ml-3">{activeExp.id}.ts</span>
                            </div>
                            <Maximize2 size={14} className="text-muted-foreground" />
                        </div>

                        {/* Editor Content */}
                        <div className="p-6 font-mono text-sm overflow-x-auto custom-scrollbar">
                           <pre className="text-blue-300">
                               <code className="language-typescript">
                                   {activeExp.code}
                               </code>
                           </pre>
                        </div>

                         {/* Run Overlay Effect */}
                         <AnimatePresence>
                            {isRunning && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[2px]"
                                >
                                    <div className="text-green-400 font-bold tracking-widest text-xl uppercase animate-pulse">
                                        Executing...
                                    </div>
                                </motion.div>
                            )}
                         </AnimatePresence>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-secondary/30 border-x border-b border-white/10 rounded-b-xl p-4 flex justify-between items-center backdrop-blur-md">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Terminal size={14} />
                            <span>Console: Ready</span>
                        </div>
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-green-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Play size={16} fill="currentColor" />
                            {isRunning ? "RUNNING..." : "RUN CODE"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}
