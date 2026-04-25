import { createClient } from "@supabase/supabase-js";

type MatchRow = {
  id: string;
  document_id: string;
  title: string;
  section: string;
  content: string;
  similarity: number;
};

function getPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase public environment variables");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function matchPortfolioDocuments(queryEmbedding: number[], matchCount = 6) {
  const supabase = getPublicSupabaseClient();

  const { data, error } = await supabase.rpc("match_portfolio_documents", {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) {
    throw error;
  }

  return (data ?? []) as MatchRow[];
}
