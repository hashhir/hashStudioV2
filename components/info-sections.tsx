"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

type CardContentType = "skills" | "rich" | "projects" | "placeholder";

type ProjectLink = {
  name: string;
  href: string;
  description: string;
  accentClass: string;
};

type PhaseTwoCard = {
  id: string;
  label: string;
  outlineClass: string;
  title: string;
  description: string;
  contentType: CardContentType;
  cardHeading?: string;
  content?: string[];
  projects?: ProjectLink[];
};

const workItems = [
  {
    title: "Enterprise Backend Systems",
    copy: "Built reliable Java services and APIs with a focus on scale, latency, and maintainable architecture.",
  },
  {
    title: "Generative AI Delivery",
    copy: "Shipped GenAI-backed features, prototypes, and internal tools that blend product thinking with engineering depth.",
  },
  {
    title: "Full-Stack Execution",
    copy: "Designs modern frontend experiences that feel sharp, minimal, and intentional while staying fast in production.",
  },
  {
    title: "Telematics Software",
    copy: "Worked across frontend experiences, native iOS and Android apps, Java backend services, and integrations with big data platforms.",
  },
];

const skillGroups = [
  "Java",
  "Spring Boot",
  "Jenkins",
  "JMeter",
  "Spring Security",
  "Wildly",
  "Kafka",
  "PostgreSQL",
  "Jboss EAP",
  "Python",
  "DynamoDB",
  "FastAPI",
  "Lambda",
  "Lang Chain",
  "Postman",
  "HTML",
  "JavaScript",
  "CSS",
  "React",
  "LLM",
  "RAG",
  "Lang Graph",
  "Microsoft Copilot Studio",
  "Power Automate",
  "Power Apps",
  "Git",
];

const skillBubbleStyles = [
  "border-[#dd6a5f] text-[#dd6a5f] dark:border-[#ff8d7f] dark:text-[#ff8d7f]",
  "border-[#7b8f4e] text-[#7b8f4e] dark:border-[#a6c96c] dark:text-[#a6c96c]",
  "border-[#4f86b8] text-[#4f86b8] dark:border-[#7fb9f0] dark:text-[#7fb9f0]",
  "border-[#9e5ecb] text-[#9e5ecb] dark:border-[#cb91f7] dark:text-[#cb91f7]",
  "border-[#c78635] text-[#c78635] dark:border-[#f0b563] dark:text-[#f0b563]",
];

const phaseTwoButtons: PhaseTwoCard[] = [
  {
    id: "technical-skills",
    label: "Technical Skills",
    outlineClass: "border-[#e05b4f] text-[#e05b4f] dark:border-[#ff7868] dark:text-[#ff7868]",
    title: "Technical Skills",
    description:
      "A compact map of the tools, platforms, and frameworks I use across backend systems, cloud workflows, AI integrations, and frontend delivery.",
    contentType: "skills",
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    outlineClass: "border-[#5f8f69] text-[#5f8f69] dark:border-[#88c790] dark:text-[#88c790]",
    title: "Spring Boot",
    description: "Production backend work focused on telematics ingestion, scoring pipelines, and stable large-scale operations.",
    contentType: "rich",
    cardHeading: "Production Grade Telematics Backend",
    content: [
      "Developed and maintained a high-throughput telematics backend to ingest real-time trip data from mobile devices, process driving behavior, and generate driver scores.",
      "Designed and implemented Spring Boot microservices to handle trip ingestion, validation, persistence, and downstream processing.",
      "Integrated Apache Kafka for reliable, asynchronous streaming of trip events to Big Data systems for large-scale analytics.",
      "Worked extensively with PostgreSQL (AWS RDS) for transactional data storage, query optimization, and data maintenance in production.",
      "Led deployment, configuration, and runtime management of Spring Boot applications on RHEL with JBoss EAP hosted on AWS EC2 using Jenkins.",
      "Supported production operations including performance tuning, log analysis, issue triage, and scheduled job stability.",
      "Contributed to an AngularJS-based admin portal enabling user and driver management, real-time dashboards and reports, and configuration of scoring logic and system parameters.",
    ],
  },
  {
    id: "genai",
    label: "GenAi",
    outlineClass: "border-[#5e75d8] text-[#5e75d8] dark:border-[#8da0ff] dark:text-[#8da0ff]",
    title: "GenAi",
    description: "Backend and AI workflow engineering for real-time contact-centre support and agent assistance.",
    contentType: "rich",
    cardHeading: "Contact Centre Assistant (Backend + AI Systems)",
    content: [
      "Built backend APIs using FastAPI (Python) for a GenAI-powered contact centre assistant used by customer support executives.",
      "Designed and implemented agent workflows using LangGraph, enabling multi-step reasoning and dynamic decision-making.",
      "Integrated LLMs to provide live conversation assistance based on real-time transcripts, follow-up question suggestions and response guidance, and detection of slang, ambiguous, and complex customer language.",
      "Implemented dynamic data retrieval from DynamoDB to fetch customer profiles, interaction history, and contextual metadata during live calls.",
      "Integrated a knowledge base for company terms, policies, and FAQs to deliver accurate, context-aware responses.",
      "Developed features for competitor analysis, enabling agents to respond effectively to comparison-based customer queries.",
      "Automated form auto-filling and recommendation workflows, reducing manual effort for contact centre executives.",
    ],
  },
  {
    id: "personal-projects",
    label: "Personal Projects",
    outlineClass: "border-[#af6dd1] text-[#af6dd1] dark:border-[#d39dff] dark:text-[#d39dff]",
    title: "Personal Projects",
    description: "A lighter side of the portfolio: curiosity-led builds from my learning phase, made while exploring, experimenting, and enjoying the process.",
    contentType: "projects",
    cardHeading: "Built from curiosity, late-night learning, and a lot of experimenting",
    content: [
      "These are projects I made out of curiosity during my learning phase in academics. They are playful, exploratory, and each one marks a small step in how I learned to build for the web.",
    ],
    projects: [
      {
        name: "HashStudio Portfolio",
        href: "https://hashhir.github.io/hashstudio/",
        description: "A portfolio project developed using HTML, CSS, Flexbox, and JavaScript.",
        accentClass:
          "border-[#e05b4f] bg-[#e05b4f]/10 text-[#e05b4f] hover:bg-[#e05b4f] hover:text-white dark:border-[#ff8d7f] dark:bg-[#ff8d7f]/10 dark:text-[#ff8d7f] dark:hover:bg-[#ff8d7f] dark:hover:text-[#090909]",
      },
      {
        name: "React Netflix Clone",
        href: "https://hashhir.github.io/React-Project-Netflix/",
        description: "A simple Netflix clone built with React that works dynamically using external APIs.",
        accentClass:
          "border-[#5e75d8] bg-[#5e75d8]/10 text-[#5e75d8] hover:bg-[#5e75d8] hover:text-white dark:border-[#8da0ff] dark:bg-[#8da0ff]/10 dark:text-[#8da0ff] dark:hover:bg-[#8da0ff] dark:hover:text-[#090909]",
      },
      {
        name: "TinDog",
        href: "https://hashhir.github.io/TinDog/",
        description: "A simple responsive project and the first one I deployed. Still a special milestone for me.",
        accentClass:
          "border-[#7b8f4e] bg-[#7b8f4e]/10 text-[#7b8f4e] hover:bg-[#7b8f4e] hover:text-white dark:border-[#a6c96c] dark:bg-[#a6c96c]/10 dark:text-[#a6c96c] dark:hover:bg-[#a6c96c] dark:hover:text-[#090909]",
      },
    ],
  },
];

