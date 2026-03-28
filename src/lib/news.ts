import { NewsArticle } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SerperNewsItem {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date?: string;
  imageUrl?: string;
}

interface SerperResponse {
  news?: SerperNewsItem[];
  organic?: Array<{
    title: string;
    link: string;
    snippet: string;
    source?: string;
    date?: string;
  }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SERPER_URL = "https://google.serper.dev/news";

function getApiKey(): string {
  const key = process.env.SERPER_API_KEY ?? "";
  if (!key || key === "your_serper_api_key_here") {
    throw new Error("SERPER_API_KEY is not set in environment variables");
  }
  return key;
}

async function serperSearch(
  query: string,
  num = 10
): Promise<NewsArticle[]> {
  const apiKey = getApiKey();

  const res = await fetch(SERPER_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, gl: "in", hl: "en", num }),
    // Prevent Next.js from caching news — always fresh
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Serper API responded with status ${res.status}`);
  }

  const data: SerperResponse = await res.json();
  const items = data.news ?? data.organic ?? [];

  return items.slice(0, num).map((item) => ({
    title: item.title,
    source: item.source ?? extractDomain(item.link),
    publishedAt: item.date ?? new Date().toISOString(),
    url: item.link,
    description: item.snippet,
  }));
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "News Source";
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch the latest Indian news via Google Search (Serper API).
 * Called server-side only from /api/latest-news.
 */
export async function fetchLatestNews(): Promise<NewsArticle[]> {
  return serperSearch("latest india news today", 10);
}

/**
 * Search Google News for articles related to a claim.
 * Called server-side only from /api/verify-news.
 */
export async function searchTrustedNews(claim: string): Promise<NewsArticle[]> {
  return serperSearch(claim, 8);
}
