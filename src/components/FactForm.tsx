"use client";

import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { Search, Calendar, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FactFormProps {
  onCheck: (text: string, language: string, fromDate?: string, toDate?: string) => void;
  isLoading: boolean;
}

const LOADING_STEPS = [
  "Searching Google News clusters...",
  "Running cross-reference engine...",
  "AI Analysis in progress...",
];

export default function FactForm({ onCheck, isLoading }: FactFormProps) {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("hindi");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    setLoadingStep(0);
    onCheck(text, language, fromDate, toDate);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-black text-foreground/40 uppercase tracking-widest ml-1">
            <ShieldCheck size={16} className="text-brand-primary" />
            Detection Logic
          </label>
          <LanguageSelector value={language} onChange={setLanguage} />
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-black text-foreground/40 uppercase tracking-widest ml-1">
            <Calendar size={16} className="text-brand-primary" />
            Historical Archive
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-muted border border-border rounded-2xl px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all hover:bg-card/50"
              placeholder="From Date"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-muted border border-border rounded-2xl px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all hover:bg-card/50"
              placeholder="To Date"
            />
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-accent rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-10 transition duration-1000"></div>
        <div className="relative bg-muted/50 rounded-[2.5rem] border border-border focus-within:border-brand-primary/40 focus-within:bg-card transition-all duration-500 overflow-hidden">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste any news headline or social media message to verify..."
            className="w-full h-48 px-8 py-8 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-xl leading-relaxed font-medium"
          />
          <div className="flex items-center justify-between px-8 py-6 border-t border-border/10">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
              <span className={cn(text.length > 500 ? "text-amber-500" : "")}>
                {text.length} / 2000 Units
              </span>
              <span className="w-1 h-1 bg-border rounded-full" />
              <span className="text-brand-primary">Neural Analysis Active</span>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-brand-primary/20 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className={cn(
          "relative w-full overflow-hidden rounded-[2rem] p-[2px] transition-all duration-500 active:scale-[0.985] group",
          isLoading || !text.trim() ? "opacity-30 cursor-not-allowed grayscale" : "hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.3)]"
        )}
      >
        <div className={cn(
          "relative w-full py-6 rounded-[1.9rem] font-black text-white transition-all duration-500 flex items-center justify-center gap-4",
          isLoading || !text.trim() ? "bg-muted" : "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-[length:200%_auto] hover:bg-right"
        )}>
          {isLoading ? (
            <div className="flex flex-col items-center py-2">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Loader2 className="animate-spin" size={24} />
                <span className="text-2xl uppercase tracking-tighter">VERIFYING CLUSTERS</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  {LOADING_STEPS[loadingStep]}
                </motion.p>
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Search size={24} />
              <span className="text-2xl uppercase tracking-tighter">RUN TRUTH SCAN</span>
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform duration-500" />
            </>
          )}
        </div>
      </button>
    </form>
  );
}
