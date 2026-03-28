"use client";

import { useEffect, useState } from "react";
import { NewsArticle } from "@/types";
import NewsCard from "./NewsCard";
import { RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const loadNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/latest-news");
      if (!res.ok) throw new Error("Failed to fetch news");
      const data: NewsArticle[] = await res.json();
      setNews(data);
    } catch (err) {
      console.error("[NewsSection]", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadNews();
  }, []);

  if (!mounted) return null;

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-2">
            LATEST VERIFIED NEWS <span className="animate-pulse bg-verdict-true w-2 h-2 rounded-full" />
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-primary/60">Updated Automatically from Google News RSS</p>
        </div>
        <button
          onClick={loadNews}
          disabled={isLoading}
          className="p-3 rounded-2xl glass border-border hover:bg-card-foreground/5 transition-all duration-300 disabled:opacity-50"
        >
          <RefreshCw className={isLoading ? "animate-spin" : ""} size={24} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass border-border p-8 rounded-[2.5rem] h-[320px] animate-pulse space-y-6">
                <div className="flex justify-between">
                  <div className="h-4 w-24 bg-foreground/10 rounded-full" />
                  <div className="h-4 w-20 bg-foreground/10 rounded-full" />
                </div>
                <div className="h-8 w-full bg-foreground/10 rounded-xl" />
                <div className="h-8 w-3/4 bg-foreground/10 rounded-xl" />
                <div className="pt-8 h-4 w-32 bg-foreground/10 rounded-xl" />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {news.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
