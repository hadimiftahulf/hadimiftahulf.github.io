import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TechNexus } from "@/components/tech-nexus";
import { HolographicJourney } from "@/components/holographic-journey";
import { PlaygroundPortal } from "@/components/playground-portal";
import { TechEcosystem } from "@/components/tech-ecosystem";
import { Projects } from "@/components/projects";
import { ProjectWizard } from "@/components/project-wizard";
import { Footer } from "@/components/footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <div className="h-24 bg-gradient-to-b from-background to-secondary/30 pointer-events-none" />
      <section id="journey">
        <HolographicJourney />
      </section>
      <div className="h-24 bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />
      <section id="tech-nexus">
        <TechNexus />
      </section>
      <div className="h-24 bg-gradient-to-b from-background to-secondary/30 pointer-events-none" />
      <section id="tech-stack">
        <TechEcosystem />
      </section>
      <div className="h-24 bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />
      <section id="projects">
        <Projects />
      </section>
      <div className="h-24 bg-gradient-to-b from-background to-secondary/30 pointer-events-none" />
      <section id="playground">
        <PlaygroundPortal />
      </section>
      <div className="h-24 bg-gradient-to-b from-secondary/30 to-background pointer-events-none" />
      <section id="contact">
        <ProjectWizard />
      </section>
      <Footer />
    </main>
  );
}
