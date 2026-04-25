export type KnowledgeDocument = {
  id: string;
  title: string;
  section: string;
  content: string;
};

export const portfolioKnowledge: KnowledgeDocument[] = [
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
    id: "experience-enterprise-backend",
    title: "Enterprise Backend Systems",
    section: "experience",
    content:
      "Hashir has built reliable Java services and APIs with strong attention to scale, latency, production stability, and maintainable architecture.",
  },
  {
    id: "experience-genai-delivery",
    title: "Generative AI Delivery",
    section: "experience",
    content:
      "Hashir has shipped GenAI-backed features, prototypes, and internal tools that combine backend engineering depth with product thinking and practical delivery.",
  },
  {
    id: "experience-fullstack",
    title: "Full-Stack Execution",
    section: "experience",
    content:
      "Hashir also designs modern frontend experiences that feel sharp, minimal, and intentional while staying fast and reliable in production.",
  },
  {
    id: "experience-telematics",
    title: "Telematics Software",
    section: "experience",
    content:
      "Hashir worked across frontend experiences, native iOS and Android apps, Java backend services, and integrations with big data platforms in telematics software systems.",
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
    id: "projects-portfolio",
    title: "HashStudio Portfolio Project",
    section: "projects",
    content:
      "HashStudio Portfolio is a personal project developed using HTML, CSS, Flexbox, and JavaScript. It showcases Hashir's curiosity-driven web learning journey.",
  },
  {
    id: "projects-netflix",
    title: "React Netflix Clone",
    section: "projects",
    content:
      "React Netflix Clone is a simple Netflix-style project built with React and external APIs to provide dynamic content behavior.",
  },
  {
    id: "projects-tindog",
    title: "TinDog",
    section: "projects",
    content:
      "TinDog is a simple responsive project and one of Hashir's first deployed projects. It represents an early milestone in his frontend learning journey.",
  },
  {
    id: "contact",
    title: "Contact",
    section: "contact",
    content:
      "Hashir Muhammed can be contacted at hashhmuhammed@gmail.com. He is based in Kochi, India. Social links include LinkedIn at linkedin.com/in/hashir-muhammed, Instagram at instagram.com/hashh.ir, and WhatsApp on +91 9567088927.",
  },
];
