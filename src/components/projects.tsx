"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { useLanguage } from "./language-provider";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Modal Image Carousel Component
function ImageCarousel({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative h-full w-full bg-neutral-900 shrink-0 overflow-hidden group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                     {/* In a real app, use next/image here */}
                     <div className="absolute inset-0 bg-neutral-800" />
                     {/* Simulated Image Placeholder with gradient */}
                     <div className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-all duration-500",
                        index % 2 === 0 ? "from-neutral-800 to-neutral-900" : "from-neutral-900 to-neutral-800"
                     )} />
                     
                     {/* Actual Image if available */}
                     {images[index] && images[index].startsWith('/') && (
                         <div className="absolute inset-0 flex items-center justify-center text-white/10 text-9xl font-black select-none">
                            IMG {index + 1}
                         </div>
                     )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={24} />
                    </button>
                    
                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    i === index ? "bg-white w-6" : "bg-white/30"
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export function Projects() {
  const { language } = useLanguage();
  const projects = portfolioData[language];
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Ref for drag constraints
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [projects]);
  
  // Auto-scroll effect
  useEffect(() => {
    const controls = animate(x, [0, -width], {
      ease: "linear",
      duration: 30, // Slow duration for smooth marquee effect
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
      onUpdate: (latest) => {
          // Reset if we've scrolled past the width (logic handled by loop, but this is for safety)
      }
    });

    return controls.stop;
  }, [x, width]);

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4"
             >
                {language === 'en' ? "Featured Works" : "Karya Unggulan"}
             </motion.h2>
             <div className="h-1 w-12 bg-primary mx-auto rounded-full" />
             <p className="mt-4 text-muted-foreground text-sm uppercase tracking-widest">
                {language === 'en' ? "Drag to explore" : "Geser untuk melihat"}
             </p>
          </div>

          {/* Carousel Layout */}
          <motion.div 
            ref={carouselRef} 
            className="cursor-grab active:cursor-grabbing overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
             <motion.div 
                className="flex gap-8 px-4"
                style={{ x }}
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                onDragStart={() => {
                   // Optional: Stop auto-scroll on drag (advanced)
                   // For now, let's just keep simple auto-scroll or drag
                }}
                whileHover={{ scale: 1 }} // Just to register hover
                onHoverStart={() => {
                   // Pause animation on hover could be implemented here with controls
                }}
             >
                 {/* Duplicate items for infinite loop feel if needed, but for now simple loop */}
                 {[...projects, ...projects].map((project: any, index: number) => (
                   <motion.div
                     key={index}
                     className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] group relative cursor-pointer"
                     onClick={() => setSelectedProject(project)}
                   >
                      {/* Card Image Area */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/10 border border-border/50 mb-6">
                          <div className="absolute inset-0 bg-neutral-900" />
                          {/* Gradient / Image Placeholder */}
                          <div className={`absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:scale-110 transition-transform duration-700`} />
                          
                          {/* Overlay Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                 <ArrowUpRight className="w-8 h-8" />
                              </div>
                          </div>
                          
                          {/* Project Number */}
                          <div className="absolute top-4 right-4 font-mono text-xs font-bold text-white/50 border border-white/10 px-2 py-1 rounded backdrop-blur-sm">
                             0{index + 1}
                          </div>
                      </div>
    
                      {/* Content */}
                      <div className="space-y-2 px-2">
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                              {project.title}
                          </h3>
                          <div className="flex gap-2 flex-wrap mb-2">
                              {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                                  <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground">
                                      {tech}
                                  </span>
                              ))}
                          </div>
                      </div>
                   </motion.div>
                 ))}
             </motion.div>
          </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProject(null)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                />
                <motion.div
                    className="fixed inset-0 md:inset-auto md:top-[5vh] md:bottom-[5vh] md:left-[5vw] md:right-[5vw] md:max-w-7xl md:mx-auto bg-background border border-border md:rounded-3xl z-50 overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                >
                    {/* Modal Close Button - Absolute */}
                    <button 
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-[60]"
                    >
                        <X size={24} />
                    </button>

                    {/* LEFT SIDE: IMAGE CAROUSEL (60%) */}
                    <div className="w-full lg:w-[60%] h-[40vh] lg:h-full relative bg-neutral-900">
                         <ImageCarousel images={[selectedProject.image, selectedProject.image, selectedProject.image]} />
                    </div>

                    {/* RIGHT SIDE: CONTENT (40%) */}
                    <div className="w-full lg:w-[40%] h-full flex flex-col p-6 md:p-10 overflow-y-auto bg-background">
                        
                        <div className="flex-1 flex flex-col justify-center">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.technologies.map((tech: string, i: number) => (
                                    <span key={i} className="px-2 py-1 rounded-md bg-secondary text-xs font-bold text-secondary-foreground uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight text-foreground">
                                {selectedProject.title}
                            </h2>

                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                                {selectedProject.description}
                            </p>

                            <div className="text-sm text-muted-foreground/80 mb-8 border-l-2 border-primary/20 pl-4 py-2">
                                <span className="block font-bold text-foreground mb-1 uppercase tracking-widest text-xs">Overview</span>
                                This project demonstrates advanced implementation of scalable web architecture, focusing on seamless user experience and high performance.
                            </div>
                        </div>
                        
                        {/* Footer Action */}
                        <div className="pt-6 border-t border-border mt-auto">
                             <Link 
                                href={selectedProject.link} 
                                target="_blank"
                                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            >
                                Visit Project <ExternalLink size={20} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>

    </section>
  );
}
