import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";

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
    id: "current-employment",
    title: "Current Employment",
    section: "experience",
    content:
      "Hashir Muhammed is currently working as a Spring Boot Developer at Tata Consultancy Services, also known as TCS. His current role started in 2024 and continues to the present.",
  },
  {
    id: "skills-core",
    title: "Technical Skills",
    section: "skills",
    content:
      "Core technical skills include Java, Spring Boot, Jenkins, JMeter, Spring Security, WildFly, Kafka, PostgreSQL, JBoss EAP, Python, DynamoDB, FastAPI, Lambda, LangChain, Postman, HTML, JavaScript, CSS, React, LLM systems, RAG, LangGraph, Microsoft Copilot Studio, Power Automate, Power Apps, and Git.",
  },
  {
    id: "resume-objective",
    title: "Resume Objective",
    section: "resume",
    content:
      "Hashir Muhammed is a Software Engineer with more than two years of experience across backend development and GenAI systems. He has a strong background in Java Spring Boot for large-scale applications and Python with FastAPI for AI-powered solutions. He is seeking roles that combine scalable backend engineering with applied AI solutions.",
  },
  {
    id: "education",
    title: "Education",
    section: "education",
    content:
      "Hashir Muhammed completed a Master of Computer Application at Mar Athanasius College of Engineering from 2021 to 2023, with relevant coursework in Java, Deep Learning, Machine Learning, and SQL. He completed a Bachelor of Computer Science at the University of Calicut from 2018 to 2021.",
  },
  {
    id: "certifications",
    title: "Certifications",
    section: "certifications",
    content:
      "Hashir Muhammed has completed the following certifications: Microsoft Certified: Power BI Data Analyst Associate; Introduction to Operating System from IIT Madras; and Data Base Management System from IIT Kharagpur.",
  },
  {
    id: "springboot-telematics",
    title: "Production Grade Telematics Backend",
    section: "spring-boot",
    content:
      "Hashir developed and maintained a high-throughput telematics backend to ingest real-time trip data from mobile devices, process driving behavior, and generate driver scores. He designed Spring Boot microservices for ingestion, validation, persistence, and downstream processing; integrated Apache Kafka for reliable streaming to big data systems; worked extensively with PostgreSQL on AWS RDS; led deployment and runtime management on RHEL with JBoss EAP hosted on AWS EC2 using Jenkins; supported performance tuning, log analysis, issue triage, and scheduled job stability; and contributed to an AngularJS admin portal for user and driver management, dashboards, reports, and scoring configuration.",
  },
  {
    id: "project-telematics-driver-scoring",
    title: "Telematics and Driver Scoring Platform",
    section: "projects",
    content:
      "Telematics and Driver Scoring Platform is a backend and admin portal project. Hashir developed and maintained a high-throughput telematics backend to ingest real-time trip data from mobile devices, process driving behavior, and generate driver scores. He designed and implemented Spring Boot microservices for trip ingestion, validation, persistence, and downstream processing. He integrated Apache Kafka for reliable asynchronous streaming of trip events to big data systems for large-scale analytics. He worked extensively with PostgreSQL on AWS RDS for transactional storage, query optimization, and data maintenance in production. He led deployment, configuration, and runtime management of Spring Boot applications on RHEL with JBoss EAP hosted on AWS EC2 using Jenkins. He supported production operations including performance tuning, log analysis, issue triage, and scheduled job stability. He also contributed to an AngularJS-based admin portal for user and driver management, real-time dashboards and reports, and configuration of scoring logic and system parameters.",
  },
  {
    id: "genai-contact-centre",
    title: "Contact Centre Assistant",
    section: "genai",
    content:
      "Hashir built backend APIs using FastAPI in Python for a GenAI-powered contact centre assistant used by customer support executives. He designed LangGraph agent workflows for multi-step reasoning and dynamic decision-making, integrated LLMs for live conversation assistance from real-time transcripts, follow-up guidance, and language ambiguity detection, implemented contextual retrieval from DynamoDB for customer profiles and interaction history, integrated knowledge bases for policies and FAQs, developed competitor analysis features, and automated form autofill and recommendation workflows for contact centre operations.",
  },
  {
    id: "project-genai-contact-centre",
    title: "GenAI Contact Centre Assistant",
    section: "projects",
    content:
      "GenAI Contact Centre Assistant is a backend and AI systems project. Hashir built backend APIs using FastAPI in Python for a GenAI-powered contact centre assistant used by customer support executives. He designed and implemented agent workflows using LangGraph, enabling multi-step reasoning and dynamic decision-making. He integrated LLMs to provide live conversation assistance based on real-time transcripts, follow-up question suggestions and response guidance, and detection of slang, ambiguous, and complex customer language. He implemented dynamic data retrieval from DynamoDB to fetch customer profiles, interaction history, and contextual metadata during live calls. He integrated a knowledge base for company terms, policies, and FAQs to deliver accurate, context-aware responses. He developed competitor analysis features so agents could respond effectively to comparison-based customer queries. He automated form auto-filling and recommendation workflows, reducing manual effort for contact centre executives.",
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
      "Hashir Muhammed's contact details are: email hashhmuhammed@gmail.com, phone and WhatsApp number +91 9567088927, LinkedIn profile https://www.linkedin.com/in/hashir-muhammed, Instagram ID hashh.ir, and Instagram profile https://www.instagram.com/hashh.ir. He is based in Kochi, India.",
  },
];

const CHUNK_SIZE = 520;
const CHUNK_OVERLAP = 100;
const PDF_DIRECTORY = path.join(process.cwd(), "knowledge", "pdfs");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromFileName(fileName) {
  return path.basename(fileName, path.extname(fileName)).replace(/[-_]+/g, " ");
}

async function loadPdfKnowledge() {
  let files = [];

  try {
    files = await readdir(PDF_DIRECTORY, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const pdfFiles = files.filter((file) => file.isFile() && file.name.toLowerCase().endsWith(".pdf"));
  const documents = [];

  for (const file of pdfFiles) {
    const filePath = path.join(PDF_DIRECTORY, file.name);
    const buffer = await readFile(filePath);
    const parser = new PDFParse({ data: buffer });

    try {
      const result = await parser.getText();
      const content = result.text.replace(/\s+/g, " ").trim();

      if (!content) {
        console.warn(`Skipped ${file.name}: no readable text found.`);
        continue;
      }

      documents.push({
        id: `pdf-${slugify(file.name)}`,
        title: titleFromFileName(file.name),
        section: "pdf",
        content,
      });
    } catch (error) {
      console.warn(`Skipped ${file.name}: ${error.message}`);
    } finally {
      await parser.destroy();
    }
  }

  return documents;
}

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

  const pdfKnowledge = await loadPdfKnowledge();
  const allKnowledge = [...portfolioKnowledge, ...pdfKnowledge];
  const chunks = allKnowledge.flatMap(chunkDocument);
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

  const { error: deleteError } = await supabase.from("portfolio_documents").delete().neq("id", "__never__");

  if (deleteError) {
    throw deleteError;
  }

  const { error } = await supabase.from("portfolio_documents").upsert(rows, {
    onConflict: "id",
  });

  if (error) {
    throw error;
  }

  console.log(`Loaded ${pdfKnowledge.length} PDF document(s).`);
  console.log(`Seeded ${rows.length} RAG chunks into Supabase.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
