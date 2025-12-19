import { Navbar } from "@/components/navbar";
import { PixelForge } from "@/components/pixel-forge";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgePage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <Navbar />
      <div className="pt-24 container mx-auto px-4 max-w-7xl">
        <Link 
            href="/#playground" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 group"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Portal
        </Link>
        <PixelForge />
      </div>
      <Footer />
    </main>
  );
}
