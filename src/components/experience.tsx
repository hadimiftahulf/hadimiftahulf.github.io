"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";
import { cn } from "@/lib/utils";

export function Experience() {
  const { language } = useLanguage();
  const data = resumeData[language];

  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Simple, Clean Header */}
        <div className="mb-20 text-center">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4"
            >
                {language === 'en' ? "Experience" : "Pengalaman"}
            </motion.h2>
            <div className="h-1 w-12 bg-primary mx-auto rounded-full" />
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

            <div className="space-y-12">
                {data.experience.map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center",
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                        )}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full transform -translate-x-1/2 mt-1.5 md:mt-0 z-10" />

                        {/* Content Card */}
                        <div className="w-full md:w-[calc(50%-40px)] ml-12 md:ml-0">
                            <div className={cn(
                                "p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
                                index % 2 === 0 ? "text-left" : "text-left md:text-right"
                            )}>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                                   <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider w-fit">
                                       {job.period}
                                   </span>
                                   <span className="text-xs text-muted-foreground/60 font-medium tracking-wide">
                                       • {job.duration}
                                   </span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1">
                                    {job.role}
                                </h3>
                                <h4 className="text-lg font-medium text-muted-foreground mb-3">
                                    {job.company}
                                </h4>
                                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Empty Spacer for alternating layout */}
                        <div className="hidden md:block w-[calc(50%-40px)]" />
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
