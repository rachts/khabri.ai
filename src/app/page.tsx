"use client";

import { useState, useEffect } from "react";
import FactForm from "@/components/FactForm";
import ResultCard from "@/components/ResultCard";
import NewsSection from "@/components/NewsSection";
import Navbar from "@/components/Navbar";
import { FactCheckResponse } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, Activity, Search, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResponse | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckFact = async (text: string, language: string, fromDate?: string, toDate?: string) => {
    setIsLoading(true);
    setResult(null);

    // Smooth scroll to results
    const resultsElement = document.getElementById("results-anchor");
    resultsElement?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const response = await fetch("/api/verify-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, fromDate, toDate }),
      });

      if (!response.ok) throw new Error("Failed to check fact");
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative pt-20">
      <Navbar />
      <div className="gradient-bg opacity-30" />
      <div className="glow top-[20%] right-[10%] opacity-20 animate-pulse" />
      <div className="glow bottom-[30%] left-[5%] opacity-10 animate-pulse delay-700" />

      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-brand-primary/30 text-brand-primary text-sm font-black uppercase tracking-widest mb-4 animate-float">
            <ShieldCheck size={18} />
            k.ai
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-foreground tracking-tighter leading-[0.85] mb-6">
            Verify the news before <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent italic">
              it verifies you.
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Advanced AI-powered fact checker for headlines and social forwards. 
            <span className="text-foreground font-black ml-1">हर ख़बर का सच, सेकंडों में।</span>
          </p>

          <div className="pt-12 w-full max-w-3xl mx-auto">
            <div className="glass p-1 rounded-[2.5rem] border-border shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <FactForm onCheck={handleCheckFact} isLoading={isLoading} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Results Anchor */}
      <div id="results-anchor" className="scroll-mt-32" />

      <div className="max-w-7xl mx-auto px-6 space-y-48 pb-48">
        
        {/* Section: Fact Checking Result (Dynamic) */}
        <AnimatePresence>
          {(result || isLoading) && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="relative"
            >
              <div className="absolute -inset-12 bg-brand-primary/5 rounded-[4rem] blur-3xl opacity-50" />
              <div className="relative glass p-12 rounded-[3.5rem] border-border shadow-2xl space-y-12">
                <div className="flex items-center justify-between border-b border-border pb-8">
                  <div className="space-y-1">
                     <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="text-brand-primary" size={32} />
                        VERIFICATION REPORT
                     </h2>
                     <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">REAL-TIME DATA ANALYSIS COMPLETED</p>
                  </div>
                  <div className="px-6 py-2 rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping" />
                     <span className="text-xs font-black uppercase tracking-tighter leading-none">AI SECURED</span>
                  </div>
                </div>
                
                <ResultCard result={result || undefined} isLoading={isLoading} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Section: Latest Verified News */}
        <NewsSection />

        {/* Section: Why khabri.ai */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          {[
            { 
              icon: Search, 
              title: "Hyper Search", 
              desc: "Deep integration with global news archives and local trusted bulletins across India." 
            },
            { 
              icon: Activity, 
              title: "Neural Engine", 
              desc: "Low-latency analysis using state-of-the-art language models for vernacular detection." 
            },
            { 
              icon: ArrowRight, 
              title: "Instant Export", 
              desc: "Verify and share reports instantly to WhatsApp, Twitter, and Facebook with one tap." 
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -16 }}
              className="glass p-12 rounded-[3.5rem] border-border space-y-6 group hover:border-brand-primary/30 transition-all duration-500"
            >
              <div className="p-6 rounded-[2rem] bg-card-foreground/5 text-brand-primary w-fit group-hover:bg-brand-primary group-hover:text-card transition-all duration-500 shadow-xl shadow-brand-primary/5">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Section: Founders Section */}
        <section className="mt-40 mb-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-brand-primary animate-pulse">
              The Minds Behind Khabri.ai
            </h2>
            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter uppercase italic">
              Our Visionary Founders
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                name: "Rachit Kumar Tiwari",
                bio: "At Khabri.ai, our mission is to restore trust in the digital ecosystem by putting the power of high-fidelity verification back in the hands of the people.",
                linkedin: "https://www.linkedin.com/in/rachitkrtiwari/",
                image: "/rachit1.jpg"
              },
              {
                name: "Subhadip Karmakar",
                bio: "Verification is not just a feature, it's a fundamental right. We are building the infrastructure for a more truthful and transparent internet.",
                linkedin: "https://www.linkedin.com/in/subhadip-karmakar-58112436a/",
                image: "/subhadip.png"
              }
            ].map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative overflow-hidden rounded-[4rem] glass p-10 border-border group hover:border-brand-primary/30 transition-all duration-700 h-full flex flex-col justify-between"
              >
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-primary/10 transition-all duration-700" />
                
                <div className="flex flex-col sm:flex-row items-center gap-10 relative z-10">
                  <div className="shrink-0 relative">
                    <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-brand-primary/20 shadow-2xl relative z-10">
                      <img 
                        src={founder.image} 
                        alt={founder.name} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=4400FF&color=fff&size=512`;
                        }}
                      />
                    </div>
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-primary rounded-[1rem] flex items-center justify-center text-card shadow-xl rotate-12 group-hover:rotate-0 transition-all duration-700">
                      <ShieldCheck size={24} />
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 text-center sm:text-left">
                    <div className="space-y-3">
                      <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter leading-none uppercase italic">
                        {founder.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed italic">
                        &quot;{founder.bio}&quot;
                      </p>
                    </div>

                    <div className="flex justify-center sm:justify-start">
                      <a 
                        href={founder.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-brand-primary text-card rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2"
                      >
                        Know More
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-24 px-6 bg-card">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-2xl group-hover:scale-110 transition-transform flex items-center justify-center font-black text-xl text-white">k.</div>
            <span className="text-4xl font-black text-foreground tracking-tighter">ai</span>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-12">
            <Link href="/trust-safety" className="text-muted-foreground hover:text-brand-primary text-sm font-black uppercase tracking-widest transition-colors">Trust &amp; Safety</Link>
            <Link href="/ai-principles" className="text-muted-foreground hover:text-brand-primary text-sm font-black uppercase tracking-widest transition-colors">AI Principles</Link>
            <Link href="/transparency" className="text-muted-foreground hover:text-brand-primary text-sm font-black uppercase tracking-widest transition-colors">Transparency</Link>
            <Link href="/newsroom" className="text-muted-foreground hover:text-brand-primary text-sm font-black uppercase tracking-widest transition-colors">Newsroom</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand-primary text-sm font-black uppercase tracking-widest transition-colors">GitHub</a>
          </div>

          <div className="pt-12 border-t border-border w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 KHABRI.AI LABS
            </p>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">
              Verify Before You Trust
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
