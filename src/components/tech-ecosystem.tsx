"use client";

import { useLanguage } from "./language-provider";
import { motion } from "framer-motion";
// Tech stack data
const technologies = [
  { src: "/logos/react.svg", label: "React" },
  { src: "/logos/nextjs.svg", label: "Next.js" },
  { src: "/logos/typescript.svg", label: "TypeScript" },
  { src: "/logos/tailwindcss.svg", label: "Tailwind" },
  { src: "/logos/nodejs.svg", label: "Node.js" },
  { src: "/logos/vue.svg", label: "Vue.js" },
  { src: "/logos/laravel.svg", label: "Laravel" },
  { src: "/logos/php.svg", label: "PHP" },
  { src: "/logos/postgresql.svg", label: "PostgreSQL" },
  { src: "/logos/mysql.svg", label: "MySQL" },
  { src: "/logos/docker.svg", label: "Docker" },
  { src: "/logos/git.svg", label: "Git" },
];

export function TechEcosystem() {
  const { language } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden bg-background flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),rgba(0,0,0,1))] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container relative z-20 text-center mb-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
            <h2 className="text-4xl md:text-7xl font-sans font-black tracking-tighter mb-6">
              {language === 'en' ? "MY" : "STACK"} <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-violet-600">{language === 'en' ? "TECH STACK" : "TEKNOLOGI"}</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-widest font-medium">
              {language === 'en' 
                ? "My comprehensive technical skill set" 
                : "Kumpulan keahlian teknis saya"}
            </p>
        </motion.div>
      </div>

      {/* The Gravity Core */}
      <div className="relative w-full max-w-5xl aspect-square md:aspect-[2/1] flex items-center justify-center">
        
        {/* Central Black Hole / Core */}
        <div className="absolute z-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-black shadow-[0_0_100px_rgba(59,130,246,0.3)] flex items-center justify-center border border-white/10 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 animate-pulse-slow blur-xl" />
            <div className="w-full h-full rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
            
            <div className="text-center z-20">
               <span className="block text-4xl md:text-6xl font-black text-white mix-blend-difference">IDS</span>
               <span className="text-[10px] md:text-xs tracking-[0.3em] text-white/50 uppercase">Core</span>
            </div>
        </div>

        {/* Orbitals */}
        {technologies.map((tech, i) => {
           const radius = 180 + (i * 15) % 150; // Variable radius
           const duration = 20 + i * 2; // Different speeds
           const delay = i * -5; // Spread out starting positions

           return (
             <div 
                key={i}
                className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center"
             >
                <motion.div
                  style={{ width: radius * 2, height: radius * 2 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
                  className="rounded-full border border-white/[0.03] absolute flex items-center justify-center"
                >
                    <motion.div
                       className="absolute top-0 -translate-y-1/2 bg-background/80 backdrop-blur-md border border-white/10 p-3 rounded-full shadow-2xl group cursor-pointer hover:scale-125 transition-transform z-20 flex items-center justify-center"
                       style={{ rotate: -360 }} // Counter-rotate to keep icon upright
                       animate={{ rotate: -360 }}
                       transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
                       whileHover={{ scale: 1.2, borderColor: "rgba(255,255,255,0.5)" }}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 relative flex items-center justify-center">
                            <img 
                                src={tech.src} 
                                alt={tech.label}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
                                {tech.label}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
             </div>
           );
        })}

        {/* Decorative Rings */}
        {[1, 2, 3].map((ring) => (
            <div 
                key={ring}
                className="absolute rounded-full border border-white/[0.02] pointer-events-none"
                style={{ width: 400 + ring * 150, height: 400 + ring * 150 }}
            />
        ))}

      </div>
    </section>
  );
}
