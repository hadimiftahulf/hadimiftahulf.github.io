"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./language-provider";
import { 
  Database, 
  Server, 
  Globe, 
  Smartphone, 
  Cpu, 
  Cloud, 
  Shield, 
  Zap,
  ArrowRight,
  Terminal,
  Activity,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data & Types ---

type ArchitectureType = 'ecommerce' | 'saas' | 'social' | 'fintech';

interface Node {
  id: string;
  label: string;
  icon: any;
  x: number;
  y: number;
  color: string;
  type: 'client' | 'service' | 'db' | 'infra';
}

interface Connection {
  from: string;
  to: string;
}

const architectures: Record<ArchitectureType, { nodes: Node[], connections: Connection[] }> = {
  ecommerce: {
    nodes: [
      { id: 'web', label: 'Web Store', icon: Globe, x: 20, y: 30, color: 'blue', type: 'client' },
      { id: 'mobile', label: 'Mobile App', icon: Smartphone, x: 20, y: 70, color: 'purple', type: 'client' },
      { id: 'api', label: 'API Gateway', icon: Server, x: 50, y: 50, color: 'green', type: 'service' },
      { id: 'auth', label: 'Auth Service', icon: Shield, x: 50, y: 20, color: 'indigo', type: 'service' },
      { id: 'payment', label: 'Payment Svc', icon: Activity, x: 50, y: 80, color: 'pink', type: 'service' },
      { id: 'db', label: 'Main DB', icon: Database, x: 80, y: 50, color: 'orange', type: 'db' },
      { id: 'cache', label: 'Redis Cache', icon: Zap, x: 80, y: 30, color: 'red', type: 'infra' },
    ],
    connections: [
      { from: 'web', to: 'api' },
      { from: 'mobile', to: 'api' },
      { from: 'api', to: 'auth' },
      { from: 'api', to: 'payment' },
      { from: 'api', to: 'db' },
      { from: 'api', to: 'cache' },
    ]
  },
  saas: {
    nodes: [
      { id: 'dashboard', label: 'Dashboard', icon: Layers, x: 20, y: 50, color: 'cyan', type: 'client' },
      { id: 'lb', label: 'Load Balancer', icon: Activity, x: 40, y: 50, color: 'blue', type: 'infra' },
      { id: 'workers', label: 'Worker Nodes', icon: Cpu, x: 60, y: 30, color: 'yellow', type: 'service' },
      { id: 'core', label: 'Core API', icon: Server, x: 60, y: 70, color: 'green', type: 'service' },
      { id: 'db', label: 'Postgres Cluster', icon: Database, x: 85, y: 50, color: 'orange', type: 'db' },
      { id: 's3', label: 'Object Storage', icon: Cloud, x: 85, y: 80, color: 'indigo', type: 'infra' },
    ],
    connections: [
      { from: 'dashboard', to: 'lb' },
      { from: 'lb', to: 'core' },
      { from: 'lb', to: 'workers' },
      { from: 'core', to: 'db' },
      { from: 'workers', to: 's3' },
      { from: 'workers', to: 'db' },
    ]
  },
  social: {
    nodes: [
      { id: 'pwa', label: 'PWA', icon: Globe, x: 20, y: 40, color: 'pink', type: 'client' },
      { id: 'ios', label: 'iOS App', icon: Smartphone, x: 20, y: 60, color: 'blue', type: 'client' },
      { id: 'graph', label: 'GraphQL API', icon: Activity, x: 45, y: 50, color: 'purple', type: 'service' },
      { id: 'realtime', label: 'Socket.io', icon: Zap, x: 45, y: 20, color: 'yellow', type: 'service' },
      { id: 'media', label: 'Media Svc', icon: Activity, x: 45, y: 80, color: 'red', type: 'service' },
      { id: 'neo4j', label: 'Graph DB', icon: Database, x: 75, y: 50, color: 'orange', type: 'db' },
      { id: 'cdn', label: 'CDN', icon: Cloud, x: 75, y: 80, color: 'cyan', type: 'infra' },
    ],
    connections: [
      { from: 'pwa', to: 'graph' },
      { from: 'ios', to: 'graph' },
      { from: 'graph', to: 'neo4j' },
      { from: 'pwa', to: 'realtime' },
      { from: 'media', to: 'cdn' },
      { from: 'graph', to: 'media' },
    ]
  },
  fintech: {
    nodes: [
      { id: 'secure', label: 'Secure Web', icon: Shield, x: 20, y: 50, color: 'green', type: 'client' },
      { id: 'gateway', label: 'API Gateway', icon: Server, x: 45, y: 50, color: 'blue', type: 'service' },
      { id: 'ledger', label: 'Ledger Svc', icon: Activity, x: 70, y: 30, color: 'indigo', type: 'service' },
      { id: 'fraud', label: 'Fraud Detection', icon: Activity, x: 70, y: 70, color: 'red', type: 'service' },
      { id: 'db_enc', label: 'Encrypted DB', icon: Database, x: 90, y: 50, color: 'orange', type: 'db' },
    ],
    connections: [
      { from: 'secure', to: 'gateway' },
      { from: 'gateway', to: 'ledger' },
      { from: 'gateway', to: 'fraud' },
      { from: 'ledger', to: 'db_enc' },
      { from: 'fraud', to: 'db_enc' },
    ]
  }
};

export function SystemArchitect() {
  const { language } = useLanguage();
  const [activeArch, setActiveArch] = useState<ArchitectureType>('ecommerce');
  const [isScanning, setIsScanning] = useState(false);
  const [activeNodes, setActiveNodes] = useState<string[]>([]);
  const [terminalText, setTerminalText] = useState<string[]>([]);

  // Simulation effect
  useEffect(() => {
    setIsScanning(true);
    setActiveNodes([]);
    setTerminalText([`> Initializing ${activeArch.toUpperCase()} protocol...`, "> Scanning dependencies...", "> Connecting services..."]);
    
    const timeouts: NodeJS.Timeout[] = [];
    const nodes = architectures[activeArch].nodes;
    
    // Sequential activation
    nodes.forEach((node, i) => {
      const t = setTimeout(() => {
        setActiveNodes(prev => [...prev, node.id]);
        setTerminalText(prev => [...prev, `[OK] Service detected: ${node.label}`].slice(-6));
        
        if (i === nodes.length - 1) {
          setIsScanning(false);
          setTerminalText(prev => [...prev, "> System Operational", "> Ready for deployment"].slice(-6));
        }
      }, i * 400 + 500);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [activeArch]);

  return (
    <section className="py-32 relative bg-background min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 w-full max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4"
           >
             System Architecture
           </motion.div>
           <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tighter mb-6">
             {language === 'en' ? "ARCHITECTING" : "MERANCANG"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">{language === 'en' ? "COMPLEXITY" : "KOMPLEKSITAS"}</span>
           </h2>
           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
             {language === 'en' 
               ? "I don't just write code. I design scalable, resilient, and high-performance systems." 
               : "Saya tidak hanya menulis kode. Saya merancang sistem yang skalabel, tangguh, dan berkinerja tinggi."}
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
           
           {/* Control Panel (Left) */}
           <div className="lg:col-span-1 space-y-4">
              <div className="bg-background/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                 <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Terminal size={14} />
                    Blueprint Control
                 </h3>
                 
                 <div className="space-y-3 flex-1">
                    {(Object.keys(architectures) as ArchitectureType[]).map((arch) => (
                       <button
                          key={arch}
                          onClick={() => setActiveArch(arch)}
                          className={cn(
                             "w-full text-left px-4 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden",
                             activeArch === arch 
                                ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
                                : "bg-white/5 border-transparent hover:bg-white/10 text-muted-foreground hover:text-foreground"
                          )}
                       >
                          <span className="relative z-10 font-bold uppercase tracking-wide text-sm">{arch}</span>
                          {activeArch === arch && <Activity size={16} className="relative z-10 animate-pulse" />}
                          {activeArch === arch && (
                             <motion.div 
                                layoutId="active-blueprint" 
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" 
                                transition={{ duration: 0.3 }}
                             />
                          )}
                       </button>
                    ))}
                 </div>

                 {/* Terminal Output */}
                 <div className="mt-8 bg-black/80 rounded-xl p-4 font-mono text-xs text-green-400 h-48 overflow-hidden border border-white/5 relative">
                     <div className="absolute top-0 left-0 right-0 h-6 bg-white/5 flex items-center px-2 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                     </div>
                     <div className="mt-6 space-y-1">
                        {terminalText.map((line, i) => (
                           <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }}
                           >
                              {line}
                           </motion.div>
                        ))}
                        <motion.span 
                           animate={{ opacity: [0, 1, 0] }} 
                           transition={{ duration: 0.8, repeat: Infinity }}
                        >_</motion.span>
                     </div>
                 </div>
              </div>
           </div>

           {/* The Blueprint Visualization (Right/Center) */}
           <div className="lg:col-span-2 relative h-[500px] lg:h-auto bg-neutral-900/50 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
               {/* Pattern Overlay */}
               <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1]" />
               
               {/* Connections Layer (SVG) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                   <AnimatePresence>
                     {architectures[activeArch].connections.map((conn, i) => {
                        const fromNode = architectures[activeArch].nodes.find(n => n.id === conn.from);
                        const toNode = architectures[activeArch].nodes.find(n => n.id === conn.to);
                        
                        if (!fromNode || !toNode) return null;
                        
                        const isVisible = activeNodes.includes(conn.from) && activeNodes.includes(conn.to);

                        return isVisible ? (
                           <motion.line 
                              key={`${activeArch}-${conn.from}-${conn.to}`}
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.2 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5, ease: "circOut" }}
                              x1={`${fromNode.x}%`} 
                              y1={`${fromNode.y}%`} 
                              x2={`${toNode.x}%`} 
                              y2={`${toNode.y}%`} 
                              stroke="currentColor" 
                              strokeWidth="2"
                              className="text-white"
                           />
                        ) : null;
                     })}
                   </AnimatePresence>
               </svg>

               {/* Nodes Layer */}
               <div className="absolute inset-0 z-20">
                  <AnimatePresence mode="popLayout">
                     {architectures[activeArch].nodes.map((node) => (
                        <motion.div
                           key={node.id}
                           initial={{ scale: 0, opacity: 0 }}
                           animate={activeNodes.includes(node.id) ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                           exit={{ scale: 0, opacity: 0 }}
                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
                           className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 w-24"
                           style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                           {/* Icon Circle */}
                           <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border backdrop-blur-sm transition-colors duration-500",
                              activeNodes.includes(node.id) 
                                 ? "bg-background border-primary text-primary shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-2 ring-primary/20" 
                                 : "bg-background/20 border-white/5 text-muted-foreground"
                           )}>
                              <node.icon size={24} />
                           </div>
                           
                           {/* Label */}
                           <div className="px-2 py-1 rounded bg-black/50 backdrop-blur text-[10px] font-bold tracking-wider uppercase text-white border border-white/10 whitespace-nowrap">
                              {node.label}
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>

               {/* Scanning Line Effect */}
               <AnimatePresence>
                  {isScanning && (
                     <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        className="absolute left-0 right-0 h-px bg-primary shadow-[0_0_20px_2px_rgba(59,130,246,0.5)] z-30 pointer-events-none"
                     />
                  )}
               </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
