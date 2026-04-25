create extension if not exists vector with schema extensions;

create table if not exists public.portfolio_documents (
  id text primary key,
  document_id text not null,
  title text not null,
  section text not null,
  content text not null,
  embedding extensions.vector(768) not null,
  created_at timestamptz not null default now()
);

create index if not exists portfolio_documents_embedding_hnsw
on public.portfolio_documents
using hnsw (embedding extensions.vector_cosine_ops);

create or replace function public.match_portfolio_documents(
  query_embedding extensions.vector(768),
  match_count int default 6
)
returns table (
  id text,
  document_id text,
  title text,
  section text,
  content text,
  similarity float
)
language sql
security definer
set search_path = public
as $$
  select
    portfolio_documents.id,
    portfolio_documents.document_id,
    portfolio_documents.title,
    portfolio_documents.section,
    portfolio_documents.content,
    1 - (portfolio_documents.embedding OPERATOR(extensions.<=>) query_embedding) as similarity
  from public.portfolio_documents
  order by portfolio_documents.embedding OPERATOR(extensions.<=>) query_embedding
  limit match_count;
$$;

grant execute on function public.match_portfolio_documents(extensions.vector(768), int) to anon;
grant execute on function public.match_portfolio_documents(extensions.vector(768), int) to authenticated;
