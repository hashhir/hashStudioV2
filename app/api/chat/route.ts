import { NextResponse } from "next/server";

import { answerWithContext, embedText } from "@/lib/rag/gemini";
import { matchPortfolioDocuments } from "@/lib/rag/supabase";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (!latestUserMessage?.content?.trim()) {
      return NextResponse.json({ error: "Missing user message." }, { status: 400 });
    }

    const question = latestUserMessage.content.trim();
    const queryEmbedding = await embedText(question);
    const matches = await matchPortfolioDocuments(queryEmbedding, 6);

    const answer = await answerWithContext({
      question,
      context: matches,
    });

    return NextResponse.json({
      answer,
      sources: matches.map((match) => ({
        title: match.title,
        section: match.section,
        similarity: match.similarity,
      })),
    });
  } catch (error) {
    console.error("RAG chat route error", error);

    return NextResponse.json(
      {
        error: "The assistant could not answer right now.",
      },
      { status: 500 },
    );
  }
}
