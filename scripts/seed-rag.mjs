import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const portfolioKnowledge = [
  {
    id: "about-profile",
    title: "Profile Summary",
    section: "about",
    content:
      "Hashir Muhammed is a Senior Software Developer based in Kochi, India. He has three years of experience in backend engineering and GenAI systems, with strong focus areas across Java, Spring Boot, Python, scalable services, and product-minded implementation.",
  },
  {
    id: "about-location",
    title: "Location and Availability",
    section: "about",
    content:
      "Hashir Muhammed is Kochi based and available for work. The portfolio highlights backend engineering, AI product prototyping, and minimal frontend direction.",
  },
  {
    id: "skills-core",
    title: "Technical Skills",
    section: "skills",
    content:
      "Core technical skills include Java, Spring Boot, Jenkins, JMeter, Spring Security, WildFly, Kafka, PostgreSQL, JBoss EAP, Python, DynamoDB, FastAPI, Lambda, LangChain, Postman, HTML, JavaScript, CSS, React, LLM systems, RAG, LangGraph, and Git.",
  },
  {
    id: "springboot-telematics",
    title: "Production Grade Telematics Backend",
    section: "spring-boot",
    content:
      "Hashir developed and maintained a high-throughput telematics backend to ingest real-time trip data from mobile devices, process driving behavior, and generate driver scores. He designed Spring Boot microservices for ingestion, validation, persistence, and downstream processing; integrated Apache Kafka for reliable streaming to big data systems; worked extensively with PostgreSQL on AWS RDS; led deployment and runtime management on RHEL with JBoss EAP hosted on AWS EC2 using Jenkins; supported performance tuning, log analysis, issue triage, and scheduled job stability; and contributed to an AngularJS admin portal for user and driver management, dashboards, reports, and scoring configuration.",
  },
  {
    id: "genai-contact-centre",
    title: "Contact Centre Assistant",
    section: "genai",
    content:
      "Hashir built backend APIs using FastAPI in Python for a GenAI-powered contact centre assistant used by customer support executives. He designed LangGraph agent workflows for multi-step reasoning and dynamic decision-making, integrated LLMs for live conversation assistance from real-time transcripts, follow-up guidance, and language ambiguity detection, implemented contextual retrieval from DynamoDB for customer profiles and interaction history, integrated knowledge bases for policies and FAQs, developed competitor analysis features, and automated form autofill and recommendation workflows for contact centre operations.",
  },
  {
    id: "projects-personal",
    title: "Personal Projects",
    section: "projects",
    content:
      "HashStudio Portfolio is a portfolio project built with HTML, CSS, Flexbox, and JavaScript. React Netflix Clone is a simple React project backed by external APIs for dynamic content. TinDog is a simple responsive project and one of Hashir's first deployed builds.",
  },
  {
    id: "contact",
    title: "Contact",
    section: "contact",
    content:
      "Hashir Muhammed can be contacted at hashhmuhammed@gmail.com. He is based in Kochi, India. Social links include LinkedIn, Instagram, and WhatsApp.",
  },
];

const CHUNK_SIZE = 520;
const CHUNK_OVERLAP = 100;

function chunkDocument(document) {
  const text = document.content.trim();

  if (text.length <= CHUNK_SIZE) {
    return [
      {
        id: `${document.id}-0`,
        document_id: document.id,
        title: document.title,
        section: document.section,
        content: text,
      },
    ];
  }

  const chunks = [];
  let start = 0;
  let index = 0;

  while (start < text.length) {
    const end = Math.min(text.length, start + CHUNK_SIZE);
    const slice = text.slice(start, end).trim();

    if (slice) {
      chunks.push({
        id: `${document.id}-${index}`,
        document_id: document.id,
        title: document.title,
        section: document.section,
        content: slice,
      });
    }

    if (end >= text.length) break;

    start = Math.max(end - CHUNK_OVERLAP, start + 1);
    index += 1;
  }

  return chunks;
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!apiKey || !url || !serviceRoleKey) {
    throw new Error("Missing GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, or SUPABASE_SERVICE_ROLE_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });
  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const chunks = portfolioKnowledge.flatMap(chunkDocument);
  const rows = [];

  for (const chunk of chunks) {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: chunk.content,
      config: {
        outputDimensionality: 768,
      },
    });

    const embedding = response.embeddings?.[0]?.values;
    if (!embedding) {
      throw new Error(`Failed to embed chunk ${chunk.id}`);
    }

    rows.push({
      ...chunk,
      embedding,
    });
  }

  const { error } = await supabase.from("portfolio_documents").upsert(rows, {
    onConflict: "id",
  });

  if (error) {
    throw error;
  }

  console.log(`Seeded ${rows.length} RAG chunks into Supabase.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
