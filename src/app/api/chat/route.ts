import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // You can customize the prompt here, e.g., to act as a News Assistant
    const systemPrompt = `You are a helpful AI News Assistant for Khabri.ai. 
Your goal is to answer questions, summarize news, and explain articles clearly.
User query: ${message}`;

    const reply = await askGemini(systemPrompt);

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
