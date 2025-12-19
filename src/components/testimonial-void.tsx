"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";
import { Quote, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy testimonials for demonstration
const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CTO, FinGrid",
    text: {
        en: "Hadi's architectural decisions saved us months of development time. His understanding of scalability is unmatched.",
        id: "Keputusan arsitektur Hadi menghemat waktu pengembangan kami berbulan-bulan. Pemahamannya tentang skalabilitas tiada tanding."
    },
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Lead, Nexus",
    text: {
        en: "Not just a coder, but a product thinker. The UI interactions he built increased our retention by 40%.",
        id: "Bukan sekadar coder, tapi pemikir produk. Interaksi UI yang dia buat meningkatkan retensi kami sebesar 40%."
    },
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 3,
    name: "Michael Ross",
    role: "Founder, StartupX",
    text: {
        en: "The best freelance experience I've had. Professional, fast, and the code quality is world-class.",
        id: "Pengalaman freelance terbaik yang pernah saya rasakan. Profesional, cepat, dan kualitas kodenya kelas dunia."
    },
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  }
];

export function TestimonialVoid() {
  const { language } = useLanguage();

  return (
    <section className="py-32 relative bg-background overflow-hidden">
        {/* Void Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-[0.05] blur-[100px] pointer-events-none" />
        
        <div className="container relative z-10 max-w-7xl mx-auto px-4">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                     <motion.div
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4"
                     >
                         <MessageSquare size={14} className="text-primary" />
                         <span>{language === 'en' ? "Endorsements" : "Testimoni"}</span>
                     </motion.div>
                     <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tighter">
                         {language === 'en' ? "TRUSTED BY" : "DIPERCAYA OLEH"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{language === 'en' ? "INNOVATORS" : "INOVATOR"}</span>
                     </h2>
                </div>
                <div className="w-full md:w-auto flex gap-2">
                    {/* Decorative dots */}
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                        className="group relative p-8 rounded-3xl bg-secondary/30 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                    >
                         {/* Glowing Void Backing */}
                         <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                         
                         <Quote size={40} className="text-primary/20 mb-6 group-hover:text-primary/50 transition-colors" />
                         
                         <p className="relative z-10 text-lg leading-relaxed text-muted-foreground mb-8 group-hover:text-foreground transition-colors">
                             "{t.text[language]}"
                         </p>

                         <div className="relative z-10 flex items-center gap-4">
                             <img 
                                src={t.image} 
                                alt={t.name}
                                className="w-12 h-12 rounded-full bg-background border border-white/10" 
                             />
                             <div>
                                 <h4 className="font-bold text-base">{t.name}</h4>
                                 <p className="text-xs text-primary font-medium tracking-wide uppercase">{t.role}</p>
                             </div>
                         </div>
                    </motion.div>
                ))}
            </div>

        </div>
    </section>
  );
}
