import { NewsArticle, Verdict } from "@/types";

export interface AIAnalysis {
  verdict: Verdict;
  explanation: string;
  confidence: number;
  keywords: string[];
}

// Stop words to strip from keyword extraction
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "is", "was", "are", "were", "has", "have", "had", "be",
  "been", "being", "this", "that", "from", "by", "it", "its", "not",
  "no", "news", "said", "says", "will", "would", "could", "should",
]);

/** Extract meaningful keywords from a claim */
function extractKeywords(claim: string): string[] {
  return [...new Set(
    claim
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
  )]
    .sort((a, b) => b.length - a.length)
    .slice(0, 5)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
}

/** Score the article pool against the claim keywords */
function scoreArticles(keywords: string[], articles: NewsArticle[]): number {
  if (articles.length === 0) return 0;
  const combined = articles.map((a) => `${a.title} ${a.description}`.toLowerCase()).join(" ");
  const matches = keywords.filter((kw) => combined.includes(kw.toLowerCase())).length;
  return Math.round((matches / Math.max(keywords.length, 1)) * 100);
}

/** Classify a claim based purely on retrieved article evidence */
export async function classifyClaim(claim: string, articles: NewsArticle[]): Promise<AIAnalysis> {
  const keywords = extractKeywords(claim);

  // No articles — cannot verify
  if (articles.length === 0) {
    return {
      verdict: "NOT VERIFIED",
      explanation:
        "No coverage was found in trusted news sources for this claim. It may be too recent, too localised, or not yet reported.",
      confidence: 40,
      keywords,
    };
  }

  const combined = articles.map((a) => `${a.title} ${a.description}`).join(" ").toLowerCase();
  const relevanceScore = scoreArticles(keywords, articles);

  // Evidence signals
  const hasDenial = /\b(deny|denied|denies|fake|rumour|rumor|false alarm|baseless|misinformation|no evidence|unverified)\b/.test(combined);
  const hasConfirmation = /\b(confirm|confirmed|official|verified|reports confirm|authorities say|government says)\b/.test(combined);
  const hasConflict = /\b(contested|disputed|contradicted|conflicting reports|mixed reports|unclear)\b/.test(combined);

  // Low relevance → not verified
  if (relevanceScore < 20) {
    return {
      verdict: "NOT VERIFIED",
      explanation:
        `Trusted sources returned ${articles.length} article(s) but none closely matched the claim. More coverage may emerge as the story develops.`,
      confidence: 35 + relevanceScore,
      keywords,
    };
  }

  if (hasDenial && !hasConfirmation) {
    return {
      verdict: "FALSE",
      explanation:
        `${articles.length} trusted source(s) including ${articles[0].source} have explicitly denied or debunked this claim. Available evidence does not support it.`,
      confidence: Math.min(60 + relevanceScore, 97),
      keywords,
    };
  }

  if (hasConfirmation && !hasDenial) {
    return {
      verdict: "TRUE",
      explanation:
        `${articles.length} trusted source(s) including ${articles[0].source} have reported or confirmed details consistent with this claim.`,
      confidence: Math.min(55 + relevanceScore, 95),
      keywords,
    };
  }

  if (hasConflict || (hasDenial && hasConfirmation)) {
    return {
      verdict: "MISLEADING",
      explanation:
        `Coverage across ${articles.length} source(s) is contradictory. Some reports support the claim while others dispute it. The full picture is unclear.`,
      confidence: Math.min(40 + relevanceScore, 75),
      keywords,
    };
  }

  // Articles exist but no strong signal — misleading / low confidence
  return {
    verdict: "MISLEADING",
    explanation:
      `Related coverage was found in ${articles.length} source(s), but the articles do not directly confirm or deny the claim. Treat with caution.`,
    confidence: Math.min(35 + relevanceScore, 70),
    keywords,
  };
}
