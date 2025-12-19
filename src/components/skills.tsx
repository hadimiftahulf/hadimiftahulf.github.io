"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";
import { Code, Database, Globe, Layout, Server, Terminal, Box, GitBranch } from "lucide-react";

// Helper to map known skills to icons, fallback to Code/Terminal
const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes("react") || s.includes("next") || s.includes("vue")) return <Globe className="w-6 h-6" />;
  if (s.includes("html") || s.includes("css") || s.includes("tailwind")) return <Layout className="w-6 h-6" />;
  if (s.includes("node") || s.includes("php") || s.includes("laravel")) return <Server className="w-6 h-6" />;
  if (s.includes("sql") || s.includes("mongo")) return <Database className="w-6 h-6" />;
  if (s.includes("git") || s.includes("github")) return <GitBranch className="w-6 h-6" />;
  if (s.includes("docker")) return <Box className="w-6 h-6" />;
  return <Terminal className="w-6 h-6" />;
};

export function Skills() {
  const { language } = useLanguage();
  const data = resumeData[language];
  
  return (
    <section id="skills" className="py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4"
          >
            {language === 'en' ? "Technical Skills" : "Keahlian Teknis"}
          </motion.h2>
          <div className="h-1 w-12 bg-primary mx-auto rounded-full" />
        </div>

        {/* Static Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
           {data.skills.map((skill, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.05 }}
               className="group flex items-center gap-4 p-4 rounded-xl bg-secondary/20 border border-border/50 hover:bg-secondary/40 hover:border-primary/20 transition-all duration-300"
             >
                <div className="p-3 rounded-lg bg-background shadow-sm text-primary group-hover:scale-110 transition-transform duration-300">
                   {getSkillIcon(skill)}
                </div>
                <span className="font-medium text-foreground tracking-wide group-hover:text-primary transition-colors">
                   {skill}
                </span>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
