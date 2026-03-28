import { NextResponse } from "next/server";
import { fetchLatestNews } from "@/lib/news";

export async function GET() {
  try {
    const articles = await fetchLatestNews();
    return NextResponse.json(articles);
  } catch (err) {
    console.error("[/api/latest-news]", err);
    return NextResponse.json([], { status: 500 });
  }
}
