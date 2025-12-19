"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Activity, AlertTriangle, Shield, Cpu, Zap, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

type LogType = {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
};

export function CloudCommand() {
  const [servers, setServers] = useState<number>(3);
  const [traffic, setTraffic] = useState<number>(1000);
  const [health, setHealth] = useState<number>(100);
  const [logs, setLogs] = useState<LogType[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-generate traffic and logs
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate traffic
      setTraffic(prev => Math.max(100, prev + Math.floor(Math.random() * 500) - 200));
      
      // Calculate health based on load per server
      setHealth(prev => {
        const loadPerServer = traffic / (servers || 1);
        const targetHealth = Math.max(0, 100 - (loadPerServer / 100)); // Arbitrary formula
        // Smooth transition
        return prev + (targetHealth - prev) * 0.1; 
      });

      // Periodic logs
      if (Math.random() > 0.7) {
        addLog(getRandomLog());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [traffic, servers]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: LogType["type"] = "info") => {
    const newLog = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs(prev => [...prev.slice(-19), newLog]);
  };

  const getRandomLog = () => {
    const messages = [
      "Traffic spike detected in region: AP-SOUTHEAST-3",
      "Garbage collection started...",
      "Database connection pool: 85% utilization",
      "Auto-scaling policy evaluated: No action needed",
      "SSL Certificate validated",
      "Cache hit ratio: 94.2%",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleDeploy = () => {
    setServers(prev => prev + 1);
    addLog("New node instance initialized successfully", "success");
  };

  const handlePurge = () => {
    if (servers > 1) {
      setServers(prev => prev - 1);
      addLog("Node instance terminated", "warning");
    } else {
      addLog("Cannot terminate last active node!", "error");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Header UI */}
          <div className="px-8 py-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                  <Activity size={24} />
               </div>
               <div>
                  <h2 className="text-xl font-bold font-mono text-white tracking-widest">CLOUD COMMAND</h2>
                  <p className="text-neutral-500 text-xs uppercase tracking-wider">Infrastructure Control Plane</p>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold", health > 80 ? "border-green-500/30 bg-green-500/10 text-green-500" : health > 40 ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500" : "border-red-500/30 bg-red-500/10 text-red-500")}>
                    <Shield size={12} /> SYSTEM {health > 80 ? "OPTIMAL" : health > 40 ? "STRESSED" : "CRITICAL"}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-xs font-bold">
                    <Wifi size={12} /> {traffic.toLocaleString()} REQ/S
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
             
             {/* LEFT: SERVER RACK VISUALIZER */}
             <div className="lg:col-span-2 p-8 border-r border-neutral-800 bg-neutral-950/50 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                <h3 className="text-sm font-bold text-neutral-500 mb-6 flex items-center gap-2 uppercase tracking-wider">
                   Active Instances <span className="bg-neutral-800 text-white px-2 rounded-md">{servers}</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                   <AnimatePresence>
                     {Array.from({ length: servers }).map((_, i) => (
                       <motion.div
                         key={i}
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         exit={{ scale: 0, opacity: 0 }}
                         transition={{ type: "spring", stiffness: 200, damping: 20 }}
                         className="aspect-square rounded-xl bg-neutral-900 border border-neutral-800 p-4 flex flex-col justify-between group hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all"
                       >
                          <div className="flex justify-between items-start">
                             <Server size={20} className="text-neutral-600 group-hover:text-blue-500 transition-colors" />
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          </div>
                          <div className="space-y-1">
                             <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-blue-500" 
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${Math.random() * 80 + 10}%` }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                />
                             </div>
                             <div className="text-[10px] text-neutral-500 font-mono">CPU: {(Math.random() * 50 + 20).toFixed(1)}%</div>
                          </div>
                       </motion.div>
                     ))}
                   </AnimatePresence>
                   
                   {/* Add Button */}
                   <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDeploy}
                      className="aspect-square rounded-xl border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center gap-2 text-neutral-600 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                   >
                      <Zap size={24} />
                      <span className="text-xs font-bold uppercase">Deploy Node</span>
                   </motion.button>
                </div>
             </div>

             {/* RIGHT: CONTROL & LOGS */}
             <div className="flex flex-col bg-neutral-900/30">
                {/* Controls */}
                <div className="p-6 border-b border-neutral-800">
                   <h3 className="text-sm font-bold text-neutral-500 mb-4 uppercase tracking-wider">Manual Override</h3>
                   <div className="flex gap-4">
                      <button 
                        onClick={handleDeploy}
                        className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all shadow-lg shadow-blue-900/20"
                      >
                        SCALE UP
                      </button>
                      <button 
                        onClick={handlePurge}
                        className="flex-1 py-3 rounded-lg bg-red-900/50 hover:bg-red-900/80 border border-red-800 text-red-200 text-sm font-bold transition-all"
                      >
                        PURGE
                      </button>
                   </div>
                </div>

                {/* System Logs */}
                <div className="flex-1 p-6 flex flex-col min-h-0">
                    <h3 className="text-sm font-bold text-neutral-500 mb-4 flex items-center justify-between uppercase tracking-wider">
                        <span>Live Terminal</span>
                        <span className="text-[10px] text-green-500 font-mono animate-pulse">● LIVE</span>
                    </h3>
                    <div 
                        ref={logContainerRef}
                        className="flex-1 bg-black rounded-xl border border-neutral-800 p-4 font-mono text-xs overflow-y-auto space-y-2 custom-scrollbar"
                    >
                       {logs.map((log) => (
                          <div key={log.id} className="flex gap-3 fade-in">
                             <span className="text-neutral-600 shrink-0">[{log.timestamp}]</span>
                             <span className={cn(
                                "flex-1 break-words",
                                log.type === "error" ? "text-red-400" :
                                log.type === "warning" ? "text-amber-400" :
                                log.type === "success" ? "text-green-400" : "text-blue-300"
                             )}>
                                {log.type === "success" && "✔ "}{log.message}
                             </span>
                          </div>
                       ))}
                       {logs.length === 0 && <span className="text-neutral-700 italic">Initializing system wrapper...</span>}
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
}
