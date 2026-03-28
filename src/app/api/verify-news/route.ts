import { NextRequest, NextResponse } from "next/server";
import { searchTrustedNews } from "@/lib/news";
import { classifyClaim } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body as { text?: string };

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    // Step 1 & 2 — Fetch evidence from Google News RSS
    const newsArticles = await searchTrustedNews(text.trim());

    // Step 3 — Classify using evidence
    const analysis = await classifyClaim(text.trim(), newsArticles);

    // Step 4 — Return structured response matching Part 3 spec
    return NextResponse.json({
      verdict: analysis.verdict,
      explanation: analysis.explanation,
      confidence: analysis.confidence,
      keywords: analysis.keywords,
      // Part 3 format: articles array
      articles: newsArticles.map((a) => ({
        title: a.title,
        source: a.source,
        link: a.url,
        date: a.publishedAt,
      })),
      // Legacy field kept for ResultCard compatibility
      related_articles: newsArticles,
      extracted_claim: text.trim(),
    });
  } catch (err) {
    console.error("[verify-news]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
