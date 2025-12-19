"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./language-provider";
import { Network, FlaskConical, ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaygroundPortal() {
  const { language } = useLanguage();

  return (
    <section className="py-32 relative bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            <Lock size={14} className="animate-pulse" />
            Restricted Access
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter mb-6">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">PLAYGROUND</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {language === 'en' 
              ? "Experimental zones where I push the limits of web technology. Enter at your own risk." 
              : "Zona eksperimen tempat saya mendorong batas teknologi web. Masuk dengan risiko Anda sendiri."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* CARD 1: SYSTEM ARCHITECT */}
          <Link href="/system" className="group relative block h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform duration-500">
                            <Network size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:text-blue-400 transition-colors">System Architect</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">Blueprint Generator & Architecture simulator.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-500 tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Launch <ArrowRight size={14} />
                    </div>
                </div>
             </div>
          </Link>

          {/* CARD 2: THE LABORATORY */}
          <Link href="/lab" className="group relative block h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 to-black border border-fuchsia-500/20 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-fuchsia-500/50 group-hover:shadow-[0_0_50px_rgba(217,70,239,0.2)]">
                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:24px_24px]" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center mb-4 text-fuchsia-500 group-hover:scale-110 transition-transform duration-500">
                            <FlaskConical size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:text-fuchsia-400 transition-colors">The Laboratory</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">Experimental code chamber & physics demos.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-500 tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Enter <ArrowRight size={14} />
                    </div>
                </div>
             </div>
          </Link>

          {/* CARD 3: CLOUD COMMAND */}
          <Link href="/cloud" className="group relative block h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                            <span className="font-mono text-lg font-bold">C_</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:text-emerald-400 transition-colors">Cloud Command</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">DevOps Dashboard Simulator. Manage traffic & nodes.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Initialize <ArrowRight size={14} />
                    </div>
                </div>
             </div>
          </Link>

          {/* CARD 4: PIXEL FORGE */}
          <Link href="/forge" className="group relative block h-[320px]">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1 }} />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-500 group-hover:scale-110 transition-transform duration-500">
                            <div className="w-6 h-6 border-2 border-indigo-500 rounded-full" />
                        </div>
                        <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:text-indigo-400 transition-colors">Pixel Forge</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">High-performance generative art & physics engine.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-500 tracking-wider uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Create <ArrowRight size={14} />
                    </div>
                </div>
             </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
