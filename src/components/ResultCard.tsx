"use client";

import { FactCheckResponse, Verdict } from "@/types";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ExternalLink,
  Info,
  BarChart3,
  LucideIcon,
  Newspaper,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  result?: FactCheckResponse;
  isLoading?: boolean;
}

const verdictConfig: Record<
  Verdict,
  { icon: LucideIcon; color: string; glowClass: string; label: string }
> = {
  TRUE: {
    icon: ShieldCheck,
    color: "text-verdict-true",
    glowClass: "verdict-glow-true border-verdict-true/30 bg-verdict-true/5",
    label: "VERIFIED TRUE",
  },
  FALSE: {
    icon: XCircle,
    color: "text-verdict-false",
    glowClass: "verdict-glow-false border-verdict-false/30 bg-verdict-false/5",
    label: "VERIFIED FALSE",
  },
  MISLEADING: {
    icon: AlertTriangle,
    color: "text-verdict-misleading",
    glowClass:
      "verdict-glow-misleading border-verdict-misleading/30 bg-verdict-misleading/5",
    label: "MISLEADING",
  },
  "NOT VERIFIED": {
    icon: HelpCircle,
    color: "text-verdict-unverified",
    glowClass:
      "verdict-glow-unverified border-verdict-unverified/30 bg-verdict-unverified/5",
    label: "NOT VERIFIED",
  },
};

function formatDate(raw: string): string {
  try {
    return new Date(raw).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="w-full rounded-[2.5rem] border border-border p-8 md:p-12 space-y-10 glass animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-foreground/5" />
            <div className="space-y-2">
              <div className="w-48 h-10 bg-foreground/5 rounded-xl" />
              <div className="w-32 h-4 bg-foreground/5 rounded-lg" />
            </div>
          </div>
          <div className="w-72 h-4 bg-foreground/5 rounded-lg" />
        </div>
        <div className="w-full md:w-80 h-32 bg-foreground/5 rounded-[2rem]" />
      </div>
      <div className="space-y-3">
        <div className="w-40 h-4 bg-foreground/5 rounded-lg" />
        <div className="w-full h-28 bg-foreground/5 rounded-[2rem]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-foreground/5 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ResultCard({ result, isLoading }: ResultCardProps) {
  if (isLoading) return <LoadingSkeleton />;
  if (!result) return null;

  const config = verdictConfig[result.verdict];
  const Icon = config.icon;

  // Prefer the Part-3 `articles` field; fall back to related_articles
  const displayArticles =
    result.articles && result.articles.length > 0
      ? result.articles.map((a) => ({
          title: a.title,
          source: a.source,
          url: a.link,
          publishedAt: a.date,
          description: a.snippet ?? "",
        }))
      : result.related_articles ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full rounded-[2.5rem] border p-8 md:p-12 space-y-10 relative overflow-hidden transition-colors duration-500",
        config.glowClass
      )}
    >
      {/* BG glow blob */}
      <div
        className={cn(
          "absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[120px] opacity-10",
          config.color.replace("text-", "bg-")
        )}
      />

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
        {/* Verdict + confidence */}
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className={cn("p-4 rounded-[1.5rem] bg-card border border-border", config.color)}>
              <Icon size={36} />
            </div>
            <div>
              <h2 className={cn("text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none", config.color)}>
                {config.label}
              </h2>
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase mt-1">
                KHABRI.AI VERIFICATION ENGINE
              </p>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <BarChart3 size={12} />
              Confidence — {result.confidence}%
            </div>
            <div className="w-56 h-2 bg-muted rounded-full overflow-hidden border border-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className={cn("h-full rounded-full", config.color.replace("text-", "bg-"))}
              />
            </div>
          </div>
        </div>

        {/* Claim + keywords box */}
        <div className="w-full md:w-96 glass p-7 rounded-[2rem] border-border space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
            <Info size={12} />
            Analysed Claim
          </div>
          <p className="text-foreground/90 font-semibold leading-relaxed italic text-base line-clamp-4">
            &quot;{result.extracted_claim ?? "Claim not provided"}&quot;
          </p>
          {result.keywords && result.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {result.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-muted border border-border text-[10px] font-black text-muted-foreground uppercase tracking-tight hover:text-brand-primary transition-colors cursor-default"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Explanation ── */}
      <div className="space-y-3 relative z-10">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
          AI Analysis
        </p>
        <div className="glass p-8 rounded-[2.5rem] border-border bg-card/20">
          <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
            {result.explanation}
          </p>
        </div>
      </div>

      {/* ── Google Search Results / Related Articles ── */}
      {displayArticles.length > 0 && (
        <div className="space-y-6 relative z-10">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            Google Search Results — {displayArticles.length} sources found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayArticles.map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass p-5 rounded-[1.75rem] border border-border hover:border-brand-primary/40 hover:shadow-lg hover:shadow-brand-primary/5 transition-all flex items-start justify-between gap-4"
              >
                <div className="flex gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0 p-2 rounded-xl bg-muted text-muted-foreground group-hover:text-brand-primary transition-colors">
                    <Newspaper size={14} />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-foreground/90 font-black text-sm line-clamp-2 leading-snug group-hover:text-brand-primary transition-colors">
                      {article.title}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black text-brand-primary uppercase tracking-tight">
                        {article.source}
                      </span>
                      {article.publishedAt && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(article.publishedAt)}
                          </span>
                        </>
                      )}
                    </div>
                    {article.description && (
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {article.description}
                      </p>
                    )}
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="shrink-0 mt-1 text-muted-foreground/40 group-hover:text-brand-primary transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
