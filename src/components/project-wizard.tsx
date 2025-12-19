"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Check, Sparkles, Smartphone, Globe, Layout, Code, Monitor, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";
import { resumeData } from "@/data/resume";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

const stepVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.2 } }
};

// Data for steps
interface WizardOption {
  id: string;
  label: string;
  sub?: string;
  icon?: any; // Using any for Lucide icon component to avoid complex type gymnastics
  color: string;
}

interface WizardStep {
  id: string;
  question: { en: string; id: string };
  options: WizardOption[];
}

const steps: WizardStep[] = [
  {
    id: "type",
    question: { en: "What are we building?", id: "Apa yang ingin kita buat?" },
    options: [
      { id: "website", label: "Website", icon: Globe, color: "text-blue-400 border-blue-400/20 bg-blue-400/10" },
      { id: "mobile_app", label: "Mobile App", icon: Smartphone, color: "text-purple-400 border-purple-400/20 bg-purple-400/10" },
      { id: "system", label: "Custom System", icon: Code, color: "text-green-400 border-green-400/20 bg-green-400/10" },
      { id: "redesign", label: "UI Redesign", icon: Layout, color: "text-pink-400 border-pink-400/20 bg-pink-400/10" },
    ]
  },
  {
    id: "budget",
    question: { en: "What's your budget range?", id: "Berapa kisaran anggaran Anda?" },
    options: [
      { id: "small", label: "< 5 Juta", sub: "Starter", color: "text-teal-400 border-teal-400/20 bg-teal-400/10" },
      { id: "medium", label: "5 - 15 Juta", sub: "Standard", color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10" },
      { id: "large", label: "> 15 Juta", sub: "Premium", color: "text-orange-400 border-orange-400/20 bg-orange-400/10" },
    ]
  },
  {
    id: "timeline",
    question: { en: "When do you need it?", id: "Kapan Anda membutuhkannya?" },
    options: [
      { id: "asap", label: "ASAP", color: "text-red-400 border-red-400/20 bg-red-400/10" },
      { id: "1_month", label: "1 Month", color: "text-cyan-400 border-cyan-400/20 bg-cyan-400/10" },
      { id: "flexible", label: "Flexible", color: "text-indigo-400 border-indigo-400/20 bg-indigo-400/10" },
    ]
  }
];

export function ProjectWizard() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (value: string) => {
    setSelections(prev => ({ ...prev, [steps[currentStep].id]: value }));
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300); // Auto advance
    } else {
      setIsCompleted(true);
    }
  };

  const generateWhatsappLink = () => {
    const type = steps[0].options.find(o => o.id === selections['type'])?.label || selections['type'];
    const budget = steps[1].options.find(o => o.id === selections['budget'])?.label || selections['budget'];
    const timeline = steps[2].options.find(o => o.id === selections['timeline'])?.label || selections['timeline'];
    
    const message = language === 'en'
      ? `Hi Hadi! I'm interested in starting a new project.%0A%0A🚀 *Project Type:* ${type}%0A💰 *Budget:* ${budget}%0A⏱️ *Timeline:* ${timeline}%0A%0ALet's discuss details!`
      : `Halo Hadi! Saya tertarik untuk memulai proyek baru.%0A%0A🚀 *Tipe Proyek:* ${type}%0A💰 *Budget:* ${budget}%0A⏱️ *Timeline:* ${timeline}%0A%0AMari kita diskusikan detailnya!`;

    return `https://wa.me/6289656012756?text=${message}`;
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="py-24 relative overflow-hidden flex items-center justify-center min-h-[80vh] bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-12">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-4 backdrop-blur-md"
            >
                <Sparkles size={16} />
                <span className="text-sm font-bold tracking-widest uppercase">Start Your Journey</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter mb-4 text-foreground">
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Vision</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {language === 'en' 
                    ? "Tell me what you need, and let's craft something extraordinary together." 
                    : "Ceritakan apa yang Anda butuhkan, dan mari kita buat sesuatu yang luar biasa bersama."}
            </p>
        </div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-background/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
             {/* Glass Reflection */}
             <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/20 blur-[80px]" />

             {!isCompleted ? (
                 <div className="relative z-10">
                     {/* Progress Bar */}
                     <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
                         <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                         />
                     </div>

                     <AnimatePresence mode="wait" custom={currentStep}>
                         <motion.div
                            key={currentStep}
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                         >
                             <h3 className="text-3xl md:text-4xl font-bold text-center">
                                 {language === 'en' ? steps[currentStep].question.en : steps[currentStep].question.id}
                             </h3>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {steps[currentStep].options.map((option) => (
                                     <motion.button
                                         key={option.id}
                                         whileHover={{ scale: 1.02, y: -2 }}
                                         whileTap={{ scale: 0.98 }}
                                         onClick={() => handleSelect(option.id)}
                                         className={cn(
                                             "relative group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 text-left transition-all duration-300 flex items-center gap-4 overflow-hidden",
                                             selections[steps[currentStep].id] === option.id && "border-primary/50 bg-primary/10 ring-1 ring-primary/50"
                                         )}
                                     >
                                         <div className={cn("p-3 rounded-xl transition-colors", option.color)}>
                                            {option.icon ? <option.icon size={24} /> : <div className="w-6 h-6 rounded-full bg-current" />}
                                         </div>
                                         <div>
                                             <div className="text-lg font-bold">{option.label}</div>
                                             {option.sub && <div className="text-xs text-muted-foreground uppercase tracking-widest">{option.sub}</div>}
                                         </div>
                                         
                                         {/* Active indicator */}
                                         <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                         </div>
                                     </motion.button>
                                 ))}
                             </div>
                         </motion.div>
                     </AnimatePresence>
                     
                     <div className="mt-8 flex justify-between items-center text-sm text-muted-foreground font-medium uppercase tracking-widest">
                         <button 
                             onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                             className={cn("hover:text-foreground transition-colors", currentStep === 0 && "opacity-0 pointer-events-none")}
                         >
                             Back
                         </button>
                         <span>Step {currentStep + 1} / {steps.length}</span>
                     </div>
                 </div>
             ) : (
                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 relative z-10"
                 >
                     <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                         <Rocket size={48} />
                     </div>
                     <h3 className="text-4xl font-serif font-bold mb-4">
                         {language === 'en' ? "Ready to Launch?" : "Siap Meluncur?"}
                     </h3>
                     <p className="text-lg text-muted-foreground max-w-md mx-auto mb-10">
                         {language === 'en' 
                            ? "Your project blueprint is ready. Let's make it a reality." 
                            : "Rancangan proyek Anda sudah siap. Mari kita wujudkan."}
                     </p>
                     
                     <a
                        href={generateWhatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-xl font-bold tracking-wide hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all duration-300"
                     >
                        {language === 'en' ? "Send to WhatsApp" : "Kirim ke WhatsApp"}
                        <ArrowRight size={20} />
                     </a>
                     
                     <div className="mt-8">
                         <button 
                             onClick={() => { setIsCompleted(false); setCurrentStep(0); setSelections({}); }}
                             className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                         >
                             {language === 'en' ? "Start Over" : "Mulai Ulang"}
                         </button>
                     </div>
                 </motion.div>
             )}

        </motion.div>
      </div>
    </section>
  );
}
