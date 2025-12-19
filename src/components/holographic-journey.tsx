"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HolographicJourney() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reverse experience to show chronological growth (Oldest -> Newest) or keep nice display
  // Let's use standard newest first for standard resume logic, but styled cool.
  const experience = resumeData[language].experience;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 relative bg-background min-h-screen">
        
        {/* Parallax Line */}
        <motion.div 
            style={{ scaleY: scrollYProgress }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 origin-top"
        />

        <div className="container relative z-10 max-w-5xl mx-auto px-4">
            <div className="text-center mb-24">
                 <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
                 >
                     <Calendar size={14} />
                     Timeline
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter">
                     {language === 'en' ? "CAREER" : "PERJALANAN"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">{language === 'en' ? "EVOLUTION" : "KARIR"}</span>
                 </h2>
            </div>
            
            <div className="space-y-24">
                {experience.map((exp, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className={cn(
                                "flex flex-col md:flex-row gap-8 relative",
                                isEven ? "md:flex-row-reverse" : ""
                            )}
                        >
                            {/* Connector Node (Central Dot) */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary z-20 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />

                            {/* Connector Arm (Horizontal Line) - Desktop Only */}
                            <div className={cn(
                                "hidden md:block absolute top-8 w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-10",
                                isEven ? "right-1/2 origin-right" : "left-1/2 origin-left"
                            )} />

                            {/* Content Card */}
                            <div className={cn("flex-1 pl-16 md:pl-0", isEven ? "md:pr-24 md:text-right" : "md:pl-24")}>
                                <div className="group relative p-8 rounded-3xl bg-secondary/20 border border-white/5 hover:bg-secondary/40 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
                                    
                                    <div className={cn("flex flex-col gap-2 mb-6", isEven ? "md:items-end" : "md:items-start")}>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-2">
                                            <Calendar size={12} />
                                            {exp.period}
                                        </div>
                                        <h3 className="text-3xl font-bold font-serif">{exp.company}</h3>
                                        <div className="flex items-center gap-2 text-muted-foreground text-base">
                                            <span className="font-medium text-foreground">{exp.role}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                            <span className="flex items-center gap-1 text-sm"><MapPin size={14}/> {resumeData[language].location}</span>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {exp.description}
                                    </p>

                                    {/* Action Reveal */}
                                    <div className={cn(
                                        "absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-primary/10 text-primary",
                                        isEven ? "md:left-6 md:right-auto" : ""
                                    )}>
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </div>

                            {/* Empty spacer for grid alignment */}
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
