"use client";

import { useState } from "react";
import { NewsArticle } from "@/types";
import { ExternalLink, Clock, Newspaper, Bot, Loader2, Sparkles, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

function relativeTime(dateStr: string): string {
  try {
    const timestamp = new Date(dateStr).getTime();
    if (isNaN(timestamp)) return dateStr;

    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  } catch {
    return dateStr;
  }
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsExpanded(!isExpanded);
    if (!aiSummary && !isExpanded) {
      setIsSummarizing(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Please provide a 2-3 sentence engaging summary of this news article: Title: ${article.title}. Description: ${article.description}`
          }),
        });
        const data = await response.json();
        setAiSummary(data.reply);
      } catch {
        setAiSummary("Failed to generate AI summary.");
      } finally {
        setIsSummarizing(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group flex flex-col glass p-8 rounded-[2.5rem] border border-border hover:border-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 h-full relative overflow-hidden"
    >
      {/* Decorative hover icon */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Newspaper className="text-brand-primary/30 -rotate-12" size={40} />
      </div>

      {/* Source + time row */}
      <div className="flex justify-between items-center mb-6">
        <span className="px-4 py-1.5 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-black uppercase tracking-widest">
          {article.source}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold">
          <Clock size={11} />
          {relativeTime(article.publishedAt)}
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-xl font-black text-foreground mb-4 leading-snug tracking-tight group-hover:text-brand-primary transition-colors line-clamp-3 flex-1">
        {article.title}
      </h3>

      {/* Description */}
      <p className={`text-muted-foreground text-sm font-medium leading-relaxed mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {article.description}
      </p>

      {/* AI Smart Summary */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 relative mt-2">
              <div className="flex items-center gap-2 text-brand-primary mb-2 font-bold text-xs uppercase tracking-widest">
                <Sparkles size={14} />
                AI Summary
              </div>
              {isSummarizing ? (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Loader2 className="animate-spin" size={16} />
                  Analyzing context...
                </div>
              ) : (
                <p className="text-sm text-foreground leading-relaxed">
                  {aiSummary}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
        <button
          onClick={handleSummarize}
          className="flex items-center gap-2 text-[10px] font-black text-foreground uppercase tracking-widest hover:text-brand-primary transition-colors"
        >
          {isExpanded ? (
            <><ChevronUp size={14} /> Close</>
          ) : (
            <><Bot size={14} className="text-brand-primary" /> Auto-Summarize</>
          )}
        </button>
        {/* CTA */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:gap-3 transition-all"
          title={`Read: ${article.title}`}
        >
          Source
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
