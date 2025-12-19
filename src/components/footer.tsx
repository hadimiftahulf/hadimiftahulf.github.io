"use client";

import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();
  const data = resumeData[language];

  return (
    <footer className="relative bg-background border-t border-border/40 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            {/* Left Column: CTA */}
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-serif font-black tracking-tighter mb-6"
                >
                    Let's work <br />
                    <span className="text-muted-foreground">together.</span>
                </motion.h2>
                <div className="space-y-2 mb-8">
                     <p className="text-lg text-muted-foreground max-w-md">
                        {language === 'en' 
                          ? "I'm always interested in hearing about new projects and opportunities."
                          : "Saya selalu tertarik untuk mendengar tentang proyek dan peluang baru."}
                     </p>
                     <p className="text-lg font-medium text-foreground">
                        {language === 'en'
                          ? "Available for Freelance & Collaboration."
                          : "Tersedia untuk Freelance & Kerja Sama."}
                     </p>
                </div>
                
                <a 
                   href="https://wa.me/6289656012756?text=Halo%20Hadi,%20saya%20tertarik%20untuk%20bekerja%20sama%20dengan%20Anda."
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold tracking-wide hover:opacity-90 transition-all group"
                >
                   {language === 'en' ? "Get in touch" : "Hubungi Saya"}
                   <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>

            {/* Right Column: Services & Socials */}
            <div className="flex flex-col justify-between">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                     <div>
                         <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                             {language === 'en' ? "Services" : "Layanan"}
                         </h3>
                         <ul className="space-y-3 text-lg font-medium text-foreground/80">
                             <li>Web Development</li>
                             <li>Fullstack Engineering</li>
                             <li>UI/UX Implementation</li>
                             <li>System Architecture</li>
                         </ul>
                     </div>
                 </div>
                 
                 <div>
                     <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Connect
                     </h3>
                     <div className="flex gap-4">
                        {[
                            { icon: Github, href: resumeData.socials.github, label: "Github" },
                            { icon: Linkedin, href: resumeData.socials.linkedin, label: "LinkedIn" },
                            { icon: Mail, href: resumeData.socials.email, label: "Email" },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-secondary/30 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border/50"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                     </div>
                 </div>
            </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
             <p>
                © {year} {data.name}.
             </p>
             
             {/* System Status Indicator */}
             <div className="flex items-center gap-6 px-4 py-2 rounded-full bg-secondary/30 border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-green-500">System Online</span>
                </div>
                <div className="w-px h-3 bg-white/20" />
                <span className="text-xs font-mono text-muted-foreground">V 2.5.0</span>
                <div className="w-px h-3 bg-white/20" />
                <span className="text-xs font-mono text-muted-foreground">JAKARTA, ID</span>
             </div>

             <p className="font-medium">
                {language === 'en' ? "Crafted with precision." : "Dibuat dengan presisi."}
             </p>
        </div>
      </div>
    </footer>
  );
}
