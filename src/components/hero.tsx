"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";
import { cn } from "@/lib/utils";

const letterAnim: Variants = {
  hidden: { y: "100%", opacity: 0, rotate: 10 },
  visible: (i) => ({ 
    y: "0%", 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9], delay: i * 0.03 } 
  }),
};

const fadeUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export function Hero() {
  const { language } = useLanguage();
  const data = resumeData[language];
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleAnim = useTransform(scrollY, [0, 1000], [1, 1.1]);

  const firstName = data.name.split(" ")[0].split("");
  const lastName = data.name.split(" ").slice(1).join(" ").split("");

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background pt-20 pb-0">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 -z-20 bg-background">
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/30 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-700" />
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-10 w-full mb-12">
        
        {/* Editorial Layout */}
        <div className="relative w-full max-w-[90vw] md:max-w-6xl flex flex-col items-center gap-8 md:gap-12">
            
            {/* 1. Main Headline (Split) */}
            <div className="flex flex-col items-center text-center z-20 mix-blend-difference text-primary-foreground dark:text-foreground">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    className="flex overflow-hidden"
                >
                     {firstName.map((char, i) => (
                       <motion.span key={i} custom={i} variants={letterAnim} className="text-[15vw] md:text-[11vw] leading-[0.85] font-serif font-black tracking-[-0.05em] inline-block">
                          {char}
                       </motion.span>
                     ))}
                </motion.div>
                
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    className="flex overflow-hidden"
                >
                     {lastName.map((char, i) => (
                       <motion.span key={i} custom={i + firstName.length} variants={letterAnim} className="text-[15vw] md:text-[11vw] leading-[0.85] font-serif font-italic italic font-black tracking-[-0.05em] inline-block text-muted-foreground/80">
                          {char}
                       </motion.span>
                     ))}
                </motion.div>
            </div>

            {/* 2. Central Visual (Parallax Image) */}
            <motion.div 
               style={{ y: yParallax, opacity: opacityFade, scale: scaleAnim }}
               className="relative w-full aspect-[4/5] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl shadow-black/20"
            >
               <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/50 z-10" />
               <img
                 src={resumeData.avatar}
                 alt={data.name}
                 className="w-full h-full object-cover object-center transform hover:scale-105 transition-all duration-700 ease-out"
               />

                {/* Floating Badge */}
                <motion.div 
                   variants={fadeUp}
                   initial="hidden"
                   animate="visible"
                   transition={{ delay: 1 }}
                   className="absolute bottom-6 left-6 z-20 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium tracking-widest uppercase flex items-center gap-2"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for work
                </motion.div>
            </motion.div>

            {/* 3. Description & CTA */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mt-8">
               <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="max-w-md space-y-4"
               >
                   <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
                      {data.about}
                   </p>
               </motion.div>

               <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 1.2, duration: 0.8 }}
                   className="flex flex-col gap-4 items-start md:items-end"
               >
                   <Link href="#projects" className="group flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5">
                       View Selected Works
                       <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                   </Link>
                   <div className="flex gap-4">
                      {[
                        { icon: Github, href: resumeData.socials.github },
                        { icon: Linkedin, href: resumeData.socials.linkedin },
                        { icon: Mail, href: resumeData.socials.email }
                      ].map((item, i) => (
                        item.href && (
                          <a 
                             key={i} 
                             href={item.href} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="p-3 rounded-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          >
                             <item.icon size={20} />
                          </a>
                        )
                      ))}
                   </div>
               </motion.div>
            </div>
            
        </div>
      </div>
    </section>
  );
}
