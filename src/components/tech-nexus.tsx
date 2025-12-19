"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";
import { 
  Network, 
  Briefcase, 
  Code2, 
  Cpu, 
  Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mapping skills to specific companies based on the descriptions in resume.ts
const skillMappings: Record<string, string[]> = {
  "Next.js": ["PT. Revorma", "PT. Anggada Duta Wisesa", "PT. Inovasi Dinamika Solusi"],
  "React.js": ["Work Life & Beyond"],
  "Laravel": ["PT. Inovasi Dinamika Solusi", "PT. Anggada Duta Wisesa"],
  "Vue.js": ["PT. Inovasi Dinamika Solusi"],
  "PHP": ["Cyber Blitz Nusantara", "PT. Inrelt"],
  "TypeScript": ["PT. Inovasi Dinamika Solusi", "PT. Revorma"],
  "Tailwind CSS": ["PT. Inovasi Dinamika Solusi", "PT. Revorma"],
};

export function TechNexus() {
  const { language } = useLanguage();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Extract relevant companies from resume data
  const companies = resumeData[language].experience.map(exp => exp.company);

  // Filter skills that have mappings
  const displaySkills = Object.keys(skillMappings);

  return (
    <section className="py-32 relative bg-background min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Network Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
        
        <div className="container relative z-10 max-w-7xl mx-auto px-4">
            
            <div className="text-center mb-16">
                 <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
                 >
                     <Network size={14} />
                     Tech Nexus
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter mb-4">
                     {language === 'en' ? "SKILL" : "KONEKSI"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">{language === 'en' ? "PROVENANCE" : "KEAHLIAN"}</span>
                 </h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                     {language === 'en' ? "Visualize how my technical stack has been applied across real-world projects." : "Visualisasikan bagaimana tech stack saya diterapkan di proyek dunia nyata."}
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                
                {/* 1. SKILLS COLUMN (Left) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                        <Code2 size={16} /> Stack
                    </h3>
                    <div className="flex flex-col gap-2">
                        {displaySkills.map((skill) => (
                            <button
                                key={skill}
                                onMouseEnter={() => setActiveSkill(skill)}
                                className={cn(
                                    "text-left px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-between group",
                                    activeSkill === skill 
                                        ? "bg-blue-500/10 border-blue-500 text-blue-500 translate-x-4" 
                                        : "bg-background border-white/5 text-muted-foreground hover:bg-white/5 hover:translate-x-2"
                                )}
                            >
                                <span className="font-mono text-sm">{skill}</span>
                                <Globe size={14} className={cn("opacity-0 transition-opacity", activeSkill === skill ? "opacity-100" : "")} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. CONNECTION LAYER (Center - Visual Only) */}
                <div className="hidden md:flex justify-center items-center h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={cn(
                            "w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transition-all duration-500",
                            activeSkill ? "via-blue-500/50" : ""
                        )} />
                    </div>
                    
                    {/* Central Hub */}
                    <div className={cn(
                        "w-24 h-24 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 backdrop-blur-md",
                        activeSkill ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-110" : "border-white/10 bg-black/50"
                    )}>
                        <Cpu size={32} className={cn("transition-colors duration-300", activeSkill ? "text-blue-500" : "text-muted-foreground")} />
                    </div>
                </div>

                {/* 3. EXPERIENCE COLUMN (Right) */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2 justify-end">
                        History <Briefcase size={16} />
                    </h3>
                    <div className="flex flex-col gap-2">
                        {companies.map((company) => {
                            const isConnected = activeSkill && skillMappings[activeSkill]?.includes(company);
                            const currentExp = resumeData[language].experience.find(e => e.company === company);

                            return (
                                <div
                                    key={company}
                                    className={cn(
                                        "relative px-4 py-4 rounded-xl border transition-all duration-500 text-right group",
                                        isConnected 
                                            ? "bg-blue-500/10 border-blue-500/50 scale-105 shadow-lg" 
                                            : "bg-background border-white/5 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                                    )}
                                >
                                    {isConnected && (
                                        <motion.div 
                                            layoutId="active-connector"
                                            className="absolute left-0 top-1/2 -translate-x-full w-8 h-px bg-blue-500 hidden md:block"
                                        />
                                    )}
                                    <h4 className={cn("font-bold text-sm", isConnected ? "text-blue-400" : "text-muted-foreground")}>{company}</h4>
                                    <p className="text-[10px] text-muted-foreground mt-1">{currentExp?.period}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Hint */}
            <div className="mt-12 text-center text-xs text-muted-foreground animate-pulse">
                {language === 'en' ? "Hover over skill to trace history" : "Arahkan kursor ke skill untuk melacak riwayat"}
            </div>

        </div>
    </section>
  );
}
