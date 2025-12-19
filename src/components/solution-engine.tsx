"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./language-provider";
import { 
  Bot, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Globe, 
  Zap,
  ArrowRight,
  ShieldCheck,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Solution {
  id: string;
  problem: Record<'en' | 'id', string>;
  title: Record<'en' | 'id', string>;
  icon: any;
  techStack: string[];
  description: Record<'en' | 'id', string>;
  metrics: string[];
}

const solutions: Solution[] = [
  {
    id: "scale",
    problem: { en: "High Traffic Load", id: "Beban Trafik Tinggi" },
    title: { en: "Enterprise Scalability", id: "Skalabilitas Enterprise" },
    icon: Server,
    techStack: ["Next.js", "Redis", "Docker", "Kubernetes"],
    description: { 
      en: "Optimized for handling millions of concurrent requests with auto-scaling infrastructure.", 
      id: "Dioptimalkan untuk menangani jutaan request bersamaan dengan infrastruktur auto-scaling."
    },
    metrics: ["99.99% Uptime", "<50ms Latency"]
  },
  {
    id: "security",
    problem: { en: "Data Breaches", id: "Kebocoran Data" },
    title: { en: "Military-Grade Security", id: "Keamanan Tingkat Militer" },
    icon: ShieldCheck,
    techStack: ["Auth.js", "PostgreSQL RLS", "AES-256", "WAF"],
    description: {
      en: "End-to-end encryption and strict access controls to protect sensitive user data.",
      id: "Enkripsi end-to-end dan kontrol akses ketat untuk melindungi data sensitif pengguna."
    },
    metrics: ["ISO 27001 Ready", "Zero Leaks"]
  },
  {
    id: "speed",
    problem: { en: "Slow Performance", id: "Performa Lambat" },
    title: { en: "Lightning Performance", id: "Performa Kilat" },
    icon: Zap,
    techStack: ["Edge Functions", "CDN", "Rust", "WebAssembly"],
    description: {
      en: "Global content delivery and edge computing for instant page loads anywhere.",
      id: "Pengiriman konten global dan komputasi edge untuk loading halaman instan di mana saja."
    },
    metrics: ["100/100 Lighthouse", "Global CDN"]
  }
];

export function SolutionEngine() {
  const { language } = useLanguage();
  const [activeSol, setActiveSol] = useState<Solution | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelect = (sol: Solution) => {
    if (activeSol?.id === sol.id) return;
    setIsProcessing(true);
    setActiveSol(null);
    
    // Simulate processing
    setTimeout(() => {
        setActiveSol(sol);
        setIsProcessing(false);
    }, 800);
  };

  return (
    <section className="py-32 relative bg-background min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Circuit Board Background */}
        <div className="absolute inset-0 bg-[url('/circuit.svg')] opacity-[0.03] animate-pulse-slow pointer-events-none" />
        
        <div className="container relative z-10 max-w-6xl mx-auto px-4">
            
            <div className="text-center mb-16">
                 <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
                 >
                     <Bot size={14} />
                     Solution Engine
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter mb-4">
                     {language === 'en' ? "INTELLIGENT" : "SOLUSI"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">{language === 'en' ? "SOLVENCY" : "CERDAS"}</span>
                 </h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                     {language === 'en' ? "Input a business problem. Get a technical solution." : "Masukkan masalah bisnis. Dapatkan solusi teknis."}
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {solutions.map((sol) => (
                    <button
                        key={sol.id}
                        onClick={() => handleSelect(sol)}
                        className={cn(
                            "relative group p-6 rounded-2xl border transition-all duration-300 text-left hover:scale-[1.02]",
                            activeSol?.id === sol.id 
                                ? "bg-primary/5 border-primary shadow-[0_0_30px_rgba(59,130,246,0.15)] ring-1 ring-primary/30" 
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                            activeSol?.id === sol.id ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground group-hover:text-primary"
                        )}>
                            <sol.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{sol.problem[language]}</h3>
                        <p className="text-xs text-muted-foreground">Click to analyze</p>
                        
                        {activeSol?.id === sol.id && (
                            <motion.div 
                                layoutId="active-sol-border"
                                className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Output Panel */}
            <div className="relative min-h-[300px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                    {isProcessing ? (
                        <motion.div 
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                        >
                            <Cpu size={48} className="text-primary animate-spin-slow" />
                            <p className="font-mono text-sm text-primary animate-pulse">ANALYZING REQUIREMENTS...</p>
                        </motion.div>
                    ) : activeSol ? (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                        >
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                    {activeSol.title[language]}
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {activeSol.description[language]}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {activeSol.techStack.map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {activeSol.metrics.map((metric, i) => (
                                    <motion.div 
                                        key={metric}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center gap-4"
                                    >
                                        <CheckCircle2 className="text-primary" />
                                        <span className="font-bold text-lg">{metric}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center text-muted-foreground/50"
                        >
                            <p>Select a problem statement above to generate solution.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    </section>
  );
}
