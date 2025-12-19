"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguage } from "./language-provider";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FolderGit2, 
  Sun, 
  Moon, 
  Languages,
  Sparkles,
  Network,
  FlaskConical,
  Cpu,
  Calendar,
} from "lucide-react";

import { usePathname } from "next/navigation";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only spy on scroll if we are on the home page
      if (!isHome) return;

      const sections = ["home", "journey", "tech-nexus", "tech-stack", "projects", "playground", "contact"];
      const scrollPosition = window.scrollY + 300; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
             if (section === "home") setActiveTab("Home");
             if (section === "journey") setActiveTab("Journey");
             if (section === "tech-nexus") setActiveTab("Nexus");
             if (section === "tech-stack") setActiveTab("Tech");
             if (section === "projects") setActiveTab("Projects");
             if (section === "playground") setActiveTab("Playground");
             if (section === "contact") setActiveTab("Contact");
             return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Determine active tab based on pathname for external pages
  useEffect(() => {
      if (pathname === "/system" || pathname === "/lab" || pathname === "/cloud" || pathname === "/forge") {
          setActiveTab("Playground");
      }
  }, [pathname]);

  const navItems = [
    { name: "Home", icon: <Home size={18} />, href: "/" },
    { name: "Journey", icon: <Calendar size={18} />, href: isHome ? "#journey" : "/#journey" },
    { name: "Nexus", icon: <Cpu size={18} />, href: isHome ? "#tech-nexus" : "/#tech-nexus" },
    { name: "Tech", icon: <Languages size={18} />, href: isHome ? "#tech-stack" : "/#tech-stack" },
    { name: "Projects", icon: <FolderGit2 size={18} />, href: isHome ? "#projects" : "/#projects" },
    { name: "Playground", icon: <FlaskConical size={18} />, href: isHome ? "#playground" : "/#playground" },
    { name: "Contact", icon: <Sparkles size={18} />, href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
      {/* --- DESKTOP: Premium Floating Island --- */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <motion.div
           initial={{ y: -100, opacity: 0, scale: 0.9 }}
           animate={{ y: 0, opacity: 1, scale: 1 }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
           className={cn(
             "flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500",
             isScrolled ? "glass bg-background/40" : "bg-transparent border border-transparent"
           )}
        >
           {/* Navigation Items */}
           <div className="flex items-center bg-background/50 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-full p-1.5 shadow-2xl shadow-black/5 ring-1 ring-white/10">
             {navItems.map((item) => (
               <Link 
                 key={item.name} 
                 href={item.href}
                 onClick={() => setActiveTab(item.name)}
                 className={cn(
                   "relative px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 group",
                   activeTab === item.name ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                 )}
               >
                  {activeTab === item.name && (
                    <motion.div
                      layoutId="active-pill-desktop"
                      className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className={cn(
                    "relative z-10 text-sm font-medium tracking-wide transition-all duration-300",
                    activeTab === item.name ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 w-0 overflow-hidden group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-auto group-hover:ml-2"
                  )}>
                    {item.name}
                  </span>
               </Link>
             ))}
           </div>
           
           {/* Settings Toggles */}
           <div className="flex items-center gap-1 ml-2 bg-background/50 backdrop-blur-2xl border border-white/10 dark:border-white/5 rounded-full p-1.5 shadow-2xl shadow-black/5 ring-1 ring-white/10">
              <button
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground relative group"
                aria-label="Toggle Language"
              >
                 <Languages size={18} />
                 <span className="absolute -bottom-8 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   {language === 'en' ? 'Indonesian' : 'English'}
                 </span>
              </button>
              
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                 className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground relative group"
                 aria-label="Toggle Theme"
              >
                 {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                 <span className="absolute -bottom-8 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                 </span>
              </button>
           </div>
        </motion.div>
      </div>

      {/* --- MOBILE: Top Bar (Minimalist) --- */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden flex justify-between items-center px-6 py-4 glass border-b-0">
         <Link href="/" className="font-serif font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            H.
         </Link>
         <div className="flex items-center gap-2">
            {mounted && (
                <>
                <button 
                    onClick={() => setLanguage(language === "en" ? "id" : "en")}
                    className="text-[10px] font-bold border border-border/50 bg-secondary/50 px-3 py-1.5 rounded-full backdrop-blur-md"
                >
                    {language.toUpperCase()}
                </button>
                <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full bg-secondary/50 backdrop-blur-md"
                >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                </>
            )}
         </div>
      </div>

      {/* --- MOBILE: Floating Bottom Navigation --- */}
      <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
         <div className="glass rounded-2xl p-2 flex justify-between items-center shadow-2xl shadow-black/10 ring-1 ring-white/10 overflow-x-auto">
            {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className="flex-1 min-w-[60px] flex flex-col items-center justify-center py-3 relative"
                >
                   {activeTab === item.name && (
                     <motion.div
                         layoutId="active-nav-mobile"
                         className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                         transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                     />
                   )}
                   <span className={cn(
                     "transition-all duration-300",
                     activeTab === item.name ? "text-foreground scale-110" : "text-muted-foreground"
                   )}>
                     {item.icon}
                   </span>
                </Link>
            ))}
         </div>
      </div>
    </>
  );
}
