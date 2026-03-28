"use client";

import { NewsArticle } from "@/types";
import { ExternalLink, Clock, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

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
      <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 line-clamp-2">
        {article.description}
      </p>

      {/* CTA */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest group-hover:gap-3 transition-all"
        title={`Read: ${article.title}`}
      >
        Read Article
        <ExternalLink size={14} />
      </a>
    </motion.div>
  );
}
