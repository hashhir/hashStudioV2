"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center px-4 pb-20 pt-32 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-6 text-xs uppercase tracking-[0.45em] text-muted sm:text-sm"
          >
            Senior Software Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[16vw] font-extrabold leading-[0.86] tracking-[-0.08em] text-foreground sm:text-[11vw] lg:text-[8.6rem]"
          >
            <span className="block">Hashir</span>
            <span className="block">Muhammed</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.75 }}
            className="mt-8 max-w-2xl text-[0.82rem] uppercase leading-6 tracking-[0.08em] text-muted sm:text-[0.9rem]"
          >
            <span className="block">Indian raised, Kochi based</span>
            <span className="block">THREE years of experience in backend</span>
            <span className="block">Java, Spring Boot, python, GenAi</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
