"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10"
    >
      <div className="glass-panel mx-auto flex max-w-[92rem] items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <Link href="#" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-extrabold tracking-[0.18em]">#</span>
          <span className="font-logo text-xs font-semibold tracking-[0.22em] sm:text-sm">
            HashStudio
          </span>
        </Link>

        <div className="hidden items-center gap-3 sm:gap-6 md:flex">
          <nav className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted sm:gap-4 sm:text-sm sm:tracking-[0.24em]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-foreground"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <motion.span
                animate={{ y: menuOpen ? 0 : -4, rotate: menuOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute h-[1.5px] w-4 rounded-full bg-current"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute h-[1.5px] w-4 rounded-full bg-current"
              />
              <motion.span
                animate={{ y: menuOpen ? 0 : 4, rotate: menuOpen ? -45 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute h-[1.5px] w-4 rounded-full bg-current"
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-3 max-w-7xl px-1 md:hidden"
          >
            <div className="glass-panel rounded-[1.5rem] p-2">
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[1rem] px-4 py-3 text-sm uppercase tracking-[0.24em] text-muted transition-colors duration-300 hover:bg-background/50 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
