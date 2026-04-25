import { GoogleGenAI } from "@google/genai";

const EMBEDDING_MODEL = "gemini-embedding-2";
const CHAT_MODEL = "gemini-2.5-flash";
export const EMBEDDING_DIMENSION = 768;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }

  return new GoogleGenAI({ apiKey });
}

export async function embedText(text: string) {
  const ai = getGeminiClient();
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
    config: {
      outputDimensionality: EMBEDDING_DIMENSION,
    },
  });

  const embedding = response.embeddings?.[0]?.values;

  if (!embedding) {
    throw new Error("Embedding generation failed");
  }

  return embedding;
}

export async function answerWithContext(params: {
  question: string;
  context: Array<{
    title: string;
    section: string;
    content: string;
    similarity?: number;
  }>;
}) {
  const ai = getGeminiClient();

  const contextBlock = params.context
    .map(
      (item, index) =>
        `[Source ${index + 1}] ${item.title} (${item.section})\n${item.content}`,
    )
    .join("\n\n");

  const prompt = `You are the portfolio assistant for Hashir Muhammed.

Only answer using the provided portfolio context.
If the answer is not supported by the context, say that the portfolio does not currently provide that information.
Keep answers concise, accurate, and professional.
When possible, end with a short "Sources:" line using the source titles.

Question:
${params.question}

Portfolio context:
${contextBlock}`;

  const response = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: prompt,
  });

  return response.text ?? "I could not generate a response right now.";
}
