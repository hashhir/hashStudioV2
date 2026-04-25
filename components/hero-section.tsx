"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center gap-12">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-5 text-[0.56rem] uppercase tracking-[0.3em] text-muted sm:mb-6 sm:text-[0.76rem] sm:tracking-[0.4em]"
          >
            Senior Software Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold leading-[0.88] tracking-[-0.07em] text-foreground"
          >
            <span className="block text-[13vw] sm:text-[9.6vw] md:text-[8.6vw] lg:text-[8.6rem]">Hashir</span>
            <span className="block text-[9.4vw] sm:text-[8.5vw] md:text-[7.8vw] lg:text-[8.6rem]">Muhammed</span>
          </motion.h1>

        </div>

        <div className="mt-[5.5rem] flex w-full flex-col gap-5 sm:mt-24 sm:flex-row sm:items-end sm:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.75 }}
            className="max-w-[18rem] self-start text-[0.56rem] uppercase leading-5 tracking-[0.07em] text-muted sm:max-w-2xl sm:text-[0.76rem] sm:leading-6 sm:tracking-[0.08em]"
          >
            <span className="block">Indian raised, Kochi based</span>
            <span className="block">THREE years of experience in backend</span>
            <span className="block">Java, Spring Boot, python, GenAi</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.82 }}
            className="flex w-fit flex-col gap-2 sm:self-end"
          >
            <span className="inline-flex w-fit items-center rounded-lg border border-[#4f9d69] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#4f9d69] dark:border-[#7fd39a] dark:text-[#7fd39a] sm:text-xs">
              Available for work
            </span>
            <span className="inline-flex w-fit items-center rounded-lg border border-foreground/25 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted sm:text-xs">
              Kochi, India
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
