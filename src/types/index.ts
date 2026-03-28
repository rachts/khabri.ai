export type Verdict = "TRUE" | "FALSE" | "MISLEADING" | "NOT VERIFIED";

export interface NewsArticle {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  description: string;
  urlToImage?: string;
}

/** Part 3 spec — article shape returned by /api/verify-news */
export interface SearchResult {
  title: string;
  source: string;
  link: string;
  date: string;
  snippet?: string;
}

export interface FactCheckResponse {
  verdict: Verdict;
  explanation: string;
  confidence: number;
  keywords: string[];
  /** Part 3 format */
  articles: SearchResult[];
  /** UI-compatible format (same data, slightly different shape) */
  related_articles: NewsArticle[];
  extracted_claim?: string;
}

export interface FactCheckRequest {
  text: string;
  language?: string;
}