export function InfoSections() {
  const [activeCard, setActiveCard] = useState<PhaseTwoCard | null>(null);

  useEffect(() => {
    if (!activeCard) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCard(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeCard]);

  return (
    <>
      <div className="relative z-10 px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <section id="work" className="glass-panel scroll-mt-28 rounded-[2rem] p-7 sm:scroll-mt-32 sm:p-12">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <p className="text-xs uppercase tracking-[0.45em] text-muted sm:text-sm">Selected Work</p>
              <p className="max-w-xl text-sm text-muted sm:text-base">
                A compact snapshot of the kind of systems, products, and interfaces I like to build.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {workItems.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="rounded-[1.6rem] border border-border bg-background/40 p-6"
                >
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{item.copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[2rem] p-6 sm:p-10">
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-[-0.05em] sm:text-4xl">
              Explore the stack and project layers
            </h2>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              {phaseTwoButtons.map((button, index) => (
                <motion.button
                  key={button.id}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  onClick={() => setActiveCard(button)}
                  className={`rounded-xl border bg-transparent px-4 py-3 text-sm font-semibold tracking-[0.08em] transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/40 sm:px-5 ${button.outlineClass}`}
                >
                  {button.label}
                </motion.button>
              ))}
            </div>
          </section>

          <section id="about" className="grid scroll-mt-28 gap-8 overflow-x-clip lg:grid-cols-[1.1fr_0.9fr] lg:scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
              className="glass-panel min-w-0 overflow-hidden rounded-[2rem] p-6 sm:p-10"
            >
              <p className="text-xs uppercase tracking-[0.45em] text-muted sm:text-sm">About</p>
              <h2 className="mt-6 max-w-xl font-display text-4xl font-extrabold uppercase leading-tight tracking-[-0.05em] sm:text-5xl">
                Quiet visuals. Strong systems. Human-centered software.
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                I work across backend architecture and product-facing interfaces, with a preference for focused design,
                clean interactions, and implementation that feels considered at every layer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-panel min-w-0 overflow-hidden rounded-[2rem] p-6 sm:p-10"
            >
              <p className="text-xs uppercase tracking-[0.45em] text-muted sm:text-sm">Focus</p>
              <div className="mt-6 space-y-5 text-sm uppercase tracking-[0.18em] text-foreground/85 sm:text-base">
                <p>Java Backend Engineering</p>
                <p>AI Product Prototyping</p>
                <p>Minimal Frontend Direction</p>
                <p>Scalable Service Design</p>
              </div>
            </motion.div>
          </section>

          <section id="contact" className="glass-panel scroll-mt-28 rounded-[2rem] p-6 sm:scroll-mt-32 sm:p-10">
            <p className="text-xs uppercase tracking-[0.45em] text-muted sm:text-sm">Contact</p>
            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-[16rem] break-words font-display text-[1.9rem] font-extrabold uppercase leading-[1.02] tracking-[-0.05em] sm:max-w-3xl sm:text-5xl sm:leading-tight lg:text-6xl">
                Let&apos;s build calm, sharp, and meaningful digital experiences.
              </h2>
              <div className="text-sm text-muted sm:text-base">
                <p>hashhmuhammed@gmail.com</p>
                <p className="mt-2">Kochi, India</p>
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    href="https://www.linkedin.com/in/hashir-muhammed"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/40 text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3Zm4.17 5.5V20h3.38v-6.02c0-1.58.3-3.11 2.26-3.11 1.93 0 1.95 1.8 1.95 3.21V20H20.4v-6.6c0-3.24-.7-5.73-4.49-5.73-1.82 0-3.05 1-3.55 1.95h-.05V8.5H9.42Z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/hashh.ir?igsh=MTkzNGpkcWkycnBlYw=="
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/40 text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.5A3.25 3.25 0 0 0 4.5 7.75v8.5a3.25 3.25 0 0 0 3.25 3.25h8.5a3.25 3.25 0 0 0 3.25-3.25v-8.5A3.25 3.25 0 0 0 16.25 4.5h-8.5Zm8.88 1.12a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://wa.me/919567088927"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/40 text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M12.04 3.5A8.46 8.46 0 0 0 4.8 16.36L3.5 20.5l4.26-1.26a8.54 8.54 0 0 0 4.08 1.04h.04a8.46 8.46 0 0 0 .16-16.92Zm4.94 11.98c-.2.58-1.17 1.1-1.61 1.16-.42.06-.95.08-1.53-.1-.36-.1-.82-.27-1.4-.52-2.46-1.06-4.06-3.66-4.18-3.82-.12-.16-1-1.32-1-2.52 0-1.2.62-1.78.84-2.02.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.41-.12.12-.24.25-.1.5.14.24.62 1.03 1.34 1.67.92.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.6-.14 1.18Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {activeCard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-6"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-[2rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6 border-b border-border/70 px-5 py-5 sm:px-8 sm:py-6">
                <div>
                  <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.05em] sm:text-4xl">
                    {activeCard.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                    {activeCard.description}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close card"
                  onClick={() => setActiveCard(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/40 text-base font-semibold text-foreground transition-colors duration-300 hover:border-accent hover:text-accent sm:min-w-10 sm:px-3 sm:text-[10px] sm:uppercase sm:tracking-[0.08em]"
                >
                  <span className="sm:hidden">X</span>
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              <div className="max-h-[calc(88vh-10rem)] overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
                {activeCard.contentType === "skills" ? (
                  <div className="flex flex-wrap gap-3">
                    {skillGroups.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: index * 0.02 }}
                        className={`rounded-lg border bg-background/25 px-4 py-2 text-sm font-medium tracking-[0.05em] sm:text-[0.95rem] ${skillBubbleStyles[index % skillBubbleStyles.length]}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                ) : activeCard.contentType === "rich" ? (
                  <div className="rounded-[1.5rem] border border-border bg-background/25 p-5 sm:p-6">
                    <h4 className="font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-foreground sm:text-3xl">
                      {activeCard.cardHeading}
                    </h4>
                    <div className="mt-5 space-y-4">
                      {activeCard.content?.map((item, index) => (
                        <motion.p
                          key={`${activeCard.id}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: index * 0.04 }}
                          className="text-sm leading-7 text-muted sm:text-base"
                        >
                          {item}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                ) : activeCard.contentType === "projects" ? (
                  <div className="rounded-[1.5rem] border border-border bg-background/25 p-5 sm:p-6">
                    <h4 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-foreground sm:text-3xl">
                      {activeCard.cardHeading}
                    </h4>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">
                      {activeCard.content?.[0]}
                    </p>

                    <div className="mt-6 grid gap-4">
                      {activeCard.projects?.map((project, index) => (
                        <motion.div
                          key={project.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: index * 0.05 }}
                          className="rounded-[1.2rem] border border-border bg-background/35 p-4 sm:p-5"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h5 className="font-display text-xl font-bold text-foreground">{project.name}</h5>
                              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                                {project.description}
                              </p>
                            </div>
                            <Link
                              href={project.href}
                              target="_blank"
                              rel="noreferrer"
                              className={`inline-flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${project.accentClass}`}
                            >
                              Visit
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-border bg-background/30 p-6 text-sm leading-7 text-muted sm:text-base">
                    Content for this card is ready to be added. Send me the details for{" "}
                    <span className="text-foreground">{activeCard.title}</span> and I&apos;ll drop them into this popup
                    next.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
