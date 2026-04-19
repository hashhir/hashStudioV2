"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10"
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 sm:px-6">
        <Link href="#" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-extrabold tracking-[0.18em]">#</span>
          <span className="font-logo text-xs font-semibold tracking-[0.22em] sm:text-sm">
            HashStudio
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
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
      </div>
    </motion.header>
  );
}
