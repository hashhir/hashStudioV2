import type { KnowledgeDocument } from "@/lib/rag/knowledge";

export type DocumentChunk = {
  id: string;
  documentId: string;
  title: string;
  section: string;
  content: string;
};

const CHUNK_SIZE = 520;
const CHUNK_OVERLAP = 100;

export function chunkDocument(document: KnowledgeDocument): DocumentChunk[] {
  const text = document.content.trim();

  if (text.length <= CHUNK_SIZE) {
    return [
      {
        id: `${document.id}-0`,
        documentId: document.id,
        title: document.title,
        section: document.section,
        content: text,
      },
    ];
  }

  const chunks: DocumentChunk[] = [];
  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(text.length, start + CHUNK_SIZE);
    const slice = text.slice(start, end).trim();

    if (slice) {
      chunks.push({
        id: `${document.id}-${index}`,
        documentId: document.id,
        title: document.title,
        section: document.section,
        content: slice,
      });
    }

    if (end >= text.length) {
      break;
    }

    start = Math.max(end - CHUNK_OVERLAP, start + 1);
    index += 1;
  }

  return chunks;
}

export function chunkDocuments(documents: KnowledgeDocument[]) {
  return documents.flatMap(chunkDocument);
}
